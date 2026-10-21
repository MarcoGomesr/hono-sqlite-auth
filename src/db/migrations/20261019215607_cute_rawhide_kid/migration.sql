PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_auth` (
	`id` text(36) PRIMARY KEY,
	`email` text NOT NULL UNIQUE,
	`passwordHash` text NOT NULL,
	`role` text DEFAULT 'users' NOT NULL,
	`createdAt` integer DEFAULT 1792446967 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_auth`(`id`, `email`, `passwordHash`, `role`, `createdAt`) SELECT `id`, `email`, `passwordHash`, `role`, `createdAt` FROM `auth`;--> statement-breakpoint
DROP TABLE `auth`;--> statement-breakpoint
ALTER TABLE `__new_auth` RENAME TO `auth`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_authors` (
	`id` text(36) PRIMARY KEY,
	`name` text NOT NULL,
	`birthday` integer,
	`createdAt` integer DEFAULT 1792446967 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_authors`(`id`, `name`, `birthday`, `createdAt`) SELECT `id`, `name`, `birthday`, `createdAt` FROM `authors`;--> statement-breakpoint
DROP TABLE `authors`;--> statement-breakpoint
ALTER TABLE `__new_authors` RENAME TO `authors`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_api_keys` (
	`id` text(36) PRIMARY KEY,
	`user_id` text(36) NOT NULL,
	`name` text NOT NULL,
	`keyHash` text NOT NULL,
	`keyPrefix` text(8) NOT NULL,
	`createdAt` integer DEFAULT 1792446968 NOT NULL,
	CONSTRAINT `fk_api_keys_user_id_auth_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_api_keys`(`id`, `user_id`, `name`, `keyHash`, `keyPrefix`, `createdAt`) SELECT `id`, `user_id`, `name`, `keyHash`, `keyPrefix`, `createdAt` FROM `api_keys`;--> statement-breakpoint
DROP TABLE `api_keys`;--> statement-breakpoint
ALTER TABLE `__new_api_keys` RENAME TO `api_keys`;--> statement-breakpoint
PRAGMA foreign_keys=ON;