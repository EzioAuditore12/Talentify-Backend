import { Router } from "express";
import { login, register } from "../controllers/auth/index.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/signup.schema.js";

const authRoutes = Router();

// Test route
authRoutes.get("/test", (req, res) => {
	res.json({ message: "Auth routes working!" });
});

authRoutes.post("/signup", validateBody(signUpSchema), register);
authRoutes.post("/signin", validateBody(signInSchema), login);

export default authRoutes;
