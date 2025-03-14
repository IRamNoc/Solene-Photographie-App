/*
  # Création des tables pour la galerie photo

  1. Tables
    - `events`: Stocke les événements photo
      - `id` (uuid, clé primaire)
      - `title` (text, titre de l'événement)
      - `client_password` (text, mot de passe client)
      - `guest_password` (text, mot de passe invités)
      - `created_at` (timestamptz, date de création)
      - `created_by` (uuid, référence à l'utilisateur créateur)

    - `photos`: Stocke les photos des événements
      - `id` (uuid, clé primaire)
      - `event_id` (uuid, référence à l'événement)
      - `url` (text, URL de la photo)
      - `visibility` (text, visibilité de la photo)
      - `approved_by_client` (boolean, approbation client)
      - `created_at` (timestamptz, date de création)
      - `views` (integer, nombre de vues)
      - `downloads` (integer, nombre de téléchargements)

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques d'accès pour les utilisateurs authentifiés
*/

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  client_password text NOT NULL,
  guest_password text NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid NOT NULL DEFAULT auth.uid()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for authenticated users"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for authenticated users"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
  ON events
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Enable delete access for authenticated users"
  ON events
  FOR DELETE
  TO authenticated
  USING (true);

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

CREATE POLICY "Enable read access for authenticated users"
  ON photos
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for authenticated users"
  ON photos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
  ON photos
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Enable delete access for authenticated users"
  ON photos
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample data
DO $$
DECLARE
  admin_id uuid;
BEGIN
  -- Get the admin user ID
  SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@solenetrm.com' LIMIT 1;

  -- Insert events only if we have an admin ID
  IF admin_id IS NOT NULL THEN
    INSERT INTO events (title, client_password, guest_password, created_by)
    VALUES
      ('Mariage Julie & Thomas', 'client123', 'guest123', admin_id),
      ('Baptême Lucas', 'client456', 'guest456', admin_id);

    -- Insert sample photos
    WITH mariage AS (
      SELECT id FROM events WHERE title = 'Mariage Julie & Thomas' LIMIT 1
    ),
    bapteme AS (
      SELECT id FROM events WHERE title = 'Baptême Lucas' LIMIT 1
    )
    INSERT INTO photos (event_id, url, visibility, views, downloads)
    SELECT 
      mariage.id,
      url,
      visibility,
      views,
      downloads
    FROM mariage,
    (VALUES
      ('https://images.unsplash.com/photo-1583939411023-14783179e581', 'guest', 45, 12),
      ('https://images.unsplash.com/photo-1519741497674-611481863552', 'client', 23, 5),
      ('https://images.unsplash.com/photo-1511895426328-dc8714191300', 'private', 10, 2)
    ) AS photos(url, visibility, views, downloads)
    UNION ALL
    SELECT 
      bapteme.id,
      url,
      visibility,
      views,
      downloads
    FROM bapteme,
    (VALUES
      ('https://images.unsplash.com/photo-1544126592-807ade215a0b', 'guest', 15, 3),
      ('https://images.unsplash.com/photo-1551316679-9c6ae9dec224', 'client', 8, 1)
    ) AS photos(url, visibility, views, downloads);
  END IF;
END $$;