import { argon2id, verify, hash } from "argon2";
import jwt from "jsonwebtoken";

const ARGON_CONFIG = {
	type: argon2id, // Use Argon2id variant
	memoryCost: 2 ** 16, // Adjust memory cost as needed
	timeCost: 4, // Adjust time cost as needed
	parallelism: 1, // Adjust parallelism as needed
};

const JWT_SECRET = "TOP_$3CR3T_AND_V3Ry_!M4orT@nt";

export const verifyPassword = (hashed_pass: string, pass: string) =>
	new Promise(async (resolve, reject) => {
		try {
			const valid = await verify(hashed_pass, pass);
			resolve(valid);
		} catch (e) {
			console.error(e);
			reject(e);
		}
	});

export const hashPassword = (rawPass: string) => hash(rawPass, ARGON_CONFIG);

export const generateJwt = (username: string) =>
	new Promise(async (resolve, reject) => {
		try {
			const token = await jwt.sign(
				{
					userId: username,
				},
				JWT_SECRET,
				{ expiresIn: "1m" }
			);
			resolve(token);
		} catch (e) {
			console.error(e);
			reject(e);
		}
	});

export const verifyJwt = (token: string) =>
	new Promise(async (resolve, reject) => {
		try {
			const isVerified = await jwt.verify(token, JWT_SECRET);
			resolve(isVerified);
		} catch (e) {
			console.error(e);
			reject(e);
		}
	});
