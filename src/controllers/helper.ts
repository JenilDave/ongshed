import { Request, Response } from "express";
import { CreateHelperInput } from "../schema/helper.schema";
import {
	createHelper,
	findHelperById,
	findHelperByIDAndUpdate,
} from "../service/helper.service";

export async function createHelperHandler(
	req: Request<object, object, CreateHelperInput>,
	res: Response
) {
	const body = req.body;

	try {
		await createHelper(body);
		res.status(200).send("Helper successfully created");
		return;
	} catch (e: unknown) {
		res.status(409).send("Account already exists");
		console.error(e);
	}
}

export async function getHelperHandler(req: Request, res: Response) {
	const helper = await findHelperById(req.params.id);
	res.status(200).send(helper);
}

export async function updateHelperHandler(req: Request, res: Response) {
	const updatedHelper = await findHelperByIDAndUpdate(
		req.body.id,
		req.body.data
	);
	res.status(200).send(updatedHelper);
}
