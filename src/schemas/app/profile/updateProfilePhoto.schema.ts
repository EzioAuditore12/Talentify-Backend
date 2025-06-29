import { z } from "zod";

// Schema for profile photo update - mainly for documentation and type safety
// The actual file validation is handled by multer middleware
export const updateProfilePhotoSchema = z.object({
	// Since this is a multipart/form-data request with file upload,
	// we don't validate the file content here (multer handles that)
	// This schema can be extended if you want to add additional fields
	
	// Optional: You could add metadata fields like:
	// caption: z.string().optional(),
	// description: z.string().optional(),
});

// Type for the request body (excluding the file)
export type UpdateProfilePhotoRequest = z.infer<typeof updateProfilePhotoSchema>;

// If you want to add file validation rules, you can create a separate schema
export const profilePhotoFileValidation = {
	// These rules should match your multer configuration
	allowedMimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
	maxFileSize: 5 * 1024 * 1024, // 5MB
	fieldName: "profilePhoto"
};
