import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request) {
  try {
    const { category, instructions } = await request.json();

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

    const systemPrompt = `You are an expert email template creator specializing in ${category} templates. 
    Create a professional, reusable email template based on the user's instructions.
    Return a JSON object with two fields: 
    - 'name' (a descriptive name for the template) 
    - 'content' (the full HTML template with placeholders like {{name}}, {{company}}, etc.)
    note : don't return any Html Syntax and any other coding language syntax
    Use English Language until user didn't request for any other language`;

    console.log("Calling Gemini API with:", { category, instructions });

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

      // Ensure response is valid
      if (!response?.name || !response?.content) {
        throw new Error("Generated template is missing name or content.");
      }

    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      response = {
        name: "Generated Template",
        content: `<p>⚠ Error: Could not parse the generated response. Here's the raw output:</p>
                  <pre>${rawText}</pre>`,
      };
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error("Error in generate-template API:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Failed to generate template due to an internal error." },
      { status: 500 }
    );
  }
}
