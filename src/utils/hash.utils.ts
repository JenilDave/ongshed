import { argon2id, verify, hash } from "argon2";
import { logger } from "./logger.utils";

const ARGON_CONFIG = {
	type: argon2id, // Use Argon2id variant
	memoryCost: 2 ** 16, // Adjust memory cost as needed
	timeCost: 4, // Adjust time cost as needed
	parallelism: 1, // Adjust parallelism as needed
};

export const verifyPassword = (hashed_pass: string, pass: string) =>
	new Promise(async (resolve, reject) => {
		try {
			const valid = await verify(hashed_pass, pass);
			resolve(valid);
		} catch (e) {
			logger.error(e);
			reject(e);
		}
	});

export const hashPassword = (rawPass: string) => hash(rawPass, ARGON_CONFIG);
