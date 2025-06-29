import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());

app.use(
	cors({
		origin: !process.env.PUBLIC_URL,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	}),
);

//routes
import authRoute from "./routes/auth.route";
import profileRoutes from "./routes/profile.routes";

app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoutes);

export { app };
