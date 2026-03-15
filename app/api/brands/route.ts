import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("status", "active")
    .order("order", { ascending: true });

  if (error) return NextResponse.json({ brands: [] });
  return NextResponse.json({ brands: data });
}