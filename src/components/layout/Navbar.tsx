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
import { signOutAction } from "@/app/(public)/(auth)/actions";
import { usePathname } from "next/navigation";
import { useUser } from "../providers/UserProvider";

const Navbar = () => {
  const { user, logOut } = useUser();

  const landingNavlinks = [
    { href: "#about", label: "About" },
    { href: "#features", label: "Features" },
    { href: "#projects", label: "Projects" },
    { href: "#support", label: "Support" },
  ];

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
                <div className="hover:bg-accent/80 hover:text-white p-2 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </div>

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
