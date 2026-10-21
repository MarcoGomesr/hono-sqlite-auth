import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { UserTable } from "./users.ts";

export const ApiKeyTable = sqliteTable("api_keys", {
	id: text("id", { length: 36 })
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	userId: text("user_id", { length: 36 }).notNull()
		.references(() => UserTable.id, { onDelete: "cascade" }),
	name: text().notNull(),
	keyHash: text().notNull(),
	keyPrefix: text({ length: 8 }).notNull(),
	createdAt: integer({ mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});
