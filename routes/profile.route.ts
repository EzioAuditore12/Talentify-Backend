import {
	GetUserInfo,
	UpdateUserProfile,
} from "@/controllers/app/profile/index.js";
import { authenticateToken } from "@/middlewares/auth.middleware.js";
import { validateBody } from "@/middlewares/validation.middleware.js";
import { updateProfileSchema } from "@/schemas/app/profile/updateProfile.schema.js";
import { Router } from "express";

const profileRoutes = Router();

// Get user Details
profileRoutes.get("/get-user-info",authenticateToken, GetUserInfo);

//Update user details
profileRoutes.post(
	"/update-user-profile",
	validateBody(updateProfileSchema),
	authenticateToken,
	UpdateUserProfile,
);

export default profileRoutes;
