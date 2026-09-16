import fs from "fs";
import path from "path";

export interface TextileExportForm {
  form: string;
  best_use_case: string;
  industry_application: string;
}

export interface TextileQualityCompliance {
  standard_certifications: string;
  packaging_options: string;
}

export interface TextileFAQ {
  question: string;
  answer: string;
}

export interface TextileCategoryData {
  category_name: string;
  url_slug: string; // e.g. "/textiles/cotton-yarn"
  slug: string;     // e.g. "cotton-yarn"
  hs_code: number | string;
  meta_title: string;
  meta_description: string;
  hero_headline: string;
  overview: string;
  export_forms_details: TextileExportForm[];
  quality_and_compliance: TextileQualityCompliance;
  target_buyer_profiles: string[];
  faqs: TextileFAQ[];
  image: string;
  secondaryImage?: string;
  varieties?: TextileLevel2Data[];
}

export interface TextileTechSpec {
  parameter: string;
  specification_range: string;
}

export interface TextileSourcingStep {
  step: number | string;
  title: string;
  description: string;
}

export interface TextileLevel2Data {
  parent_category: string;
  sub_category_name: string;
  url_slug: string; // e.g. "/textiles/cotton-yarn/combed"
  slug: string;     // e.g. "/textiles/cotton-yarn/combed"
  categorySlug: string; // e.g. "cotton-yarn"
  varietySlug: string;  // e.g. "combed"
  hs_code: number | string;
  meta_title: string;
  meta_description: string;
  hero_headline: string;
  hero_subheadline: string;
  commercial_overview: string;
  technical_specifications: TextileTechSpec[];
  applications_and_end_uses: string[];
  export_packaging_and_moq: {
    standard_packaging: string;
    typical_moq: string;
  };
  quality_certifications_supported: string[];
  sourcing_process_steps: TextileSourcingStep[];
  faqs: TextileFAQ[];
  image: string;
  secondaryImage?: string;
  parentCategory?: TextileCategoryData;
}

const TEXTILE_IMAGES: Record<string, { main: string; secondary?: string }> = {
  "cotton-yarn": {
    main: "https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg",
    secondary: "https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg",
  },
  "cotton-fabrics": {
    main: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
    secondary: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
  },
  "silk-fabrics": {
    main: "https://images.pexels.com/photos/10499692/pexels-photo-10499692.jpeg",
    secondary: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
  },
  "polyester-yarn": {
    main: "https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg",
    secondary: "https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg",
  },
  "denim-fabric": {
    main: "https://images.pexels.com/photos/603022/pexels-photo-603022.jpeg",
    secondary: "https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg",
  },
  "jute": {
    main: "https://images.pexels.com/photos/6684784/pexels-photo-6684784.jpeg",
    secondary: "https://images.pexels.com/photos/5988179/pexels-photo-5988179.jpeg",
  },
  "viscose-rayon": {
    main: "https://images.pexels.com/photos/7147717/pexels-photo-7147717.jpeg",
    secondary: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
  },
  "knitted-fabrics": {
    main: "https://images.pexels.com/photos/7679863/pexels-photo-7679863.jpeg",
    secondary: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
  },
  "non-woven": {
    main: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg",
    secondary: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
  },
  "linen-fabrics": {
    main: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
    secondary: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
  },
  "bed-linen": {
    main: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
    secondary: "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg",
  },
  "terry-towels": {
    main: "https://images.pexels.com/photos/4210850/pexels-photo-4210850.jpeg",
    secondary: "https://images.pexels.com/photos/6045330/pexels-photo-6045330.jpeg",
  },
  "woolen-yarn": {
    main: "https://images.pexels.com/photos/6045330/pexels-photo-6045330.jpeg",
    secondary: "https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg",
  },
  "synthetic-blends": {
    main: "https://images.pexels.com/photos/4620612/pexels-photo-4620612.jpeg",
    secondary: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
  },
  "rmg": {
    main: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
    secondary: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg",
  },
};

