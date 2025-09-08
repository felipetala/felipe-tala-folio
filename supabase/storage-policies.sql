-- Make the photos bucket public for reading
-- Run this in your Supabase SQL editor

-- First, ensure the bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('photos', 'photos', true)
ON CONFLICT (id) 
DO UPDATE SET public = true;

-- Create a policy to allow public access to all files in the photos bucket
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'photos');

-- Allow public to view all files
CREATE POLICY "Anyone can view photos" ON storage.objects
FOR SELECT USING (bucket_id = 'photos');

-- If you need to allow uploads from authenticated users only:
-- CREATE POLICY "Authenticated users can upload photos" ON storage.objects
-- FOR INSERT WITH CHECK (bucket_id = 'photos' AND auth.uid() IS NOT NULL);

-- To check if policies exist:
-- SELECT * FROM storage.buckets WHERE id = 'photos';
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';