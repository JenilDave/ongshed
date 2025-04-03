import { object, string, TypeOf } from "zod";
import { ObjectIdSchema } from "./common.schema";

export const getHelperSchema = object({
	params: object({
		id: string(),
	}),
});

export const createHelperSchema = object({
	body: object({
		firstName: string({
			required_error: "First name is required",
		}),
		lastName: string({
			required_error: "Last name is required",
		}),
		password: string({
			required_error: "Password is required",
		}).min(6, "Password is too short - should be min 6 chars"),
		passwordConfirmation: string({
			required_error: "Password confirmation is required",
		}),
		email: string({
			required_error: "Email is required",
		}).email("Not a valid email"),
		phone_number: string({
			required_error: "Phone number is required",
		}).min(10, "Not a valid phone number"),
		birth_date: string({
			required_error: "Date of Birth is required",
		}).date("Not valid Date"),
	}).refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords do not match",
		path: ["passwordConfirmation"],
	}),
});

export const updateHelperSchema = object({
	body: object({
		id: ObjectIdSchema,
		data: object({}),
	}),
});

export const verifyHelperSchema = object({
	params: object({
		id: string(),
		verificationCode: string(),
	}),
});

export const forgotPasswordSchema = object({
	body: object({
		email: string({
			required_error: "Email is required",
		}).email("Not a valid email"),
	}),
});

export const resetPasswordSchema = object({
	params: object({
		id: string(),
		passwordResetCode: string(),
	}),
	body: object({
		password: string({
			required_error: "Password is required",
		}).min(6, "Password is too short - should be min 6 chars"),
		passwordConfirmation: string({
			required_error: "Password confirmation is required",
		}),
	}).refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords do not match",
		path: ["passwordConfirmation"],
	}),
});

export type CreateHelperInput = TypeOf<typeof createHelperSchema>["body"];

export type VerifyHelperInput = TypeOf<typeof verifyHelperSchema>["params"];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
