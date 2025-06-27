import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

//Error Handler
import { errorHandler } from "./middlewares/error.middleware.js";

//routes
import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.route.js";

dotenv.config();
const app = express();

// CORS config
app.use(
	cors({
		origin: [!process.env.PUBLIC_URL],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	}),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
