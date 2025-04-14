import { z } from "zod";

export const registrationSchema = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(2, "Name must be at least 2 characters long")
		.max(50, "Name cannot be more than 50 characters long"),
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Invalid email address" }),
	profileImg: z.string().optional(),
	password: z
		.string({ required_error: "Password is required" })
		.min(6, "Password must be at least 6 characters long"),
	passwordConfirm: z
		.string({ required_error: "Confirm Password is required" })
		.min(6, "Confirm Password must be at least 6 characters long"),
});
