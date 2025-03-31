import express from "express";
import {
	forgotPasswordHandler,
	resetPasswordHandler,
} from "../controllers/auth";
import validateResource from "../middleware/validate";
import {
	forgotPasswordSchema,
	resetPasswordSchema,
} from "../schema/auth.schema";

export default (router: express.Router) => {
	router.post(
		"/api/users/forgotpassword",
		validateResource(forgotPasswordSchema),
		forgotPasswordHandler
	);

	router.post(
		"/api/users/resetpassword/:id/:passwordResetCode",
		validateResource(resetPasswordSchema),
		resetPasswordHandler
	);
};
