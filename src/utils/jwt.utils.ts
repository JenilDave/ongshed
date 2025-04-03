import jwt from "jsonwebtoken";
import { logger } from "./logger.utils";
import { readFileSync } from "fs";
import {
	ACCESS_TOKEN_PRIVATE_KEY_FILE,
	ACCESS_TOKEN_PUBLIC_KEY_FILE,
	REFRESH_TOKEN_PRIVATE_KEY_FILE,
	REFRESH_TOKEN_PUBLIC_KEY_FILE,
} from "./constants.utils";

export function signJwt(
	object: object,
	key: "refresh" | "access",
	options?: jwt.SignOptions | undefined
) {
	try {
		const privateKey = readFileSync(
			key === "access"
				? ACCESS_TOKEN_PRIVATE_KEY_FILE
				: REFRESH_TOKEN_PRIVATE_KEY_FILE
		);
		return jwt.sign(object, privateKey, {
			...(options && options),
			algorithm: "RS256",
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
}

export function verifyJwt<T>(
	token: string,
	key: "refresh" | "access"
): T | null {
	try {
		const cert = readFileSync(
			key === "access"
				? ACCESS_TOKEN_PUBLIC_KEY_FILE
				: REFRESH_TOKEN_PUBLIC_KEY_FILE
		);
		const decoded = jwt.verify(token, cert, {
			algorithms: ["RS256"],
		}) as T;
		return decoded;
	} catch (e: unknown) {
		logger.error(e);
		return null;
	}
}
