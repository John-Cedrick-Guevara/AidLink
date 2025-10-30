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
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getAllNotifications } from "@/app/(private)/dashboard/(user)/server/notificationActions";

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
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const landingNavlinks =
    pathname === "/"
      ? [
          { href: "#about", label: "About" },
          { href: "#features", label: "Features" },
          { href: "#projects", label: "Projects" },
          { href: "#support", label: "Support" },
        ]
      : [
          { href: user ? "/dashboard" : "/", label: "Home" },
          { href: "/projects", label: "Projects" },
          { href: "/sectors", label: "Sectors" },
        ];

  useEffect(() => {
    const fetchNotifications = async () => {
      // Simulate fetching notifications from an API
      const notifications = await getAllNotifications(user!.id);
      const unread = notifications.filter((n) => !n.read).length;
      setUnreadCount(unread);
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

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

          <div className="hidden md:flex items-center gap-8">
            {landingNavlinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-6 py-2 text-sm font-medium rounded-full transition-all duration-300
              ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }
            `}
                >
                  {link.label}

                  {/* Animated underline for active link */}
                  {isActive && (
                    <span className="absolute left-1/2 -bottom-1.5 w-2/3 h-0.5 bg-primary rounded-full transform -translate-x-1/2 transition-all" />
                  )}
                </Link>
              );
            })}
          </div>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link href="/sign-up">
                <Button
                  size="sm"
                  className="rounded-full bg-linear-to-r from-blue-500 via-blue-600 to-indigo-500 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border-none"
                >
                  Sign Up
                </Button>
              </Link>

              <Link href="/sign-in">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full border border-blue-500 text-blue-600 text-sm hover:bg-blue-50 hover:text-blue-700 font-medium transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-8 ">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    {(unreadCount || 0) > 0 && (
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
                  <NotificationPanel userId={user.id} />
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
                  <DropdownMenuItem onClick={logOut}>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
