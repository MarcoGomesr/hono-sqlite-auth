import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const AuthorTable = sqliteTable("authors", {
	id: text("id", { length: 36 })
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	name: text().notNull(),
	birthday: integer({ mode: "timestamp" }),
	createdAt: integer({ mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});
