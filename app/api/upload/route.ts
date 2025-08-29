import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
  }

  try {
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data;

    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'products',
    });

    return NextResponse.json({ success: true, url: result.secure_url }, { status: 200 });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
