import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const UserTable = sqliteTable("users", {
	id: text("id", { length: 36 })
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	email: text().notNull().unique(),
	passwordHash: text().notNull(),
	role: text("role", { enum: ["user", "admin"] })
		.notNull()
		.default("user"),

	createdAt: integer({ mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});
