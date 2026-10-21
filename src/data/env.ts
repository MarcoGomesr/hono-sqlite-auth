import { existsSync } from "node:fs";
import z from "zod";

if (existsSync(".env")) {
	process.loadEnvFile();
}

const envSchema = z.object({
	PORT: z.coerce.number().int().positive().default(3000),
	DB_PATH: z.string().min(1).default("./data/library.db"),
	JWT_SECRET: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) throw new Error(`Invalid env: ${parsed.error.message}`);

export const env = parsed.data;
