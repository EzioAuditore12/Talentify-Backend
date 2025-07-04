import { unlinkSync } from "node:fs";
import type { createGigSchemaInput } from "@/schemas/app/gigs/createGig.schema";
import { uploadOnCloudinary } from "@/utils/cloudinary";
import { DatabaseError, UnauthorizedError } from "@/utils/errors";
import { getPrismaInstance } from "@/utils/prisma-client";
import type { NextFunction, Request, Response } from "express";

export const createGig = async (
	req: Request<
		Record<string, never>,
		Record<string, never>,
		createGigSchemaInput
	>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userUUid = req.user?.userId;

		if (!userUUid) throw new UnauthorizedError("User details are not here");

		// Use req.body instead of req.query for POST data
		const {
			title,
			description,
			category,
			features,
			price,
			revisions,
			time,
			shortDesc,
		} = req.body;

		const imageUrls: string[] = [];
		if (req.files && Array.isArray(req.files)) {
			// Upload each file to Cloudinary
			for (const file of req.files) {
				try {
					const cloudinaryResponse = await uploadOnCloudinary({
						localFilePath: file.path,
						resourceType: "image",
					});

					if (!cloudinaryResponse) {
						// Clean up remaining files if one upload fails
						for (const remainingFile of req.files) {
							try {
								unlinkSync(remainingFile.path);
							} catch (cleanupError) {
								console.error("Error cleaning up file:", cleanupError);
							}
						}
						throw new DatabaseError("Failed to upload image to Cloudinary");
					}

					imageUrls.push(cloudinaryResponse.secure_url);
				} catch (error) {
					// Clean up all files if upload fails
					for (const fileToClean of req.files) {
						try {
							unlinkSync(fileToClean.path);
						} catch (cleanupError) {
							console.error("Error cleaning up file:", cleanupError);
						}
					}
					throw error;
				}
			}
		}

		const prisma = getPrismaInstance();

		await prisma.gigs.create({
			data: {
				title: title,
				description: description,
				deliveryTime: Number.parseInt(String(time), 10),
				category: String(category),
				features: features ? [String(features)] : undefined,
				price: Number.parseInt(String(price), 10),
				shortDesc: String(shortDesc),
				revisions: Number.parseInt(String(revisions), 10),
				createdBy: { connect: { uuid: userUUid } },
				images: imageUrls,
			},
		});

		res.status(201).json({
			message: "Gig created successfully",
		});
	} catch (error) {
		next(error);
	}
};
