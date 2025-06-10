import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

// Database schema
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

export async function getEmails() {
  try {
    return await db.query.emails.findMany({
      orderBy: (emails, { desc }) => [desc(emails.createdAt)],
    });
  } catch (error) {
    console.error("Error getting emails:", error);
    throw new Error("Failed to get emails");
  }
}

export async function createEmail({ userId, recipient, subject, emailType, tone, content }) {
  try {
    const newEmail = await db.emails.create({
      data: {
        userId,
        recipient,
        subject,
        emailType,
        tone,
        content,
      },
    });

    return newEmail;
  } catch (error) {
    console.error("Error saving email:", error);
    throw new Error("Failed to save email");
  }
}

export async function getTemplates() {
  try {
    return await db.query.templates.findMany({
      orderBy: (templates, { desc }) => [desc(templates.createdAt)],
    });
  } catch (error) {
    console.error("Error getting templates:", error);
    throw new Error("Failed to get templates");
  }
}

export async function getTemplateById(id) {
  try {
    return await db.query.templates.findFirst({
      where: (templates, { eq }) => eq(templates.id, id),
    });
  } catch (error) {
    console.error("Error getting template:", error);
    throw new Error("Failed to get template");
  }
}

export async function createTemplate(data) {
  try {
    const id = uuidv4();
    const template = {
      id,
      user_id: data.user_id,
      name: data.name,
      category: data.category,
      description: data.description || "",
      content: data.content,
      createdAt: new Date(),
    };

    console.log("Inserting Template:", template);
    await db.insert(schema.templates).values(template);
    console.log("Template Created Successfully");
    return template;
  } catch (error) {
    console.error("Error creating template:", error);
    throw new Error("Failed to create template");
  }
}

export async function updateTemplateById(id, data) {
  try {
    const updated = await db
      .update(schema.templates)
      .set({
        name: data.name,
        description: data.description,
        content: data.content,
      })
      .where(eq(schema.templates.id, id))
      .returning();
    return updated[0];
  } catch (error) {
    console.error("Error updating template:", error);
    throw new Error("Failed to update template");
  }
}

export async function deleteTemplateById(id) {
  try {
    const deleted = await db
      .delete(schema.templates)
      .where(eq(schema.templates.id, id))
      .returning();
    return deleted[0];
  } catch (error) {
    console.error("Error deleting template:", error);
    throw new Error("Failed to delete template");
  }
}
