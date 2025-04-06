import { Request, Response } from "express";
import { nanoid } from "nanoid";
import {
	ForgotPasswordInput,
	ResetPasswordInput,
	CreateSessionInput,
} from "../schema/auth.schema";
import {
	findUserByEmail,
	findUserById,
	validatePassword,
} from "../service/user.service";
import sendEmail from "../utils/mailer.utils";
import { SMTP_FROM_EMAIL } from "../utils/constants.utils";
import { logger } from "../utils/logger.utils";
import { signAccessToken, signRefreshToken } from "../service/auth.service";
import { verifyJwt } from "../utils/jwt.utils";
import { User } from "../db/users.db";

export const createSessionHandler = async (
	req: Request<object, object, CreateSessionInput>,
	res: Response
) => {
	try {
		const message = "Invalid email or password";
		const { email, password } = req.body;

		const user = await validatePassword(email, password);

		if (!user) {
			res.status(401).send(message);
			return;
		}

		// sign a access token
		const accessToken = signAccessToken(user);

		// sign a refresh token
		const refreshToken = await signRefreshToken({ userId: user.id });

		// send the tokens

		res.status(200).send({
			accessToken,
			refreshToken,
		});
	} catch (e) {
		logger.error(e);
		res.sendStatus(500);
	}
};

export async function forgotPasswordHandler(
	req: Request<object, object, ForgotPasswordInput>,
	res: Response
) {
	try {
		const message =
			"If a user with that email is registered you will receive a password reset email";

		const { email } = req.body;

		const user = await findUserByEmail(email);

		if (!user) {
			res.send(message);
			return;
		}

		if (!user.verified) {
			res.send("User is not verified");
			return;
		}

		const passwordResetCode = nanoid();

		user.passwordResetCode = passwordResetCode;

		await user.save();

		await sendEmail({
			Source: SMTP_FROM_EMAIL,
			Destination: {
				ToAddresses: [user.email],
			},
			Message: {
				Subject: {
					Data: "Password Reset Code",
				},
				Body: {
					Text: {
						Data: `Password Reset => ID :- ${user.id} || CODE: ${user.passwordResetCode}`,
						Charset: "UTF-8",
					},
				},
			},
		});

		console.debug(`Password reset email sent to ${email}`);
		res.send(message);
	} catch (e: unknown) {
		logger.error(e);
		res.sendStatus(500);
	}
	return;
}

export async function resetPasswordHandler(
	req: Request<
		ResetPasswordInput["params"],
		object,
		ResetPasswordInput["body"]
	>,
	res: Response
) {
	try {
		const { id, passwordResetCode } = req.params;

		const { password } = req.body;

		const user = await findUserById(id);

		if (
			!user ||
			!user.passwordResetCode ||
			user.passwordResetCode !== passwordResetCode
		) {
			res.status(400).send("Could not reset user password");
			return;
		}

		user.passwordResetCode = null;

		user.password = password;

		await user.save();

		res.send("Successfully updated password");
	} catch (e) {
		logger.error(e);
		res.sendStatus(500);
	}
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
	try {
		const grant = req["body"]["grant"];
		if (grant) {
			const refreshToken = req["body"][`${grant}`];
			if (!refreshToken) {
				res.status(401).send("Could not refresh access token");
				return;
			}

			const session = verifyJwt<User>(refreshToken, "refresh");

			if (!session) {
				res.status(401).send("Could not refresh access token");
				return;
			}

			const user = await findUserByEmail(session.email);

			if (!user) {
				res.status(401).send("Could not refresh access token");
				return;
			}

			const accessToken = signAccessToken(user);

			res.send({ accessToken });
			return;
		}
	} catch (e) {
		logger.error(e);
		res.sendStatus(500);
	}
}
