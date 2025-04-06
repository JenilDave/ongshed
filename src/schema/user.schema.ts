import { object, string, TypeOf } from "zod";

export const getUserSchema = object({
	query: object({
		id: string({
			message: "id is required",
		}),
	}),
});

export const createUserSchema = object({
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
		address: string({
			required_error: "Address is required",
		}),
	}).refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords do not match",
		path: ["passwordConfirmation"],
	}),
});

export const updateUserSchema = object({
	body: object({
		id: string({
			message: "id is required",
		}),
		data: object({}),
	}),
});

export const verifyUserSchema = object({
	query: object({
		id: string({
			message: "id is required",
		}),
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
	query: object({
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

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["query"];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
