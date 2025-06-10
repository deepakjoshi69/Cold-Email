ALTER TABLE "templates" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "templates" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "templates" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "templates" ALTER COLUMN "category" SET DEFAULT 'uncategorized';--> statement-breakpoint
ALTER TABLE "templates" ALTER COLUMN "category" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "templates" ALTER COLUMN "description" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "templates" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "emails" ADD COLUMN "user_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "templates" ADD COLUMN "user_id" uuid NOT NULL;