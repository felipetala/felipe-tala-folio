// Use the existing supabase client to avoid duplication
import { supabase } from "@/integrations/supabase/client";

/**
 * Test function to directly check Supabase bucket accessibility
 */
export async function testSupabaseConnection() {
  console.log('=== Testing Supabase Connection ===');
  
  // Test 1: Check if we can access the bucket
  console.log('Test 1: Checking bucket access...');
  const { data: buckets, error: bucketsError } = await supabase
    .storage
    .listBuckets();
  
  if (bucketsError) {
    console.error('Cannot list buckets:', bucketsError);
  } else {
    console.log('Available buckets:', buckets);
  }
  
  // Test 2: Try to list root of photos bucket
  console.log('\nTest 2: Listing root of photos bucket...');
  const { data: rootFiles, error: rootError } = await supabase
    .storage
    .from('photos')
    .list('', {
      limit: 10,
      offset: 0
    });
  
  if (rootError) {
    console.error('Error listing root:', rootError);
  } else {
    console.log('Root contents:', rootFiles);
  }
  
  // Test 3: Try each specific folder
  const folders = ['family-rv-trip', 'venice-beach', 'longs-peak-co', 'diwali', 'family&friends'];
  
  for (const folder of folders) {
    console.log(`\nTest 3.${folders.indexOf(folder) + 1}: Checking folder "${folder}"...`);
    
    const { data: files, error: folderError } = await supabase
      .storage
      .from('photos')
      .list(folder, {
        limit: 5,
        offset: 0
      });
    
    if (folderError) {
      console.error(`Error accessing ${folder}:`, folderError);
    } else {
      console.log(`Found ${files?.length || 0} files in ${folder}:`, files);
      
      // If files found, generate and test URLs
      if (files && files.length > 0) {
        const firstFile = files[0];
        const { data: urlData } = supabase
          .storage
          .from('photos')
          .getPublicUrl(`${folder}/${firstFile.name}`);
        
        console.log(`Sample URL for ${firstFile.name}: ${urlData.publicUrl}`);
        
        // Test if URL is accessible
        try {
          const response = await fetch(urlData.publicUrl, { method: 'HEAD' });
          console.log(`URL test status: ${response.status} - ${response.ok ? 'Accessible' : 'Not accessible'}`);
        } catch (e) {
          console.error('URL test failed:', e);
        }
      }
    }
  }
  
  // Test 4: Try direct public URLs
  console.log('\n=== Test 4: Direct URL Construction ===');
  const baseUrl = 'https://qvryaynijbfizvsghwko.supabase.co/storage/v1/object/public/photos';
  
  for (const folder of folders) {
    // Try common image names
    const testImages = ['1.jpg', 'image1.jpg', 'photo1.jpg', 'IMG_0001.jpg'];
    
    for (const imageName of testImages) {
      const testUrl = `${baseUrl}/${folder}/${imageName}`;
      
      try {
        const response = await fetch(testUrl, { method: 'HEAD' });
        if (response.ok) {
          console.log(`✅ Found image: ${folder}/${imageName}`);
          break; // Found one, move to next folder
        }
      } catch (e) {
        // Silent fail, image doesn't exist
      }
    }
  }
  
  console.log('\n=== End of Supabase Tests ===');
}
