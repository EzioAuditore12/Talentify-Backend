import { unlinkSync } from "node:fs";
import type { editGigSchemaInput } from "@/schemas/app/gigs/editGigData.schema";
import { deleteFromCloudinary, uploadOnCloudinary } from "@/utils/cloudinary";
import { DatabaseError, UnauthorizedError } from "@/utils/errors";
import { getPrismaInstance } from "@/utils/prisma-client";
import type { NextFunction, Request, Response } from "express";

export const editGigData = async (
	req: Request<
		Record<string, never>,
		Record<string, never>,
		editGigSchemaInput
	>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userUUid = req.user?.userId;

		if (!userUUid) throw new UnauthorizedError("User details are not here");

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

		const gigId = req.params.gigId;

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

		const oldData = await prisma.gigs.findUnique({
			where: { id: Number.parseInt(gigId) },
		});

		// Delete old images from Cloudinary if new images are uploaded
		if (oldData?.images && imageUrls.length > 0) {
			const deletionResult = await deleteFromCloudinary(oldData.images);

			if (deletionResult.failed.length > 0) {
				console.warn(
					`Failed to delete ${deletionResult.failed.length} images from Cloudinary`,
				);
			}

			console.log(
				`Successfully deleted ${deletionResult.successful.length} old images from Cloudinary`,
			);
		}

		await prisma.gigs.update({
			where: { id: Number.parseInt(gigId) },
			data: {
				...(title && { title }),
				...(description && { description }),
				...(time && { deliveryTime: Number.parseInt(String(time), 10) }),
				...(category && { category: String(category) }),
				...(features && {
					features: Array.isArray(features) ? features : [String(features)],
				}),
				...(price && { price: Number.parseInt(String(price), 10) }),
				...(shortDesc && { shortDesc }),
				...(revisions && { revisions: Number.parseInt(String(revisions), 10) }),
				...(imageUrls.length > 0 && { images: imageUrls }),
			},
		});

		res.status(201).json({
			message: "Successfully updated gig",
		});
	} catch (error) {
		next(error);
	}
};
