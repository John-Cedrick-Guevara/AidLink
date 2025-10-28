"use client";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signInAction } from "../actions";

const signInPage = () => {
  const [state, action, loading] = useActionState(signInAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-background via-primary/5 to-accent/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 mb-8 group"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">AidLink</span>
        </Link>

        <Card className="glass-card p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <form action={action} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@school.edu"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-md"
              disabled={loading}
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-muted-foreground mb-4">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>

            <div className="pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center mb-3">
                Demo Accounts:
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded bg-muted/30">
                  <span className="font-medium">Admin:</span>
                  <span className="text-muted-foreground">
                    admin@school.edu / admin123
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded bg-muted/30">
                  <span className="font-medium">User:</span>
                  <span className="text-muted-foreground">
                    user@school.edu / user123
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link href="/" className="hover:text-primary transition-colors">
            ← Back to home
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default signInPage;
