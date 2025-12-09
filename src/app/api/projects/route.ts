import { getAllProjects } from "@/app/(public)/projects/server/projectActions";
import { createClient } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const result = await getAllProjects();

    console.log(result);
    if (!result) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
