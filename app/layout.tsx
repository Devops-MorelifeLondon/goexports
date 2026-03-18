import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: {
    default: "Global Sourcing Platform | Import Export Business | International Buyers",
    template: "%s | Global Trade Leads"
  },
  description:
    "Find international buyers and grow your import export business on our global sourcing platform. Connect with verified global buyers, get international trade leads, and access export market opportunities worldwide.",
  keywords: [
    "global sourcing platform",
    "import export business",
    "international buyers",
    "find international buyers",
    "verified global buyers",
    "connect with global buyers",
    "find buyers for export",
    "global trade opportunities",
    "connect exporters with buyers",
    "international trade connections",
    "export business leads",
    "export market opportunities",
    "international leads",
    "buyer leads",
    "export leads",
    "importers leads",
    "global trade leads",
    "international trade",
    "verified buyers",
    "wholesale leads",
    "distributor leads",
    "export import leads",
    "b2b leads",
    "trade leads",
    "export opportunities",
    "global sourcing"
  ],
  authors: [{ name: "Global Export Leads" }],
  creator: "Global Export Leads",
  publisher: "Global Export Leads",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.goexports.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'en-GB': '/en-GB',
      'en-CA': '/en-CA',
      'en-AU': '/en-AU',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.goexports.com',
    title: 'Global Sourcing Platform | Import Export Business | International Buyers',
    description: 'Find international buyers and grow your import export business on our global sourcing platform. Connect with verified global buyers worldwide.',
    siteName: 'Global Export Leads',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Global Export Leads - Connect with International Buyers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Sourcing Platform | Import Export Business | International Buyers',
    description: 'Find international buyers and grow your import export business on our global sourcing platform. Connect with verified global buyers worldwide.',
    images: ['/assets/twitter-image.jpg'],
    creator: '@globalexportleads',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <StructuredData />
      </head>
      <body>
        <div className="min-h-screen text-[#0F1111] relative">

          {/* SHARED BACKGROUND FOR NAVBAR & HERO (Exactly 100vh) */}
          <div className="absolute top-0 left-0 w-full h-screen bg-[url('/assets/banner/hero.jpg')] bg-black/50 bg-blend-overlay bg-cover bg-center -z-10" />

          <div className="relative z-10">
            <Navbar />
            {children}
          </div>

          <Footer />
          <WhatsAppFloat />
        </div>
      </body>
    </html>
  );
}