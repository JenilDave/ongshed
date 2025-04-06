import express from "express";
import {
	createSessionHandler,
	forgotPasswordHandler,
	refreshAccessTokenHandler,
	resetPasswordHandler,
} from "../controllers/auth";
import validateResource from "../middleware/validate";
import {
	forgotPasswordSchema,
	resetPasswordSchema,
	createSessionSchema,
} from "../schema/auth.schema";
import deserializeUser from "../middleware/deserializeUser";

export default (router: express.Router) => {
	router.use("/api", deserializeUser);
	router.post(
		"/api/users/forgotpassword",
		validateResource(forgotPasswordSchema),
		forgotPasswordHandler
	);

	router.post(
		"/api/users/resetpassword",
		validateResource(resetPasswordSchema),
		resetPasswordHandler
	);
	router.post(
		"/create-session",
		validateResource(createSessionSchema),
		createSessionHandler
	);
	router.post("/refresh", refreshAccessTokenHandler);
};
