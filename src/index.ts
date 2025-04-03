import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import morgan from "morgan";
import { setup_db_connection } from "./utils/db.utils";
import { LOG_LEVEL } from "./utils/constants.utils";

const app: express.Express = express();

app.use(
	cors({
		credentials: true,
	})
);
app.use(compression());
app.use(
	morgan(LOG_LEVEL, {
		skip: function (req, res) {
			return LOG_LEVEL !== "dev" && res.statusCode < 400;
		},
	})
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router());

// Catch-all route for 404 Not Found
app.use((req: Request, res: Response) => {
	res.status(404).json({ error: "Not Found" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
	console.error("Error occurred:", err);
	res.status(500).json({ error: "Internal Server Error" });
});

setup_db_connection().then(() => {
	app.listen(process.env.PORT, () => {
		console.log(`Server Started at port: ${process.env.PORT}`);
	});
});
