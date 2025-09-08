import { supabase } from "@/integrations/supabase/client";
import { PHOTO_COLLECTIONS, BUCKET_CONFIG } from "@/config/photo-collections";

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
 * Adds image transformation parameters for optimization
 */
export function getPhotoUrl(filePath: string, options?: { width?: number; quality?: number }): string {
  // Clean the file path - remove leading slashes
  const cleanPath = filePath.replace(/^\/+/, '');
  
  const { data } = supabase
    .storage
    .from('photos')
    .getPublicUrl(cleanPath);
  
  // Log the URL for debugging
  console.log(`Generated URL for ${cleanPath}: ${data.publicUrl}`);
  
  // Add transformation parameters for optimization
  if (options?.width || options?.quality) {
    const params = new URLSearchParams();
    if (options.width) params.append('width', options.width.toString());
    if (options.quality) params.append('quality', (options.quality || 75).toString());
    return `${data.publicUrl}?${params.toString()}`;
  }
  
  return data.publicUrl;
}

/**
 * Organizes photos into collections based on folder structure
 * Assumes folder structure like: collection-name/photo.jpg
 */
export async function fetchPhotoCollections(): Promise<PhotoCollection[]> {
  try {
    const collections: PhotoCollection[] = [];
    const ROOT_FOLDER = BUCKET_CONFIG.rootFolder;

    // If using configured collections
    if (PHOTO_COLLECTIONS.length > 0 && !BUCKET_CONFIG.autoDiscoverFolders) {
      // Fetch only configured collections
      for (const config of PHOTO_COLLECTIONS) {
        if (!config.enabled) continue;

        const folderPath = ROOT_FOLDER ? `${ROOT_FOLDER}/${config.folderName}` : config.folderName;
        
        // Fetch photos from this specific folder
        console.log(`Fetching from folder: ${folderPath}`);
        const { data: photos, error: photosError } = await supabase
          .storage
          .from('photos')
          .list(folderPath, {
            limit: BUCKET_CONFIG.maxPhotosPerCollection,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
          });

        if (photosError) {
          console.error(`Error fetching photos from ${config.folderName}:`, photosError);
          continue;
        }

        console.log(`Found ${photos?.length || 0} items in ${config.folderName}`);
        
        // Filter out non-image files
        const imageFiles = (photos || []).filter(file => 
          file.name && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
        );

        console.log(`Found ${imageFiles.length} image files in ${config.folderName}`);

        if (imageFiles.length > 0) {
          const collectionPhotos: Photo[] = imageFiles.map((file, index) => ({
            id: file.id || `${config.folderName}-${index}`,
            url: getPhotoUrl(`${folderPath}/${file.name}`, { width: 1200, quality: 85 }),
            caption: file.name.replace(/\.[^/.]+$/, "").replace(/-/g, ' ').replace(/_/g, ' '),
            order_index: index + 1
          }));

          collections.push({
            id: config.folderName,
            title: config.displayTitle,
            description: config.description,
            date: config.date || new Date().toISOString(),
            category: config.category,
            photos: collectionPhotos
          });
        }
      }
    } else {
      // Auto-discover all folders (original behavior)
      const { data: folders, error: foldersError } = await supabase
        .storage
        .from('photos')
        .list(ROOT_FOLDER, {
          limit: 100,
          offset: 0
        });

      if (foldersError) {
        console.error('Error fetching folders:', foldersError);
        return getDefaultCollections();
      }

      // Process each folder as a collection
      for (const folder of folders || []) {
        // Skip if it's a file not a folder
        if (folder.name && folder.name.includes('.')) continue;
        
        if (folder.name) {
          // Check if this folder is configured
          const config = PHOTO_COLLECTIONS.find(c => c.folderName === folder.name);
          if (config && !config.enabled) continue; // Skip disabled collections

          const folderPath = ROOT_FOLDER ? `${ROOT_FOLDER}/${folder.name}` : folder.name;
          
          // Fetch photos from this folder
          const { data: photos, error: photosError } = await supabase
            .storage
            .from('photos')
            .list(folderPath, {
              limit: BUCKET_CONFIG.maxPhotosPerCollection,
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
              url: getPhotoUrl(`${folderPath}/${file.name}`),
              caption: file.name.replace(/\.[^/.]+$/, "").replace(/-/g, ' '),
              order_index: index + 1
            }));

            collections.push({
              id: folder.name,
              title: config?.displayTitle || formatFolderName(folder.name),
              description: config?.description || `Collection from ${folder.name}`,
              date: config?.date || folder.created_at || new Date().toISOString(),
              category: config?.category || determineCategoryFromName(folder.name),
              photos: collectionPhotos
            });
          }
        }
      }
    }

    // If no collections found, try direct URL approach as fallback
    if (collections.length === 0) {
      console.log('No collections found via list API, trying direct URL approach...');
      return await fetchPhotoCollectionsDirect();
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
 * Fallback method: Try to fetch collections using direct URLs
 * This works when list permissions are restricted but public read is allowed
 */
async function fetchPhotoCollectionsDirect(): Promise<PhotoCollection[]> {
  console.log('Attempting direct URL approach for photo collections...');
  const collections: PhotoCollection[] = [];
  
  // Common image filenames to try
  const commonImageNames = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg',
    '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg',
    'image1.jpg', 'image2.jpg', 'image3.jpg',
    'photo1.jpg', 'photo2.jpg', 'photo3.jpg',
    'IMG_0001.jpg', 'IMG_0002.jpg', 'IMG_0003.jpg',
    '1.png', '2.png', '3.png',
    '1.jpeg', '2.jpeg', '3.jpeg'
  ];

  for (const config of PHOTO_COLLECTIONS) {
    if (!config.enabled) continue;
    
    const folderPath = config.folderName;
    const validPhotos: Photo[] = [];
    
    // Try to load images with common naming patterns
    for (const imageName of commonImageNames) {
      const imageUrl = getPhotoUrl(`${folderPath}/${imageName}`);
      
      // Test if image exists by creating a promise that resolves when image loads
      try {
        const exists = await testImageExists(imageUrl);
        if (exists) {
          validPhotos.push({
            id: `${config.folderName}-${validPhotos.length}`,
            url: imageUrl,
            caption: imageName.replace(/\.[^/.]+$/, "").replace(/-/g, ' ').replace(/_/g, ' '),
            order_index: validPhotos.length + 1
          });
          
          // Stop after finding 5 images per folder
          if (validPhotos.length >= 5) break;
        }
      } catch (e) {
        // Image doesn't exist, continue
      }
    }
    
    if (validPhotos.length > 0) {
      console.log(`Found ${validPhotos.length} photos in ${config.folderName} via direct URL`);
      collections.push({
        id: config.folderName,
        title: config.displayTitle,
        description: config.description,
        date: config.date || new Date().toISOString(),
        category: config.category,
        photos: validPhotos
      });
    }
  }
  
  // If still no collections, return defaults
  if (collections.length === 0) {
    console.log('Direct URL approach also failed, returning default collections');
    return getDefaultCollections();
  }
  
  return collections;
}

/**
 * Test if an image URL is accessible
 */
function testImageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
    
    // Timeout after 5 seconds
    setTimeout(() => resolve(false), 5000);
  });
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