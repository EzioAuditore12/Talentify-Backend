import { z } from "zod";

export const updateProfileSchema = z
	.object({
		fullName: z
			.string()
			.min(1, "Full name is required")
			.max(100, "Full name must be 100 characters or less")
			.optional(),
		username: z
			.string()
			.min(3, "Username must be at least 3 characters")
			.max(30, "Username must be 30 characters or less")
			.regex(
				/^[a-zA-Z0-9_]+$/,
				"Username can only contain letters, numbers, and underscores",
			)
			.trim()
			.optional(),
		description: z
			.string()
			.max(500, "Description must be 500 characters or less")
			.trim()
			.optional(),
	})
	.strict();

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
