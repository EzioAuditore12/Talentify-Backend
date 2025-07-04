"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gigs_1 = require("@/controllers/app/gigs");
var auth_middleware_1 = require("@/middlewares/auth.middleware");
var multer_middleware_1 = require("@/middlewares/multer.middleware");
var validation_middleware_1 = require("@/middlewares/validation.middleware");
var createGig_schema_1 = require("@/schemas/app/gigs/createGig.schema");
var express_1 = require("express");
var gigsRoutes = (0, express_1.Router)();
gigsRoutes.post("/create-gig", auth_middleware_1.authenticateToken, multer_middleware_1.upload.array("images"), (0, validation_middleware_1.validateBody)(createGig_schema_1.createGigSchema), gigs_1.createGig);
exports.default = gigsRoutes;
//# sourceMappingURL=gigs.route.js.map