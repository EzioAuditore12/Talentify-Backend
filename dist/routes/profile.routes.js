"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var profile_1 = require("@/controllers/app/profile");
var auth_middleware_1 = require("@/middlewares/auth.middleware");
var multer_middleware_1 = require("@/middlewares/multer.middleware");
var validation_middleware_1 = require("@/middlewares/validation.middleware");
var profile_2 = require("@/schemas/app/profile");
var express_1 = require("express");
var profileRoutes = (0, express_1.Router)();
// Get user Details
profileRoutes.get("/get-user-info", auth_middleware_1.authenticateToken, profile_1.getUserInfo);
//Update user details
profileRoutes.post("/update-user-profile", (0, validation_middleware_1.validateBody)(profile_2.updateProfileSchema), auth_middleware_1.authenticateToken, profile_1.updateUserProfile);
//Update User Profile
profileRoutes.post("/update-profile-photo", auth_middleware_1.authenticateToken, multer_middleware_1.upload.single("profilePhoto"), profile_1.updateUserProfilePhoto);
exports.default = profileRoutes;
//# sourceMappingURL=profile.routes.js.map