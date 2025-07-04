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
exports.createGig = void 0;
var node_fs_1 = require("node:fs");
var errors_1 = require("@/utils/errors");
var prisma_client_1 = require("@/utils/prisma-client");
var cloudinary_1 = require("@/utils/cloudinary");
var createGig = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userUUid, _a, title, description, category, features, price, revisions, time, shortDesc, imageUrls, _i, _b, file, cloudinaryResponse, _c, _d, remainingFile, error_1, _e, _f, fileToClean, prisma, error_2;
    var _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 8, , 9]);
                userUUid = (_g = req.user) === null || _g === void 0 ? void 0 : _g.userId;
                if (!userUUid)
                    throw new errors_1.UnauthorizedError("User details are not here");
                _a = req.body, title = _a.title, description = _a.description, category = _a.category, features = _a.features, price = _a.price, revisions = _a.revisions, time = _a.time, shortDesc = _a.shortDesc;
                imageUrls = [];
                if (!(req.files && Array.isArray(req.files))) return [3 /*break*/, 6];
                _i = 0, _b = req.files;
                _h.label = 1;
            case 1:
                if (!(_i < _b.length)) return [3 /*break*/, 6];
                file = _b[_i];
                _h.label = 2;
            case 2:
                _h.trys.push([2, 4, , 5]);
                return [4 /*yield*/, (0, cloudinary_1.uploadOnCloudinary)({
                        localFilePath: file.path,
                        resourceType: "image",
                    })];
            case 3:
                cloudinaryResponse = _h.sent();
                if (!cloudinaryResponse) {
                    // Clean up remaining files if one upload fails
                    for (_c = 0, _d = req.files; _c < _d.length; _c++) {
                        remainingFile = _d[_c];
                        try {
                            (0, node_fs_1.unlinkSync)(remainingFile.path);
                        }
                        catch (cleanupError) {
                            console.error("Error cleaning up file:", cleanupError);
                        }
                    }
                    throw new errors_1.DatabaseError("Failed to upload image to Cloudinary");
                }
                imageUrls.push(cloudinaryResponse.secure_url);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _h.sent();
                // Clean up all files if upload fails
                for (_e = 0, _f = req.files; _e < _f.length; _e++) {
                    fileToClean = _f[_e];
                    try {
                        (0, node_fs_1.unlinkSync)(fileToClean.path);
                    }
                    catch (cleanupError) {
                        console.error("Error cleaning up file:", cleanupError);
                    }
                }
                throw error_1;
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6:
                prisma = (0, prisma_client_1.getPrismaInstance)();
                return [4 /*yield*/, prisma.gigs.create({
                        data: {
                            title: title,
                            description: description,
                            deliveryTime: Number.parseInt(String(time), 10),
                            category: String(category),
                            features: features ? [String(features)] : undefined,
                            price: Number.parseInt(String(price), 10),
                            shortDesc: String(shortDesc),
                            revisions: Number.parseInt(String(revisions), 10),
                            createdBy: { connect: { uuid: userUUid } },
                            images: imageUrls,
                        },
                    })];
            case 7:
                _h.sent();
                res.status(201).json({
                    message: "Gig created successfully",
                });
                return [3 /*break*/, 9];
            case 8:
                error_2 = _h.sent();
                next(error_2);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.createGig = createGig;
//# sourceMappingURL=createGig.controller.js.map