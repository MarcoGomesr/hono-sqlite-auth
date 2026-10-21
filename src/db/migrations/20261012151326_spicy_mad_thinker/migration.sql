CREATE TABLE `authors` (
	`id` text(36) PRIMARY KEY,
	`name` text NOT NULL,
	`birthday` integer,
	`createdAt` integer DEFAULT 1791818006 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(36) PRIMARY KEY,
	`email` text NOT NULL UNIQUE,
	`passwordHash` text NOT NULL,
	`role` text DEFAULT 'users' NOT NULL,
	`createdAt` integer DEFAULT 1791818006 NOT NULL
);
