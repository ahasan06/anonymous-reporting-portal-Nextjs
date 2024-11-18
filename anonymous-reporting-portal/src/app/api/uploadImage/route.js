import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST handler for image upload
export async function POST(req) {
    try {
        // Get form data from the request
        const formData = await req.formData();
        const imageFiles = formData.getAll('image');

        // If no images are uploaded, return an error
        if (!imageFiles.length) {
            return NextResponse.json({ message: 'No images uploaded' }, { status: 400 });
        }

        const uploadResponses = [];

        // Process and upload each image
        for (const imageFile of imageFiles) {
            // Convert the image file to base64
            const buffer = await imageFile.arrayBuffer();
            const base64Image = Buffer.from(buffer).toString('base64');
            const dataURI = `data:${imageFile.type};base64,${base64Image}`;

            // Upload the image to Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(dataURI, {
                upload_preset: process.env.UPLOAD_PRESET,
                folder: 'anonymouse-images',
            });

            // Push the upload response (URL and ID) into the response array
            uploadResponses.push({
                url: uploadResponse.secure_url,
                id: uploadResponse.public_id,
            });
        }

        // Return the uploaded image details
        return NextResponse.json({ uploads: uploadResponses }, { status: 200 });

    } catch (error) {
        console.error('Image upload failed:', error);
        return NextResponse.json({ message: 'Image upload failed' }, { status: 500 });
    }
}
