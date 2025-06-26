import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

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

// Add a test route to verify server is working
app.get("/", (req, res) => {
	res.json({ message: "Talentify Backend API is running!" });
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
	console.log(`Test endpoint: http://localhost:${PORT}/`);
	console.log(`Auth endpoints: http://localhost:${PORT}/api/auth/signup`);
});
