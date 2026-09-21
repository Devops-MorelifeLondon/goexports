import fs from "fs";
import path from "path";

function loadRawBlogs(): any[] {
  try {
    const filePath = path.join(process.cwd(), "data", "blogs-data.json");
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading blogs-data.json via fs:", err);
  }
  try {
    return require("@/data/blogs-data.json");
  } catch {
    return [];
  }
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogTableOfContentsItem {
  id: string;
  title: string;
  level: number; // 2 for H2, 3 for H3
}

export interface BlogPost {
  id: string;
  index: number;
  slug: string;
  cleanSlug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  category: string;
  categorySlug: string;
  readTimeMinutes: number;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  introduction: string;
  bodyContent: string;
  tableOfContents: BlogTableOfContentsItem[];
  faqs: BlogFaq[];
  callToAction: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
  description: string;
  color: string;
  accentBg: string;
}

// Clean slug utility
export function cleanRawSlug(rawSlug?: string | null): string {
  if (!rawSlug) return "";
  return rawSlug
    .replace(/^https?:\/\/[^/]+\/blog\//, "")
    .replace(/^https?:\/\/[^/]+\//, "")
    .replace(/^\/?blog\//, "")
    .replace(/^\//, "")
    .replace(/\/$/, "")
    .trim();
}

// Slugify string for IDs
export function slugifyText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

// Sanitize text for common OCR / global replace glitches
export function sanitizeContentText(text: string): string {
  if (!text) return "";
  return text
    .replace(/\bfinullcial\b/gi, "financial")
    .replace(/\bfinullcially\b/gi, "financially")
    .replace(/\bfinullcials\b/gi, "financials")
    .replace(/\bfinullce\b/gi, "finance")
    .replace(/\bfinullces\b/gi, "finances")
    .replace(/\bfinullced\b/gi, "financed")
    .replace(/\bfinullcing\b/gi, "financing")
    .replace(/\bmaintenullce\b/gi, "maintenance")
    .replace(/\bgovernullce\b/gi, "governance")
    .replace(/\\null\s+/gi, "An ")
    .replace(/\bnull\s+Importer/gi, "An Importer")
    .replace(/\bnull\s+AD\s+Code/gi, "An AD Code")
    .replace(/\bnull\s+IEC/gi, "An IEC")
    .replace(/\bnully\b/gi, "Any")
    .trim();
}

// Extract Table of Contents from markdown body
export function extractTableOfContents(body: string): BlogTableOfContentsItem[] {
  const lines = body.split("\n");
  const items: BlogTableOfContentsItem[] = [];
  const seenIds = new Set<string>();

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
      const isH2 = trimmed.startsWith("## ");
      const rawTitle = isH2 ? trimmed.replace(/^##\s+/, "") : trimmed.replace(/^###\s+/, "");
      const cleanTitle = rawTitle.replace(/\*\*/g, "").trim();
      let baseId = slugifyText(cleanTitle);
      if (!baseId) baseId = "section";
      
      let uniqueId = baseId;
      let counter = 1;
      while (seenIds.has(uniqueId)) {
        uniqueId = `${baseId}-${counter}`;
        counter++;
      }
      seenIds.add(uniqueId);

      items.push({
        id: uniqueId,
        title: cleanTitle,
        level: isH2 ? 2 : 3,
      });
    }
  }

  return items;
}

// Categorization helper based on keywords and title
function deriveCategory(primaryKeyword: string, title: string): { name: string; slug: string } {
  const text = `${primaryKeyword} ${title}`.toLowerCase();

  if (text.includes("incoterm") || text.includes("fob") || text.includes("cif") || text.includes("freight") || text.includes("shipping") || text.includes("fcl") || text.includes("lcl") || text.includes("logistics")) {
    return { name: "Logistics & Incoterms", slug: "logistics-incoterms" };
  }

  if (text.includes("hs code") || text.includes("hsn code") || text.includes("duty") || text.includes("landed cost") || text.includes("tariff")) {
    return { name: "Tariffs & HS Codes", slug: "tariffs-hs-codes" };
  }

  if (text.includes("document") || text.includes("checklist") || text.includes("invoice") || text.includes("packing list") || text.includes("bill of lading") || text.includes("airway bill") || text.includes("certificate of origin") || text.includes("customs clearance")) {
    return { name: "Documentation & Customs", slug: "documentation-customs" };
  }

  if (text.includes("payment") || text.includes("letter of credit") || text.includes("credit insurance") || text.includes("insurance") || text.includes("finance")) {
    return { name: "Trade Finance & Risk", slug: "trade-finance-risk" };
  }

  if (text.includes("china") || text.includes("uae") || text.includes("usa") || text.includes("uk") || text.includes("buyers") || text.includes("suppliers") || text.includes("verify")) {
    return { name: "Global Markets & Sourcing", slug: "global-markets-sourcing" };
  }

  return { name: "Starting & Compliance", slug: "starting-compliance" };
}

// Estimated publish dates formatted cleanly (recent dates staggered for realism)
function getPublishedDate(index: number): string {
  const baseDate = new Date(2026, 1, 15); // Feb 15, 2026
  baseDate.setDate(baseDate.getDate() + (index % 25));
  return baseDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Process and parse all blogs once
let cachedBlogs: BlogPost[] | null = null;

export function getAllBlogs(): BlogPost[] {
  if (cachedBlogs) return cachedBlogs;

  const rawList = loadRawBlogs();
  const processed: BlogPost[] = [];
  const slugCounts = new Map<string, number>();

  rawList.forEach((item: any, index: number) => {
    const rawSlug = item.meta_data?.url_slug || "";
    let cleanSlug = cleanRawSlug(rawSlug);

    // Handle collision between item 0 and item 1
    if (index === 1 && cleanSlug === "how-to-start-an-export-business-in-india") {
      cleanSlug = "how-to-start-an-export-business-in-india-compliance-guide";
    } else if (slugCounts.has(cleanSlug)) {
      const count = (slugCounts.get(cleanSlug) || 0) + 1;
      slugCounts.set(cleanSlug, count);
      cleanSlug = `${cleanSlug}-${count}`;
    } else {
      slugCounts.set(cleanSlug, 1);
    }

    const title = sanitizeContentText(item.page_content?.h1_title || item.meta_data?.meta_title || "Export Trade Guide");
    const metaTitle = sanitizeContentText(item.meta_data?.meta_title || title);
    const metaDescription = sanitizeContentText(item.meta_data?.meta_description || "");
    const ogTitle = sanitizeContentText(item.meta_data?.og_title || metaTitle);
    const ogDescription = sanitizeContentText(item.meta_data?.og_description || metaDescription);
    const primaryKeyword = sanitizeContentText(item.seo_and_strategy?.primary_keyword || "");
    const secondaryKeywords = (item.seo_and_strategy?.secondary_keywords || []).map((k: string) => sanitizeContentText(k));
    const searchIntent = sanitizeContentText(item.seo_and_strategy?.search_intent || "");

    const rawIntro = item.page_content?.blog_page_sections?.introduction || "";
    const introduction = sanitizeContentText(rawIntro);

    const rawBody = item.page_content?.blog_page_sections?.body_content || "";
    const bodyContent = sanitizeContentText(rawBody);

    // Calculate reading time (~200 words per minute)
    const totalWords = `${introduction} ${bodyContent}`.split(/\s+/).length;
    const readTimeMinutes = Math.max(4, Math.ceil(totalWords / 200));

    // Extract FAQs
    const rawFaqs = item.page_content?.faqs || [];
    const faqs: BlogFaq[] = rawFaqs.map((faq: any) => ({
      question: sanitizeContentText(faq.question || ""),
      answer: sanitizeContentText(faq.answer || ""),
    }));

    const callToAction = sanitizeContentText(item.page_content?.call_to_action || "");
    const { name: categoryName, slug: categorySlug } = deriveCategory(primaryKeyword, title);
    const tableOfContents = extractTableOfContents(bodyContent);

    processed.push({
      id: `blog-${index}`,
      index,
      slug: cleanSlug,
      cleanSlug,
      title,
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      primaryKeyword,
      secondaryKeywords,
      searchIntent,
      category: categoryName,
      categorySlug,
      readTimeMinutes,
      publishedDate: getPublishedDate(index),
      author: {
        name: "GoExports Trade Intelligence",
        role: "Global Trade Compliance & Advisory Desk",
      },
      introduction,
      bodyContent,
      tableOfContents,
      faqs,
      callToAction,
    });
  });

  cachedBlogs = processed;
  return processed;
}

// Get single blog post by slug
export function getBlogBySlug(slug: string): BlogPost | null {
  const normalized = cleanRawSlug(slug);
  const blogs = getAllBlogs();
  return blogs.find((b) => b.slug === normalized || b.cleanSlug === normalized) || null;
}

// Get all slugs for generateStaticParams
export function getAllBlogSlugs(): string[] {
  return getAllBlogs().map((b) => b.slug);
}

// Get related blogs
export function getRelatedBlogs(currentSlug: string, category: string, limit = 3): BlogPost[] {
  const blogs = getAllBlogs();
  const filtered = blogs.filter(
    (b) => b.slug !== currentSlug && b.category.toLowerCase() === category.toLowerCase()
  );
  if (filtered.length >= limit) {
    return filtered.slice(0, limit);
  }
  const remaining = blogs.filter(
    (b) => b.slug !== currentSlug && !filtered.some((f) => f.slug === b.slug)
  );
  return [...filtered, ...remaining].slice(0, limit);
}

// Get all categories with counts
export function getAllBlogCategories(): BlogCategory[] {
  const blogs = getAllBlogs();
  const categoryMeta: Record<string, { description: string; color: string; accentBg: string }> = {
    "Starting & Compliance": {
      description: "Business structures, IEC registration, DGFT rules, and legal export setup in India.",
      color: "#ff4d8b",
      accentBg: "rgba(255, 77, 139, 0.1)",
    },
    "Documentation & Customs": {
      description: "Commercial invoices, packing lists, bill of lading, certificate of origin, and ICEGATE clearance.",
      color: "#1a3a3a",
      accentBg: "rgba(26, 58, 58, 0.1)",
    },
    "Tariffs & HS Codes": {
      description: "HSN code classification, customs duty calculation, CAROTAR 2020, and landed cost models.",
      color: "#e8b94a",
      accentBg: "rgba(232, 185, 74, 0.15)",
    },
    "Logistics & Incoterms": {
      description: "FOB vs CIF vs EXW vs DDP, ocean vs air freight, FCL vs LCL, and freight forwarders.",
      color: "#10b981",
      accentBg: "rgba(16, 185, 129, 0.1)",
    },
    "Trade Finance & Risk": {
      description: "Letters of credit (LC), ECGC credit insurance, payment terms, and foreign exchange compliance.",
      color: "#6366f1",
      accentBg: "rgba(99, 102, 241, 0.1)",
    },
    "Global Markets & Sourcing": {
      description: "B2B buyer finding, supplier verification, and bilateral trade guides for UAE, USA, UK, and China.",
      color: "#f97316",
      accentBg: "rgba(249, 115, 22, 0.1)",
    },
  };

  const counts = new Map<string, number>();
  blogs.forEach((b) => {
    counts.set(b.category, (counts.get(b.category) || 0) + 1);
  });

  return Object.entries(categoryMeta).map(([name, meta]) => ({
    name,
    slug: slugifyText(name),
    count: counts.get(name) || 0,
    description: meta.description,
    color: meta.color,
    accentBg: meta.accentBg,
  }));
}
