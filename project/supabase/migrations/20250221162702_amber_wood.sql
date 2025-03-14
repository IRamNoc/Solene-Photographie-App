/*
  # Add folders support

  1. New Tables
    - `folders`
      - `id` (uuid, primary key)
      - `name` (text)
      - `event_id` (uuid, references events)
      - `created_at` (timestamp)

  2. Changes
    - Add `folder_id` column to photos table
    - Add foreign key constraint to folders table

  3. Security
    - Enable RLS on folders table
    - Add policies for authenticated users
*/

-- Create folders table
CREATE TABLE IF NOT EXISTS folders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  event_id uuid REFERENCES events NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add folder_id to photos
ALTER TABLE photos ADD COLUMN IF NOT EXISTS folder_id uuid REFERENCES folders;

-- Enable RLS
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Enable read access for authenticated users"
  ON folders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for authenticated users"
  ON folders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
  ON folders
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Enable delete access for authenticated users"
  ON folders
  FOR DELETE
  TO authenticated
  USING (true);