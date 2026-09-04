import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verify connection
cloudinary.api.ping((error, result) => {
  if (error) {
    console.error('Cloudinary connection failed:', error.message);
  } else {
    console.log('Cloudinary connected:', result);
  }
});

export default cloudinary;
