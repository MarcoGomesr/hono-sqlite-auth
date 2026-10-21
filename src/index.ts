import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "./data/env.ts";
import apiKeysRoutes from "./routes/apiKeys.ts";
import authRoutes from "./routes/auth.ts";
import authorRoutes from "./routes/authors.ts";
import booksRoutes from "./routes/book.ts";

const app = new Hono();

app.route("/authors", authorRoutes);
app.route("/auth", authRoutes);
app.route("/api-keys", apiKeysRoutes);
app.route("/books", booksRoutes);

mkdirSync(join(process.cwd(), "data"), { recursive: true });

serve(
	{
		fetch: app.fetch,
		port: env.PORT,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
