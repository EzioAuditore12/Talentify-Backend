import {
	getUserInfo,
	updateUserProfile,
	updateUserProfilePhoto,
} from "@/controllers/app/profile";
import { authenticateToken } from "@/middlewares/auth.middleware";
import { upload } from "@/middlewares/multer.middleware";
import { validateBody } from "@/middlewares/validation.middleware";
import { updateProfileSchema } from "@/schemas/app/profile";
import { Router } from "express";

const profileRoutes = Router();

// Get user Details
profileRoutes.get("/get-user-info", authenticateToken, getUserInfo);

//Update user details
profileRoutes.post(
	"/update-user-profile",
	validateBody(updateProfileSchema),
	authenticateToken,
	updateUserProfile,
);

//Update User Profile
profileRoutes.post(
	"/update-profile-photo",
	authenticateToken,
	upload.single("profilePhoto"),
	updateUserProfilePhoto,
);

export default profileRoutes;
