"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerForm = void 0;
var bcrypt_1 = require("@/utils/bcrypt");
var errors_1 = require("@/utils/errors");
var jwt_1 = require("@/utils/jwt");
var prisma_client_1 = require("@/utils/prisma-client");
var registerForm = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, prisma, existingUser, user, _b, _c, token, error_1;
    var _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                prisma = (0, prisma_client_1.getPrismaInstance)();
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: email },
                    })];
            case 1:
                existingUser = _f.sent();
                if (existingUser) {
                    throw new errors_1.ConflictError("A user with this email already exists");
                }
                _c = (_b = prisma.user).create;
                _d = {};
                _e = {
                    email: email
                };
                return [4 /*yield*/, (0, bcrypt_1.generatePassword)(password)];
            case 2: return [4 /*yield*/, _c.apply(_b, [(_d.data = (_e.password = _f.sent(),
                        _e),
                        _d)])];
            case 3:
                user = _f.sent();
                token = (0, jwt_1.createToken)({
                    userId: user.uuid,
                });
                res
                    .cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                })
                    .status(201) //  successfullly create
                    .json({
                    user: {
                        uuid: user.uuid,
                        email: user.email,
                        username: user.username,
                        fullName: user.fullName,
                        profileImage: user.profileImage,
                        isProfileInfoSet: user.isProfileInfoSet,
                        createdAt: user.createdAt,
                    },
                    token: token,
                    message: "User registered successfully",
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _f.sent();
                next(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.registerForm = registerForm;
//# sourceMappingURL=registerForm.controller.js.map