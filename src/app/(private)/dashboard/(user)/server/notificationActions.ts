"use server";

import { createClient } from "@/lib/supabase/supabaseServer";
import * as brevo from "@getbrevo/brevo";

export async function getAllNotifications(userId: string | undefined) {
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
    // Insert notification
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

    // Fetch user email from users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("email, full_name")
      .eq("id", userId)
      .single();

    if (userError || !userData?.email) {
      console.error("Could not find user email:", userError);
      return { success: true, message: "Notification saved (no email sent)" };
    }

    const client = new brevo.TransactionalEmailsApi();
    client.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY!
    );

    const email = {
      sender: {
        name: "Charity Platform",
        email: "jguevara24b-0002@olopsc.edu.ph",
      },
      to: [{ email: userData.email }],
      subject: title,
      htmlContent: `
        <div style="font-family: Arial, sans-serif;">
          <h3>${title}</h3>
          <p>${message}</p>
        </div>
      `,
    };

    await client.sendTransacEmail(email);
    return {
      success: true,
      message: "Notification and email sent successfully.",
    };
  } catch (error) {
    console.error("Unexpected error creating notification:", error);
    return { success: false, message: "Failed to create notification" };
  }
}
