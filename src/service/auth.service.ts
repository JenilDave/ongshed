import { signJwt } from "../utils/jwt.utils";
import { findUserById } from "./user.service";

export async function signRefreshToken({ userId }: { userId: string }) {
	const user = await findUserById(userId);
	const refreshToken = signJwt(user, "refresh", {
		expiresIn: "1h",
	});

	return refreshToken;
}

export function signAccessToken(user: object) {
	const accessToken = signJwt(user, "access", {
		expiresIn: "15m",
	});

	return accessToken;
}