"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authenticateToken = void 0;
var errors_1 = require("@/utils/errors");
var jwt_1 = require("@/utils/jwt");
var authenticateToken = function (req, res, next) {
    var _a, _b;
    try {
        // Get token from cookie or Authorization header
        //TODO:
        var token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt) || ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1]);
        if (!token) {
            throw new errors_1.UnauthorizedError("Access token is required");
        }
        // Verify the token
        var decoded = (0, jwt_1.verifyToken)(token);
        // Add user data to request object
        req.user = {
            userId: decoded.userId,
        };
        next();
    }
    catch (error) {
        if (error instanceof Error &&
            error.message === "Invalid or expired token") {
            res.status(401).json({
                error: "Invalid or expired token",
                message: "Please login again",
            });
            return;
        }
        next(error); // Pass other errors to centralized error handler
    }
};
exports.authenticateToken = authenticateToken;
// Optional middleware for routes that don't require authentication but can use user data if available
var optionalAuth = function (req, res, next) {
    var _a, _b;
    try {
        var token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt) || ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1]);
        if (token) {
            var decoded = (0, jwt_1.verifyToken)(token);
            req.user = {
                userId: decoded.userId,
            };
        }
        next();
    }
    catch (error) {
        // For optional auth, we don't throw errors, just continue without user data
        next();
    }
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth.middleware.js.map