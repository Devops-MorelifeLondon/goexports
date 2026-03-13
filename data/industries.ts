export type Industry = {
  name: string;
  slug: string;
  icon: string;
  title: string;
  desc: string;
  highlights: string[];
  longDesc: string;
  benefits: string[];
  stats: { label: string; value: string }[];
  image: string;
};

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const rawIndustries: Omit<Industry, "slug">[] = [
  {
    "name": "Health Products,Drug and Medicine",
    "icon": "\ud83d\udc8a",
    "title": "Health Products, Drug and Medicine",
    "desc": "Supply pharmaceutical and healthcare products globally.",
    "highlights": [
      "Pharma market expanding",
      "Global healthcare demand",
      "Strong B2B trade"
    ],
    "longDesc": "Businesses in the pharmaceutical and healthcare sector supply medicines, supplements, and healthcare products to hospitals, pharmacies, and consumers worldwide.",
    "benefits": [
      "Hospital buyers",
      "Global demand",
      "Healthcare distribution"
    ],
    "stats": [
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "50K+"
      },
      {
        "label": "Countries",
        "value": "190+"
      }
    ],
    "image": "https://impactcare.co.in/wp-content/uploads/2024/10/What-is-Medicine-to-Medicine.webp"
  },
  {
    "name": "Hospital and Diagnosis Instrument",
    "icon": "\ud83c\udfe5",
    "title": "Hospital and Diagnosis Instrument",
    "desc": "Sell diagnostic machines and hospital equipment.",
    "highlights": [
      "Medical device demand",
      "Hospital modernization",
      "Growing diagnostics market"
    ],
    "longDesc": "Medical equipment manufacturers provide hospital tools, testing machines, and diagnostic instruments used by healthcare professionals.",
    "benefits": [
      "Hospital procurement",
      "Medical distributors",
      "Global healthcare buyers"
    ],
    "stats": [
      {
        "label": "Growth",
        "value": "5%"
      },
      {
        "label": "Buyers",
        "value": "30K+"
      },
      {
        "label": "Countries",
        "value": "160+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1605176173609-a0067079b419?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNDF8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Food & Beverages",
    "icon": "\ud83c\udf54",
    "title": "Food & Beverages",
    "desc": "Trade packaged food and beverages worldwide.",
    "highlights": [
      "Massive demand",
      "Retail distribution",
      "Export potential"
    ],
    "longDesc": "Food and beverage manufacturers supply packaged foods, drinks, and ingredients to retailers and distributors globally.",
    "benefits": [
      "Retail buyers",
      "Bulk orders",
      "Global distribution"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$7T+"
      },
      {
        "label": "Growth",
        "value": "5%"
      },
      {
        "label": "Buyers",
        "value": "200K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1600332138831-4e0ce6628f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNDN8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Industrial Plants & Machinery",
    "icon": "\u2699\ufe0f",
    "title": "Industrial Plants & Machinery",
    "desc": "Sell manufacturing and industrial machinery.",
    "highlights": [
      "Automation growth",
      "Factory upgrades",
      "High-value equipment"
    ],
    "longDesc": "Industrial machinery suppliers provide production equipment, automation machines, and manufacturing plants to industries worldwide.",
    "benefits": [
      "Large B2B deals",
      "Factory buyers",
      "Industrial exports"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$200B+"
      },
      {
        "label": "Growth",
        "value": "7%"
      },
      {
        "label": "Buyers",
        "value": "20K+"
      }
    ],
    "image": "https://internationalprocessplants.com/wp-content/uploads/2024/11/Process-Plant-as-Industrial-Plant.jpg"
  },
  {
    "name": "Industrial Supplies",
    "icon": "\ud83c\udfed",
    "title": "Industrial Supplies",
    "desc": "Provide tools, safety gear, and industrial consumables.",
    "highlights": [
      "Strong B2B demand",
      "Recurring purchases",
      "Manufacturing growth"
    ],
    "longDesc": "Industrial supplies include tools, safety gear, and consumables required for factories and warehouses.",
    "benefits": [
      "Recurring orders",
      "Industrial clients",
      "Bulk purchasing"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$600B+"
      },
      {
        "label": "Growth",
        "value": "5%"
      },
      {
        "label": "Buyers",
        "value": "60K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1771189465810-c57a3ad68eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNDV8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Building & Construction",
    "icon": "\ud83c\udfd7\ufe0f",
    "title": "Building & Construction",
    "desc": "Supply construction materials and equipment.",
    "highlights": [
      "Infrastructure boom",
      "Construction demand",
      "Project-based supply"
    ],
    "longDesc": "Construction companies require materials, tools, and building equipment for residential and commercial projects.",
    "benefits": [
      "Contractor buyers",
      "Project orders",
      "Large supply chains"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$10T+"
      },
      {
        "label": "Growth",
        "value": "7%"
      },
      {
        "label": "Buyers",
        "value": "80K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1723107638733-16ef49e5d4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNDZ8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Apparel & Garments",
    "icon": "\ud83d\udc55",
    "title": "Apparel & Garments",
    "desc": "Sell clothing and fashion apparel globally.",
    "highlights": [
      "Fashion industry growth",
      "Ecommerce demand",
      "Seasonal trends"
    ],
    "longDesc": "Apparel businesses manufacture and distribute clothing products including fashion garments and uniforms worldwide.",
    "benefits": [
      "Fashion retailers",
      "Global buyers",
      "Online marketplaces"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$1.7T+"
      },
      {
        "label": "Growth",
        "value": "8%"
      },
      {
        "label": "Buyers",
        "value": "200K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1632773004171-02bc1c4a726a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNDd8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Consumer Electronics",
    "icon": "\ud83d\udcf1",
    "title": "Consumer Electronics",
    "desc": "Sell gadgets and electronic devices.",
    "highlights": [
      "Tech demand rising",
      "Smart devices",
      "High sales volume"
    ],
    "longDesc": "Consumer electronics include smartphones, laptops, and smart home products sold to global consumers.",
    "benefits": [
      "Tech retailers",
      "Online sales",
      "Global distribution"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$1T+"
      },
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "150K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1760901627502-4969155b3330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNDh8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Packaging Machines & Goods",
    "icon": "\ud83d\udce6",
    "title": "Packaging Machines & Goods",
    "desc": "Provide packaging materials and machines.",
    "highlights": [
      "Ecommerce growth",
      "Packaging demand",
      "Bulk supply"
    ],
    "longDesc": "Packaging suppliers provide boxes, machines, labels, and packaging materials for manufacturing and logistics industries.",
    "benefits": [
      "Ecommerce companies",
      "Manufacturers",
      "Warehouses"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$400B+"
      },
      {
        "label": "Growth",
        "value": "5%"
      },
      {
        "label": "Buyers",
        "value": "70K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1668890977311-f9d1cbac9cb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNDl8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Chemicals, Dyes & Solvents",
    "icon": "\ud83e\uddea",
    "title": "Chemicals, Dyes & Solvents",
    "desc": "Supply industrial chemicals and compounds.",
    "highlights": [
      "Industrial chemical demand",
      "Manufacturing use",
      "Global trade"
    ],
    "longDesc": "Chemical manufacturers provide raw materials used across agriculture, pharmaceuticals, textiles, and manufacturing.",
    "benefits": [
      "Industrial buyers",
      "Large volume orders",
      "Export demand"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$200B+"
      },
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "30K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1657395353209-63ed5212bfd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNTB8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Mechanical Parts & Spares",
    "icon": "\ud83d\udd27",
    "title": "Mechanical Parts & Spares",
    "desc": "Sell mechanical components and spare parts.",
    "highlights": [
      "Manufacturing demand",
      "Machine maintenance",
      "High repeat orders"
    ],
    "longDesc": "Mechanical parts suppliers provide spare components used in machinery and manufacturing industries.",
    "benefits": [
      "Industrial maintenance",
      "OEM partnerships",
      "B2B supply"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$350B+"
      },
      {
        "label": "Growth",
        "value": "5%"
      },
      {
        "label": "Buyers",
        "value": "40K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1640556795357-71d4078d6228?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNTF8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Lab Instruments & Supplies",
    "icon": "\ud83d\udd2c",
    "title": "Lab Instruments & Supplies",
    "desc": "Provide laboratory testing equipment.",
    "highlights": [
      "Research demand",
      "Scientific testing",
      "Academic buyers"
    ],
    "longDesc": "Laboratory instruments are used in research labs, universities, hospitals, and testing facilities.",
    "benefits": [
      "Institutional buyers",
      "Research labs",
      "Government tenders"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$75B+"
      },
      {
        "label": "Growth",
        "value": "7%"
      },
      {
        "label": "Buyers",
        "value": "20K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1766096847418-9a2ae64c9621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNTJ8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Furniture & Supplies",
    "icon": "\ud83e\ude91",
    "title": "Furniture & Supplies",
    "desc": "Sell furniture and office furnishings.",
    "highlights": [
      "Interior demand",
      "Office setup growth",
      "Online furniture sales"
    ],
    "longDesc": "Furniture manufacturers supply home and office furniture including tables, chairs, and modular designs.",
    "benefits": [
      "Interior designers",
      "Retail buyers",
      "Commercial orders"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$550B+"
      },
      {
        "label": "Growth",
        "value": "5%"
      },
      {
        "label": "Buyers",
        "value": "90K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1749372523243-1c0585ac3bef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNTN8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Automobile, Parts & Spares",
    "icon": "\ud83d\ude97",
    "title": "Automobile, Parts & Spares",
    "desc": "Trade automotive components and accessories.",
    "highlights": [
      "Automotive aftermarket",
      "High replacement demand",
      "Global auto trade"
    ],
    "longDesc": "Automotive suppliers sell car parts, accessories, and maintenance equipment worldwide.",
    "benefits": [
      "Workshops",
      "Auto dealers",
      "Fleet operators"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$400B+"
      },
      {
        "label": "Growth",
        "value": "4%"
      },
      {
        "label": "Buyers",
        "value": "100K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1697825965442-cdef42ceb0e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNTR8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Agriculture & Farming",
    "icon": "\ud83c\udf3e",
    "title": "Agriculture & Farming",
    "desc": "Sell agricultural products and equipment.",
    "highlights": [
      "Food demand rising",
      "Farm equipment market",
      "Global exports"
    ],
    "longDesc": "Agricultural suppliers provide seeds, fertilizers, equipment, and farming tools to farmers worldwide.",
    "benefits": [
      "Farm buyers",
      "Agriculture distributors",
      "Export markets"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$3T+"
      },
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "80K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1700025381480-8297144a18f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNTV8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Housewares & Supplies",
    "icon": "\ud83c\udfe0",
    "title": "Housewares & Supplies",
    "desc": "Sell household items and daily essentials.",
    "highlights": [
      "Daily consumer demand",
      "Retail sales",
      "Repeat buyers"
    ],
    "longDesc": "Houseware products include cleaning tools, storage items, and everyday home supplies.",
    "benefits": [
      "Retail buyers",
      "Ecommerce demand",
      "High turnover"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$250B+"
      },
      {
        "label": "Growth",
        "value": "4%"
      },
      {
        "label": "Buyers",
        "value": "120K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1708459407329-d3dbafa91ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNTZ8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Metals, Alloys & Minerals",
    "icon": "\u26cf\ufe0f",
    "title": "Metals, Alloys & Minerals",
    "desc": "Trade raw metals and mineral materials.",
    "highlights": [
      "Infrastructure demand",
      "Industrial supply",
      "Commodity trade"
    ],
    "longDesc": "Metal suppliers provide raw materials used in construction, manufacturing, and engineering industries.",
    "benefits": [
      "Industrial buyers",
      "Bulk shipments",
      "Commodity trade"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$4T+"
      },
      {
        "label": "Growth",
        "value": "3%"
      },
      {
        "label": "Buyers",
        "value": "15K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1584715787394-fdfce74d711f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNTd8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Hand & Machine Tools",
    "icon": "\ud83d\udee0\ufe0f",
    "title": "Hand & Machine Tools",
    "desc": "Sell professional tools and equipment.",
    "highlights": [
      "Workshop demand",
      "DIY market",
      "Industrial use"
    ],
    "longDesc": "Tool manufacturers provide hand tools and machine tools used in workshops and factories.",
    "benefits": [
      "Tradespeople",
      "Hardware stores",
      "Industrial buyers"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$25B+"
      },
      {
        "label": "Growth",
        "value": "4%"
      },
      {
        "label": "Buyers",
        "value": "65K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1757032639365-b38363aa77a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNTh8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Handicrafts & Decoratives",
    "icon": "\ud83c\udf81",
    "title": "Handicrafts & Decoratives",
    "desc": "Sell handmade decorative products.",
    "highlights": [
      "Artisan products",
      "Gift market",
      "Cultural crafts"
    ],
    "longDesc": "Handicraft sellers showcase handmade decor and artisan products to global buyers.",
    "benefits": [
      "Gift buyers",
      "Cultural exports",
      "Online craft markets"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$750B+"
      },
      {
        "label": "Growth",
        "value": "10%"
      },
      {
        "label": "Buyers",
        "value": "85K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1708610673113-fb7f71ef282f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNTl8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Kitchen Utensils & Appliances",
    "icon": "\ud83c\udf73",
    "title": "Kitchen Utensils & Appliances",
    "desc": "Sell kitchenware and cooking appliances.",
    "highlights": [
      "Home cooking trend",
      "Kitchen gadgets",
      "Retail demand"
    ],
    "longDesc": "Kitchen equipment suppliers provide utensils, cookware, and appliances used in homes and restaurants.",
    "benefits": [
      "Home buyers",
      "Restaurants",
      "Retail stores"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$30B+"
      },
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "75K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1722606489938-c239ae15ec20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNTl8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Textiles, Yarn & Fabrics",
    "icon": "\ud83e\uddf5",
    "title": "Textiles, Yarn & Fabrics",
    "desc": "Supply fabric materials and yarn.",
    "highlights": [
      "Garment production",
      "Textile exports",
      "Manufacturing demand"
    ],
    "longDesc": "Textile manufacturers supply raw fabrics and yarn used by garment and fashion industries.",
    "benefits": [
      "Garment factories",
      "Fashion brands",
      "Export demand"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$1T+"
      },
      {
        "label": "Growth",
        "value": "4%"
      },
      {
        "label": "Buyers",
        "value": "50K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1665570011208-6367795d3dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNjF8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Books & Stationery",
    "icon": "\ud83d\udcda",
    "title": "Books & Stationery",
    "desc": "Sell books and office stationery.",
    "highlights": [
      "Education demand",
      "School supplies",
      "Office use"
    ],
    "longDesc": "Stationery products include notebooks, office supplies, and books used in education and business.",
    "benefits": [
      "Schools",
      "Offices",
      "Retail stores"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$350B+"
      },
      {
        "label": "Growth",
        "value": "2%"
      },
      {
        "label": "Buyers",
        "value": "40K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1590059192860-8a218d1d1934?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNjJ8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Cosmetics & Personal Care",
    "icon": "\ud83d\udc84",
    "title": "Cosmetics & Personal Care",
    "desc": "Sell beauty and skincare products.",
    "highlights": [
      "Beauty market growth",
      "High repeat purchases",
      "Global demand"
    ],
    "longDesc": "Cosmetic brands supply skincare, makeup, and grooming products to beauty-conscious consumers worldwide.",
    "benefits": [
      "Beauty retailers",
      "Online buyers",
      "Subscription sales"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$500B+"
      },
      {
        "label": "Growth",
        "value": "7%"
      },
      {
        "label": "Buyers",
        "value": "180K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1598347612533-3f6d5629981d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNjN8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Home Textile & Furnishing",
    "icon": "\ud83d\udecb\ufe0f",
    "title": "Home Textile & Furnishing",
    "desc": "Sell home decor and furnishing products.",
    "highlights": [
      "Home decor demand",
      "Interior design market",
      "Textile exports"
    ],
    "longDesc": "Home furnishing products include curtains, carpets, bedding, and decorative textiles.",
    "benefits": [
      "Interior designers",
      "Retail buyers",
      "Hotel industry"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$130B+"
      },
      {
        "label": "Growth",
        "value": "5%"
      },
      {
        "label": "Buyers",
        "value": "95K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1693459575393-7b3be378bfb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNjR8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Engineering Services",
    "icon": "\ud83d\udcd0",
    "title": "Engineering Services",
    "desc": "Provide engineering and technical services.",
    "highlights": [
      "Infrastructure projects",
      "Industrial consulting",
      "Technical expertise"
    ],
    "longDesc": "Engineering service providers assist companies with design, manufacturing, and industrial solutions.",
    "benefits": [
      "Industrial clients",
      "Project contracts",
      "Global consulting"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$300B+"
      },
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "25K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1763992525759-c52b75234078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNjV8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Gems, Jewelry & Astrology",
    "icon": "\ud83d\udc8e",
    "title": "Gems, Jewelry & Astrology",
    "desc": "Sell jewelry and gemstones.",
    "highlights": [
      "Luxury market",
      "High value items",
      "Global demand"
    ],
    "longDesc": "Jewelry sellers trade precious stones, gold jewelry, and astrology gemstones worldwide.",
    "benefits": [
      "Luxury buyers",
      "Retail stores",
      "Export markets"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$350B+"
      },
      {
        "label": "Growth",
        "value": "5%"
      },
      {
        "label": "Buyers",
        "value": "45K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1711352637258-e75a2a6d4f52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNjZ8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Computer & IT Solutions",
    "icon": "\ud83d\udcbb",
    "title": "Computer & IT Solutions",
    "desc": "Provide computer hardware and IT products.",
    "highlights": [
      "Digital demand",
      "IT infrastructure",
      "Tech growth"
    ],
    "longDesc": "IT suppliers sell computer hardware, networking equipment, and software solutions.",
    "benefits": [
      "Business clients",
      "IT departments",
      "Online sales"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$400B+"
      },
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "110K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1705907014767-1c1a4d8ce6be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNjd8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Fashion Accessories & Gear",
    "icon": "\ud83d\udd76\ufe0f",
    "title": "Fashion Accessories & Gear",
    "desc": "Sell fashion accessories and lifestyle products.",
    "highlights": [
      "Style trends",
      "Accessory demand",
      "Retail buyers"
    ],
    "longDesc": "Fashion accessories include watches, sunglasses, hats, and fashion add-ons.",
    "benefits": [
      "Retail buyers",
      "Online shoppers",
      "Fashion stores"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$450B+"
      },
      {
        "label": "Growth",
        "value": "8%"
      },
      {
        "label": "Buyers",
        "value": "130K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1562263689-d8be49c4d218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNjh8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Herbal & Ayurvedic Product",
    "icon": "\ud83c\udf3f",
    "title": "Herbal & Ayurvedic Product",
    "desc": "Sell herbal and natural wellness products.",
    "highlights": [
      "Natural medicine demand",
      "Ayurveda popularity",
      "Wellness market"
    ],
    "longDesc": "Herbal and Ayurvedic products include natural remedies, supplements, and wellness solutions.",
    "benefits": [
      "Health-conscious buyers",
      "Global wellness market",
      "Organic demand"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$80B+"
      },
      {
        "label": "Growth",
        "value": "8%"
      },
      {
        "label": "Buyers",
        "value": "60K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1658315216624-b48c9692720c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNjl8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Security, Safety System & Service",
    "icon": "\ud83d\udd12",
    "title": "Security, Safety System & Service",
    "desc": "Provide security devices and safety systems.",
    "highlights": [
      "Smart security growth",
      "CCTV demand",
      "Commercial safety"
    ],
    "longDesc": "Security providers sell surveillance systems, alarms, and safety equipment.",
    "benefits": [
      "Home security buyers",
      "Commercial clients",
      "Government projects"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$170B+"
      },
      {
        "label": "Growth",
        "value": "9%"
      },
      {
        "label": "Buyers",
        "value": "55K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1770827730731-98b013d432c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNzB8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Sports Goods, Toys & Games",
    "icon": "\u26bd",
    "title": "Sports Goods, Toys & Games",
    "desc": "Sell sports equipment and toys.",
    "highlights": [
      "Fitness trends",
      "Toy market demand",
      "Sports retail"
    ],
    "longDesc": "Sports goods suppliers provide fitness equipment, sports gear, and toys.",
    "benefits": [
      "Sports stores",
      "Gyms",
      "Parents and kids"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$80B+"
      },
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "95K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1676315636766-7b129985c537?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNzF8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Telecom Equipment & Goods",
    "icon": "\ud83d\udce1",
    "title": "Telecom Equipment & Goods",
    "desc": "Supply telecom hardware and network equipment.",
    "highlights": [
      "5G expansion",
      "Network upgrades",
      "Telecom demand"
    ],
    "longDesc": "Telecom suppliers provide cables, antennas, routers, and communication equipment.",
    "benefits": [
      "Telecom companies",
      "IT infrastructure",
      "Global network operators"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$500B+"
      },
      {
        "label": "Growth",
        "value": "7%"
      },
      {
        "label": "Buyers",
        "value": "12K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1622977177914-50685fa0c317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNzJ8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Paper & Paper Products",
    "icon": "\ud83d\udcc4",
    "title": "Paper & Paper Products",
    "desc": "Sell paper materials and stationery products.",
    "highlights": [
      "Packaging demand",
      "Office supplies",
      "Retail sales"
    ],
    "longDesc": "Paper suppliers provide printing paper, packaging boards, and stationery products.",
    "benefits": [
      "Offices",
      "Schools",
      "Printing businesses"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$350B+"
      },
      {
        "label": "Growth",
        "value": "2%"
      },
      {
        "label": "Buyers",
        "value": "40K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1770975765337-71da1d0f76d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNzN8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Bags, Belts & Wallets",
    "icon": "\ud83d\udc5c",
    "title": "Bags, Belts & Wallets",
    "desc": "Sell leather accessories and travel goods.",
    "highlights": [
      "Fashion demand",
      "Gift products",
      "Retail sales"
    ],
    "longDesc": "Leather goods manufacturers produce bags, belts, wallets, and accessories.",
    "benefits": [
      "Retail stores",
      "Fashion buyers",
      "Gift market"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$85B+"
      },
      {
        "label": "Growth",
        "value": "8%"
      },
      {
        "label": "Buyers",
        "value": "70K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1633107939557-d4cb1703cb19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNzV8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Marble, Granite & Stones",
    "icon": "\ud83e\udea8",
    "title": "Marble, Granite & Stones",
    "desc": "Trade natural stones and marble slabs.",
    "highlights": [
      "Construction demand",
      "Interior design market",
      "Stone exports"
    ],
    "longDesc": "Stone suppliers provide marble, granite, and decorative stones used in buildings and interiors.",
    "benefits": [
      "Architects",
      "Builders",
      "Interior designers"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$45B+"
      },
      {
        "label": "Growth",
        "value": "5%"
      },
      {
        "label": "Buyers",
        "value": "22K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1665482048659-60c77d58769b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNzd8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Event Planner & Organizer",
    "icon": "\ud83c\udf89",
    "title": "Event Planner & Organizer",
    "desc": "Provide event management services.",
    "highlights": [
      "Wedding industry",
      "Corporate events",
      "Event planning demand"
    ],
    "longDesc": "Event planners organize weddings, corporate functions, exhibitions, and social events.",
    "benefits": [
      "Corporate clients",
      "Wedding industry",
      "Event venues"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$1T+"
      },
      {
        "label": "Growth",
        "value": "8%"
      },
      {
        "label": "Buyers",
        "value": "15K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1663436683807-f7c3a35328a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNzh8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "IT & Telecom Services",
    "icon": "\ud83d\udda5\ufe0f",
    "title": "IT & Telecom Services",
    "desc": "Offer digital and telecom services.",
    "highlights": [
      "Digital transformation",
      "Cloud services",
      "IT consulting"
    ],
    "longDesc": "IT service providers offer software development, networking solutions, and telecom services.",
    "benefits": [
      "Corporate clients",
      "Startups",
      "Tech companies"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$1.2T+"
      },
      {
        "label": "Growth",
        "value": "8%"
      },
      {
        "label": "Buyers",
        "value": "35K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1737455455084-4259c0299e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyNzl8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Product Rental & Leasing",
    "icon": "\ud83c\udfe2",
    "title": "Product Rental & Leasing",
    "desc": "Offer equipment and asset leasing services.",
    "highlights": [
      "Flexible asset usage",
      "Business rentals",
      "Startup demand"
    ],
    "longDesc": "Rental businesses lease machinery, vehicles, and equipment to companies.",
    "benefits": [
      "Lower capital cost",
      "Flexible contracts",
      "Business clients"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$60B+"
      },
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "20K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1590986201364-ce95ab280ca2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyODB8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Transportation & Logistics",
    "icon": "\ud83d\ude9a",
    "title": "Transportation & Logistics",
    "desc": "Provide shipping and logistics services.",
    "highlights": [
      "Ecommerce logistics",
      "Global shipping",
      "Freight demand"
    ],
    "longDesc": "Logistics providers manage freight transportation and supply chain operations.",
    "benefits": [
      "Global trade",
      "Shipping services",
      "Warehouse support"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$9T+"
      },
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "50K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1770413188239-0d6c173370a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyODF8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Business & Audit Services",
    "icon": "\ud83d\udcca",
    "title": "Business & Audit Services",
    "desc": "Provide auditing and consulting services.",
    "highlights": [
      "Compliance needs",
      "Corporate audits",
      "Financial consulting"
    ],
    "longDesc": "Audit firms help businesses manage financial reporting and compliance.",
    "benefits": [
      "Corporate clients",
      "Legal compliance",
      "Financial transparency"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$900B+"
      },
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "30K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1661704450248-87df8749d823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyODJ8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Financial & Legal Services",
    "icon": "\u2696\ufe0f",
    "title": "Financial & Legal Services",
    "desc": "Offer legal and financial advisory services.",
    "highlights": [
      "Regulation support",
      "Business consulting",
      "Legal demand"
    ],
    "longDesc": "Law firms and financial consultants provide legal advice and financial planning.",
    "benefits": [
      "Corporate clients",
      "Legal guidance",
      "Compliance support"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$900B+"
      },
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "30K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1618896748593-7828f28c03d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyODN8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Education & Training",
    "icon": "\ud83c\udf93",
    "title": "Education & Training",
    "desc": "Offer courses and skill development programs.",
    "highlights": [
      "EdTech growth",
      "Online learning",
      "Skill training"
    ],
    "longDesc": "Education providers deliver training programs, certifications, and learning platforms.",
    "benefits": [
      "Students",
      "Professionals",
      "Institutions"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$400B+"
      },
      {
        "label": "Growth",
        "value": "10%"
      },
      {
        "label": "Buyers",
        "value": "100K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1658235081033-ccd89cdfe77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyODR8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Travel, Tourism & Hotels",
    "icon": "\u2708\ufe0f",
    "title": "Travel, Tourism & Hotels",
    "desc": "Provide travel and hospitality services.",
    "highlights": [
      "Tourism recovery",
      "Hotel industry",
      "Travel demand"
    ],
    "longDesc": "Travel companies offer tourism packages, hotel bookings, and travel services.",
    "benefits": [
      "Tourists",
      "Travel agencies",
      "Hospitality sector"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$10T+"
      },
      {
        "label": "Growth",
        "value": "12%"
      },
      {
        "label": "Buyers",
        "value": "150K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1759849541309-a331ca2ab818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyODV8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Call Center & BPO Services",
    "icon": "\ud83c\udfa7",
    "title": "Call Center & BPO Services",
    "desc": "Provide outsourcing and support services.",
    "highlights": [
      "Global outsourcing",
      "Customer support",
      "AI integration"
    ],
    "longDesc": "BPO companies provide customer support, data entry, and back-office services.",
    "benefits": [
      "Enterprise clients",
      "Cost savings",
      "24/7 operations"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$260B+"
      },
      {
        "label": "Growth",
        "value": "8%"
      },
      {
        "label": "Buyers",
        "value": "12K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1766066014237-00645c74e9c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyODZ8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Bicycle, Rickshaw & Spares",
    "icon": "\ud83d\udeb2",
    "title": "Bicycle, Rickshaw & Spares",
    "desc": "Sell bicycles and spare parts.",
    "highlights": [
      "Urban mobility",
      "Eco transport",
      "Cycling demand"
    ],
    "longDesc": "Manufacturers supply bicycles, rickshaws, and cycling accessories.",
    "benefits": [
      "Retail stores",
      "Cyclists",
      "Urban transport"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$70B+"
      },
      {
        "label": "Growth",
        "value": "10%"
      },
      {
        "label": "Buyers",
        "value": "45K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1643186085291-3eb44c66c623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyODd8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "R&D and Testing Labs",
    "icon": "\ud83e\uddec",
    "title": "R&D and Testing Labs",
    "desc": "Provide research and product testing services.",
    "highlights": [
      "Innovation demand",
      "Lab testing",
      "Scientific research"
    ],
    "longDesc": "R&D labs offer product testing, innovation consulting, and scientific research services.",
    "benefits": [
      "Manufacturers",
      "Universities",
      "Government agencies"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$2.5T+"
      },
      {
        "label": "Growth",
        "value": "8%"
      },
      {
        "label": "Buyers",
        "value": "10K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1764835711461-117d67799a7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyODh8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Architecture & Interiors",
    "icon": "\ud83c\udfe0",
    "title": "Architecture & Interiors",
    "desc": "Provide architectural and interior design services.",
    "highlights": [
      "Real estate growth",
      "Interior demand",
      "Design innovation"
    ],
    "longDesc": "Architects and interior designers create building designs and interior layouts.",
    "benefits": [
      "Real estate developers",
      "Homeowners",
      "Commercial projects"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$350B+"
      },
      {
        "label": "Growth",
        "value": "5%"
      },
      {
        "label": "Buyers",
        "value": "25K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1643267514395-b36b3f7e8281?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyODl8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "HR Planning & Recruitment",
    "icon": "\ud83d\udc65",
    "title": "HR Planning & Recruitment",
    "desc": "Offer recruitment and HR consulting.",
    "highlights": [
      "Workforce demand",
      "Remote hiring",
      "HR outsourcing"
    ],
    "longDesc": "HR firms provide recruitment services and workforce management solutions.",
    "benefits": [
      "Corporate hiring",
      "Talent sourcing",
      "Payroll services"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$45B+"
      },
      {
        "label": "Growth",
        "value": "7%"
      },
      {
        "label": "Buyers",
        "value": "22K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1698047681452-08eba22d0c64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyOTB8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Rail, Shipping & Aviation",
    "icon": "\ud83d\udea2",
    "title": "Rail, Shipping & Aviation",
    "desc": "Provide transport infrastructure services.",
    "highlights": [
      "Global transport demand",
      "Freight movement",
      "Infrastructure projects"
    ],
    "longDesc": "Transportation providers manage rail, shipping, and aviation logistics.",
    "benefits": [
      "Global trade",
      "Freight shipping",
      "Infrastructure support"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$2T+"
      },
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "15K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1630561537873-5bd78f9dd8ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyOTF8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Facility Management",
    "icon": "\ud83e\uddf9",
    "title": "Facility Management",
    "desc": "Provide building maintenance services.",
    "highlights": [
      "Commercial properties",
      "Maintenance demand",
      "Smart buildings"
    ],
    "longDesc": "Facility management companies maintain offices, malls, and industrial buildings.",
    "benefits": [
      "Corporate contracts",
      "Maintenance services",
      "Energy management"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$1.3T+"
      },
      {
        "label": "Growth",
        "value": "5%"
      },
      {
        "label": "Buyers",
        "value": "18K+"
      }
    ],
    "image": "https://images.unsplash.com/photo-1760776110596-b3c29e32cac2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDQ1Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzMzOTMyOTJ8&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "name": "Leather Products",
    "icon": "\ud83e\udde5",
    "title": "Leather Products",
    "desc": "Sell leather goods and materials.",
    "highlights": [
      "Luxury demand",
      "Fashion accessories",
      "Global exports"
    ],
    "longDesc": "Leather manufacturers produce bags, jackets, shoes, and accessories.",
    "benefits": [
      "Fashion brands",
      "Retail buyers",
      "Export markets"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$240B+"
      },
      {
        "label": "Growth",
        "value": "5%"
      },
      {
        "label": "Buyers",
        "value": "35K+"
      }
    ],
    "image": "https://placehold.co/600x400?text=Leather+Products"
  },
  {
    "name": "Contractors & Freelancers",
    "icon": "\ud83e\uddd1\u200d\ud83d\udcbb",
    "title": "Contractors & Freelancers",
    "desc": "Offer freelance and contractor services.",
    "highlights": [
      "Gig economy",
      "Remote work",
      "Project based work"
    ],
    "longDesc": "Freelancers and contractors provide digital and professional services worldwide.",
    "benefits": [
      "Flexible workforce",
      "Global clients",
      "Project work"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$500B+"
      },
      {
        "label": "Growth",
        "value": "15%"
      },
      {
        "label": "Buyers",
        "value": "100K+"
      }
    ],
    "image": "https://placehold.co/600x400?text=Contractors+&+Freelancers"
  },
  {
    "name": "Electronics Components",
    "icon": "\ud83d\udd0c",
    "title": "Electronics Components",
    "desc": "Supply electronic components.",
    "highlights": [
      "IoT demand",
      "Semiconductor market",
      "Manufacturing supply"
    ],
    "longDesc": "Electronics component suppliers provide chips, resistors, PCBs, and parts used in electronic manufacturing.",
    "benefits": [
      "OEM manufacturers",
      "Repair businesses",
      "Tech startups"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$500B+"
      },
      {
        "label": "Growth",
        "value": "8%"
      },
      {
        "label": "Buyers",
        "value": "60K+"
      }
    ],
    "image": "https://placehold.co/600x400?text=Electronics+Components"
  },
  {
    "name": "Electrical Equipment",
    "icon": "\u26a1",
    "title": "Electrical Equipment",
    "desc": "Provide electrical devices and wiring equipment.",
    "highlights": [
      "Energy infrastructure",
      "Smart grids",
      "Electrical installations"
    ],
    "longDesc": "Electrical equipment suppliers provide wiring, switchgear, and power systems.",
    "benefits": [
      "Electricians",
      "Construction firms",
      "Energy companies"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$180B+"
      },
      {
        "label": "Growth",
        "value": "6%"
      },
      {
        "label": "Buyers",
        "value": "48K+"
      }
    ],
    "image": "https://placehold.co/600x400?text=Electrical+Equipment"
  },
  {
    "name": "Hospital,Clinic and Consultation",
    "icon": "\ud83e\ude7a",
    "title": "Hospital, Clinic and Consultation",
    "desc": "Provide healthcare consultation and services.",
    "highlights": [
      "Telemedicine growth",
      "Healthcare demand",
      "Digital health"
    ],
    "longDesc": "Healthcare providers offer consultation, telemedicine, and hospital management services.",
    "benefits": [
      "Patients",
      "Hospitals",
      "Healthcare networks"
    ],
    "stats": [
      {
        "label": "Market",
        "value": "$286B+"
      },
      {
        "label": "Growth",
        "value": "15%"
      },
      {
        "label": "Buyers",
        "value": "20K+"
      }
    ],
    "image": "https://placehold.co/600x400?text=Hospital,Clinic+and+Consultation"
  }
];

export const industries: Industry[] = rawIndustries.map((ind) => ({
  ...ind,
  slug: toSlug(ind.name),
}));

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((ind) => ind.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industries.map((ind) => ind.slug);
}