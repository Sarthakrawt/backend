import { v2 as cloudinary } from 'cloudinary';
//nodejs fs
// file  read write remove from you local memory 
// we can use unlink to remove the file from the server 
import fs from "fs";
// fs is a file system 
 

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    // console.log(process.env.CLOUDINARY_API_KEY); 
    // console.log(process.env.CLOUDINARY_API_SECRET); 
    // console.log(process.env.CLOUDINARY_CLOUD_NAME); 
   
    const uploadOnCloudinary = async(localFilePath) => {
        try{
           if(!localFilePath) return null
           //upload the file on cloudinary 
           const response = await  cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto"
           })
           // file has been uploaded successfully
           console.log("file is uploaded on cloudinary", response.url)
          fs.unlinkSync(localFilePath);
           return response
        }catch(error){
            console.error("Error during file upload", error);
            if(localFilePath){
             fs.unlinkSync(localFilePath)
            }
     
          // this code remove the locally saved temporary file as the upload operation got failed
          return null;
        }
        
        
    }

export {uploadOnCloudinary};
    