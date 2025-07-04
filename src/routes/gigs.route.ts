import { createGig } from "@/controllers/app/gigs";
import { editGigData } from "@/controllers/app/gigs/editGigData.controller";
import { getGigData } from "@/controllers/app/gigs/getGigData.controller";
import { showCreatedGigs } from "@/controllers/app/gigs/showGig.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";
import { upload } from "@/middlewares/multer.middleware";
import { validateBody } from "@/middlewares/validation.middleware";
import { createGigSchema } from "@/schemas/app/gigs/createGig.schema";
import { editGigDataSchema } from "@/schemas/app/gigs/editGigData.schema";
import { Router } from "express";

const gigsRoutes = Router();

//Create Gig
gigsRoutes.post(
	"/create-gig",
	authenticateToken,
	upload.array("images"),
	validateBody(createGigSchema),
	createGig,
);

// Show all gigs
gigsRoutes.get("/show-gigs", authenticateToken, showCreatedGigs);

// Get particular gig data
gigsRoutes.get("/get-gig-data/:gigId", authenticateToken, getGigData);

//Edit a gig

gigsRoutes.post(
	"/update-gig/:gigId",
	authenticateToken,
	upload.array("images"),
	validateBody(editGigDataSchema),
	editGigData,
);

export default gigsRoutes;
