import { NextResponse } from "next/server"
import { getTemplates, createTemplate } from "@/lib/db"

export async function GET(request) {
  try {
    const templates = await getTemplates()
    return NextResponse.json(templates)
  } catch (error) {
    console.error("Error fetching templates:", error)
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 })
  }
}
export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Received Data:", data);

    if (!data.name || !data.content || !data.user_id) {
      return NextResponse.json({ error: "Name, content, and user_id are required" }, { status: 400 });
    }

    const template = await createTemplate(data);
    return NextResponse.json(template);
  } catch (error) {
    console.error("Error creating template:", error);
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 });
  }
}
