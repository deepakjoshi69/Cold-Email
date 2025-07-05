import { NextResponse } from "next/server";
import { getTemplateById, updateTemplateById, deleteTemplateById } from "../../../../lib/db";

export async function GET(request, { params }) {
  if (!params || !params.id) {
    return NextResponse.json({ error: "Template ID is required" }, { status: 400 });
  }
  const template = await getTemplateById(params.id);
  if (!template) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }
  return NextResponse.json(template);
}

export async function PUT(request, { params }) {
  if (!params || !params.id) {
    return NextResponse.json({ error: "Template ID is required" }, { status: 400 });
  }
  try {
    const body = await request.json();
    const updated = await updateTemplateById(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update template" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!params || !params.id) {
    return NextResponse.json({ error: "Template ID is required" }, { status: 400 });
  }
  try {
    const deleted = await deleteTemplateById(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Template deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 });
  }
}
