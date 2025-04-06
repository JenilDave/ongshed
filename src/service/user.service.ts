import { UserModel, User } from "../db/users.db";
import { verifyPassword } from "../utils/hash.utils";

export function createUser(input: Partial<User>) {
	return UserModel.create({ ...input, type: "user" });
}

export function findUserById(id: string) {
	return UserModel.findOne({ id });
}

export function findUserByEmail(email: string) {
	return UserModel.findOne({ email });
}

export function findUserByIDAndUpdate(id: string, update: Partial<User>) {
	return UserModel.findOneAndUpdate({ id }, update);
}

export function validatePassword(email: string, pass: string) {
	return UserModel.findOne({ email })
		.select("+password")
		.then(async (user) => {
			const res = await verifyPassword(user.password, pass);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, _id, ...userDetails } = user.toJSON();
			return res ? userDetails : null;
		})
		.catch(() => {
			return null;
		});
}
