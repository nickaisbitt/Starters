// src/app/layout.tsx
import type { Metadata } from "next";
import { Patrick_Hand, Architects_Daughter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { cn } from "@/lib/utils";

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-patrick",
});

const architects = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-architects",
});

export const metadata: Metadata = {
  title: "Genesis OS",
  description: "AI-Powered Business Incorporation & Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-paper font-patrick antialiased",
          patrickHand.variable,
          architects.variable
        )}
      >
        {children}
        <Toaster position="top-center" toastOptions={{
             className: 'doodle-card border-black bg-white font-patrick text-lg',
             descriptionClassName: 'text-slate-600',
        }} />
      </body>
    </html>
  );
}
