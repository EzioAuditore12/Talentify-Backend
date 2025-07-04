import { ValidationError } from "@/utils/errors";
import { getPrismaInstance } from "@/utils/prisma-client";
import type { NextFunction, Request, Response } from "express";

export const getGigData = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userUUid = req.user?.userId;

		if (!userUUid) throw new ValidationError("User is not authenticated");

		const gigId = req.params.gigId;

		const prisma = getPrismaInstance();

		const gig = await prisma.gigs.findUnique({
			where: { id: Number.parseInt(gigId) },
		});

		res.status(200).json({ gig });
	} catch (error) {
		next(error);
	}
};
