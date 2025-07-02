"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaInstance = getPrismaInstance;
var prisma_1 = require("@/generated/prisma");
var errors_1 = require("@/utils/errors");
var prismaInstance = null;
function getPrismaInstance() {
    if (!prismaInstance) {
        try {
            prismaInstance = new prisma_1.PrismaClient();
        }
        catch (error) {
            throw new errors_1.DatabaseError("Failed to initialize database connection");
        }
    }
    if (!prismaInstance) {
        throw new errors_1.DatabaseError("Database connection error");
    }
    return prismaInstance;
}
//# sourceMappingURL=prisma-client.js.map