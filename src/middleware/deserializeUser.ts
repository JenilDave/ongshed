import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { User } from "../db/users.db";
const deserializeUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = (req.headers.authorization || "").replace(
		/^Bearer\s/,
		""
	);

	if (!accessToken) {
		res.sendStatus(401);
		return;
	}

	const decoded = verifyJwt<User>(accessToken, "access");

	if (!decoded) {
		res.sendStatus(401);
		return;
	}

	if (req.body?.id || req.params?.id || req.query?.id) {
		if ((req.body?.id || req.params?.id || req.query?.id) != decoded.id) {
			res.sendStatus(401);
			return;
		}
	}
	return next();
};

export default deserializeUser;
