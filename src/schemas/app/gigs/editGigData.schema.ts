import z from "zod";

export const editGigDataSchema = z
	.object({
		title: z.string().max(120),
		description: z.string().max(400),
		category: z.string(),
		price: z.coerce.number(),
		revisions: z.coerce.number(),
		time: z.coerce.number(),
		shortDesc: z.string(),
		features: z.array(z.string()),
	})
	.partial()
	.strict();

export type editGigSchemaInput = z.infer<typeof editGigDataSchema>;
