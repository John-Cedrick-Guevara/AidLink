import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldAlert, Home, LogIn, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Unauthorized Access | AidLink",
  description: "You need to be logged in to access this page",
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-background via-background to-primary/5">
      <Card className="max-w-md w-full p-8 space-y-6 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldAlert className="w-10 h-10 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Unauthorized Access
          </h1>
          <p className="text-muted-foreground">
            You need to be logged in to access this page
          </p>
        </div>

        {/* Error Code */}
        <div className="py-4">
          <div className="inline-block px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20">
            <span className="text-sm font-mono text-destructive">
              Error 401
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            This page requires authentication. Please log in to continue or
            return to the homepage.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Link href="/sign-in" className="block">
            <Button className="w-full" size="lg">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/" className="block">
              <Button variant="outline" className="w-full" size="lg">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>

            <Link href="/projects" className="block">
              <Button variant="outline" className="w-full" size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Projects
              </Button>
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary hover:underline font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* Additional Info */}
        <div className="pt-2">
          <details className="text-left">
            <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              Why am I seeing this?
            </summary>
            <div className="mt-3 space-y-2 text-xs text-muted-foreground pl-4 border-l-2 border-muted">
              <p>This page is protected and requires authentication.</p>
              <p className="font-medium mt-2">Possible reasons:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>You are not logged in</li>
                <li>Your session has expired</li>
                <li>You don't have the required permissions</li>
              </ul>
            </div>
          </details>
        </div>
      </Card>
    </div>
  );
}
