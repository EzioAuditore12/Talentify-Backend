import { Router } from "express";
import { login, register } from "../controllers/auth/index.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/signup.schema.js";

const authRoutes = Router();

// Authentication Routes
authRoutes.post("/register", validateBody(signUpSchema), register);
authRoutes.post("/login", validateBody(signInSchema), login);

export default authRoutes;
