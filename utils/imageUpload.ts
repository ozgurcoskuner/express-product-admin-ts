import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";

export const uploadImageToCloudinary = async (
  file: Express.Multer.File
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (error || !result) {
          return reject(error);
        }

        resolve(result.secure_url);
      }
    );

    uploadStream.end(file.buffer);
  });
};
