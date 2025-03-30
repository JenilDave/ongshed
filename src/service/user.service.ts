import { UserModel, User } from "../db/users.db";

export function createUser(input: Partial<User>) {
	return UserModel.create(input);
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
