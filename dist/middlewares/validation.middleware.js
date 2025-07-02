"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
var zod_1 = require("zod");
var validateBody = function (schema) {
    return function (req, res, next) {
        try {
            var validatedData = schema.parse(req.body);
            req.body = validatedData;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                var errorMessages = error.errors.map(function (err) { return ({
                    field: err.path.join("."),
                    message: err.message,
                }); });
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
exports.validateBody = validateBody;
//# sourceMappingURL=validation.middleware.js.map