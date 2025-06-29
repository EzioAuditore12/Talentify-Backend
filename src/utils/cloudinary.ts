import { unlinkSync } from "node:fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface uploadOnCloudinaryProps {
	localFilePath: string;
	resourceType: "image" | "raw" | "video" | "auto";
}

const uploadOnCloudinary = async ({
	localFilePath,
	resourceType,
}: uploadOnCloudinaryProps) => {
	try {
		if (!localFilePath) {
			return null;
		}

		//upload file on cloudinary
		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: resourceType,
		});

		// file has been uploaded successfully
		console.log("File is uploaded on cloudinary", response.url);

		// Clean up local file after successful upload
		try {
			unlinkSync(localFilePath);
			console.log("Local file deleted successfully:", localFilePath);
		} catch (cleanupError) {
			console.error("Error cleaning up local file:", localFilePath, cleanupError);
			// Re-throw if it's a permissions issue that needs attention
			if (cleanupError instanceof Error && 'code' in cleanupError) {
				const nodeError = cleanupError as NodeJS.ErrnoException;
				if (nodeError.code === 'EACCES' || nodeError.code === 'EPERM') {
					console.error("Permission denied when trying to delete file. Check file permissions.");
				}
			}
		}

		return response;
	} catch (error) {
		// Clean up local file if upload failed
		try {
			unlinkSync(localFilePath);
			console.log("Local file deleted after upload failure:", localFilePath);
		} catch (cleanupError) {
			console.error("Error cleaning up local file after upload failure:", localFilePath, cleanupError);
		}
		console.error("Cloudinary upload error:", error);
		return null;
	}
};

export { uploadOnCloudinary };
