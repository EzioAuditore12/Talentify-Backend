import { generatePassword } from "@/utils/bycrypt.js";
import { ConflictError, DatabaseError } from "@/utils/errors.js";
import { createToken } from "@/utils/jwt-tokens.js";
import getPrismaInstance from "@/utils/prisma-client.js";
import type { NextFunction, Request, Response } from "express";

import type { SignUpInput } from "@/schemas/auth/register.schema.js";

export const register = async (
	req: Request<Record<string,never>,Record<string,never>,SignUpInput>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { email, password } = req.body; // Already validated by Zod middleware

		const prisma = getPrismaInstance();

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
			.status(201) //  successfullly create
			.json({
				user: {
					uuid: user.uuid,
					email: user.email,
					username: user.username,
					fullName: user.fullName,
					isProfileInfoSet: user.isProfileInfoSet,
					createdAt: user.createdAt,
				},
				message: "User registered successfully",
			});
	} catch (error) {
		next(error);
	}
};
