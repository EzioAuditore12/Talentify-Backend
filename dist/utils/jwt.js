"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.verifyToken = verifyToken;
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var JWT_SECRET = process.env.JWT_KEY;
var JWT_EXPIRES_IN = (((_a = process.env.JWT_EXPIRATION_TIME) === null || _a === void 0 ? void 0 : _a.replace(/"/g, "")) ||
    "7d");
if (!JWT_SECRET) {
    throw new Error("JWT_KEY is not defined in environment variables");
}
function createToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
}
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (_a) {
        throw new Error("Invalid or expired token");
    }
}
//# sourceMappingURL=jwt.js.map