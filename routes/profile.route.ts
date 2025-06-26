import { Router } from "express";
import { GetUserInfo,UpdateUserProfile } from "@/controllers/app/profile/index.js";

const profileRoutes=Router()

//Profile Routes
profileRoutes.post("/get-user-info",GetUserInfo)
profileRoutes.post("/update-user-profile",UpdateUserProfile)

export default profileRoutes
