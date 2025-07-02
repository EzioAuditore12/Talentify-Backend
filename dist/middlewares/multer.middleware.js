"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var profile_1 = require("@/schemas/app/profile");
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public");
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = "".concat(Date.now(), "-").concat(Math.round(Math.random() * 1e9));
        cb(null, "".concat(file.fieldname, "-").concat(uniqueSuffix, ".").concat(file.originalname.split(".").pop()));
    },
});
// File filter for profile photos
var profilePhotoFilter = function (req, file, cb) {
    // Check if the file type is allowed
    if (profile_1.profilePhotoFileValidation.allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid file type. Only ".concat(profile_1.profilePhotoFileValidation.allowedMimeTypes.join(", "), " are allowed.")));
    }
};
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: profile_1.profilePhotoFileValidation.maxFileSize, // 5MB
    },
    fileFilter: profilePhotoFilter,
});
//# sourceMappingURL=multer.middleware.js.map