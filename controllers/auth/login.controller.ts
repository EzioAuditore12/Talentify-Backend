// Prisma Setup
import type { PrismaClient } from "@/generated/prisma/index.js";
//Bcrypt
import { comparePasswords } from "@/utils/bycrypt.js";
import { DatabaseError, UnauthorizedError } from "@/utils/errors.js";
import type { NextFunction, Request, Response } from "express";

// JWT
import { createToken } from "@/utils/jwt-tokens.js";
import getPrismaInstance from "@/utils/prisma-client.js";

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { email, password } = req.body; // Already validated by Zod middleware

		const prisma = getPrismaInstance() as PrismaClient;

		if (!prisma) {
			throw new DatabaseError("Database connection error");
		}

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
		next(error); // Pass error to centralized error handler
	}
};
