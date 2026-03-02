import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Global Selling | Sell on Amazon",
  description:
    "Expand your reach by selling to Amazon customers in other countries.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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