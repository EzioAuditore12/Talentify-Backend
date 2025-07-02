import { z } from "zod";

export const loginFormSchema = z
	.object({
		email: z
			.string()
			.email("Please provide a valid email address")
			.max(254, "Max length of characters allowed in email are 254"),
		password: z
			.string()
			.min(1, "Password is required")
			.max(16, "Max password size allowed is 16"),
	})
	.strict();

export type loginFormInput = z.infer<typeof loginFormSchema>;
