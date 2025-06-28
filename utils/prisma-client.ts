import { PrismaClient } from "@/generated/prisma/index.js";
import { DatabaseError } from "@/utils/errors.js";

let prismaInstance: PrismaClient | null = null;

function getPrismaInstance(): PrismaClient {
	if (!prismaInstance) {
		try {
			prismaInstance = new PrismaClient();
		} catch (error) {
			throw new DatabaseError("Failed to initialize database connection");
		}
	}

	if (!prismaInstance) {
		throw new DatabaseError("Database connection error");
	}

	return prismaInstance;
}

export default getPrismaInstance;
