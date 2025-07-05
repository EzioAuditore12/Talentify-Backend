import { authenticateToken } from "@/middlewares/auth.middleware";
import { upload } from "@/middlewares/multer.middleware";
import { validateBody } from "@/middlewares/validation.middleware";
import { Router } from "express";

import {
	createGig,
	editGigData,
	getGigData,
	searchGigs,
	showCreatedGigs,
} from "@/controllers/app/gigs";
import { createGigSchema, editGigDataSchema } from "@/schemas/app/gigs";

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

// Search Gigs
gigsRoutes.get("/search-gigs", searchGigs);

export default gigsRoutes;
