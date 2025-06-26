export class AppError extends Error {
	public statusCode: number;
	public isOperational: boolean;

	constructor(message: string, statusCode: number = 500) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

export class ValidationError extends AppError {
	constructor(message: string) {
		super(message, 400);
		this.name = "ValidationError";
	}
}

export class UnauthorizedError extends AppError {
	constructor(message: string = "Unauthorized") {
		super(message, 401);
		this.name = "UnauthorizedError";
	}
}

export class NotFoundError extends AppError {
	constructor(message: string = "Resource not found") {
		super(message, 404);
		this.name = "NotFoundError";
	}
}

export class ConflictError extends AppError {
	constructor(message: string) {
		super(message, 409);
		this.name = "ConflictError";
	}
}

export class DatabaseError extends AppError {
	constructor(message: string = "Database connection error") {
		super(message, 500);
		this.name = "DatabaseError";
	}
}
