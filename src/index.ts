import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import morgan from "morgan";
import { setup_db_connection } from "./utils/db.utils";
import { LOG_LEVEL } from "./utils/constants.utils";

const app = express();

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

setup_db_connection().then(() => {
	app.listen(process.env.PORT, () => {
		console.log(`Server Started at port: ${process.env.PORT}`);
	});
});
