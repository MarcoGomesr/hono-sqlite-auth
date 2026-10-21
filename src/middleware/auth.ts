import { createMiddleware } from "hono/factory";
import { db } from "../db/db.ts";
import type { UserTable } from "../db/schema.ts";
import { hashApiKey } from "../lib/crypto.ts";
import { env } from "../data/env.ts";
import { verify } from "hono/jwt";

export type AuthUser = Pick<typeof UserTable.$inferSelect, "id" | "role" | "email">;
export type AuthEnv = {
	Variables: {
		authUser: AuthUser;
	};
};

async function getUserFromApiKey(key: string): Promise<AuthUser | null> {
	const keyHash = hashApiKey(key);
	const apiKey = await db.query.ApiKeyTable.findFirst({ where: { keyHash } });
	if (apiKey == null) return null;
	const user = await db.query.UserTable.findFirst({
		where: { id: apiKey.userId },
		columns: { id: true, role: true, email: true },
	});
	return user ?? null;
}

async function getUserFromJwt(token: string): Promise<AuthUser | null> {
	let payload: { sub?: unknown };
	try {
		payload = (await verify(token, env.JWT_SECRET, "HS256")) as {
			sub?: unknown;
		};
	} catch {
		return null;
	}
	if (typeof payload.sub !== "string") return null;
	const user = await db.query.UserTable.findFirst({
		where: { id: payload.sub },
		columns: { id: true, role: true, email: true },
	});
	return user ?? null;
}

export const apiKeyAuth = createMiddleware<AuthEnv>(async (c, next) => {
	const key = c.req.header("X-API-KEY")?.trim();

	if (key == null || key === "") {
		return c.json({ error: "Missing API Key" }, 401);
	}

	const user = await getUserFromApiKey(key);
	if (user == null) {
		return c.json({ error: "Invalid API Key" }, 401);
	}

	c.set("authUser", user);
	await next();
});

export const anyAuth = createMiddleware<AuthEnv>(async (c, next) => {
	const apiKey = c.req.header("X-API-KEY")?.trim();
	if (apiKey != null && apiKey !== "") {
		const user = await getUserFromApiKey(apiKey);
		if (user == null) {
			return c.json({ error: "Invalid API Key" }, 401);
		}
		c.set("authUser", user);
		return next();
	}

	const match = c.req.header("Authorization")?.match(/^Bearer\s+(.+)$/i);
	if (match) {
		const token = match[1].trim();
		const user = await getUserFromJwt(token);
		if (user == null) {
			return c.json({ error: "Invalid or expired token" }, 401);
		}
		c.set("authUser", user);
		return next();
	}

	return c.json({ error: "Missing credentials" }, 401);
});