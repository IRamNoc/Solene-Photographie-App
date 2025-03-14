/*
  # Fix events table created_by constraint

  1. Changes
    - Modify the created_by column in events table to use auth.uid() as default value
    - This ensures the column is always populated with the current user's ID
  
  2. Security
    - Maintains existing row level security policies
*/

-- Update the created_by column to use auth.uid() as default
ALTER TABLE events 
ALTER COLUMN created_by SET DEFAULT auth.uid();