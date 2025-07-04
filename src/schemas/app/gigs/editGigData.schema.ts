import z from "zod";

export const editGigDataSchema = z
	.object({
		title: z.string().max(120).nonempty(),
		description: z.string().max(400).nonempty(),
		category: z.string().nonempty(),
		price: z.coerce.number(),
		revisions: z.coerce.number(),
		time: z.coerce.number(),
		shortDesc: z.string(),
		features: z.array(z.string()),
	})
	.partial()
	.strict();

export type editGigSchemaInput = z.infer<typeof editGigDataSchema>;
