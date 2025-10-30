import { getAllNotifications } from "@/app/(private)/dashboard/(user)/server/notificationActions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const notifications = await getAllNotifications(id);

    return NextResponse.json({ data: notifications });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to fetch notifications" , err },
      { status: 500 }
    );
  }
}
