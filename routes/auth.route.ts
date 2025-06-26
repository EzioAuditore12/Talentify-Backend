import { Router } from "express";
import { login, register } from "@/controllers/auth/index.js";
import { validateBody } from "@/middlewares/validation.middleware.js";
import { loginSchema,registerSchema } from "@/schemas/auth/index.js";

const authRoutes = Router();

// Authentication Routes
authRoutes.post("/register", validateBody(registerSchema), register);
authRoutes.post("/login", validateBody(loginSchema), login);

export default authRoutes;
