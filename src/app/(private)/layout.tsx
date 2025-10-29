import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { UserProvider } from "@/components/providers/UserProvider";
import { createClient } from "@/lib/supabase/supabaseServer";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserProvider>
        <Navbar />
        <div>{children}</div>
        <Footer />
      </UserProvider>
    </>
  );
};

export default layout;
