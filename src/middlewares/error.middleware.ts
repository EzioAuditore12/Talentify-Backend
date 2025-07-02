import { AppError } from "@/utils/errors";
import type { NextFunction, Request, Response } from "express";

// Type guard for errors with statusCode
interface ErrorWithStatusCode {
	statusCode: number;
	message: string;
	name: string;
}

function hasStatusCode(error: unknown): error is ErrorWithStatusCode {
	return (
		typeof error === "object" &&
		error !== null &&
		"statusCode" in error &&
		typeof (error as { statusCode: unknown }).statusCode === "number"
	);
}

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

	// Handle custom AppError instances and errors with statusCode
	if (error instanceof AppError || hasStatusCode(error)) {
		const statusCode =
			error instanceof AppError
				? error.statusCode
				: hasStatusCode(error)
					? error.statusCode
					: 500;
		res.status(statusCode).json({
			error: error.name || "Error",
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
