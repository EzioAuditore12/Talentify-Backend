import { Router } from "express";

import { loginForm } from "@/controllers/auth/login";
import { registerForm } from "@/controllers/auth/register";

import { loginFormSchema } from "@/schemas/auth/login";
import { registerFormSchema } from "@/schemas/auth/register";

import { validateBody } from "@/middlewares/validation.middleware";

const authRoute = Router();

authRoute.post("/register", validateBody(registerFormSchema), registerForm);
authRoute.post("/login", validateBody(loginFormSchema), loginForm);

export default authRoute;
