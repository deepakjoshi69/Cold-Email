import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request) {
  try {
    const { category, instructions, tone } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not found in .env.local." },
        { status: 400 }
      );
    }

    if (!category || !instructions) {
      return NextResponse.json(
        { error: "Category and instructions are required." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert email writer specializing in ${category} emails with a ${tone} tone. 
    Create a professional email based on the user's instructions.
    Return a JSON object with two fields:
    - 'subject' (a concise email subject)
    - 'content' (the full email body)
    - 'don't return any tags of html neither return any HTML Syntax'`;

    console.log("Calling Gemini API with:", { category, instructions, tone });

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(`${systemPrompt}\n${instructions}`);
    
    const rawText = result.response.text();
    console.log("Gemini API response:", rawText);

    let response;
    
    try {
      let cleanText = rawText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      response = JSON.parse(cleanText);

      if (!response?.subject || !response?.content) {
        throw new Error("Generated email is missing subject or content.");
      }

    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      response = {
        subject: "Generated Email",
        content: `<p>⚠ Error: Could not parse the generated response. Here's the raw output:</p>
                  <pre>${rawText}</pre>`,
      };
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error("Error in generate-email API:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Failed to generate email due to an internal error." },
      { status: 500 }
    );
  }
}
