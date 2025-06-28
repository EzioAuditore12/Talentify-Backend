import { UnauthorizedError } from "@/utils/errors.js";
import { verifyToken } from "@/utils/jwt-tokens.js";
import type { NextFunction, Request, Response } from "express";

// Extend Express Request type to include user data
declare global {
	namespace Express {
		interface Request {
			user?: {
				userId: string;
			};
		}
	}
}

export const authenticateToken = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	try {
		// Get token from cookie or Authorization header
		//TODO:
		const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

		if (!token) {
			throw new UnauthorizedError("Access token is required");
		}

		// Verify the token
		const decoded = verifyToken(token);

		// Add user data to request object
		req.user = {
			userId: decoded.userId as string,
		};

		next();
	} catch (error) {
		if (
			error instanceof Error &&
			error.message === "Invalid or expired token"
		) {
			res.status(401).json({
				error: "Invalid or expired token",
				message: "Please login again",
			});
			return;
		}

		next(error); // Pass other errors to centralized error handler
	}
};

// Optional middleware for routes that don't require authentication but can use user data if available
export const optionalAuth = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	try {
		const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

		if (token) {
			const decoded = verifyToken(token);
			req.user = {
				userId: decoded.userId as string,
			};
		}

		next();
	} catch (error) {
		// For optional auth, we don't throw errors, just continue without user data
		next();
	}
};
