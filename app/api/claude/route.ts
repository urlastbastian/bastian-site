import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userPrompt, systemPrompt } = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: userPrompt }] }],
          generationConfig: { maxOutputTokens: 1000 }
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ text: "API error: " + (data.error?.message || response.status) });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    return NextResponse.json({ text });
  } catch (err) {
    console.error("Gemini route error:", err);
    return NextResponse.json({ text: "Server error: " + String(err) });
  }
}