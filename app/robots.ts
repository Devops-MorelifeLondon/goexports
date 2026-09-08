import type { MetadataRoute } from "next";

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/components/",
          "/assets/",
          "/images/",
          "/public/",
        ],
        disallow: [
          "/_next/",
          "/api/",
          "/exporter/dashboard",
          "/exporter/profile",
          "/exporter/reset-password",
          "/*.json$",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
