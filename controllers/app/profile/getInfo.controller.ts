import type { NextFunction, Request, Response } from "express";

//Primsa Client
import type { PrismaClient } from "@/generated/prisma/client.js";
//Error Class
import { DatabaseError, UnauthorizedError } from "@/utils/errors.js";
import getPrismaInstance from "@/utils/prisma-client.js";

export const GetUserInfo = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		// Get email from authenticated user (set by auth middleware)
		const email = req.user?.email;

		if (!email) {
			throw new UnauthorizedError("User authentication required");
		}

		const prisma = getPrismaInstance() as PrismaClient;

		if (!prisma) {
			throw new DatabaseError("Database connection error");
		}

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw new UnauthorizedError("User not found");
		}

		res.status(200).json({
			uuid: user.uuid,
			email: user.email,
			fullname: user.fullName,
			description: user.description,
			profileImage: user.profileImage,
			message: `Data retreival of ${user.fullName} is successful`,
		});
	} catch (error) {
		next(error);
	}
};
