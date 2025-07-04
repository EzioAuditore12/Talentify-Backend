"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGigSchema = void 0;
var zod_1 = __importDefault(require("zod"));
exports.createGigSchema = zod_1.default
    .object({
    title: zod_1.default.string().max(120).nonempty(),
    description: zod_1.default.string().max(400).nonempty(),
    category: zod_1.default.string().nonempty(),
    price: zod_1.default.coerce.number(),
    revisions: zod_1.default.coerce.number(),
    time: zod_1.default.string(),
    shortDesc: zod_1.default.string(),
    features: zod_1.default.array(zod_1.default.string()),
})
    .strict();
//# sourceMappingURL=createGig.schema.js.map