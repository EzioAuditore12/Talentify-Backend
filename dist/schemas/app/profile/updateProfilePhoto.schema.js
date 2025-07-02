"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilePhotoFileValidation = exports.updateProfilePhotoSchema = void 0;
var zod_1 = require("zod");
// Schema for profile photo update - mainly for documentation and type safety
// The actual file validation is handled by multer middleware
exports.updateProfilePhotoSchema = zod_1.z.object({
// Since this is a multipart/form-data request with file upload,
// we don't validate the file content here (multer handles that)
// This schema can be extended if you want to add additional fields
// Optional: You could add metadata fields like:
// caption: z.string().optional(),
// description: z.string().optional(),
});
// If you want to add file validation rules, you can create a separate schema
exports.profilePhotoFileValidation = {
    // These rules should match your multer configuration
    allowedMimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    maxFileSize: 5 * 1024 * 1024, // 5MB
    fieldName: "profilePhoto",
};
//# sourceMappingURL=updateProfilePhoto.schema.js.map