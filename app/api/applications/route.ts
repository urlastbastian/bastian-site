import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, skill, portfolio } = body;

    const { error } = await supabase
      .from("applications")
      .insert([{ name, email, skill, portfolio, status: "pending" }]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Send email notification
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bastian.co.in";
    await fetch(`${baseUrl}/api/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "application",
        data: { name, email, phone: body.phone || "", skill, portfolio },
      }),
    }).catch(e => console.error("Notify failed:", e));

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
