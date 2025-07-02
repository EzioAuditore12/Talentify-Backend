"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errors_1 = require("@/utils/errors");
function hasStatusCode(error) {
    return (typeof error === "object" &&
        error !== null &&
        "statusCode" in error &&
        typeof error.statusCode === "number");
}
var errorHandler = function (error, req, res, next) {
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
    if (error instanceof errors_1.AppError || hasStatusCode(error)) {
        var statusCode = error instanceof errors_1.AppError
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
        message: process.env.NODE_ENV === "development"
            ? error.message
            : "Something went wrong",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map