import { generatePassword } from "@/utils/bcrypt";
import { ConflictError } from "@/utils/errors";
import { createToken } from "@/utils/jwt";
import { getPrismaInstance } from "@/utils/prisma-client.js";
import type { NextFunction, Request, Response } from "express";

import type { registerFormInput } from "@/schemas/auth/register";

export const registerForm = async (
	req: Request<Record<string, never>, Record<string, never>, registerFormInput>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { email, password } = req.body;

		const prisma = getPrismaInstance();

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			throw new ConflictError("A user with this email already exists");
		}

		const user = await prisma.user.create({
			data: {
				email,
				password: await generatePassword(password),
			},
		});

		const token = createToken({
			userId: user.uuid,
		});

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
					profileImage: user.profileImage,
					isProfileInfoSet: user.isProfileInfoSet,
					createdAt: user.createdAt,
				},
				token: token,
				message: "User registered successfully",
			});
	} catch (error) {
		next(error);
	}
};
