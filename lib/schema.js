import { pgTable, uuid, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const templates = pgTable("templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
