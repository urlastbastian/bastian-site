import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    let subject = "";
    let html = "";

    if (type === "inquiry") {
      subject = `New Inquiry from ${data.contact_name || "Someone"} - Bastian`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <img src="https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/Bastian%20Logo_Fin_Long.png" alt="Bastian" style="height: 40px; margin-bottom: 32px;" />
          <h2 style="color: #f64523; font-size: 24px; margin-bottom: 8px;">New Business Inquiry</h2>
          <p style="color: #6b7280; margin-bottom: 24px;">Someone filled out the contact form on bastian.co.in</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600;">${data.contact_name || "-"}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${data.email}" style="color: #f64523;">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${data.phone}</td></tr>` : ""}
            ${data.project_type ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Project Type</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${data.project_type}</td></tr>` : ""}
            <tr><td style="padding: 10px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Message</td><td style="padding: 10px 0; line-height: 1.6;">${data.message || "-"}</td></tr>
          </table>
          <a href="mailto:${data.email}" style="display: inline-block; margin-top: 32px; background: #f64523; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px;">Reply to ${data.contact_name || "them"}</a>
          <p style="margin-top: 32px; color: #d1d5db; font-size: 11px;">Bastian - communication@bastian.co.in</p>
        </div>
      `;
    } else if (type === "application") {
      subject = `New Freelancer Application from ${data.name} - Bastian`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <img src="https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/Bastian%20Logo_Fin_Long.png" alt="Bastian" style="height: 40px; margin-bottom: 32px;" />
          <h2 style="color: #f64523; font-size: 24px; margin-bottom: 8px;">New Freelancer Application</h2>
          <p style="color: #6b7280; margin-bottom: 24px;">Someone applied to join the Bastian network</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600;">${data.name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${data.email}" style="color: #f64523;">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${data.phone}</td></tr>` : ""}
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Specialism</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${data.skill}</td></tr>
            <tr><td style="padding: 10px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Portfolio</td><td style="padding: 10px 0;"><a href="${data.portfolio}" style="color: #f64523;" target="_blank">${data.portfolio}</a></td></tr>
          </table>
          <a href="${data.portfolio}" target="_blank" style="display: inline-block; margin-top: 32px; background: #f64523; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px;">View Portfolio</a>
          <p style="margin-top: 32px; color: #d1d5db; font-size: 11px;">Bastian - communication@bastian.co.in</p>
        </div>
      `;
    } else if (type === "audit") {
      subject = `New Brand Audit Request - ${data.brand} - Bastian`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <img src="https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/Bastian%20Logo_Fin_Long.png" alt="Bastian" style="height: 40px; margin-bottom: 32px;" />
          <h2 style="color: #f64523; font-size: 24px; margin-bottom: 8px;">New Brand Audit Request</h2>
          <p style="color: #6b7280; margin-bottom: 24px;">Someone requested a free brand audit</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Brand</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600;">${data.brand}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${data.email}" style="color: #f64523;">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding: 10px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Phone</td><td style="padding: 10px 0;">${data.phone}</td></tr>` : ""}
          </table>
          <a href="mailto:${data.email}" style="display: inline-block; margin-top: 32px; background: #f64523; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px;">Send Their Audit</a>
          <p style="margin-top: 32px; color: #d1d5db; font-size: 11px;">Bastian - communication@bastian.co.in</p>
        </div>
      `;
    } else if (type === "team_architect") {
      subject = `New Dream Team Request - Bastian`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <img src="https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/Bastian%20Logo_Fin_Long.png" alt="Bastian" style="height: 40px; margin-bottom: 32px;" />
          <h2 style="color: #f64523; font-size: 24px; margin-bottom: 8px;">New Dream Team Request</h2>
          <p style="color: #6b7280; margin-bottom: 24px;">Someone used the Team Architect tool</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${data.email}" style="color: #f64523;">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${data.phone}</td></tr>` : ""}
            <tr><td style="padding: 10px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Project</td><td style="padding: 10px 0; line-height: 1.6;">${data.description}</td></tr>
          </table>
          <a href="mailto:${data.email}" style="display: inline-block; margin-top: 32px; background: #f64523; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px;">Reply with Their Team</a>
          <p style="margin-top: 32px; color: #d1d5db; font-size: 11px;">Bastian - communication@bastian.co.in</p>
        </div>
      `;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Bastian <communication@bastian.co.in>",
        to: ["communication@bastian.co.in"],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Resend error:", err);
      return NextResponse.json({ error: err }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Notify route error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
