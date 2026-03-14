import HeroSection from "@/components/HeroSection";
import WhySellGlobally from "@/components/WhySellGlobally";
import SellerVideos from "@/components/SellerVideos";
import SellToUS from "@/components/SellToUS";
import GlobalShoppingCTA from "@/components/GlobalShoppingCTA";
import Presence from "@/components/Presence";
import Locations from "@/components/Locations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buyer Leads for Exporters | Get Verified International Buyers",
  description: "Connect with verified buyers from 190+ countries. Get qualified leads for importers, distributors, and wholesalers. Start your export business growth today with our proven lead generation services.",
  keywords: [
    "buyer leads for exporters",
    "verified international buyers",
    "importer leads",
    "distributor leads",
    "export business leads",
    "global trade leads",
    "wholesale buyer leads",
    "international trade leads",
    "b2b export leads",
    "verified buyer database"
  ],
  openGraph: {
    title: "Buyer Leads for Exporters | Get Verified International Buyers",
    description: "Connect with verified buyers from 190+ countries. Get qualified leads for importers, distributors, and wholesalers.",
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
    title: "Buyer Leads for Exporters | Get Verified International Buyers",
    description: "Connect with verified buyers from 190+ countries. Start your export business growth today.",
    images: ['/assets/twitter-home.jpg'],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhySellGlobally />
      <SellerVideos />
      <SellToUS />
      <GlobalShoppingCTA />
      <Presence />
      <Locations />
    </>
  );
}