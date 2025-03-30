import { HelperModel, Helper } from "../db/helpers.db";

export function createHelper(input: Partial<Helper>) {
	return HelperModel.create(input);
}

export function findHelperById(id: string) {
	return HelperModel.findById(id);
}

export function findHelperByEmail(email: string) {
	return HelperModel.findOne({ email });
}

export function findHelperByIDAndUpdate(id: string, update: Partial<Helper>) {
	return HelperModel.findByIdAndUpdate(id, update);
}
