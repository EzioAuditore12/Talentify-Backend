import type { NextFunction, Request, Response } from "express";

// Error Classes
import { UnauthorizedError } from "@/utils/errors";
import { type Prisma, getPrismaInstance } from "@/utils/prisma-client";

import type { updateProfileInput } from "@/schemas/app/profile";

export const updateUserProfile = async (
	req: Request<
		Record<string, never>,
		Record<string, never>,
		updateProfileInput
	>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { fullName, username, description } = req.body;

		const userUuid = req.user?.userId;

		if (!userUuid) {
			throw new UnauthorizedError("User authentication required");
		}

		const prisma = getPrismaInstance();

		const existingUser = await prisma.user.findUnique({
			where: { uuid: userUuid },
		});

		if (!existingUser) {
			throw new UnauthorizedError("Given user not exits");
		}

		const updateData: Prisma.UserUpdateInput = {};

		if (fullName !== undefined) updateData.fullName = fullName;
		if (description !== undefined) updateData.description = description;
		if (username !== undefined) updateData.username = username;

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
