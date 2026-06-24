import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bastian - Your Creative Dream Team",
  description: "Bastian connects growing brands with curated specialist freelancers. Agency-quality output at startup-friendly cost.",
  icons: {
    icon: "https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/bastian%20favicon.png",
    apple: "https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/bastian%20favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}