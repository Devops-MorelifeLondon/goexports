import HeroSection from "@/components/HeroSection";
import WhySellGlobally from "@/components/WhySellGlobally";
import SellerVideos from "@/components/SellerVideos";
import SellToUS from "@/components/SellToUS";
import GlobalShoppingCTA from "@/components/GlobalShoppingCTA";
import Presence from "@/components/Presence";
import Locations from "@/components/Locations";
import HowPlatformWorks from "@/components/HowPlatformWorks";
import Testimonials from "@/components/Testimonials";
import BenefitsForExporters from "@/components/BenefitsForExporters";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Goexports | Import Export Business Leads | Find International Buyers",
  description: "Connect with verified global buyers on our international sourcing platform. Find buyers for export business, get international trade leads, and grow your import export business with verified buyers worldwide.",
  keywords: [
    "import export business",
    "global sourcing platform",
    "international leads",
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
    "buyer leads for exporters",
    "verified international buyers",
    "importer leads",
    "distributor leads",
    "global trade leads",
    "wholesale buyer leads",
    "international trade leads",
    "b2b export leads",
    "verified buyer database"
  ],
  openGraph: {
    title: "Global Sourcing Platform | Import Export Business Leads | Find International Buyers",
    description: "Connect with verified global buyers on our international sourcing platform. Find buyers for export business and grow your import export business worldwide.",
    images: [
      {
        url: '/assets/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Get Verified Buyer Leads for Your Export Business',
      },
    ],
  },
  twitter: {
    title: "Global Sourcing Platform | Import Export Business Leads | Find International Buyers",
    description: "Connect with verified global buyers on our international sourcing platform. Find buyers for export business today.",
    images: ['/assets/twitter-home.jpg'],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowPlatformWorks />
      <BenefitsForExporters />
      <WhySellGlobally />
      <SellerVideos />
      <Testimonials />
      <SellToUS />
      <GlobalShoppingCTA />
      <Presence />
      <Locations />
    </>
  );
}