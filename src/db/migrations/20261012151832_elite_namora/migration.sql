PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_Auth` (
	`id` text(36) PRIMARY KEY,
	`email` text NOT NULL UNIQUE,
	`passwordHash` text NOT NULL,
	`role` text DEFAULT 'users' NOT NULL,
	`createdAt` integer DEFAULT 1791818312 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_Auth`(`id`, `email`, `passwordHash`, `role`, `createdAt`) SELECT `id`, `email`, `passwordHash`, `role`, `createdAt` FROM `Auth`;--> statement-breakpoint
DROP TABLE `Auth`;--> statement-breakpoint
ALTER TABLE `__new_Auth` RENAME TO `Auth`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_authors` (
	`id` text(36) PRIMARY KEY,
	`name` text NOT NULL,
	`birthday` integer,
	`createdAt` integer DEFAULT 1791818312 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_authors`(`id`, `name`, `birthday`, `createdAt`) SELECT `id`, `name`, `birthday`, `createdAt` FROM `authors`;--> statement-breakpoint
DROP TABLE `authors`;--> statement-breakpoint
ALTER TABLE `__new_authors` RENAME TO `authors`;--> statement-breakpoint
PRAGMA foreign_keys=ON;