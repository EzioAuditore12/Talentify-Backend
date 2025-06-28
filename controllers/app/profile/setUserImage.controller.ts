import type { NextFunction, Request, Response } from "express";

import { PrismaClient } from "@/generated/prisma/index.js";

export const setProfilePhoto = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { email } = req.body;
};
