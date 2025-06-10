ALTER TABLE "templates" ALTER COLUMN "user_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "templates" ALTER COLUMN "category" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "templates" ALTER COLUMN "category" SET NOT NULL;