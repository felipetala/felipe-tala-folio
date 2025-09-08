/**
 * Configuration for photo collections
 * Customize which folders from Supabase bucket should be displayed
 */

export interface CollectionConfig {
  folderName: string;        // Folder name in Supabase bucket
  displayTitle: string;      // Title to display on the website
  description: string;       // Description for the collection
  category: 'family' | 'travel' | 'events' | 'hobbies' | 'other';
  date?: string;            // Optional date for the collection
  enabled: boolean;         // Whether to show this collection
}

/**
 * Define your photo collections here
 * Set enabled: false to hide a collection without deleting from bucket
 */
export const PHOTO_COLLECTIONS: CollectionConfig[] = [
  {
    folderName: 'family-rv-trip',
    displayTitle: 'Family RV Adventure',
    description: 'Memorable road trip experiences with family, exploring the open road and creating lasting memories',
    category: 'family',
    date: '2024-07-15',
    enabled: true
  },
  {
    folderName: 'venice-beach',
    displayTitle: 'Venice Beach Moments',
    description: 'Sun, sand, and unforgettable times at Venice Beach with friends and the vibrant local culture',
    category: 'travel',
    date: '2024-06-20',
    enabled: true
  },
  {
    folderName: 'longs-peak-co',
    displayTitle: 'Longs Peak Colorado',
    description: 'Conquering the 14,259ft summit of Longs Peak - an incredible alpine adventure in Rocky Mountain National Park',
    category: 'travel',
    date: '2024-08-10',
    enabled: true
  },
  {
    folderName: 'diwali',
    displayTitle: 'Diwali Celebrations',
    description: 'Festival of Lights celebrations with family and friends, embracing tradition and joy',
    category: 'events',
    date: '2024-11-01',
    enabled: true
  },
  {
    folderName: 'family&friends',
    displayTitle: 'Family & Friends',
    description: 'Cherished moments with the people who matter most - capturing laughter, love, and togetherness',
    category: 'family',
    date: '2024-09-15',
    enabled: true
  }
];

/**
 * Bucket configuration
 */
export const BUCKET_CONFIG = {
  // Root folder path in the bucket ('' for root, or 'personal' for subfolder)
  rootFolder: '',
  
  // Whether to auto-discover folders not in PHOTO_COLLECTIONS
  autoDiscoverFolders: false,
  
  // Maximum number of photos per collection
  maxPhotosPerCollection: 20,
  
  // Default category for auto-discovered folders
  defaultCategory: 'other' as const
};