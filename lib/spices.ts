import fs from "fs";
import path from "path";

export interface TargetMarketRelevance {
  market: string;
  compliance_notes: string;
  demand_drivers: string;
}

export interface TechnicalSpecification {
  parameter: string;
  standard_value: string;
  testing_method: string;
}

export interface ExportForm {
  form: string;
  best_suited_for: string;
}

export interface ShippingLogistics {
  packaging_options: string;
  fcl_20ft_capacity: string;
  fcl_40ft_capacity: string;
}

export interface IndustrialApplication {
  industry: string;
  usage_notes: string;
}

export interface B2BFAQ {
  question: string;
  answer: string;
}

export interface SpiceCategoryData {
  slug: string;
  category_name: string;
  hs_code: string | number;
  meta_title: string;
  meta_description: string;
  overview: string;
  image: string;
  secondaryImage?: string;
  target_market_relevance: TargetMarketRelevance;
  technical_specifications: TechnicalSpecification[];
  export_forms_available: ExportForm[];
  regulatory_certifications: string[];
  shipping_logistics: ShippingLogistics;
  industrial_applications: IndustrialApplication[];
  b2b_faqs: B2BFAQ[];
}

const SPICE_IMAGES: Record<string, { main: string; secondary?: string }> = {
  "red-chilli": {
    main: "https://images.pexels.com/photos/7094360/pexels-photo-7094360.jpeg?_gl=1*19lmann*_ga*NTg0NjIwNDY4LjE3ODQ3MzQxNzA.*_ga_8JE65Q40S6*czE3ODg5NTQ0OTAkbzgkZzEkdDE3ODg5NTQ1MjgkajIyJGwwJGgw",
    secondary: "https://images.pexels.com/photos/30387987/pexels-photo-30387987.jpeg",
  },
  "bulk-turmeric-suppliers-india": {
    main: "https://images.pexels.com/photos/6220709/pexels-photo-6220709.jpeg",
    secondary: "https://images.pexels.com/photos/6220707/pexels-photo-6220707.jpeg",
  },
  "wholesale-bulk-cumin-seeds-powder-india": {
    main: "https://images.pexels.com/photos/4871244/pexels-photo-4871244.jpeg",
    secondary: "https://images.pexels.com/photos/10487762/pexels-photo-10487762.jpeg",
  },
  "bulk-black-pepper-wholesale-exporters-india": {
    main: "https://images.pexels.com/photos/8559086/pexels-photo-8559086.jpeg",
    secondary: "https://images.pexels.com/photos/5001423/pexels-photo-5001423.jpeg",
  },
  "wholesale-coriander-seeds-exporter": {
    main: "https://images.pexels.com/photos/10487771/pexels-photo-10487771.jpeg",
    secondary: "https://images.pexels.com/photos/5988179/pexels-photo-5988179.jpeg",
  },
  "dry-ginger-sourcing-india": {
    main: "https://images.pexels.com/photos/16122309/pexels-photo-16122309.jpeg",
    secondary: "https://images.pexels.com/photos/4198566/pexels-photo-4198566.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  "green-cardamom-wholesale-export": {
    main: "https://images.pexels.com/photos/8217944/pexels-photo-8217944.jpeg",
    secondary: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  "wholesale-fennel-seeds-supplier": {
    main: "https://images.pexels.com/photos/5988041/pexels-photo-5988041.jpeg",
    secondary: "https://images.pexels.com/photos/4198567/pexels-photo-4198567.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  "fenugreek-seeds-bulk-export": {
    main: "https://images.pexels.com/photos/5987968/pexels-photo-5987968.jpeg",
    secondary: "https://images.pexels.com/photos/4198568/pexels-photo-4198568.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  "bulk-mustard-seeds-india": {
    main: "https://images.pexels.com/photos/35809379/pexels-photo-35809379.jpeg",
    secondary: "https://images.pexels.com/photos/4198565/pexels-photo-4198565.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  "cloves-bulk-export-india": {
    main: "https://images.pexels.com/photos/12142752/pexels-photo-12142752.jpeg",
    secondary: "https://images.pexels.com/photos/208537/pexels-photo-208537.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  "nutmeg-and-mace-wholesale-exporter": {
    main: "/images/nutmeg-and-mace.png",
    secondary: "https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  "cinnamon-and-cassia-sourcing": {
    main: "/images/cinnamon-and-cassia.png",
    secondary: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  "bulk-ajwain-seeds-india": {
    main: "/images/ajwain.png",
    secondary: "https://images.pexels.com/photos/4198567/pexels-photo-4198567.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  "celery-seeds-sourcing": {
    main: "/images/celery.png",
    secondary: "https://images.pexels.com/photos/678414/pexels-photo-678414.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  "custom-spice-blend-manufacturer-india": {
    main: "/images/custom-spice.png",
    secondary: "https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
};

const DEFAULT_IMAGE =
  "https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=1200";

let cachedSpices: SpiceCategoryData[] | null = null;

export function getAllSpices(): SpiceCategoryData[] {
  if (cachedSpices) {
    return cachedSpices;
  }

  try {
    const filePath = path.join(process.cwd(), "data", "goexports-data-spices-level-1.json");
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const sanitized = raw.replace(/:\s*NaN\b/g, ": null");
    const parsed = JSON.parse(sanitized);

    const spices: SpiceCategoryData[] = parsed.map((item: any) => {
      const slug = String(item.slug || "").trim();
      const imgConfig = SPICE_IMAGES[slug] || { main: DEFAULT_IMAGE };

      return {
        slug,
        category_name: String(item.category_name || "").trim(),
        hs_code: item.hs_code ? String(item.hs_code) : "0904.00.00",
        meta_title: String(item.meta_title || `${item.category_name} Sourcing & Exporters | B2B Procurement`),
        meta_description: String(item.meta_description || item.overview || ""),
        overview: String(item.overview || ""),
        image: imgConfig.main,
        secondaryImage: imgConfig.secondary || imgConfig.main,
        target_market_relevance: {
          market: item.target_market_relevance?.market || "Global (USA, EU, GCC, APAC)",
          compliance_notes:
            item.target_market_relevance?.compliance_notes ||
            "Meets international pesticide MRL limits, US FDA FSMA guidelines, and EU food safety standards.",
          demand_drivers:
            item.target_market_relevance?.demand_drivers ||
            "High industrial demand across commercial food processing, oleoresin extraction, and retail packaging."
        },
        technical_specifications: Array.isArray(item.technical_specifications)
          ? item.technical_specifications
          : [],
        export_forms_available: Array.isArray(item.export_forms_available)
          ? item.export_forms_available
          : [],
        regulatory_certifications: Array.isArray(item.regulatory_certifications)
          ? item.regulatory_certifications
          : [
              "ISO 17025 Accredited Laboratory COA",
              "BRCGS / FSSC 22000 Certified",
              "US FDA Facility Registration",
              "Spices Board of India Registered Exporters",
              "Halal & Kosher Certified"
            ],
        shipping_logistics: {
          packaging_options:
            item.shipping_logistics?.packaging_options ||
            "25kg / 50kg Multi-wall Kraft paper bags, PP woven bags with inner liner, or vacuum-sealed bulk bags.",
          fcl_20ft_capacity: item.shipping_logistics?.fcl_20ft_capacity || "12 to 14 Metric Tons",
          fcl_40ft_capacity: item.shipping_logistics?.fcl_40ft_capacity || "24 to 26 Metric Tons"
        },
        industrial_applications: Array.isArray(item.industrial_applications)
          ? item.industrial_applications
          : [],
        b2b_faqs: Array.isArray(item.b2b_faqs) ? item.b2b_faqs : []
      };
    });

    cachedSpices = spices;
    return spices;
  } catch (error) {
    console.error("Error loading spices dataset:", error);
    return [];
  }
}

export function getSpiceBySlug(slug: string): SpiceCategoryData | null {
  const spices = getAllSpices();
  return spices.find((s) => s.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export function getAllSpiceSlugs(): string[] {
  return getAllSpices().map((s) => s.slug);
}
