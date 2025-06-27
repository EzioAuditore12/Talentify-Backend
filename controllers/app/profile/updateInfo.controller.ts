import type { NextFunction, Request, Response } from "express";

//Prisma
import type { Prisma, PrismaClient } from "@/generated/prisma/index.js";
// Error Classes
import {
	DatabaseError,
	UnauthorizedError,
	ValidationError,
} from "@/utils/errors.js";
import getPrismaInstance from "@/utils/prisma-client.js";

export const UpdateUserProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { fullName, description, profileImage } = req.body;

		// Get uuid from authenticated user (set by auth middleware)
		const userUuid = req.user?.userId

		console.log("Authenticated user uuid:",userUuid);
		console.log("Email from body (ignored):", req.body.email);

		if (!userUuid) {
			throw new UnauthorizedError("User authentication required");
		}

		const prisma = getPrismaInstance() as PrismaClient;

		if (!prisma) {
			throw new DatabaseError("Unable to connect to database");
		}

		const existingUser = await prisma.user.findUnique({
			where: { uuid: userUuid },
		});

		if (!existingUser) {
			throw new UnauthorizedError("Given user not exits");
		}

		const updateData: Prisma.UserUpdateInput = {};

		if (fullName !== undefined) updateData.fullName = fullName;
		if (description !== undefined) updateData.description = description;
		if (profileImage !== undefined) updateData.profileImage = profileImage;

		// Mark profile as complete if fullName is provided
		if (fullName && !existingUser.isProfileInfoSet) {
			updateData.isProfileInfoSet = true;
		}

		const updatedUser = await prisma.user.update({
			where: { uuid: userUuid },
			data: updateData,
		});

		res.status(200).json({
			user: {
				uuid: updatedUser.uuid,
				email: updatedUser.email,
				username: updatedUser.username,
				fullName: updatedUser.fullName,
				description: updatedUser.description,
				profileImage: updatedUser.profileImage,
				isProfileInfoSet: updatedUser.isProfileInfoSet,
			},
			message: `Profile updated successfully for ${updatedUser.fullName || updatedUser.username}`,
		});
	} catch (error) {
		next(error);
	}
};
