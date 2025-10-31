"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  Bell,
  Check,
  CheckCircle,
  DollarSign,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useNotifications,
  useNotificationsActions,
} from "@/app/(private)/dashboard/(user)/hooks/useNotificationHooks";
import { Notifications } from "@/types";

const NotificationPanel = ({ userId, initialNotifications }: { userId: string; initialNotifications: Notifications[] }) => {
  // swr hook to fetch notifications
  const { notifications, isLoading, error } = useNotifications(userId, initialNotifications);

  const { markAsRead, removeNotification, markAllAsRead } =
    useNotificationsActions();

  const getIcon = (type: Notifications["type"]) => {
    switch (type) {
      case "donation":
        return <DollarSign className="w-4 h-4 text-success" />;
      case "approval":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "rejection":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case "comment":
        return <Bell className="w-4 h-4 text-primary" />;
      case "update":
        return <Bell className="w-4 h-4 text-accent" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Card className="w-80 glass-card shadow-lg">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="default" className="bg-primary">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => markAllAsRead(userId)}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="h-96">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={cn(
                    "p-3 rounded-lg transition-colors group hover:bg-muted/50",
                    !notification.read && "bg-primary/5"
                  )}
                >
                  <div className="flex gap-3">
                    <div className="shrink-0 mt-0.5">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm line-clamp-1">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground  mt-0.5">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(notification.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 w-6 p-0"
                            >
                              <Check className="w-3 h-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeNotification(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </ScrollArea>
    </Card>
  );
};

// Helper function to avoid imports issue
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export default NotificationPanel;
