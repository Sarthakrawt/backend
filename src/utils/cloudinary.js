import { v2 as cloudinary } from 'cloudinary';
//nodejs fs
// file  read write remove from you local memory 
// we can use unlink to remove the file from the server 
 
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    