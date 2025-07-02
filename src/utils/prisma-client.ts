import { PrismaClient } from "@/generated/prisma";
import { DatabaseError } from "@/utils/errors";

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

export type { Prisma } from "@/generated/prisma";

export { getPrismaInstance };
