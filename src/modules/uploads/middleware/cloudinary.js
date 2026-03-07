import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadFileToCloudinary = async (buffer, mimeType) => {
  try {
    if (!mimeType) {
      throw new Error("MIME type missing");
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/jfif",
      "application/pdf"
    ];

    if (!allowedTypes.includes(mimeType)) {
      throw new Error(`Unsupported file type: ${mimeType}`);
    }

    let uploadBuffer = buffer;
    let resourceType = "image";
    let format = "webp";

    // If image → compress
    if (mimeType.startsWith("image/")) {
      uploadBuffer = await sharp(buffer)
        .webp({ quality: 20 })
        .toBuffer();
    } else {
      // If PDF
      resourceType = "raw";
      format = "pdf";
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "HealthMate-Uploads",
          resource_type: resourceType,
          format,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(uploadBuffer);
    });

    return {
      fileUrl: result.secure_url,
      publicId: result.public_id,
    };

  } catch (error) {
    throw new Error("Cloudinary Upload Failed: " + error.message);
  }
};

export default uploadFileToCloudinary;