import { getUserInfo, updateUserProfile } from "@/controllers/app/profile";
import { authenticateToken } from "@/middlewares/auth.middleware";
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

export default profileRoutes;
