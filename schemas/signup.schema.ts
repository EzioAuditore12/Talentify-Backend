import { z } from "zod";

export const signUpSchema = z.object({
	email: z
		.string()
		.email("Please provide a valid email address")
		.min(1, "Email is required"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Password must contain at least one uppercase letter, one lowercase letter, and one number",
		),
});

export const signInSchema = z.object({
	email: z.string().email("Please provide a valid email address"),
	password: z.string().min(1, "Password is required"),
});

// Export the TypeScript types
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
