<<<<<<< HEAD
import "tsconfig-paths/register";
=======
>>>>>>> debb65b8a271cfe7e295607641e88785ff9c65de
import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
