import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { createClient } from "@/lib/supabase/supabaseServer";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SWRProvider } from "@/components/providers/SWRProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AidLink - Transform Lives Through Student-Led Charity",
  description:
    "A modern platform where students and teachers propose, browse, and support meaningful charity projects with complete transparency and engagement.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userRole = user?.user_metadata.role;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SWRProvider>
          <Navbar userRole={userRole || ""} />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors position="top-center" />
          <Footer />
        </SWRProvider>
      </body>
    </html>
  );
}
