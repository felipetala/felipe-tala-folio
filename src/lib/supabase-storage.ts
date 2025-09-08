import { supabase } from "@/integrations/supabase/client";

export interface StorageFile {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: Record<string, any>;
  bucket_id: string;
  size: number;
}

export interface PhotoCollection {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  order_index: number;
}

/**
 * Fetches all files from the photos bucket
 */
export async function fetchPhotosFromBucket(): Promise<StorageFile[]> {
  try {
    const { data, error } = await supabase
      .storage
      .from('photos')
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      console.error('Error fetching photos from bucket:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchPhotosFromBucket:', error);
    return [];
  }
}

/**
 * Fetches photos from a specific folder in the bucket
 */
export async function fetchPhotosFromFolder(folderPath: string): Promise<StorageFile[]> {
  try {
    const { data, error } = await supabase
      .storage
      .from('photos')
      .list(folderPath, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error(`Error fetching photos from folder ${folderPath}:`, error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchPhotosFromFolder:', error);
    return [];
  }
}

/**
 * Gets the public URL for a file in the photos bucket
 */
export function getPhotoUrl(filePath: string): string {
  const { data } = supabase
    .storage
    .from('photos')
    .getPublicUrl(filePath);
  
  return data.publicUrl;
}

/**
 * Organizes photos into collections based on folder structure
 * Assumes folder structure like: collection-name/photo.jpg
 */
export async function fetchPhotoCollections(): Promise<PhotoCollection[]> {
  try {
    // First, get all folders (collections)
    const { data: folders, error: foldersError } = await supabase
      .storage
      .from('photos')
      .list('', {
        limit: 100,
        offset: 0
      });

    if (foldersError) {
      console.error('Error fetching folders:', foldersError);
      return getDefaultCollections();
    }

    const collections: PhotoCollection[] = [];

    // Process each folder as a collection
    for (const folder of folders || []) {
      // Skip if it's a file not a folder
      if (folder.name && folder.name.includes('.')) continue;
      
      if (folder.name) {
        // Fetch photos from this folder
        const { data: photos, error: photosError } = await supabase
          .storage
          .from('photos')
          .list(folder.name, {
            limit: 100,
            offset: 0
          });

        if (photosError) {
          console.error(`Error fetching photos from ${folder.name}:`, photosError);
          continue;
        }

        // Filter out non-image files
        const imageFiles = (photos || []).filter(file => 
          file.name && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
        );

        if (imageFiles.length > 0) {
          const collectionPhotos: Photo[] = imageFiles.map((file, index) => ({
            id: file.id || `${folder.name}-${index}`,
            url: getPhotoUrl(`${folder.name}/${file.name}`),
            caption: file.name.replace(/\.[^/.]+$/, "").replace(/-/g, ' '),
            order_index: index + 1
          }));

          collections.push({
            id: folder.name,
            title: formatFolderName(folder.name),
            description: `Collection from ${folder.name}`,
            date: folder.created_at || new Date().toISOString(),
            category: determineCategoryFromName(folder.name),
            photos: collectionPhotos
          });
        }
      }
    }

    // If no collections found, return default collections
    if (collections.length === 0) {
      return getDefaultCollections();
    }

    return collections;
  } catch (error) {
    console.error('Error in fetchPhotoCollections:', error);
    return getDefaultCollections();
  }
}

/**
 * Formats folder name into a readable title
 */
function formatFolderName(folderName: string): string {
  return folderName
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Determines category based on folder name
 */
function determineCategoryFromName(folderName: string): string {
  const name = folderName.toLowerCase();
  if (name.includes('family') || name.includes('rv')) return 'family';
  if (name.includes('travel') || name.includes('trip') || name.includes('vacation')) return 'travel';
  if (name.includes('event') || name.includes('conference')) return 'events';
  if (name.includes('hobby') || name.includes('project')) return 'hobbies';
  return 'other';
}

/**
 * Returns default collections as fallback
 */
function getDefaultCollections(): PhotoCollection[] {
  return [
    {
      id: '1',
      title: 'Family RV Vacation',
      description: 'Post graduation family RV trip to Yosemite and Carmel',
      date: '2023-12-20',
      category: 'family',
      photos: [
        { id: '1', url: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800', caption: 'Starting our journey', order_index: 1 },
        { id: '2', url: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800', caption: 'Beautiful sunset from the RV', order_index: 2 },
        { id: '3', url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800', caption: 'Camping by the lake', order_index: 3 },
        { id: '4', url: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?w=800', caption: 'Family dinner in nature', order_index: 4 },
        { id: '5', url: 'https://images.unsplash.com/photo-1568605115459-4b731184f961?w=800', caption: 'Morning coffee with a view', order_index: 5 }
      ]
    },
    {
      id: '2',
      title: 'Mountain Hiking Adventure',
      description: 'Joined friends on a 3 day trip; ended up climbing a 14k ft mountain',
      date: '2024-01-15',
      category: 'travel',
      photos: [
        { id: '6', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', caption: 'Summit view at 14,000 ft', order_index: 1 },
        { id: '7', url: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=800', caption: 'Trail through the forest', order_index: 2 },
        { id: '8', url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800', caption: 'Rest at the peak', order_index: 3 }
      ]
    },
    {
      id: '3',
      title: 'Venice Beach Sunset',
      description: 'Sharing mate with friends at the beach',
      date: '2023-10-05',
      category: 'travel',
      photos: [
        { id: '9', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', caption: 'Venice Beach at golden hour', order_index: 1 },
        { id: '10', url: 'https://images.unsplash.com/photo-1533760881669-80db4d7b4c15?w=800', caption: 'Sharing mate with friends', order_index: 2 },
        { id: '11', url: 'https://images.unsplash.com/photo-1515726657878-05d8c9025ab9?w=800', caption: 'Beach volleyball game', order_index: 3 }
      ]
    }
  ];
}