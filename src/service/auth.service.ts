import { DocumentType } from "@typegoose/typegoose";
import { User } from "../db/users.db";
import { signJwt } from "../utils/jwt.utils";
import { findUserById } from "./user.service";

export async function signRefreshToken({ userId }: { userId: string }) {
	const user = await findUserById(userId);
	const refreshToken = signJwt(user.toJSON(), "refresh", {
		expiresIn: "1h",
	});

	return refreshToken;
}

export function signAccessToken(user: DocumentType<User>) {
	const accessToken = signJwt(user.toJSON(), "access", {
		expiresIn: "15m",
	});

	return accessToken;
}