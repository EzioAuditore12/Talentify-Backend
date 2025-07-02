"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("tsconfig-paths/register");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app_1 = require("./app");
var PORT = process.env.PORT;
app_1.app.listen(PORT, function () {
    console.log("Server started on http://localhost:".concat(PORT));
});
//# sourceMappingURL=index.js.map