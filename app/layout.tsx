import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

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
  metadataBase: new URL('https://www.goexports.co.uk'),
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
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3YVK8TPYEV"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3YVK8TPYEV');
          `
        }} />
        
        {/* Meta Pixel Code */}
        <script dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1637529024471967');
            fbq('track', 'PageView');
          `
        }} />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1637529024471967&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body style={{ backgroundColor: 'var(--canvas)' }}>
        <div className="min-h-screen">
          <Navbar />
          {children}
          <Footer />
        </div>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}