import { createGig } from "@/controllers/app/gigs";
import { authenticateToken } from "@/middlewares/auth.middleware";
import { upload } from "@/middlewares/multer.middleware";
import { validateBody } from "@/middlewares/validation.middleware";
import { createGigSchema } from "@/schemas/app/gigs/createGig.schema";
import { Router } from "express";

const gigsRoutes = Router();

gigsRoutes.post(
	"/create-gig",
	authenticateToken,
	upload.array("images"),
	validateBody(createGigSchema),
	createGig,
);

export default gigsRoutes;
