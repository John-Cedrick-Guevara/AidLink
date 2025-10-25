"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
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
            <a
              href="#about"
              className="text-sm hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#features"
              className="text-sm hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#projects"
              className="text-sm hover:text-primary transition-colors"
            >
              Projects
            </a>
            <a
              href="#support"
              className="text-sm hover:text-primary transition-colors"
            >
              Support
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard/user">
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-primary"
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="sm" className="bg-gradient-primary">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
