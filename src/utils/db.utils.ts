import mongoose from "mongoose";
import {
	MONGO_API_DOMAIN,
	MONGO_DBNAME,
	MONGO_PASSWORD,
	MONGO_SERVER,
	MONGO_USERNAME,
} from "./constants.utils";
import { logger } from "./logger.utils";

const mongo_connection_url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_SERVER}.${MONGO_API_DOMAIN}/${MONGO_DBNAME}`;

const connect_mongodb = () => {
	return mongoose.connect(mongo_connection_url);
};

export const setup_db_connection = () =>
	new Promise(async (resolve, reject) => {
		connect_mongodb()
			.then(() => {
				resolve(true);
			})
			.catch((e) => {
				logger.error("Cannot Connect to MongoDB");
				logger.error(e);
				reject(e);
			});
	});
