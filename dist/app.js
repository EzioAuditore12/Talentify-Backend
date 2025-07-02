"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.PUBLIC_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
//routes
var auth_route_1 = __importDefault(require("./routes/auth.route"));
var gigs_route_1 = __importDefault(require("./routes/gigs.route"));
var profile_routes_1 = __importDefault(require("./routes/profile.routes"));
app.use("/api/auth", auth_route_1.default);
app.use("/api/profile", profile_routes_1.default);
app.use("/api/gigs", gigs_route_1.default);
// Error handling middleware
var error_middleware_1 = require("./middlewares/error.middleware");
app.use(error_middleware_1.errorHandler);
//# sourceMappingURL=app.js.map