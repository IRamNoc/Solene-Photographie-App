import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  role: 'admin';
}

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      initialized: true,
      setUser: (user) => set({ user, loading: false, initialized: true }),
      signOut: () => set({ user: null, loading: false, initialized: true })
    }),
    {
      name: 'auth-storage',
    }
  )
);