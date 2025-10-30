"use server";

import { createClient } from "@/lib/supabase/supabaseServer";

export async function getAllNotifications(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.log(`Error fetching notifications: ${error.message}`);
    return [];
  }

  return data || [];
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Notification marked as read." };
}

export async function deleteNotification(notificationId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", notificationId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Notification deleted successfully." };
}

export async function markAllNotificationsAsRead(userId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("user_id", userId)
    .eq("read", false);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "All notifications marked as read." };
}

export async function createNotification(
  userId: string,
  type:
    | "donation"
    | "approval"
    | "rejection"
    | "restriction"
    | "confirmation"
    | "comment"
    | "update",
  title: string,
  message: string
) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from("notifications").insert([
      {
        user_id: userId,
        type,
        title,
        message,
        read: false,
      },
    ]);

    if (error) {
      console.error(`Error creating notification: ${error.message}`);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Notification created successfully." };
  } catch (error) {
    console.error("Unexpected error creating notification:", error);
    return { success: false, message: "Failed to create notification" };
  }
}
