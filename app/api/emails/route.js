import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { emails } from "../../../lib/schema";
import { eq } from "drizzle-orm";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      userId,
      recipient,
      subject,
      emailType,
      tone,
      content
    } = body;

    if (!userId || !subject || !emailType || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(emails)
      .values({
        id,
        userId,
        recipient,
        subject,
        emailType,
        tone,
        content,
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/emails error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
