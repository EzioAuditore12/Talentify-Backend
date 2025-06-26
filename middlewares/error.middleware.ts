import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/errors.js";

export const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	console.error("Error:", {
		message: error.message,
		stack: error.stack,
		url: req.url,
		method: req.method,
		timestamp: new Date().toISOString(),
	});

	// Check if response was already sent
	if (res.headersSent) {
		next(error);
		return;
	}

	// Handle custom AppError instances
	if (error instanceof AppError) {
		res.status(error.statusCode).json({
			error: error.name,
			message: error.message,
		});
		return;
	}

	// Handle other known errors
	if (error.name === "ValidationError") {
		res.status(400).json({
			error: "Validation Error",
			message: error.message,
		});
		return;
	}

	// Default error response
	res.status(500).json({
		error: "Internal Server Error",
		message:
			process.env.NODE_ENV === "development"
				? error.message
				: "Something went wrong",
	});
};
