import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getIndustryBySlug, getAllIndustrySlugs, industries } from "@/data/industries";
import IndustryClient from "./client";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://goexports.com";

// ─── Static params for SSG ───
export async function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

// ─── Rich Metadata for SEO ───
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  const title = `${industry.title} - Export & Sell Globally | GoExports`;
  const description = `${industry.desc} Find verified international buyers for ${industry.title.toLowerCase()} products. Join 50,000+ global buyers across 190+ countries.`;
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

// ─── JSON-LD Structured Data ───
function generateJsonLd(slug: string) {
  const industry = getIndustryBySlug(slug);
  if (!industry) return null;

  const url = `${BASE_URL}/${slug}`;

  // Breadcrumb Schema
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

  // Organization Schema
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GoExports",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: "Global B2B trade platform connecting sellers with verified international buyers across 190+ countries.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English", "Hindi"],
    },
  };

  // WebPage Schema
  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${industry.title} - Export & Sell Globally`,
    description: industry.desc,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "GoExports",
      url: BASE_URL,
    },
    about: {
      "@type": "Thing",
      name: industry.title,
      description: industry.longDesc,
    },
  };

  // Professional Service Schema for Buyer Leads
  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${industry.title} Buyer Leads - GoExports`,
    description: `Verified buyer leads for ${industry.title.toLowerCase()} products and services. Connect with qualified international buyers.`,
    url,
    serviceType: "B2B Lead Generation",
    provider: {
      "@type": "Organization",
      name: "GoExports",
      url: BASE_URL,
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${industry.title} Buyer Lead Services`,
      description: `Comprehensive buyer lead generation services for ${industry.title.toLowerCase()} industry`,
    },
  };

  return { breadcrumb, organization, webpage, professionalService };
}

// ─── Page Component (Server) ───
export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const jsonLd = generateJsonLd(slug);
  const relatedIndustries = [1, 2, 3].map(
    (offset) =>
      industries[
        (industries.findIndex((ind) => ind.slug === slug) + offset) %
        industries.length
      ]
  );

  return (
    <>
      {/* JSON-LD Structured Data */}
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
        </>
      )}

      {/* Client Component */}
      <IndustryClient 
        industry={industry}
        related={relatedIndustries}
        slug={slug}
      />
    </>
  );
}
