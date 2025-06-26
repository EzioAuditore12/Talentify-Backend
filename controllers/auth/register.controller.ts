import type { NextFunction, Request, Response } from "express";
import type { PrismaClient } from "@/generated/prisma/index.js";
import { generatePassword } from "@/utils/bycrypt.js";
import { ConflictError, DatabaseError } from "@/utils/errors.js";
import { createToken } from "@/utils/jwt-tokens.js";
import getPrismaInstance from "@/utils/prisma-client.js";

export const register = async (
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

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			throw new ConflictError("A user with this email already exists");
		}

		// Create new user
		const user = await prisma.user.create({
			data: {
				email,
				password: await generatePassword(password),
			},
		});

		// Generate JWT token
		const token = createToken({
			email: user.email,
			userId: user.id.toString(),
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
			.status(201)
			.json({
				user: {
					id: user.id,
					email: user.email,
					username: user.username,
					fullName: user.fullName,
					isProfileInfoSet: user.isProfileInfoSet,
					createdAt: user.createdAt,
				},
				message: "User registered successfully",
			});
	} catch (error) {
		next(error); // Pass error to centralized error handler
	}
};
