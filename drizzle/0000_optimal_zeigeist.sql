CREATE TABLE "emails" (
	"id" uuid PRIMARY KEY NOT NULL,
	"recipient" varchar(255),
	"subject" varchar(255) NOT NULL,
	"email_type" varchar(50) NOT NULL,
	"tone" varchar(50),
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"gemini_api_key" varchar(255),
	"email_notifications" boolean DEFAULT false,
	"save_history" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "templates" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"category" varchar(50) NOT NULL,
	"description" varchar(255),
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
