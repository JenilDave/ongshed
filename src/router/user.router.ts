import {
	createUserSchema,
	getUserSchema,
	updateUserSchema,
} from "../schema/user.schema";
import express from "express";
import validateResource from "../middleware/validate";
import {
	createUserHandler,
	updateUserHandler,
	getUserHandler,
} from "../controllers/user";

export default (router: express.Router) => {
	router.post(
		"/users",
		validateResource(createUserSchema),
		createUserHandler
	);

	router.get(
		"/api/users",
		validateResource(getUserSchema),
		getUserHandler
	);
	router.put(
		"/api/users",
		validateResource(updateUserSchema),
		updateUserHandler
	);
};
