import { NextResponse } from "next/server"
import { getSettings, saveSettings } from "@/lib/db"

export async function GET(request) {
  try {
    const settings = await getSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    const settings = await saveSettings(data)
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error saving settings:", error)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}

