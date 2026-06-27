import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bastian - Your Creative Dream Team",
  description: "Bastian is a full-service creative agency connecting ambitious brands with specialist freelancers. Brand strategy, social media, performance marketing, events and more - managed end to end. Serving startups and brands across India, Southeast Asia, the Middle East and beyond.",
  keywords: "creative agency India, marketing agency Mumbai, brand strategy Bangalore, freelancer network India, social media agency, performance marketing, influencer marketing, brand building startup, outsourced marketing team, creative director India",
  openGraph: {
    title: "Bastian - Your Creative Dream Team",
    description: "Agency-quality creative output at startup-friendly cost. We curate your perfect team of specialist freelancers and manage everything.",
    url: "https://bastian.co.in",
    siteName: "Bastian",
    images: [
      {
        url: "https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/Bastian%20Logo_Fin_Long.png",
        width: 1200,
        height: 630,
        alt: "Bastian - Your Creative Dream Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bastian - Your Creative Dream Team",
    description: "Agency-quality creative output at startup-friendly cost. Specialist freelancers, managed end to end.",
    images: ["https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/Bastian%20Logo_Fin_Long.png"],
  },
  icons: {
    icon: "https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/bastian%20favicon.png",
    apple: "https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/bastian%20favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://bastian.co.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7FT34HZHYF"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7FT34HZHYF');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MarketingAgency",
              "name": "Bastian",
              "url": "https://bastian.co.in",
              "logo": "https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/Bastian%20Logo_Fin_Long.png",
              "description": "Full-service creative agency connecting ambitious brands with specialist freelancers across India and internationally.",
              "email": "communication@bastian.co.in",
              "sameAs": [
                "https://www.instagram.com/bastianconsultants/",
                "https://www.linkedin.com/company/bastianconsultants/"
              ],
              "areaServed": ["India", "Southeast Asia", "Middle East", "United Kingdom", "United States"],
              "serviceType": ["Brand Strategy", "Social Media Marketing", "Performance Marketing", "Content Marketing", "Event Management", "Website Design", "PR & Communications", "Influencer Marketing"]
            })
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}