import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllLevel2Textiles,
  getLevel2TextileByParams,
  getLevel2TextileBySlug,
  getAllLevel2TextileParams,
  getLevel2TextilesByCategory,
  getAllTextiles,
} from "@/lib/textiles";
import TextileLevel2DetailClient from "@/components/TextileLevel2DetailClient";

interface PageProps {
  params: Promise<{ slug: string; variety: string }>;
}

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk").replace(/\/$/, "");

// ─── SSG: Pre-generate all static paths for all 33 Level-2 varieties ───
export async function generateStaticParams() {
  return getAllLevel2TextileParams();
}

// ─── Programmatic SEO Metadata ───
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, variety } = await params;
  const data =
    getLevel2TextileByParams(slug, variety) ||
    getLevel2TextileBySlug(`/textiles/${slug}/${variety}`);

  if (!data) {
    return {
      title: "Textile Specification & Exporters | GoExports",
      description: "Indian textile sub-category specifications and supplier directory.",
    };
  }

  const title = data.meta_title;
  const description = data.meta_description;
  const url = `${BASE_URL}${data.url_slug}`;
  const parentName = data.parentCategory?.category_name || data.parent_category;

  const keywords = [
    data.sub_category_name,
    `${data.sub_category_name} exporters India`,
    `bulk ${data.sub_category_name}`,
    `wholesale ${data.sub_category_name}`,
    `${parentName} exporter India`,
    `HS Code ${data.hs_code}`,
    "B2B textile procurement",
    "export grade textiles",
    "OEKO-TEX certified fabrics India",
    "containerized textile dispatch",
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
          alt: `${data.sub_category_name} Export Specifications`,
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

export default async function TextileVarietyPage({ params }: PageProps) {
  const { slug, variety } = await params;
  const data =
    getLevel2TextileByParams(slug, variety) ||
    getLevel2TextileBySlug(`/textiles/${slug}/${variety}`);

  if (!data) {
    notFound();
  }

  const siblingVarieties = getLevel2TextilesByCategory(slug);
  const allCategories = getAllTextiles();
  const relatedCategories = allCategories.filter((c) => c.slug !== slug);

  const parentName = data.parentCategory?.category_name || data.parent_category;

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
        name: parentName,
        item: `${BASE_URL}/textiles/${slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: data.sub_category_name,
        item: `${BASE_URL}${data.url_slug}`,
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
      <TextileLevel2DetailClient
        data={data}
        siblingVarieties={siblingVarieties}
        relatedCategories={relatedCategories}
      />
    </>
  );
}
