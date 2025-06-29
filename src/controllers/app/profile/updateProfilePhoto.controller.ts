import { unlinkSync } from "node:fs";
import { uploadOnCloudinary } from "@/utils/cloudinary";
import {
	DatabaseError,
	UnauthorizedError,
	ValidationError,
} from "@/utils/errors";
import { getPrismaInstance } from "@/utils/prisma-client";
import type { NextFunction, Request, Response } from "express";

export const updateUserProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const userUuid = req.user?.userId;

		if (!userUuid) {
			if (req.file) {
				unlinkSync(req.file.path);
			}
			throw new UnauthorizedError("User is not authenticated");
		}

		if (!req.file) {
			throw new ValidationError("File is required");
		}

		const prisma = getPrismaInstance();

		const existingUser = await prisma.user.findUnique({
			where: { uuid: userUuid },
		});

		if (!existingUser) {
			unlinkSync(req.file.path);
			throw new UnauthorizedError("User not found");
		}

		const cloudinaryResponse = await uploadOnCloudinary({
			localFilePath: req.file.path,
			resourceType: "image",
		});

		if (!cloudinaryResponse) {
			// Clean up local file if cloudinary upload failed
			try {
				unlinkSync(req.file.path);
			} catch (cleanupError) {
				console.error(
					"Error cleaning up local file after cloudinary failure:",
					cleanupError,
				);
			}
			throw new DatabaseError("Failed to upload the image");
		}

		const updatedUser = await prisma.user.update({
			where: { uuid: userUuid },
			data: {
				profileImage: cloudinaryResponse.secure_url,
			},
			select: {
				uuid: true,
				email: true,
				profileImage: true,
			},
		});

		res.status(200).json({
			data: {
				user: updatedUser,
			},
		});
	} catch (error) {
		// Clean up local file if it still exists and there was an error
		if (req.file?.path) {
			try {
				unlinkSync(req.file.path);
			} catch (cleanupError) {
				console.error(
					"Error cleaning up local file in error handler:",
					cleanupError,
				);
			}
		}
		next(error);
	}
};
