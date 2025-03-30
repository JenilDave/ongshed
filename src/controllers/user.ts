import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import {
	createUser,
	findUserById,
	findUserByIDAndUpdate,
} from "../service/user.service";

export async function createUserHandler(
	req: Request<object, object, CreateUserInput>,
	res: Response
) {
	const body = req.body;

	try {
		await createUser(body);
		res.status(200).send("User successfully created");
		return;
	} catch (e: unknown) {
		res.status(409).send("Account already exists");
		console.error(e);
	}
}

export async function getUserHandler(req: Request, res: Response) {
	const user = await findUserById(req.params.id);
	res.status(200).send(user);
}

export async function updateUserHandler(req: Request, res: Response) {
	const updatedUser = await findUserByIDAndUpdate(req.body.id, req.body.data);
	res.status(200).send(updatedUser);
}
