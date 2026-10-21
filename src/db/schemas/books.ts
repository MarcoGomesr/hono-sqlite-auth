import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { AuthorTable } from "./authors.ts";
import { UserTable } from "./users.ts";

export const BookTable = sqliteTable("books", {
	id: text("id", { length: 36 })
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	title: text().notNull(),
	description: text(),
	publishDate: integer({ mode: "timestamp" }),
	pageCount: integer(),
	authorId: text("author_id", { length: 36 })
		.notNull()
		.references(() => AuthorTable.id, { onDelete: "restrict" }),
	addedBy: text("added_by", { length: 36 })
		.notNull()
		.references(() => UserTable.id, { onDelete: "restrict" }),
	createdAt: integer({ mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});
