//Bcrypt
import { comparePasswords } from "@/utils/bycrypt.js";

//Error Class
import { UnauthorizedError } from "@/utils/errors.js";

import type { NextFunction, Request, Response } from "express";

//Schema
import type { SignInInput } from "@/schemas/auth/login.schema.js";

// JWT
import { createToken } from "@/utils/jwt-tokens.js";
import getPrismaInstance from "@/utils/prisma-client.js";

export const login = async (
	req: Request<Record<string, never>, Record<string, never>, SignInInput>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { email, password } = req.body;

		const prisma = getPrismaInstance();

		// Find user by email
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw new UnauthorizedError("User not found");
		}

		// Verify password
		const isPasswordValid = await comparePasswords(password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedError("Incorrect password");
		}

		// Generate JWT token
		const token = createToken({
			userId: user.uuid,
		});

		// Set cookie and send response
		res
			.cookie("jwt", token, {
				httpOnly: true,
				maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
			})
			.status(200)
			.json({
				user: {
					uuid: user.uuid,
					email: user.email,
					username: user.username,
					fullName: user.fullName,
					description: user.description,
					profileImage: user.profileImage,
					isProfileInfoSet: user.isProfileInfoSet,
					createdAt: user.createdAt,
				},
				message: "Login successful",
			});
	} catch (error) {
		next(error); // Pass error to centralized error handler
	}
};
