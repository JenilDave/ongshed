import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
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
    
	const decoded = verifyJwt(accessToken, "access");

	if (!decoded) {
		res.sendStatus(401);
		return;
	}

	return next();
};

export default deserializeUser;
