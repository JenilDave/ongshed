import {
	createHelperSchema,
	getHelperSchema,
	updateHelperSchema,
} from "../schema/helper.schema";
import express from "express";
import validateResource from "../middleware/validate";
import {
	createHelperHandler,
	updateHelperHandler,
	getHelperHandler,
} from "../controllers/helper";

export default (router: express.Router) => {
	router.post(
		"/helpers",
		validateResource(createHelperSchema),
		createHelperHandler
	);

	router.get(
		"/api/helpers/:id",
		validateResource(getHelperSchema),
		getHelperHandler
	);
	router.put(
		"/api/helpers",
		validateResource(updateHelperSchema),
		updateHelperHandler
	);
};