const VARIETY_IMAGES: Record<string, { main: string; secondary?: string }> = {
  // Cotton Yarn
  "cotton-yarn/combed": {
    main: "https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg",
    secondary: "https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg",
  },
  "cotton-yarn/carded": {
    main: "https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg",
    secondary: "https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg",
  },
  "cotton-yarn/open-end": {
    main: "https://images.pexels.com/photos/236748/pexels-photo-236748.jpeg",
    secondary: "https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg",
  },
  // Cotton Fabrics
  "cotton-fabrics/woven": {
    main: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
    secondary: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
  },
  "cotton-fabrics/printed": {
    main: "https://images.pexels.com/photos/4620612/pexels-photo-4620612.jpeg",
    secondary: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
  },
  // Silk Fabrics
  "silk-fabrics/mulberry": {
    main: "https://images.pexels.com/photos/10499692/pexels-photo-10499692.jpeg",
    secondary: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
  },
  "silk-fabrics/tussar": {
    main: "https://images.pexels.com/photos/7147717/pexels-photo-7147717.jpeg",
    secondary: "https://images.pexels.com/photos/10499692/pexels-photo-10499692.jpeg",
  },
  // Polyester Yarn
  "polyester-yarn/dty": {
    main: "https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg",
    secondary: "https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg",
  },
  "polyester-yarn/fdy": {
    main: "https://images.pexels.com/photos/236748/pexels-photo-236748.jpeg",
    secondary: "https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg",
  },
  // Denim
  "denim-fabric/raw-indigo": {
    main: "https://images.pexels.com/photos/603022/pexels-photo-603022.jpeg",
    secondary: "https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg",
  },
  "denim-fabric/stretch": {
    main: "https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg",
    secondary: "https://images.pexels.com/photos/603022/pexels-photo-603022.jpeg",
  },
  "denim-fabric/selvedge": {
    main: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg",
    secondary: "https://images.pexels.com/photos/603022/pexels-photo-603022.jpeg",
  },
  // Jute
  "jute/bags-sacks": {
    main: "https://images.pexels.com/photos/6684784/pexels-photo-6684784.jpeg",
    secondary: "https://images.pexels.com/photos/5988179/pexels-photo-5988179.jpeg",
  },
  "jute/twine-yarn": {
    main: "https://images.pexels.com/photos/5988179/pexels-photo-5988179.jpeg",
    secondary: "https://images.pexels.com/photos/6684784/pexels-photo-6684784.jpeg",
  },
  // Viscose & Rayon
  "viscose-rayon/spun-yarn": {
    main: "https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg",
    secondary: "https://images.pexels.com/photos/7147717/pexels-photo-7147717.jpeg",
  },
  "viscose-rayon/woven": {
    main: "https://images.pexels.com/photos/7147717/pexels-photo-7147717.jpeg",
    secondary: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
  },
  // Knits
  "knitted-fabrics/jersey": {
    main: "https://images.pexels.com/photos/7679863/pexels-photo-7679863.jpeg",
    secondary: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
  },
  "knitted-fabrics/rib-knit": {
    main: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
    secondary: "https://images.pexels.com/photos/7679863/pexels-photo-7679863.jpeg",
  },
  "knitted-fabrics/fleece": {
    main: "https://images.pexels.com/photos/459486/pexels-photo-459486.jpeg",
    secondary: "https://images.pexels.com/photos/7679863/pexels-photo-7679863.jpeg",
  },
  // Non-Woven
  "non-woven/spunbond": {
    main: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg",
    secondary: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
  },
  "non-woven/meltblown": {
    main: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg",
    secondary: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
  },
  // Linen
  "linen-fabrics/pure": {
    main: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
    secondary: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
  },
  "linen-fabrics/blend": {
    main: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
    secondary: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
  },
  // Bed Linen
  "bed-linen/sheets": {
    main: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
    secondary: "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg",
  },
  "bed-linen/duvet": {
    main: "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg",
    secondary: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
  },
  // Terry Towels
  "terry-towels/bath": {
    main: "https://images.pexels.com/photos/4210850/pexels-photo-4210850.jpeg",
    secondary: "https://images.pexels.com/photos/6045330/pexels-photo-6045330.jpeg",
  },
  "terry-towels/hotel": {
    main: "https://images.pexels.com/photos/6045330/pexels-photo-6045330.jpeg",
    secondary: "https://images.pexels.com/photos/4210850/pexels-photo-4210850.jpeg",
  },
  // Woolen Yarn
  "woolen-yarn/worsted": {
    main: "https://images.pexels.com/photos/6045330/pexels-photo-6045330.jpeg",
    secondary: "https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg",
  },
  "woolen-yarn/blended": {
    main: "https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg",
    secondary: "https://images.pexels.com/photos/6045330/pexels-photo-6045330.jpeg",
  },
  // Synthetic Blends
  "synthetic-blends/pc": {
    main: "https://images.pexels.com/photos/4620612/pexels-photo-4620612.jpeg",
    secondary: "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg",
  },
  "synthetic-blends/pv": {
    main: "https://images.pexels.com/photos/7147717/pexels-photo-7147717.jpeg",
    secondary: "https://images.pexels.com/photos/4620612/pexels-photo-4620612.jpeg",
  },
  // RMG
  "rmg/woven-shirts": {
    main: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
    secondary: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg",
  },
  "rmg/t-shirts": {
    main: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg",
    secondary: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
  },
};

