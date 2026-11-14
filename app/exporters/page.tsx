import type { Metadata } from "next";
import { getAllApprovedExporters } from "@/lib/seller";
import ExportersDirectory from "@/components/ExportersDirectory";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Verified Exporters Directory | Global Manufacturers & Suppliers | Goexports",
  description:
    "Explore verified global exporters, manufacturers, and bulk suppliers. Filter across 14+ industries including spices, textiles, machinery, and construction materials with direct mill pricing.",
  keywords: [
    "verified exporters",
    "export directory",
    "global suppliers",
    "international manufacturers",
    "b2b exporters list",
    "indian exporters directory",
    "wholesale suppliers india",
    "direct mill sourcing",
    "verified export companies",
    "buy wholesale direct",
    "export business listing",
  ],
  alternates: {
    canonical: `${BASE_URL}/exporters`,
  },
  openGraph: {
    title: "Verified Exporters Directory | Global Manufacturers & Suppliers | Goexports",
    description:
      "Connect directly with government-compliant manufacturers, direct mills, and merchant exporters. Zero middleman markups and verified credentials.",
    url: `${BASE_URL}/exporters`,
    siteName: "Goexports - Global Trade Platform",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/assets/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: "Goexports Verified Exporters Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verified Exporters Directory | Global Manufacturers & Suppliers",
    description:
      "Directly connect with vetted global manufacturers, direct mills, and merchant exporters worldwide.",
    images: [`${BASE_URL}/assets/twitter-home.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default async function ExportersPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; country?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const initialQuery = params?.q || "";
  const initialCategory = params?.category || "all";
  const initialCountry = params?.country || "all";
  const exporters = await getAllApprovedExporters();

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Verified Exporters & Suppliers Directory",
    description: "Directory of verified global exporters and manufacturers vetted on Goexports.",
    numberOfItems: exporters.length,
    itemListElement: exporters.slice(0, 30).map((exp, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: exp.companyName,
        url: `${BASE_URL}/${exp.slug}`,
        description: exp.companyProfile?.slice(0, 160) || "",
        address: {
          "@type": "PostalAddress",
          addressCountry: exp.country || "India",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <ExportersDirectory
          initialExporters={exporters}
          initialQuery={initialQuery}
          initialCategory={initialCategory}
          initialCountry={initialCountry}
        />
      </main>
    </>
  );
}

