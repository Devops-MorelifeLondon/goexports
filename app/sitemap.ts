import type { MetadataRoute } from "next";
import { connectToDatabase, ExportProfile } from "@/lib/mongodb";
import { industries } from "@/data/industries";
import { slugifyCompanyName } from "@/lib/seller";
import { getAllSpices, getAllLevel2Spices } from "@/lib/spices";
import { getAllTextiles, getAllLevel2Textiles } from "@/lib/textiles";
import { getAllBlogSlugs } from "@/lib/blogs";

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
  const sitemapMap = new Map<string, MetadataRoute.Sitemap[number]>();

  const addEntry = (entry: MetadataRoute.Sitemap[number]) => {
    if (!sitemapMap.has(entry.url)) {
      sitemapMap.set(entry.url, entry);
    }
  };

  // 1. Static Core Platform Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/spices`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/textiles`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/exports/spices`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/create-export-profile`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/exporter/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
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

  staticPages.forEach(addEntry);

  // 2. Global Industry Pages
  for (const industry of industries) {
    if (!industry.slug) continue;
    addEntry({
      url: `${BASE_URL}/${industry.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  // 3. Spices Category Pages (Level 1)
  const spices = getAllSpices();
  for (const s of spices) {
    if (!s.slug) continue;
    addEntry({
      url: `${BASE_URL}/spices/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
    addEntry({
      url: `${BASE_URL}/exports/spices/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  // 4. Spices Variety Pages (Level 2 Cultivars & Varieties)
  const level2Spices = getAllLevel2Spices();
  for (const v of level2Spices) {
    // Canonical /spices/[slug]/[variety]
    if (v.categorySlug && v.varietySlug) {
      addEntry({
        url: `${BASE_URL}/spices/${v.categorySlug}/${v.varietySlug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.88,
      });

      // Mirror /exports/spices/[slug]/[variety]
      addEntry({
        url: `${BASE_URL}/exports/spices/${v.categorySlug}/${v.varietySlug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }

    // Include v.slug if it provides a specific format
    if (v.slug) {
      const formattedSlug = v.slug.startsWith("/") ? v.slug : `/${v.slug}`;
      addEntry({
        url: `${BASE_URL}${formattedSlug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.88,
      });
    }
  }

  // 5. Textile Category Pages (Level 1)
  const textiles = getAllTextiles();
  for (const t of textiles) {
    if (!t.slug) continue;
    addEntry({
      url: `${BASE_URL}/textiles/${t.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // 6. Textile Subcategory & Variety Pages (Level 2)
  const level2Textiles = getAllLevel2Textiles();
  for (const vt of level2Textiles) {
    if (vt.categorySlug && vt.varietySlug) {
      addEntry({
        url: `${BASE_URL}/textiles/${vt.categorySlug}/${vt.varietySlug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.88,
      });
    }
  }

  // 7. Trade Intelligence & Compliance Blog Articles
  const blogSlugs = getAllBlogSlugs();
  for (const slug of blogSlugs) {
    addEntry({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88,
    });
  }

  // 8. Dynamic Exporter Profiles & Products from MongoDB
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
      addEntry({
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

          addEntry({
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

  return Array.from(sitemapMap.values());
}
