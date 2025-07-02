"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginFormSchema = void 0;
var zod_1 = require("zod");
exports.loginFormSchema = zod_1.z
    .object({
    email: zod_1.z
        .string()
        .email("Please provide a valid email address")
        .max(254, "Max length of characters allowed in email are 254"),
    password: zod_1.z
        .string()
        .min(1, "Password is required")
        .max(16, "Max password size allowed is 16"),
})
    .strict();
//# sourceMappingURL=loginForm.schema.js.map