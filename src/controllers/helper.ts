import { Request, Response } from "express";
import { CreateHelperInput } from "../schema/helper.schema";
import {
	createHelper,
	findHelperById,
	findHelperByIDAndUpdate,
} from "../service/helper.service";
import { logger } from "../utils/logger.utils";

export async function createHelperHandler(
	req: Request<object, object, CreateHelperInput>,
	res: Response
) {
	const body = req.body;

	try {
		await createHelper(body);
		res.status(200).send("Helper successfully created");
	} catch (e: unknown) {
		logger.error(e);
		res.sendStatus(409);
	}
}

export async function getHelperHandler(req: Request, res: Response) {
	const helper = await findHelperById(req.params.id);
	if (!helper) {
		res.sendStatus(404);
		return;
	}
	res.status(200).send(helper);
}

export async function updateHelperHandler(req: Request, res: Response) {
	const updatedHelper = await findHelperByIDAndUpdate(
		req.body.id,
		req.body.data
	);
	if (!updatedHelper) {
		res.sendStatus(404);
		return;
	}
	res.status(200).send(updatedHelper);
}
