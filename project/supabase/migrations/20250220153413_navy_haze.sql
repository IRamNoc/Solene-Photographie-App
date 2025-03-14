/*
  # Gallery Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `role` (text)
      - `created_at` (timestamp)
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `client_password` (text)
      - `guest_password` (text)
      - `created_at` (timestamp)
      - `created_by` (uuid, references users)
    - `photos`
      - `id` (uuid, primary key)
      - `event_id` (uuid, references events)
      - `url` (text)
      - `visibility` (text)
      - `approved_by_client` (boolean)
      - `created_at` (timestamp)
      - `views` (integer)
      - `downloads` (integer)

  2. Security
    - Enable RLS on all tables
    - Add policies for each role
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'client', 'guest')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  client_password text NOT NULL,
  guest_password text NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users NOT NULL
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage events"
  ON events
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Clients can view their events"
  ON events
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'client'
    )
  );

CREATE POLICY "Guests can view events"
  ON events
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'guest'
    )
  );

-- Photos table
CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events NOT NULL,
  url text NOT NULL,
  visibility text NOT NULL CHECK (visibility IN ('private', 'client', 'guest')),
  approved_by_client boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  views integer DEFAULT 0,
  downloads integer DEFAULT 0
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage photos"
  ON photos
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Clients can view and approve photos"
  ON photos
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'client'
      AND (
        photos.visibility IN ('client', 'guest')
      )
    )
  );

CREATE POLICY "Guests can view approved photos"
  ON photos
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'guest'
      AND photos.visibility = 'guest'
      AND photos.approved_by_client = true
    )
  );