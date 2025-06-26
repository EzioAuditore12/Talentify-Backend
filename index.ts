import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
//routes
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();

// Fix CORS configuration
app.use(
	cors({
		origin: process.env.PUBLIC_URL || "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	}),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
