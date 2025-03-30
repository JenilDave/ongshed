import express from "express";
import user from "./user.router";
import helper from "./helper.router";

const router = express.Router();

export default (): express.Router => {
	user(router);
	helper(router);
	return router;
};
