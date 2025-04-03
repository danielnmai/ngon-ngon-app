import { z } from "zod";
import { UserSchema } from "./user";

export const TokensSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  scope: z.string(),
  id_token: z.string(),
  expiry_date: z.number(),
});

export const LoginRequestSchema = z.object({
  code: z.string(),
});

export const LoginResponseSchema = z.object({
  user: UserSchema,
  tokens: TokensSchema,
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type TokensType = z.infer<typeof TokensSchema>;
