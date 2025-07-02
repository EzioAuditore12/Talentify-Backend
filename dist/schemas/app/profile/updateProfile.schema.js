"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
var zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z
    .object({
    fullName: zod_1.z
        .string()
        .min(1, "Full name is required")
        .max(100, "Full name must be 100 characters or less")
        .optional(),
    username: zod_1.z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be 30 characters or less")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
        .trim()
        .optional(),
    description: zod_1.z
        .string()
        .max(500, "Description must be 500 characters or less")
        .trim()
        .optional(),
})
    .strict();
//# sourceMappingURL=updateProfile.schema.js.map