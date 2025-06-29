import { z } from "zod";

export const registerFormSchema = z
	.object({
		email: z
			.string()
			.email("Please provide a valid email address")
			.min(1, "Email is required")
			.max(254, "Max length of characters allowed in email are 254"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Password must contain at least one uppercase letter, one lowercase letter, and one number",
			)
			.max(16, "Max password size allowed is 16"),
	})
	.strict();

export type registerFormInput = z.infer<typeof registerFormSchema>;
