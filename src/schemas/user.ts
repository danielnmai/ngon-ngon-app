import { z } from "zod";

export const UserSchema = z.object({
	id: z.number(),
	email: z.string().email(),
	name: z.string(),
	picture: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
