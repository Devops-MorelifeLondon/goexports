import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhySellGlobally from "@/components/WhySellGlobally";
import SellerVideos from "@/components/SellerVideos";
import SellToUS from "@/components/SellToUS";
import GlobalShoppingCTA from "@/components/GlobalShoppingCTA";
import Presence from "@/components/Presence";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat"
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#0F1111]">
      <TopBanner />
      <Navbar />
      <HeroSection />
      <WhySellGlobally />
      <SellerVideos />
      <SellToUS />
      <GlobalShoppingCTA />
      <Presence />
      <Locations />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}