import type { NextFunction, Request, Response } from "express";
import type { PrismaClient } from "../../generated/prisma/index.js";
import type { SignInInput } from "../../schemas/signup.schema.js";
import { comparePasswords } from "../../utils/bycrypt.js";
import { createToken } from "../../utils/jwt-tokens.js";
import getPrismaInstance from "../../utils/prisma-client.js";

export const login = async (
	req: Request<Record<string, never>, Record<string, never>, SignInInput>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { email, password } = req.body; // Already validated by Zod middleware

		const prisma = getPrismaInstance() as PrismaClient;

		if (!prisma) {
			res.status(500).json({ error: "Database connection error" });
			return;
		}

		// Find user by email
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			res.status(401).json({
				error: "Invalid credentials",
				details: [{ field: "email", message: "User not found" }],
			});
			return;
		}

		// Verify password
		const isPasswordValid = await comparePasswords(password, user.password);

		if (!isPasswordValid) {
			res.status(401).json({
				error: "Invalid credentials",
				details: [{ field: "password", message: "Incorrect password" }],
			});
			return;
		}

		// Generate JWT token
		const token = createToken({
			email: user.email,
			userId: user.id.toString(),
			username: user.username,
			fullName: user.fullName,
			isProfileInfoSet: user.isProfileInfoSet,
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
					id: user.id,
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
		console.error("Login error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
