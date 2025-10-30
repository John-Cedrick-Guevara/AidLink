import { createClientUseClient } from "@/lib/supabase/supabaseClient";
import { CACHE_KEYS } from "@/lib/swr-config";
import { Notifications } from "@/types";
import { useEffect, useTransition } from "react";
import useSWR from "swr";
import {
  deleteNotification,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../server/notificationActions";
import { toast } from "sonner";

export function useNotifications(userId: string) {
  const supabase = createClientUseClient();

  const {
    data: notifications,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<Notifications[]>(userId ? CACHE_KEYS.NOTIFICATION(userId) : null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notifications:user_id=${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          // filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("🔔 Notification event:", payload.eventType);
          mutate();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, mutate, supabase]);

  return {
    notifications: notifications || [],
    isLoading,
    isValidating,
    error,
    mutate,
  };
}

export function useNotificationsActions() {
  const [isPending, startTransition] = useTransition();

  const markAsRead = async (notificationId: string) => {
    startTransition(async () => {
      try {
        const result = await markNotificationAsRead(notificationId);

        if (result.success) {
          console.log("object");
          toast.success(result.message || "Notification marked as read");
        } else {
          toast.error(result.message || "Failed to mark notification as read");
        }
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    });
  };

  const removeNotification = async (notificationId: string) => {
    startTransition(async () => {
      try {
        const result = await deleteNotification(notificationId);

        if (result.success) {
          console.log("object");
          
          toast.success(result.message || "Notification deleted");
        } else {
          console.log("dasd");
          toast.error(result.message || "Failed to delete notification");
        }
      } catch (error) {
        console.error("Error deleting notification:", error);
      }
    });
  };

  const markAllAsRead = async (userId: string) => {
    startTransition(async () => {
      try {
        const result = await markAllNotificationsAsRead(userId);

        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(
            result.message || "Failed to mark all notifications as read"
          );
        }
      } catch (error) {
        console.error("Error marking all notifications as read:", error);
      }
    });
  };

  return {
    isPending,
    markAsRead,
    removeNotification,
    markAllAsRead,
  };
}
