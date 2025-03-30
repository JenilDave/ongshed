import { UserModel, User } from "../db/users.db";

export function createHelper(input: Partial<User>) {
	return UserModel.create({ ...input, type: "helper" });
}

export function findHelperById(id: string) {
	return UserModel.findById(id);
}

export function findHelperByEmail(email: string) {
	return UserModel.findOne({ email });
}

export function findHelperByIDAndUpdate(id: string, update: Partial<User>) {
	return UserModel.findByIdAndUpdate(id, update);
}
