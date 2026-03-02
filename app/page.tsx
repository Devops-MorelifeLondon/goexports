import HeroSection from "@/components/HeroSection";
import WhySellGlobally from "@/components/WhySellGlobally";
import SellerVideos from "@/components/SellerVideos";
import SellToUS from "@/components/SellToUS";
import GlobalShoppingCTA from "@/components/GlobalShoppingCTA";
import Presence from "@/components/Presence";
import Locations from "@/components/Locations";

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