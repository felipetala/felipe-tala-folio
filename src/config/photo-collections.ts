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
    displayTitle: 'Family RV Vacation',
    description: 'Post graduation family RV trip to Yosemite and Carmel',
    category: 'family',
    date: '2023-12-20',
    enabled: true
  },
  {
    folderName: 'mountain-hiking',
    displayTitle: 'Mountain Hiking Adventure',
    description: 'Joined friends on a 3 day trip; ended up climbing a 14k ft mountain',
    category: 'travel',
    date: '2024-01-15',
    enabled: true
  },
  {
    folderName: 'venice-beach',
    displayTitle: 'Venice Beach Sunset',
    description: 'Sharing mate with friends at the beach',
    category: 'travel',
    date: '2023-10-05',
    enabled: true
  },
  {
    folderName: 'ternary-device',
    displayTitle: 'Building Ternary Device',
    description: 'Hardware development project exploring ternary computing',
    category: 'hobbies',
    date: '2023-11-10',
    enabled: true
  },
  {
    folderName: 'tech-conference-2024',
    displayTitle: 'Tech Conference 2024',
    description: 'Annual developers conference presentation',
    category: 'events',
    date: '2024-03-10',
    enabled: true
  },
  // Add more collections as needed
  // Set enabled: false to hide without deleting from bucket
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