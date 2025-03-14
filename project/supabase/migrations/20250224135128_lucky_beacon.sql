/*
  # Fix missing storage paths for photos

  1. Changes
    - Add storage_path column
    - Add a function to extract storage path from URL
    - Update existing photos to set their storage_path based on URL
    - Make storage_path NOT NULL
    - Remove url column as it's no longer needed

  2. Notes
    - This is a one-time migration to fix existing data
    - All new photos will have storage_path set correctly
*/

-- First add the storage_path column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'photos'
    AND column_name = 'storage_path'
  ) THEN
    ALTER TABLE photos ADD COLUMN storage_path text;
  END IF;
END $$;

-- Function to extract storage path from URL
CREATE OR REPLACE FUNCTION extract_storage_path(url text)
RETURNS text AS $$
DECLARE
  path text;
BEGIN
  -- Extract everything after 'photos/'
  path := substring(url from 'photos/(.*)$');
  RETURN path;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Update existing photos to set storage_path from URL
DO $$
BEGIN
  UPDATE photos
  SET storage_path = extract_storage_path(url)
  WHERE storage_path IS NULL AND url IS NOT NULL;
END $$;

-- Make storage_path NOT NULL
ALTER TABLE photos
  ALTER COLUMN storage_path SET NOT NULL;

-- Drop url column
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'photos'
    AND column_name = 'url'
  ) THEN
    ALTER TABLE photos DROP COLUMN url;
  END IF;
END $$;