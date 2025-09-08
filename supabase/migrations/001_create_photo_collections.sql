-- Create photo_collections table
CREATE TABLE IF NOT EXISTS photo_collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE,
  category TEXT, -- e.g., 'family', 'travel', 'hobbies', 'events'
  cover_image TEXT, -- URL to the main/cover image
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES photo_collections(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX idx_photos_collection_id ON photos(collection_id);
CREATE INDEX idx_photo_collections_category ON photo_collections(category);

-- Enable Row Level Security
ALTER TABLE photo_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public photo collections are viewable by everyone" 
  ON photo_collections FOR SELECT 
  USING (true);

CREATE POLICY "Public photos are viewable by everyone" 
  ON photos FOR SELECT 
  USING (true);

-- Insert sample data
INSERT INTO photo_collections (title, description, date, category, cover_image) VALUES
  ('RV Family Adventure', 'Amazing cross-country trip with the family in our RV', '2024-07-15', 'travel', 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800'),
  ('Mountain Hiking Trip', 'Weekend getaway to the Rockies', '2024-06-20', 'travel', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'),
  ('Tech Conference 2024', 'Speaking at the annual developers conference', '2024-03-10', 'events', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'),
  ('Cooking Adventures', 'Experiments in the kitchen', '2024-02-15', 'hobbies', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800');

-- Insert sample photos for RV Family Adventure
INSERT INTO photos (collection_id, url, caption, order_index) 
SELECT 
  id,
  unnest(ARRAY[
    'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800',
    'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800',
    'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
    'https://images.unsplash.com/photo-1533873984035-25970ab07461?w=800',
    'https://images.unsplash.com/photo-1568605115459-4b731184f961?w=800'
  ]),
  unnest(ARRAY[
    'Starting our journey',
    'Beautiful sunset from the RV',
    'Camping by the lake',
    'Family dinner in nature',
    'Morning coffee with a view'
  ]),
  generate_series(1, 5)
FROM photo_collections 
WHERE title = 'RV Family Adventure';

-- Insert sample photos for Mountain Hiking Trip
INSERT INTO photos (collection_id, url, caption, order_index) 
SELECT 
  id,
  unnest(ARRAY[
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=800',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800'
  ]),
  unnest(ARRAY[
    'Summit view',
    'Trail through the forest',
    'Rest at the peak'
  ]),
  generate_series(1, 3)
FROM photo_collections 
WHERE title = 'Mountain Hiking Trip';