import { UserModel, User } from "../db/users.db";
import { verifyPassword } from "../utils/hash.utils";

export function createUser(input: Partial<User>) {
	return UserModel.create({ ...input, type: "user" });
}

export function findUserById(id: string) {
	return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
	return UserModel.findOne({ email });
}

export function findUserByIDAndUpdate(id: string, update: Partial<User>) {
	return UserModel.findByIdAndUpdate(id, update);
}

export function validatePassword(email: string, password: string) {
	return UserModel.findOne({ email })
		.select("+password")
		.then(async (user) => {
			const res = await verifyPassword(user.password, password);
			return res ? user : null;
		})
		.catch(() => {
			return null;
		});
}
