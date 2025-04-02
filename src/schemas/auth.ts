import { z } from "zod";

const LoginRequest = z.object({
  email: z.string().email(),
  name: z.string(),
  picture: z.string(),
});

const LoginResponse = z.object({
  accessToken: z.string(),
  userId: z.number(),
});

export type LoginRequest = z.infer<typeof LoginRequest>;
export type LoginResponse = z.infer<typeof LoginResponse>;
