import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: "dkxacfgus",
  api_key: "323491784482211",
  api_secret: "ny1BPjx0YCXLJwFxOZWHr0Ri8BA",
});

const uploadOnCloudinary = async (localFilePath) => {

  try {
    if (!localFilePath) return null;
    //upload in cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("FILE IS UPLOADED IN CLOUDINARY", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
