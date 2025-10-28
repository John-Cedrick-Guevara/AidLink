import { createClient } from "@/lib/supabase/supabaseServer";

/**
 * Require authentication for server actions
 * @throws Error if user is not authenticated
 * @returns Authenticated user object
 */
export async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Auth error:", error);
    throw new Error("Authentication failed");
  }

  if (!user) {
    throw new Error("Unauthorized - Please sign in");
  }

  return user;
}

/**
 * Get current user (optional - returns null if not authenticated)
 * @returns User object or null
 */
export async function getCurrentUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Check if user has admin role
 * @returns boolean
 */
export async function isAdmin() {
  try {
    const user = await getCurrentUser();
    if (!user) return false;

    const userRole = user?.user_metadata.role;

    return userRole === "admin";
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}
