import { createClient } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("projects")
      .select(
        "*, sector (*), bank_details(*), funds (*, user(full_name)), comments(*, user_id(full_name, id)), proposer:users (*), ratings(*)"
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching project:", error);
      return NextResponse.json(
        { error: "Failed to fetch project" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
