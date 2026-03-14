export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Global Export Leads",
    "url": "https://your-domain.com",
    "logo": "https://your-domain.com/assets/logo.png",
    "description": "Leading provider of verified buyer leads for exporters, connecting businesses with importers, distributors, and wholesalers worldwide",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-866-216-1072",
      "contactType": "customer service",
      "availableLanguage": ["English", "Spanish", "French", "German", "Italian", "Japanese", "Chinese", "Hindi", "Arabic"]
    },
    "sameAs": [
      "https://www.facebook.com/globalexportleads",
      "https://twitter.com/globalexportleads",
      "https://www.linkedin.com/company/globalexportleads",
      "https://www.youtube.com/globalexportleads"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "410 Terry Ave N",
      "addressLocality": "Seattle",
      "addressRegion": "WA",
      "postalCode": "98109",
      "addressCountry": "US"
    },
    "areaServed": "Worldwide",
    "knowsAbout": [
      "International Trade",
      "Export Business",
      "Import Export Leads",
      "B2B Lead Generation",
      "Global Sourcing",
      "Trade Finance",
      "Supply Chain Management"
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Global Export Leads",
    "url": "https://your-domain.com",
    "description": "Get verified buyer leads from 190+ countries. Connect with importers, distributors, and wholesalers worldwide.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://your-domain.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Global Export Leads"
    }
  };

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Buyer Lead Generation for Exporters",
    "description": "Comprehensive service providing verified buyer leads from importers, distributors, and wholesalers across 190+ countries",
    "provider": {
      "@type": "Organization",
      "name": "Global Export Leads"
    },
    "serviceType": "B2B Lead Generation",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Export Lead Generation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Starter Plan - 20 Qualified Leads Monthly"
          },
          "description": "Perfect for new exporters starting their global journey",
          "price": "25000",
          "priceCurrency": "INR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Growth Plan - 50 Qualified Leads Monthly"
          },
          "description": "Most popular plan for scaling export businesses",
          "price": "50000",
          "priceCurrency": "INR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Enterprise Plan - 120 Qualified Leads Monthly"
          },
          "description": "For established businesses with high-volume needs",
          "price": "100000",
          "priceCurrency": "INR"
        }
      ]
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Exporters, Manufacturers, Suppliers, Trading Companies"
    }
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Global Export Leads",
    "description": "Your trusted partner for international buyer leads and export business growth",
    "url": "https://your-domain.com",
    "telephone": "+1-866-216-1072",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "410 Terry Ave N",
      "addressLocality": "Seattle",
      "addressRegion": "WA",
      "postalCode": "98109",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "47.6062",
      "longitude": "-122.3321"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$"
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What countries do you provide buyer leads from?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide verified buyer leads from over 190 countries worldwide, covering major markets in North America, Europe, Asia, Africa, and South America."
        }
      },
      {
        "@type": "Question",
        "name": "How are your buyer leads verified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our buyer leads undergo a rigorous verification process including business registration checks, contact validation, and trade history verification to ensure high-quality, genuine buyers."
        }
      },
      {
        "@type": "Question",
        "name": "What industries do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover 55+ industries including manufacturing, textiles, electronics, agriculture, chemicals, pharmaceuticals, automotive, construction, and many more sectors."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get buyer leads for specific products?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide targeted buyer leads based on your specific products, industry requirements, and target markets to ensure maximum relevance and conversion potential."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