const DEFAULT_TEXTILE_IMAGE = "https://images.pexels.com/photos/6292/fabric-textile-cloth-weaving.jpg";

let cachedTextiles: TextileCategoryData[] | null = null;
let cachedLevel2Textiles: TextileLevel2Data[] | null = null;

export function getAllTextiles(): TextileCategoryData[] {
  if (cachedTextiles) {
    return cachedTextiles;
  }

  try {
    const filePath = path.join(process.cwd(), "data", "level-1-textile.json");
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const sanitized = raw.replace(/:\s*NaN\b/g, ": null");
    const parsed = JSON.parse(sanitized);

    const textiles: TextileCategoryData[] = parsed.map((item: any) => {
      const urlSlug = String(item.url_slug || "").trim();
      const slug = urlSlug.replace(/^\/textiles\/?/, "").replace(/^\/+|\/+$/g, "");
      const imgConfig = TEXTILE_IMAGES[slug] || { main: DEFAULT_TEXTILE_IMAGE };

      return {
        category_name: String(item.category_name || "").trim(),
        url_slug: urlSlug.startsWith("/") ? urlSlug : `/${urlSlug}`,
        slug,
        hs_code: item.hs_code ? String(item.hs_code) : "5205",
        meta_title: String(item.meta_title || `${item.category_name} Sourcing & Exporters | B2B Procurement`),
        meta_description: String(item.meta_description || item.overview || ""),
        hero_headline: String(item.hero_headline || `Source Verified ${item.category_name} from India`),
        overview: String(item.overview || ""),
        export_forms_details: Array.isArray(item.export_forms_details) ? item.export_forms_details : [],
        quality_and_compliance: {
          standard_certifications:
            item.quality_and_compliance?.standard_certifications ||
            "OEKO-TEX Standard 100, GOTS Certified Organic, BCI, and ISO 9001:2015.",
          packaging_options:
            item.quality_and_compliance?.packaging_options ||
            "Export standard roll or carton packaging wrapped in multi-ply moisture protection."
        },
        target_buyer_profiles: Array.isArray(item.target_buyer_profiles) ? item.target_buyer_profiles : [],
        faqs: Array.isArray(item.faqs) ? item.faqs : [],
        image: imgConfig.main,
        secondaryImage: imgConfig.secondary || imgConfig.main,
      };
    });

    cachedTextiles = textiles;
    return textiles;
  } catch (error) {
    console.error("Error loading textiles dataset:", error);
    return [];
  }
}

