import {
	SESClient,
	SendEmailCommand,
	SendEmailCommandInput,
} from "@aws-sdk/client-ses";
import { logger } from "./logger.utils";

const sesClient = new SESClient();

async function sendEmail(payload: SendEmailCommandInput) {
	try {
		const data = await sesClient.send(new SendEmailCommand(payload));
		logger.info(`Email sent ${data}`);
	} catch (e: unknown) {
		logger.error(e);
		throw e;
	}
}

export default sendEmail;
