CREATE TABLE `Auth` (
	`id` text(36) PRIMARY KEY,
	`email` text NOT NULL UNIQUE,
	`passwordHash` text NOT NULL,
	`role` text DEFAULT 'users' NOT NULL,
	`createdAt` integer DEFAULT 1791818306 NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_authors` (
	`id` text(36) PRIMARY KEY,
	`name` text NOT NULL,
	`birthday` integer,
	`createdAt` integer DEFAULT 1791818306 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_authors`(`id`, `name`, `birthday`, `createdAt`) SELECT `id`, `name`, `birthday`, `createdAt` FROM `authors`;--> statement-breakpoint
DROP TABLE `authors`;--> statement-breakpoint
ALTER TABLE `__new_authors` RENAME TO `authors`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP TABLE `users`;