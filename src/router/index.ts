import express from "express";
import user from "./user.router";
import helper from "./helper.router";
import auth from "./auth.router";

const router = express.Router();

export default (): express.Router => {
	auth(router);
	user(router);
	helper(router);
	return router;
};
