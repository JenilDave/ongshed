import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { ForgotPasswordInput, ResetPasswordInput } from "../schema/user.schema";
import { findUserByEmail, findUserById } from "../service/user.service";
import sendEmail from "../utils/mailer.utils";
import { SMTP_FROM_EMAIL } from "../utils/constants.utils";
import { logger } from "../utils/logger.utils";

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
            console.debug(`User with email ${email} does not exists`);
            res.send(message);
            return 
        }
        
        if (!user.verified) {
            res.send("User is not verified");
            return 
        }
        
        const passwordResetCode = nanoid();
        
        user.passwordResetCode = passwordResetCode;
        
        await user.save();
        
        await sendEmail({
            Source: SMTP_FROM_EMAIL,
            Destination: {
                ToAddresses: [user.email]
            },
            Message: {
                Subject: {
                    Data: "Password Reset Code"
                },
                Body: {
                    Text: {
                        Data: `Password Reset => ID :- ${user._id} || CODE: ${user.passwordResetCode}`,
                        Charset: 'UTF-8'
                    }
                }
            }
        });
        
        console.debug(`Password reset email sent to ${email}`);
        res.send(message);
    } catch (e: unknown) { 
        logger.error(e)
        res.sendStatus(500)
    }
	return 
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
		return 
	}
    
	user.passwordResetCode = null;
    
	user.password = password;
    
	await user.save();
    
    res.send("Successfully updated password");
    } catch (e) {
        logger.error(e)
        res.sendStatus(500)
    }
}
