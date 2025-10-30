import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SWRProvider } from "@/components/providers/SWRProvider";
import { UserProvider } from "@/components/providers/UserProvider";
import { getCurrentUser } from "@/lib/auth";

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
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      >
        <SWRProvider>
          <UserProvider userId={user?.id}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster richColors position="top-center" />
          </UserProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
