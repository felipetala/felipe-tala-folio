import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://qvryaynijbfizvsghwko.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2cnlheW5pamJmaXp2c2dod2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NjEwMzIsImV4cCI6MjA3MjQzNzAzMn0.lzcIVxRzJ2MFEXSjmQ7HI6k3IUhTBE5HNWxBkbNRXKI";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testConnection() {
  console.log('=== Testing Supabase Connection ===\n');
  
  // Test 1: List buckets
  console.log('1. Checking available buckets...');
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  
  if (bucketsError) {
    console.error('Error listing buckets:', bucketsError);
  } else {
    console.log('Available buckets:', buckets.map(b => b.name));
  }
  
  // Test 2: List root of photos bucket
  console.log('\n2. Listing root of photos bucket...');
  const { data: rootFiles, error: rootError } = await supabase.storage
    .from('photos')
    .list('', { limit: 10 });
  
  if (rootError) {
    console.error('Error listing root:', rootError);
  } else {
    console.log(`Found ${rootFiles?.length || 0} items in root`);
    if (rootFiles && rootFiles.length > 0) {
      console.log('Root items:', rootFiles.map(f => f.name));
    }
  }
  
  // Test 3: Check specific folders
  const folders = ['family-rv-trip', 'venice-beach', 'longs-peak-co', 'diwali', 'family&friends'];
  
  console.log('\n3. Checking specific folders...');
  for (const folder of folders) {
    const { data: files, error } = await supabase.storage
      .from('photos')
      .list(folder, { limit: 5 });
    
    if (error) {
      console.log(`   ❌ ${folder}: Error - ${error.message}`);
    } else if (!files || files.length === 0) {
      console.log(`   ⚠️  ${folder}: Empty or not found`);
    } else {
      console.log(`   ✅ ${folder}: Found ${files.length} files`);
      // Show first file as example
      if (files[0]) {
        const url = supabase.storage.from('photos').getPublicUrl(`${folder}/${files[0].name}`);
        console.log(`      Sample: ${files[0].name}`);
        console.log(`      URL: ${url.data.publicUrl}`);
      }
    }
  }
  
  // Test 4: Check bucket policies
  console.log('\n4. Testing public access...');
  const testUrl = `${SUPABASE_URL}/storage/v1/object/public/photos/test.jpg`;
  try {
    const response = await fetch(testUrl, { method: 'HEAD' });
    if (response.status === 404) {
      console.log('   ✅ Bucket is accessible (404 for non-existent file is expected)');
    } else if (response.status === 400 || response.status === 403) {
      console.log('   ❌ Bucket may not be public (got status ' + response.status + ')');
    } else {
      console.log('   ℹ️  Got status ' + response.status);
    }
  } catch (e) {
    console.error('   ❌ Error testing public access:', e.message);
  }
  
  console.log('\n=== End of Tests ===');
}

testConnection().catch(console.error);