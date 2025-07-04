import type { NextFunction, Request, Response } from "express";

//Error Class
import { UnauthorizedError } from "@/utils/errors";
import { getPrismaInstance } from "@/utils/prisma-client";

export const getUserInfo = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		// Get email from authenticated user (set by auth middleware)
		const userUuid = req.user?.userId;

		if (!userUuid) {
			throw new UnauthorizedError("User authentication required");
		}

		const prisma = getPrismaInstance();

		const user = await prisma.user.findUnique({
			where: { uuid: userUuid },
		});

		if (!user) {
			throw new UnauthorizedError("User not found");
		}

		res.status(200).json({
			uuid: user.uuid,
			email: user.email,
			fullName: user.fullName,
			description: user.description,
			profileImage: user.profileImage,
			message: `Data retreival of ${user.fullName} is successful`,
		});

		console.log("Successfuly gotten user profile info ", user.email);
	} catch (error) {
		next(error);
	}
};
