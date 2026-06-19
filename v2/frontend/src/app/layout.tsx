import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./SmoothScrollProvider";
import GoogleTagManager from "./GoogleTagManager";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "600", "700"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  variable: "--font-hind-siliguri",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Being The Man — The Silent Language of Style",
  description: "Confidence, Presence, Masculine Identity, Better First Impressions. self-presentation, and social status signaling for the modern man.",
  alternates: {
    canonical: "https://beingman.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD structural data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "The Silent Language of Style",
    "author": {
      "@type": "Organization",
      "name": "Being The Man"
    },
    "image": "https://beingman.app/logo.jpg",
    "description": "Confidence, Presence, Masculine Identity, Better First Impressions. self-presentation, and social status signaling for the modern man.",
    "offers": {
      "@type": "Offer",
      "price": "490.00",
      "priceCurrency": "BDT",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <html
      lang="bn"
      className={`${montserrat.variable} ${playfairDisplay.variable} ${hindSiliguri.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-dark text-brand-light font-sans">
        <GoogleTagManager />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
