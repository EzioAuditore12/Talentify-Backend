import { ValidationError } from "@/utils/errors";
import { getPrismaInstance } from "@/utils/prisma-client";
import type { NextFunction, Request, Response } from "express";

export const showCreatedGigs = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userUuid = req.user?.userId;

		if (!userUuid) throw new ValidationError("User id is required");

		const prisma = getPrismaInstance();

		const user = await prisma.user.findUnique({
			where: { uuid: userUuid },
			include: { gigs: true },
		});

		res.status(200).send({ gigs: user?.gigs });
	} catch (error) {
		next(error);
	}
};
