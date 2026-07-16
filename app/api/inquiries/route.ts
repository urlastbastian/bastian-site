import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contact_name, email, message, brand_name, budget, project_type } = body;

    const { error } = await supabase
      .from("inquiries")
      .insert([{ contact_name, email, message, brand_name, budget, project_type, status: "new" }]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Send email notification
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bastian.co.in";
    const notifyType = project_type === "team_architect"
      ? "team_architect"
      : project_type === "brand_audit"
      ? "audit"
      : "inquiry";

    await fetch(`${baseUrl}/api/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: notifyType,
        data: {
          contact_name,
          email,
          phone: body.phone || "",
          message,
          project_type,
          brand: brand_name,
          description: message,
        },
      }),
    }).catch(e => console.error("Notify failed:", e));

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
