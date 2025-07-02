import { profilePhotoFileValidation } from "@/schemas/app/profile";
import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public");
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(
			null,
			`${file.fieldname}-${uniqueSuffix}.${file.originalname.split(".").pop()}`,
		);
	},
});

// File filter for profile photos
const profilePhotoFilter = (
	req: Express.Request,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback,
) => {
	// Check if the file type is allowed
	if (profilePhotoFileValidation.allowedMimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(
			new Error(
				`Invalid file type. Only ${profilePhotoFileValidation.allowedMimeTypes.join(", ")} are allowed.`,
			),
		);
	}
};

export const upload = multer({
	storage: storage,
	limits: {
		fileSize: profilePhotoFileValidation.maxFileSize, // 5MB
	},
	fileFilter: profilePhotoFilter,
});
