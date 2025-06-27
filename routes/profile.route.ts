import {
	GetUserInfo,
	UpdateUserProfile,
} from "@/controllers/app/profile/index.js";
import { authenticateToken } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

const profileRoutes = Router();

//Profile Routes
profileRoutes.post("/get-user-info", authenticateToken, GetUserInfo);
profileRoutes.post(
	"/update-user-profile",
	authenticateToken,
	UpdateUserProfile,
);

export default profileRoutes;
