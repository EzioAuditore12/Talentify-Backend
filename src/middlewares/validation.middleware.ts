import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";

export const validateBody = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                }));

                res.status(400).json({
                    error: "Validation failed",
                    message: "Please check the following fields and try again",
                    details: errorMessages,
                });
                return;
            }

            res.status(500).json({
                error: "Internal server error",
                message: "Something went wrong while processing your request",
            });
        }
    };
};
