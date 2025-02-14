import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY__NAME,
  api_key: process.env.CLOUDINARY__KEY,
  api_secret: process.env.CLOUDINARY__SECRET,
  secure: true,
});

export default cloudinary;
