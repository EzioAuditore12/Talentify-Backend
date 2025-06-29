import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_KEY as string;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRATION_TIME?.replace(/"/g, "") ||
	"7d") as string;

if (!JWT_SECRET) {
	throw new Error("JWT_KEY is not defined in environment variables");
}

export function createToken(payload: Record<string, unknown>): string {
	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: JWT_EXPIRES_IN as "7d",
	});
}

export function verifyToken(token: string): Record<string, unknown> {
	try {
		return jwt.verify(token, JWT_SECRET) as Record<string, unknown>;
	} catch {
		throw new Error("Invalid or expired token");
	}
}
