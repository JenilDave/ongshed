import {
	getModelForClass,
	modelOptions,
	prop,
	Severity,
	pre,
	DocumentType,
} from "@typegoose/typegoose";
import { verifyPassword, hashPassword } from "../utils/hash.utils";
import mongoose from "mongoose";

export const privateFields = [
	"password",
	"__v",
	"verificationCode",
	"passwordResetCode",
	"verified",
];

@pre<Helper>("save", async function () {
	if (!this.isModified("password")) {
		return;
	}

	const hash = await hashPassword(this.password);

	this.password = hash;

	return;
})
@modelOptions({
	schemaOptions: {
		timestamps: true,
	},
	options: {
		allowMixed: Severity.ALLOW,
	},
})
export class Helper {
	@prop({ required: true })
	firstName: string;

	@prop({ lowercase: true, required: true, unique: true })
	email: string;

	@prop({ required: true })
	lastName: string;

	@prop({ required: true })
	password: string;

	@prop({ default: false })
	verified: boolean;

	async validatePassword(
		this: DocumentType<Helper>,
		candidatePassword: string
	) {
		try {
			return await verifyPassword(this.password, candidatePassword);
		} catch (e) {
			console.error(e, "Could not validate password");
			return false;
		}
	}
}

export const HelperModel = mongoose.models.Helper || getModelForClass(Helper);
