import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getIndustryBySlug, getAllIndustrySlugs, industries } from "@/data/industries";
import { getSellerProfile } from "@/lib/seller";
import { getExporterSessionFromRequest } from "@/lib/exporter-auth";
import IndustryClient from "./client";
import SellerProfileClient from "@/components/SellerProfileClient";
import metadata from "@/data/industry-content-2.json";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk";

// ─── Static params for SSG (Industries) ───
export async function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

// ─── Rich Metadata for SEO ───
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  // 1. Check if Industry
  if (industry) {
    const title = `${industry.title} - Export & Sell Globally | GoExports`;
    const description = `${industry.desc} Find verified international buyers for ${industry.title.toLowerCase()} products worldwide.`;
    const url = `${BASE_URL}/${slug}`;
    const image = `${BASE_URL}/og/industry-${slug}.png`;

    return {
      title,
      description,
      keywords: [
        industry.title,
        `${industry.title} exporters`,
        `${industry.title} suppliers`,
        `sell ${industry.title.toLowerCase()} globally`,
        `${industry.title.toLowerCase()} international buyers`,
        `export ${industry.title.toLowerCase()}`,
        `${industry.title.toLowerCase()} wholesale`,
        `${industry.title.toLowerCase()} manufacturers`,
        "B2B marketplace",
        "global trade",
        "international trade platform",
      ],
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "GoExports - Global Trade Platform",
        type: "website",
        locale: "en_US",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: `${industry.title} - Sell Globally`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
      robots: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large" as const,
        "max-video-preview": -1,
      },
    };
  }

  // 2. Check if Exporter / Seller Profile
  const seller = await getSellerProfile(slug);
  if (seller) {
    const title = `${seller.companyName} - Verified Exporter Profile | Goexports`;
    const description = `${seller.companyProfile.slice(0, 155)}... Contact ${seller.companyName} for verified ${seller.productCategory} wholesale and export orders.`;
    const url = `${BASE_URL}/${seller.slug || slug}`;

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
      ],
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "GoExports - Global Trade Platform",
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

  return { title: "Page Not Found | Goexports" };
}

// ─── JSON-LD Structured Data for Industry ───
function generateIndustryJsonLd(slug: string, metaIndustry: any[] | null) {
  const industry = getIndustryBySlug(slug);
  if (!industry) return null;

  const url = `${BASE_URL}/${slug}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: industry.title,
        item: url,
      },
    ],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GoExports",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "Global B2B trade platform connecting sellers with verified international buyers worldwide.",
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${industry.title} - Export & Sell Globally`,
    description: industry.desc,
    url,
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${industry.title} Buyer Leads - GoExports`,
    description: `Verified buyer leads for ${industry.title.toLowerCase()} products.`,
    url,
    serviceType: "B2B Lead Generation",
    provider: {
      "@type": "Organization",
      name: "GoExports",
      url: BASE_URL,
    },
    areaServed: "Worldwide",
  };

  // FAQ SCHEMA
  const faq =
    metaIndustry && metaIndustry.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: metaIndustry.map((faq: any) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return { breadcrumb, organization, webpage, professionalService, faq };
}

// ─── JSON-LD Structured Data for Seller ───
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

// ─── Page Component (Server) ───
export default async function DynamicSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. If matching Industry
  const industry = getIndustryBySlug(slug);
  if (industry) {
    const metaIndustry = metadata.industries.find((item: any) => item.slug === slug)?.faqs;
    const jsonLd = generateIndustryJsonLd(slug, metaIndustry || null);
    const relatedIndustries = [1, 2, 3].map(
      (offset) =>
        industries[
          (industries.findIndex((ind) => ind.slug === slug) + offset) %
          industries.length
        ]
    );

    return (
      <>
        {jsonLd && (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.organization) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webpage) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.professionalService) }}
            />
            {jsonLd.faq && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faq) }}
              />
            )}
          </>
        )}

        <IndustryClient industry={industry} related={relatedIndustries} slug={slug} />
      </>
    );
  }

  // 2. If matching Exporter / Seller Profile
  let seller = await getSellerProfile(slug, false);

  // If not approved for public, allow only the authenticated owner to preview their own profile
  if (!seller) {
    const session = await getExporterSessionFromRequest();
    if (session) {
      const pendingSeller = await getSellerProfile(slug, true);
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

  if (seller) {
    const sellerJsonLd = generateSellerJsonLd(seller);

    return (
      <>
        {sellerJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(sellerJsonLd) }}
          />
        )}
        <SellerProfileClient seller={seller} />
      </>
    );
  }

  // 3. Not Found
  notFound();
}
