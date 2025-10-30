"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import { useUser } from "../providers/UserProvider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationPanel from "../shared/NotificationPanel";
import { Badge } from "../ui/badge";
import { dummyNotifications } from "@/data/dummyData";
import { useState } from "react";

export interface Notification {
  id: string;
  user_id: string;
  type: "donation" | "approval" | "rejection" | "comment" | "update";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  projectId?: string;
}

const Navbar = () => {
  const { user, logOut } = useUser();

  const landingNavlinks = [
    { href: "#about", label: "About" },
    { href: "#features", label: "Features" },
    { href: "#projects", label: "Projects" },
    { href: "#support", label: "Support" },
  ];

  const [notifications, setNotifications] = useState<Notification[]>(
    dummyNotifications.filter(
      (n) => n.user_id === user?.id || user?.role === "admin"
    )
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl">AidLink</span>
          </Link>

          {!user ? (
            <>
              <div className="hidden md:flex items-center gap-8">
                {landingNavlinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Link href="/sign-up">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-primary"
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="sm" className="bg-gradient-primary">
                    Sign In
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <Link href={user ? "/dashboard" : "/"}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-primary"
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-primary"
                  >
                    Projects
                  </Button>
                </Link>
                <Link href="/sectors">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-primary"
                  >
                    Sectors
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 ">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="p-0 w-auto">
                    <NotificationPanel
                      userId={user.id}
              
                      onMarkAsRead={handleMarkAsRead}
                      onMarkAllAsRead={handleMarkAllAsRead}
                      onDelete={handleDeleteNotification}
                    />
                  </PopoverContent>
                </Popover>

                {/* Dropdown menu for user actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-primary p-2 rounded-full">
                    <User className="text-white" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logOut}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
