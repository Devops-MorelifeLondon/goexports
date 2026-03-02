import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getIndustryBySlug, getAllIndustrySlugs, industries } from "@/data/industries";
import DrugsAndMedicinesPage from "./DrugsAndMedicinesPage";
import IndustryPageClient from "./IndustryPageClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://yoursite.com";

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

  const title = `${industry.title} - Export & Sell Globally | YourBrand`;
  const description = `${industry.desc} Find verified international buyers for ${industry.title.toLowerCase()} products. Join 50,000+ global buyers across 190+ countries.`;
  const url = `${BASE_URL}/industry/${slug}`;
  const image = `${BASE_URL}/og/industry-${slug}.png`; // Generate or place OG images

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
      siteName: "YourBrand - Global Trade Platform",
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

  const url = `${BASE_URL}/industry/${slug}`;

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
        name: "Industries",
        item: `${BASE_URL}/#industries`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: industry.title,
        item: url,
      },
    ],
  };

  // Organization Schema
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YourBrand",
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
      name: "YourBrand",
      url: BASE_URL,
    },
    about: {
      "@type": "Thing",
      name: industry.title,
      description: industry.longDesc,
    },
  };

  // FAQ Schema (for Drugs & Medicines page)
  const faqSchema = slug === "drugs-and-medicines" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What types of pharmaceutical products can I sell on this platform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can sell a wide range of pharmaceutical products including prescription medicines, OTC drugs, nutraceuticals, dietary supplements, APIs, pharma raw materials, surgical consumables, and medical devices.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need specific licenses or certifications to list drugs and medicines?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, sellers must hold valid pharmaceutical manufacturing or distribution licenses as per their country's regulations such as Drug License, GMP certification, WHO-GMP, or FDA approval.",
        },
      },
      {
        "@type": "Question",
        name: "How are international buyers verified on the platform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All buyers go through a multi-step verification process including business registration validation, trade license checks, and import permit verification.",
        },
      },
      {
        "@type": "Question",
        name: "What are the shipping and logistics options for pharmaceutical products?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer temperature-controlled cold chain logistics, express air freight for urgent shipments, and cost-effective sea freight for bulk orders with real-time tracking and GDP compliance.",
        },
      },
      {
        "@type": "Question",
        name: "How do you ensure the quality and authenticity of medicines listed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every pharmaceutical seller undergoes rigorous onboarding including facility verification, quality certification review, batch testing documentation, and periodic quality audits.",
        },
      },
      {
        "@type": "Question",
        name: "Can I sell pharmaceutical products to regulated markets like the US and EU?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, provided your products meet the regulatory requirements of the target market such as FDA approval for US or CE marking for EU. Our compliance team provides guidance.",
        },
      },
      {
        "@type": "Question",
        name: "What is the commission or fee structure for sellers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer flexible plans starting from ₹25,000/month. Commission rates vary by product category and order volume. High-volume sellers qualify for reduced rates.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to get my pharmaceutical products listed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Once you submit your registration with all required documents, verification typically takes 3-5 business days. After approval, you can start listing products immediately.",
        },
      },
      {
        "@type": "Question",
        name: "What are the payment terms for international pharmaceutical trade?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support multiple secure payment methods including Letter of Credit, bank wire transfers, escrow services, and trade financing options.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide support for regulatory compliance in different countries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our dedicated compliance team provides guidance on import/export regulations, labeling requirements, packaging standards, and documentation needed for pharmaceutical trade in over 190 countries.",
        },
      },
    ],
  } : null;

  // Product Category Schema (for Drugs & Medicines)
  const productCategory = slug === "drugs-and-medicines" ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Drugs & Medicines Product Categories",
    description: "16 specialized pharmaceutical product categories available for global trade",
    numberOfItems: 16,
    itemListElement: [
      "Common Disease Medicines",
      "Nutraceuticals & Dietary Supplements",
      "Anti Infective Drugs & Medicines",
      "Pharma Ingredients & Raw Materials",
      "Cardiovascular Drugs & Medication",
      "TB, Tumor & Cancer Drugs",
      "Pain Relief Drugs & Pharmaceuticals",
      "Digestive System Drugs & Medicines",
      "Brain & Nervous System Drugs",
      "Animal Medicines & Health Care",
      "Sexual Wellness Products",
      "Respiratory System Drugs",
      "Healthcare Products & Aids",
      "Immunization & Vaccination Drugs",
      "Homeopathic Medicines & Remedies",
      "Ayurvedic, Herbal Products & Medicine",
    ].map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      url: `${url}#categories`,
    })),
  } : null;

  return { breadcrumb, organization, webpage, faqSchema, productCategory };
}

// ─── Page Component ───
export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const jsonLd = generateJsonLd(slug);

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
          {jsonLd.faqSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqSchema) }}
            />
          )}
          {jsonLd.productCategory && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.productCategory) }}
            />
          )}
        </>
      )}

      {/* Page Content */}
      {slug === "drugs-and-medicines" ? (
        <DrugsAndMedicinesPage />
      ) : (
        <IndustryPageClient
          industry={industry}
          related={[1, 2, 3].map(
            (offset) =>
              industries[
                (industries.findIndex((ind) => ind.slug === slug) + offset) %
                industries.length
              ]
          )}
        />
      )}
    </>
  );
}