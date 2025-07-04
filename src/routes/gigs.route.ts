import { createGig } from "@/controllers/app/gigs";
import { authenticateToken } from "@/middlewares/auth.middleware";
import { validateBody } from "@/middlewares/validation.middleware";
import { upload } from "@/middlewares/multer.middleware";
import { Router } from "express"
import { createGigSchema } from "@/schemas/app/gigs/createGig.schema";

const gigsRoutes = Router();

gigsRoutes.post(
	"/create-gig",
	authenticateToken,
	upload.array("images"),
    validateBody(createGigSchema),
	createGig,
);

export default gigsRoutes;
