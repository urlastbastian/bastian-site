import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userPrompt, systemPrompt } = await req.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    const data = await response.json();
    console.log("Anthropic status:", response.status);
    console.log("Anthropic data:", JSON.stringify(data));

    if (!response.ok) {
      return NextResponse.json({ text: "API error: " + (data.error?.message || response.status) });
    }

    const text = data.content?.[0]?.text || "No response generated.";
    return NextResponse.json({ text });
  } catch (err) {
    console.error("Claude route error:", err);
    return NextResponse.json({ text: "Server error: " + String(err) });
  }
}