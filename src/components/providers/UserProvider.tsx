"use client";

import { createClientUseClient } from "@/lib/supabase/supabaseClient";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  role?: string;
  status?: string;
  [key: string]: any; // for extra fields
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: (id: string) => Promise<void>;
  logOut: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
  refreshUser: async () => {},
  logOut: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientUseClient();

  // Fetch user from Supabase database
  const fetchUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setUser(data);
    } catch (err: any) {
      console.error("Failed to fetch user:", err);
      setError(err.message || "Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  // Initialize user from auth session
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user?.id) {
          await fetchUser(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (err: any) {
        console.error("Error initializing user:", err);
        setError(err.message || "Error initializing user");
        setLoading(false);
      }
    };

    initializeUser();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user?.id) {
        await fetchUser(session.user.id);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/"; // Redirect to home or login page
  };

  return (
    <UserContext.Provider
      value={{ user, loading, error, refreshUser: fetchUser, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
}

// for access
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
