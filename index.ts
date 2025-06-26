import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const server = app.listen(process.env.PORT, () => {
	console.log(`Server started on http://localhost:${process.env.PORT}`);
});
