import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Selling | Sell on Amazon",
  description: "Expand your reach by selling to Amazon customers in other countries.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}