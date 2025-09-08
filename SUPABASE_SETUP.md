# Supabase Storage Setup Guide

## Issue Identified
The Supabase storage bucket is not properly configured. The diagnostics show:
- No buckets are visible to the public
- The 'photos' bucket either doesn't exist or isn't public
- No folders or files are accessible

## Setup Instructions

### 1. Create the Storage Bucket

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/qvryaynijbfizvsghwko
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Create a bucket named `photos`
5. **IMPORTANT**: Check the box for **Public bucket** when creating it

### 2. Upload Your Photos

Create the following folder structure in your `photos` bucket:
```
photos/
├── family-rv-trip/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ...
├── venice-beach/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ...
├── longs-peak-co/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ...
├── diwali/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ...
└── family&friends/
    ├── 1.jpg
    ├── 2.jpg
    └── ...
```

### 3. Set Bucket Policies (if needed)

If the bucket was created as private, you'll need to add a policy:

1. Go to **Storage** → **Policies**
2. Click on the `photos` bucket
3. Add a new policy with:
   - **Name**: `Public Access`
   - **Policy**: `SELECT` (for reading)
   - **Target roles**: `anon` (anonymous users)
   - **WITH CHECK expression**: `true`

Or run this SQL in the SQL Editor:
```sql
-- Make photos bucket public for reading
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT TO anon 
USING (bucket_id = 'photos');
```

### 4. Verify Setup

Run the test script to verify everything is working:
```bash
node test-supabase.mjs
```

You should see:
- ✅ Buckets listed
- ✅ Folders found with files
- ✅ Public URLs accessible

## Alternative: Use Demo Images

If you don't have photos ready, the app will automatically fall back to demo images from Unsplash.

## Troubleshooting

### "Bucket not found" error
- Make sure the bucket is named exactly `photos` (lowercase)
- Ensure it's set as a public bucket

### "No files found" in folders
- Check that files are uploaded to the exact folder names listed above
- File names should be like: `1.jpg`, `2.jpg`, etc.

### Images not displaying
- Verify the bucket is public
- Check browser console for any CORS errors
- Test a direct image URL in your browser

## Current Configuration

Your Supabase project:
- **URL**: https://qvryaynijbfizvsghwko.supabase.co
- **Expected bucket**: `photos`
- **Expected folders**: family-rv-trip, venice-beach, longs-peak-co, diwali, family&friends