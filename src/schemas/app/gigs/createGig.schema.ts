import z from "zod";

export const createGigSchema = z
	.object({
		title: z.string().max(120).nonempty(),
		description: z.string().max(400).nonempty(),
		category: z.string().nonempty(),
		price: z.coerce.number(),
		revisions:  z.coerce.number(),
		time: z.string(),
		shortDesc: z.string(),
		features: z.array(z.string()),
	})
	.strict();

export type createGigSchemaInput = z.infer<typeof createGigSchema>;
