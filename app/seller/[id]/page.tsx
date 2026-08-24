import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSellerProfile } from "@/lib/seller";
import { getExporterSessionFromRequest } from "@/lib/exporter-auth";
import SellerProfileClient from "@/components/SellerProfileClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  // Public metadata is only generated for approved profiles
  const seller = await getSellerProfile(id, false);

  if (!seller) {
    return { title: "Exporter Profile Not Found | Goexports" };
  }

  const title = `${seller.companyName} - Verified Exporter Profile | Goexports`;
  const description = `${seller.companyProfile.slice(0, 155)}... Contact ${seller.companyName} for verified ${seller.productCategory} wholesale and export orders.`;
  const url = `${BASE_URL}/${seller.slug || seller.id}`;

  return {
    title,
    description,
    keywords: [
      seller.companyName,
      `${seller.companyName} exporter`,
      `${seller.companyName} supplier`,
      `${seller.productCategory} exporter`,
      `${seller.country} exporters`,
      "verified exporter profile",
      "b2b trade portal",
      "global export supplier",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Goexports - Global Trade Platform",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function generateSellerJsonLd(seller: any) {
  const url = `${BASE_URL}/${seller.slug || seller.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seller.companyName,
    url,
    email: seller.email,
    telephone: seller.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: seller.country,
      postalCode: seller.postCode,
    },
    description: seller.companyProfile,
    areaServed: seller.targetMarkets,
    knowsAbout: [seller.productCategory, ...(seller.certifications || [])],
  };
}

export default async function SellerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let seller = await getSellerProfile(id, false);

  // If not approved for public, check if authenticated owner is viewing
  if (!seller) {
    const session = await getExporterSessionFromRequest();
    if (session) {
      const pendingSeller = await getSellerProfile(id, true);
      if (
        pendingSeller &&
        (pendingSeller.email?.toLowerCase() === session.email?.toLowerCase() ||
          pendingSeller.id === session.id ||
          pendingSeller.slug === session.slug)
      ) {
        seller = pendingSeller;
      }
    }
  }

  if (!seller) {
    notFound();
  }

  const jsonLd = generateSellerJsonLd(seller);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <SellerProfileClient seller={seller} />
    </>
  );
}
