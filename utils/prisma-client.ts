import { PrismaClient } from "../generated/prisma/index.js";

let prismaInstance: PrismaClient | null = null;

function getPrismaInstance() {
	if (!prismaInstance) {
		prismaInstance = new PrismaClient();
	}
	return prismaInstance;
}

export default getPrismaInstance;
