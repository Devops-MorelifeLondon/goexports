import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSellerAndProduct, getSellerProfile } from "@/lib/seller";
import { getExporterSessionFromRequest } from "@/lib/exporter-auth";
import ProductDetailClient from "@/components/ProductDetailClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>;
}): Promise<Metadata> {
  const { slug, productId } = await params;
  const result = await getSellerAndProduct(slug, productId, false);

  if (!result) {
    return { title: "Product Not Found | Goexports" };
  }

  const { seller, product } = result;
  const title = `${product.title} - ${seller.companyName} | Goexports`;
  const description = `${product.description ? product.description.slice(0, 155) : `Source ${product.title} directly from verified exporter ${seller.companyName} in ${seller.country}. Direct FOB wholesale pricing.`}...`;
  const url = `${BASE_URL}/${seller.slug || seller.id}/products/${product.id}`;
  const allImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.imageUrl ? [product.imageUrl] : [];

  return {
    title,
    description,
    keywords: [
      product.title,
      product.category || seller.productCategory,
      `${product.title} exporter`,
      `${product.title} wholesale supplier`,
      `${seller.companyName} products`,
      `${seller.country} exporters`,
      "b2b product rfq",
      "export quotation",
      "global trade catalog",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Goexports - Global B2B Export Platform",
      type: "website",
      locale: "en_US",
      images: allImages.map((img) => ({
        url: img,
        width: 800,
        height: 600,
        alt: product.title,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: allImages,
    },
  };
}

function generateProductJsonLd(seller: any, product: any) {
  const url = `${BASE_URL}/${seller.slug || seller.id}/products/${product.id}`;
  const allImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.imageUrl ? [product.imageUrl] : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: allImages,
    description: product.description || `Verified export listing: ${product.title}`,
    category: product.category || seller.productCategory,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "USD",
      price: product.price ? product.price.replace(/[^0-9.]/g, "") || "0.00" : "0.00",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: seller.companyName,
        url: `${BASE_URL}/${seller.slug || seller.id}`,
      },
    },
    brand: {
      "@type": "Brand",
      name: seller.companyName,
    },
  };
}

export default async function DedicatedProductPage({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>;
}) {
  const { slug, productId } = await params;

  let result = await getSellerAndProduct(slug, productId, false);

  // If not approved for public, allow only the authenticated owner to preview their product page
  if (!result) {
    const session = await getExporterSessionFromRequest();
    if (session) {
      const pendingResult = await getSellerAndProduct(slug, productId, true);
      if (
        pendingResult &&
        (pendingResult.seller.status?.toLowerCase() === "pending" ||
          pendingResult.seller.status?.toLowerCase() === "approved" ||
          pendingResult.seller.status?.toLowerCase() === "verified") &&
        (pendingResult.seller.email?.toLowerCase() === session.email?.toLowerCase() ||
          pendingResult.seller.id === session.id ||
          pendingResult.seller.slug === session.slug)
      ) {
        result = pendingResult;
      }
    }
  }

  if (!result) {
    notFound();
  }

  const { seller, product, otherProducts } = result;
  const jsonLd = generateProductJsonLd(seller, product);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailClient
        seller={seller}
        product={product}
        otherProducts={otherProducts}
      />
    </>
  );
}
