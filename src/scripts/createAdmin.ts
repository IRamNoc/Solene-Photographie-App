import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000
): Promise<T> {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.log(`Attempt ${i + 1} failed, retrying in ${delayMs}ms...`);
      await delay(delayMs);
    }
  }
  
  throw lastError;
}

async function createAdminUser() {
  const email = 'admin@solenetrm.com';
  const password = 'Admin123!@#';

  try {
    console.log('Starting admin user creation process...');

    // Try to sign in first since the user already exists
    console.log('Attempting to sign in...');
    let signInData;
    
    try {
      const { data, error } = await retryOperation(async () => {
        return await supabase.auth.signInWithPassword({
          email,
          password,
        });
      });

      if (error) {
        console.log('Sign in failed, attempting to create user...');
        // If sign in fails, try to create the user
        const { data: signUpData, error: signUpError } = await retryOperation(async () => {
          return await supabase.auth.signUp({
            email,
            password,
          });
        });

        if (signUpError) {
          throw signUpError;
        }

        if (!signUpData.user) {
          throw new Error('No user data returned from sign up');
        }

        console.log('User created successfully');
        
        // Try to sign in again after creation
        const { data: newSignInData, error: newSignInError } = await retryOperation(async () => {
          return await supabase.auth.signInWithPassword({
            email,
            password,
          });
        });

        if (newSignInError) {
          throw newSignInError;
        }

        signInData = newSignInData;
      } else {
        signInData = data;
      }
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }

    if (!signInData?.user) {
      throw new Error('No user data available after authentication');
    }

    const userId = signInData.user.id;
    console.log('User ID:', userId);

    // Check if user exists in users table
    console.log('Checking users table...');
    const { data: existingUser, error: checkError } = await retryOperation(async () => {
      return await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
    });

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (!existingUser) {
      console.log('Adding user to users table...');
      const { data: insertData, error: insertError } = await retryOperation(async () => {
        return await supabase
          .from('users')
          .upsert([
            {
              id: userId,
              role: 'admin',
            }
          ])
          .select()
          .single();
      });

      if (insertError) {
        throw insertError;
      }

      console.log('User added to users table:', insertData);
    } else {
      console.log('User already exists in users table:', existingUser);
      
      // Update role to admin if it's not already
      if (existingUser.role !== 'admin') {
        console.log('Updating user role to admin...');
        const { error: updateError } = await retryOperation(async () => {
          return await supabase
            .from('users')
            .update({ role: 'admin' })
            .eq('id', userId);
        });

        if (updateError) {
          throw updateError;
        }
        console.log('Role updated to admin');
      }
    }

    console.log('\nAdmin user setup completed successfully!');
    console.log('----------------------------------------');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('----------------------------------------');

    // Sign out after setup
    await retryOperation(async () => {
      return await supabase.auth.signOut();
    });
    console.log('Signed out successfully');

  } catch (error) {
    console.error('Error in admin user creation:', error);
    throw error;
  }
}

createAdminUser()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });