import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTextileBySlug,
  getAllTextileSlugs,
  getAllTextiles,
  getLevel2TextilesByCategory,
} from "@/lib/textiles";
import TextileDetailClient from "@/components/TextileDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk").replace(/\/$/, "");

// ─── SSG: Pre-generate all static paths ───
export async function generateStaticParams() {
  const slugs = getAllTextileSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Programmatic SEO Metadata ───
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getTextileBySlug(slug);

  if (!data) {
    return {
      title: "Textile Export Category | GoExports",
      description: "Indian textile export specifications and supplier directory.",
    };
  }

  const title = data.meta_title;
  const description = data.meta_description;
  const url = `${BASE_URL}/textiles/${data.slug}`;
  const keywords = [
    data.category_name,
    `HS Code ${data.hs_code}`,
    `${data.category_name} exporters India`,
    `${data.category_name} wholesale suppliers`,
    "bulk Indian textile exporters",
    "B2B textile procurement",
    "export grade textiles",
    "OEKO-TEX certified fabrics India",
    "GOTS organic cotton India",
    "FCL container textile shipping",
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "GoExports",
      images: [
        {
          url: data.image,
          width: 1200,
          height: 630,
          alt: `${data.category_name} Export Specifications`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [data.image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TextileCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getTextileBySlug(slug);

  if (!data) {
    notFound();
  }

  const allTextiles = getAllTextiles();
  const relatedTextiles = allTextiles.filter((t) => t.slug !== data.slug);
  const varieties = getLevel2TextilesByCategory(data.slug);

  // Schema.org FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
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
        name: "Textiles",
        item: `${BASE_URL}/textiles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.category_name,
        item: `${BASE_URL}/textiles/${data.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TextileDetailClient
        data={data}
        relatedTextiles={relatedTextiles}
        varieties={varieties}
      />
    </>
  );
}
