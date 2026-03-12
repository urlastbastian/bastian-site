import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bastian — Your Creative Dream Team",
  description: "Bastian connects growing brands with curated specialist freelancers and manages everything in between. Agency-quality work at startup-friendly cost.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}