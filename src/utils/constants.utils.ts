import { config } from "dotenv";
config();

export const MONGO_DBNAME: string = process.env.MONGO_DBNAME || "helper-store";
export const MONGO_USERNAME: string = process.env.MONGO_USERNAME || "user";
export const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || "pass";
export const MONGO_API_DOMAIN: string = process.env.MONGO_API_DOMAIN || "";
export const MONGO_SERVER: string = process.env.MONGO_SERVER || "localhost";
export const SERVER_PORT: number = parseInt(process.env.PORT || "3000");
export const MONGO_PORT: number = parseInt(process.env.PORT || "27017");
export const LOG_LEVEL: string = process.env.LOG_LEVEL || "dev";