export function getTextileBySlug(slug: string): TextileCategoryData | null {
  const textiles = getAllTextiles();
  const normalized = slug.toLowerCase().replace(/^\/+|\/+$/g, "").replace(/^textiles\//, "");
  return (
    textiles.find(
      (t) =>
        t.slug.toLowerCase() === normalized ||
        t.category_name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalized
    ) || null
  );
}

export function getAllTextileSlugs(): string[] {
  return getAllTextiles().map((t) => t.slug);
}

// ─── Level 2 Textile Subcategory / Variety Functions ───

export function getAllLevel2Textiles(): TextileLevel2Data[] {
  if (cachedLevel2Textiles) {
    return cachedLevel2Textiles;
  }

  try {
    const filePath = path.join(process.cwd(), "data", "textile-data-level-2.json");
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const sanitized = raw.replace(/:\s*NaN\b/g, ": null");
    const parsed = JSON.parse(sanitized);
    const parentCategories = getAllTextiles();

    const level2List: TextileLevel2Data[] = parsed.map((item: any) => {
      const slugRaw = String(item.url_slug || "").trim();
      const slugClean = slugRaw.replace(/^\/+|\/+$/g, ""); // e.g. "textiles/cotton-yarn/combed"
      const parts = slugClean.split("/"); // ["textiles", "cotton-yarn", "combed"]
      const categorySlug = parts.length >= 3 ? parts[1] : parts[0] || "textile";
      const varietySlug = parts.length >= 3 ? parts[2] : parts[1] || slugClean;

      const parentCategory =
        parentCategories.find((p) => p.slug === categorySlug) ||
        parentCategories.find(
          (p) => p.category_name.toLowerCase() === String(item.parent_category || "").toLowerCase()
        ) ||
        parentCategories.find(
          (p) =>
            p.category_name.toLowerCase().includes(String(item.parent_category || "").toLowerCase()) ||
            String(item.parent_category || "").toLowerCase().includes(p.category_name.toLowerCase())
        );

      const varietyKey = `${categorySlug}/${varietySlug}`;
      const varImgConfig =
        VARIETY_IMAGES[varietyKey] ||
        TEXTILE_IMAGES[categorySlug] || { main: DEFAULT_TEXTILE_IMAGE };

      return {
        parent_category: String(item.parent_category || "").trim(),
        sub_category_name: String(item.sub_category_name || "").trim(),
        url_slug: slugRaw.startsWith("/") ? slugRaw : `/${slugRaw}`,
        slug: slugRaw.startsWith("/") ? slugRaw : `/${slugRaw}`,
        categorySlug,
        varietySlug,
        hs_code: item.hs_code ? String(item.hs_code) : parentCategory?.hs_code || "5205",
        meta_title: String(item.meta_title || `${item.sub_category_name} Sourcing & Exporters | B2B`),
        meta_description: String(item.meta_description || item.commercial_overview || ""),
        hero_headline: String(item.hero_headline || `Source ${item.sub_category_name} Direct from India`),
        hero_subheadline: String(item.hero_subheadline || "Vetted export mills, factory pricing & full international compliance."),
        commercial_overview: String(item.commercial_overview || ""),
        technical_specifications: Array.isArray(item.technical_specifications) ? item.technical_specifications : [],
        applications_and_end_uses: Array.isArray(item.applications_and_end_uses) ? item.applications_and_end_uses : [],
        export_packaging_and_moq: {
          standard_packaging:
            item.export_packaging_and_moq?.standard_packaging ||
            parentCategory?.quality_and_compliance.packaging_options ||
            "Export standard seaworthy packaging with moisture barrier.",
          typical_moq:
            item.export_packaging_and_moq?.typical_moq ||
            "1x 20ft FCL container or commercial sampling lots on request."
        },
        quality_certifications_supported: Array.isArray(item.quality_certifications_supported)
          ? item.quality_certifications_supported
          : ["OEKO-TEX Standard 100", "GOTS", "BCI", "ISO 9001:2015"],
        sourcing_process_steps: Array.isArray(item.sourcing_process_steps)
          ? item.sourcing_process_steps
          : [
              {
                step: 1,
                title: "Submit Technical RFQ",
                description: "Specify yarn count, construction, GSM, certifications, and destination port.",
              },
              {
                step: 2,
                title: "Mill Matching & Discovery",
                description: "Requirements routed to verified Indian spinning and weaving mills.",
              },
              {
                step: 3,
                title: "Sampling & Quality Testing",
                description: "Receive physical yarn cones or fabric swatches along with Uster test certificates.",
              },
              {
                step: 4,
                title: "Contracting & Dispatch",
                description: "Finalize export proforma with L/C terms and pre-shipment container inspection.",
              },
            ],
        faqs: Array.isArray(item.faqs) ? item.faqs : [],
        image: varImgConfig.main,
        secondaryImage: varImgConfig.secondary || varImgConfig.main,
        parentCategory
      };
    });

    cachedLevel2Textiles = level2List;
    return level2List;
  } catch (error) {
    console.error("Error loading level-2 textiles dataset:", error);
    return [];
  }
}

export function getLevel2TextileByParams(categorySlug: string, varietySlug: string): TextileLevel2Data | null {
  const all = getAllLevel2Textiles();
  const cleanCat = categorySlug.toLowerCase().replace(/^\/+|\/+$/g, "");
  const cleanVar = varietySlug.toLowerCase().replace(/^\/+|\/+$/g, "");

  return (
    all.find(
      (item) =>
        item.categorySlug.toLowerCase() === cleanCat &&
        item.varietySlug.toLowerCase() === cleanVar
    ) || null
  );
}

export function getLevel2TextileBySlug(slug: string): TextileLevel2Data | null {
  const all = getAllLevel2Textiles();
  const normalized = slug.toLowerCase().replace(/^\/+|\/+$/g, "");
  return (
    all.find((item) => {
      const itemSlugClean = item.slug.toLowerCase().replace(/^\/+|\/+$/g, "");
      return itemSlugClean === normalized || `textiles/${item.categorySlug}/${item.varietySlug}` === normalized;
    }) || null
  );
}

export function getAllLevel2TextileParams(): { slug: string; variety: string }[] {
  return getAllLevel2Textiles().map((t) => ({
    slug: t.categorySlug,
    variety: t.varietySlug
  }));
}

export function getLevel2TextilesByCategory(categorySlug: string): TextileLevel2Data[] {
  const all = getAllLevel2Textiles();
  const cleanCat = categorySlug.toLowerCase().replace(/^\/+|\/+$/g, "");
  return all.filter((item) => item.categorySlug.toLowerCase() === cleanCat);
}
