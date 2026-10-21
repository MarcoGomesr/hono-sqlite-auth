import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { env } from "../data/env.ts";
import { relations } from "./relations.ts";

const sqlite = new Database(env.DB_PATH);
sqlite.pragma("foreign_keys = ON");

export const db = drizzle({ client: sqlite, relations });
