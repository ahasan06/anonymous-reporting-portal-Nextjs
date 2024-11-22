import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const formData = await req.formData();
        const imageFile = formData.get('image');

        // Convert imageFile to base64
        const buffer = await imageFile.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        const dataURI = `data:${imageFile.type};base64,${base64Image}`;

        const uploadResponse = await cloudinary.uploader.upload(dataURI, {
            upload_preset: process.env.UPLOAD_PRESET,
            folder: 'anonymous-images', 
        });

        if (!uploadResponse) {
            return NextResponse.json(
                { message: 'Fields are Fetch image!' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                url: uploadResponse.secure_url,
                id: uploadResponse.public_id,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Image upload failed:', error);
        return NextResponse.json(
            { message: 'Image upload failed' },
            { status: 500 }
        );
    }
}
