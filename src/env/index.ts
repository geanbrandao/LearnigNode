import "dotenv/config";

import { z } from "zod";

// formato de dado que eu recebo das variaveis de ambiente
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
});

// Abaixo é feito uma validacao dos dados existentes no env
// caso tenha algum erro dispara um erro
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables!", _env.error.format());

  throw new Error("Invalid environment variables.");
}

export const env = _env.data
