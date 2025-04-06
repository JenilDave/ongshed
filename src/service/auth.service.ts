import { signJwt } from "../utils/jwt.utils";

export async function signRefreshToken({ userId }: { userId: string }) {
	const refreshToken = signJwt({ id: userId }, "refresh", {
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
