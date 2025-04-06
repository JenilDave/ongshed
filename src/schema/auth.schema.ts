import { object, string, TypeOf } from "zod";

export const createSessionSchema = object({
	body: object({
		password: string({
			required_error: "Password is required",
		}).min(6, "Password is too short - should be min 6 chars"),
		email: string({
			required_error: "Email is required",
		}).email("Not a valid email"),
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
		id: string({
			message: "id is required",
		}),
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

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;

export type CreateSessionInput = TypeOf<typeof createSessionSchema>["body"];
