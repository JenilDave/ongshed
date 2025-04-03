import {
	getModelForClass,
	modelOptions,
	prop,
	Severity,
	pre,
} from "@typegoose/typegoose";
import { hashPassword } from "../utils/hash.utils";
import mongoose from "mongoose";

export const privateFields = [
	"password",
	"__v",
	"verificationCode",
	"passwordResetCode",
	"verified",
];

@pre<User>("save", async function () {
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
export class User {
	@prop({ required: true })
	firstName: string;

	@prop({ lowercase: true, required: true, unique: true })
	email: string;

	@prop({ required: true })
	lastName: string;

	@prop({ required: true, select: false })
	password: string;

	@prop({ lowercase: true, required: true, index: true })
	type: string;

	@prop({ required: true })
	phone_number: string;

	@prop()
	address: string;

	@prop()
	birth_date: string;

	@prop({ select: false })
	profile_img_path: string;

	@prop({ select: false })
	passwordResetCode: string | null;

	@prop({ select: false })
	verificationCode: string | null;

	@prop({ default: false, select: false })
	verified: boolean;
}

export const UserModel = mongoose.models.User || getModelForClass(User);
