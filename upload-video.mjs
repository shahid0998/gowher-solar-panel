import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const SUPABASE_URL = 'https://xqkaivdsuuzznwbleshc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxa2FpdmRzdXV6em53Ymxlc2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NzEwMzMsImV4cCI6MjA5NjE0NzAzM30.zr7ZM8eEny4oCLnnndRT4-rTaashkV2g0duOFZuNmb4';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const BUCKET_NAME = 'videos';
const VIDEO_FILE = resolve('./public/lv_0_20260605180225.mp4');
const VIDEO_NAME = 'lv_0_20260605180225.mp4';

async function uploadVideo() {
  console.log('🔧 Creating bucket if it does not exist...');
  const { error: bucketError } = await supabase.storage.createBucket(BUCKET_NAME, {
    public: true,
    fileSizeLimit: 500 * 1024 * 1024, // 500 MB
  });

  if (bucketError && !bucketError.message.includes('already exists')) {
    console.warn('⚠️ Bucket creation warning (might already exist):', bucketError.message);
  } else {
    console.log('✅ Bucket ready.');
  }

  console.log('📦 Reading video file...');
  const fileBuffer = readFileSync(VIDEO_FILE);
  console.log(`📁 File size: ${(fileBuffer.length / 1024 / 1024).toFixed(1)} MB`);

  console.log('⬆️  Uploading to Supabase Storage (this may take a few minutes)...');
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(VIDEO_NAME, fileBuffer, {
      contentType: 'video/mp4',
      upsert: true,
    });

  if (error) {
    console.error('❌ Upload failed:', error.message);
    process.exit(1);
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(VIDEO_NAME);

  console.log('\n✅ Upload complete!');
  console.log('🌐 Public video URL:');
  console.log(urlData.publicUrl);
}

uploadVideo();
