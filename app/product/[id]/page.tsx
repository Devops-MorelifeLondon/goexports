import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getProductById } from "@/lib/seller";
import { getExporterSessionFromRequest } from "@/lib/exporter-auth";
import ProductDetailClient from "@/components/ProductDetailClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const result = await getProductById(id, false);

  if (!result) {
    return { title: "Product Not Found | Goexports" };
  }

  const { seller, product } = result;
  const title = `${product.title} - ${seller.companyName} | Goexports`;
  const description = `${product.description ? product.description.slice(0, 155) : `Source ${product.title} directly from verified exporter ${seller.companyName} in ${seller.country}. Direct FOB wholesale pricing.`}...`;
  const url = `${BASE_URL}/${seller.slug || seller.id}/products/${product.id}`;

  return {
    title,
    description,
    keywords: [
      product.title,
      product.category || seller.productCategory,
      `${product.title} exporter`,
      `${product.title} supplier`,
      `${seller.companyName} products`,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: product.imageUrl ? [{ url: product.imageUrl }] : undefined,
    },
  };
}

export default async function DirectProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let result = await getProductById(id, false);

  if (!result) {
    const session = await getExporterSessionFromRequest();
    if (session) {
      const pendingResult = await getProductById(id, true);
      if (
        pendingResult &&
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

  // Canonical redirect to hierarchical storefront product URL
  const { seller, product } = result;
  redirect(`/${seller.slug || seller.id}/products/${product.id}`);
}
