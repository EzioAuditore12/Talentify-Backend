"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormSchema = void 0;
var zod_1 = require("zod");
exports.registerFormSchema = zod_1.z
    .object({
    email: zod_1.z
        .string()
        .email("Please provide a valid email address")
        .min(1, "Email is required")
        .max(254, "Max length of characters allowed in email are 254"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number")
        .max(16, "Max password size allowed is 16"),
})
    .strict();
//# sourceMappingURL=registerForm.schema%20.js.map