"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var login_1 = require("@/controllers/auth/login");
var register_1 = require("@/controllers/auth/register");
var login_2 = require("@/schemas/auth/login");
var register_2 = require("@/schemas/auth/register");
var validation_middleware_1 = require("@/middlewares/validation.middleware");
var authRoute = (0, express_1.Router)();
authRoute.post("/register", (0, validation_middleware_1.validateBody)(register_2.registerFormSchema), register_1.registerForm);
authRoute.post("/login", (0, validation_middleware_1.validateBody)(login_2.loginFormSchema), login_1.loginForm);
exports.default = authRoute;
//# sourceMappingURL=auth.route.js.map