import type { Metadata } from "next";
import NotFoundClient from "@/components/NotFoundClient";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Goexports Global Trade",
  description:
    "The requested page or trade route could not be found. Discover verified international buyers, export opportunities, and global trade leads on Goexports.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
