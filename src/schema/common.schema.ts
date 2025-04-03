import { z } from "zod";

export const ObjectIdSchema = z
	.string({
		message: "id is required",
	})
	.regex(/^[0-9a-fA-F]{24}$/, {
		message: "Invalid ObjectId format",
	});
