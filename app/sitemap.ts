import type { MetadataRoute } from "next";
import { connectToDatabase, ExportProfile } from "@/lib/mongodb";
import { industries } from "@/data/industries";
import { slugifyCompanyName } from "@/lib/seller";
import { getAllSpiceSlugs } from "@/lib/spices";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Cache and revalidate every 1 hour

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk").replace(/\/$/, "");

function parseSafeDate(dateVal?: string | Date | null): Date {
  if (!dateVal) return new Date();
  const d = new Date(dateVal);
  return isNaN(d.getTime()) ? new Date() : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 1. Static Core Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/create-export-profile`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/tos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Dynamic Industry Pages
  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${BASE_URL}/${industry.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Programmatic Spices Export Pages
  const spicesPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/exports/spices`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    ...getAllSpiceSlugs().map((slug) => ({
      url: `${BASE_URL}/exports/spices/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];

  // 3. Dynamic Exporter Profiles & Products from MongoDB
  const exporterPages: MetadataRoute.Sitemap = [];
  const productPages: MetadataRoute.Sitemap = [];

  try {
    await connectToDatabase();

    const activeFilter = {
      isDeleted: { $ne: true },
      status: { $in: ["approved", "verified"] },
    };

    const sellers: any[] = await ExportProfile.find(
      activeFilter,
      {
        slug: 1,
        id: 1,
        companyName: 1,
        updatedAt: 1,
        createdAt: 1,
        products: 1,
      }
    ).lean();

    for (const seller of sellers) {
      const sellerSlug = seller.slug || slugifyCompanyName(seller.companyName) || seller.id;
      if (!sellerSlug) continue;

      const sellerLastMod = parseSafeDate(seller.updatedAt || seller.createdAt);

      // Exporter Profile Page
      exporterPages.push({
        url: `${BASE_URL}/${sellerSlug}`,
        lastModified: sellerLastMod,
        changeFrequency: "daily",
        priority: 0.9,
      });

      // Exporter's Products
      if (Array.isArray(seller.products)) {
        for (const product of seller.products) {
          if (!product.id) continue;
          const productLastMod = parseSafeDate(product.createdAt || seller.updatedAt || seller.createdAt);

          productPages.push({
            url: `${BASE_URL}/${sellerSlug}/products/${product.id}`,
            lastModified: productLastMod,
            changeFrequency: "weekly",
            priority: 0.85,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error generating dynamic sitemap from MongoDB:", error);
  }

  return [...staticPages, ...industryPages, ...spicesPages, ...exporterPages, ...productPages];
}
