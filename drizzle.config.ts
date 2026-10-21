import { defineConfig } from "drizzle-kit";
import { env } from "./src/data/env.ts";

export default defineConfig({
	out: "./src/db/migrations",
	schema: "./src/db/schema.ts",
	dialect: "sqlite",
	strict: true,
	verbose: true,
	dbCredentials: {
		url: env.DB_PATH,
	},
});
