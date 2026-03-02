"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./MotionWrappers";

const buyers = [
  { date: "Feb 18, 2026", product: "Pharmaceutical Tablets", code: "us", country: "United States", qty: "5,000 Units", industry: "Drugs & Medicines", review: "GoExports connected us with verified pharma suppliers within 48 hours. Incredible speed!" },
  { date: "Feb 18, 2026", product: "Basmati Rice", code: "gb", country: "United Kingdom", qty: "20 MT", industry: "Agro & Farm", review: "We found premium basmati rice exporters at competitive prices. Highly recommend GoExports." },
  { date: "Feb 18, 2026", product: "Cotton Bed Sheets", code: "ae", country: "UAE", qty: "3,000 Pcs", industry: "Textiles & Yarn", review: "Quality textile suppliers delivered exactly what we needed. GoExports made it seamless." },
  { date: "Feb 17, 2026", product: "Surgical Gloves", code: "de", country: "Germany", qty: "50,000 Pcs", industry: "Medical & Pharma", review: "Reliable medical suppliers with all certifications in place. Smooth procurement process." },
  { date: "Feb 17, 2026", product: "Hand Tools Set", code: "fr", country: "France", qty: "1,200 Sets", industry: "Hand Tools", review: "Found exactly the tool manufacturers we were looking for. Great platform for B2B sourcing." },
  { date: "Feb 17, 2026", product: "Leather Wallets", code: "it", country: "Italy", qty: "2,500 Pcs", industry: "Bags, Belts & Wallets", review: "The leather quality from Indian suppliers on GoExports exceeded our expectations." },
  { date: "Feb 16, 2026", product: "CNC Machine Parts", code: "jp", country: "Japan", qty: "800 Units", industry: "Plant & Machinery", review: "Precision-engineered parts sourced efficiently. GoExports saved us weeks of searching." },
  { date: "Feb 16, 2026", product: "Organic Spices", code: "ca", country: "Canada", qty: "10 MT", industry: "Agro & Farm", review: "Authentic organic spices with proper certifications. Our customers love the quality." },
  { date: "Feb 16, 2026", product: "Gold Jewellery", code: "sa", country: "Saudi Arabia", qty: "500 Pcs", industry: "Gems & Jewellery", review: "Exquisite craftsmanship from verified jewellery exporters. Repeat orders guaranteed." },
  { date: "Feb 15, 2026", product: "Solar Panels", code: "au", country: "Australia", qty: "2,000 Units", industry: "Electrical Equipment", review: "GoExports helped us source cost-effective solar panels with international warranties." },
  { date: "Feb 15, 2026", product: "Ayurvedic Hair Oil", code: "za", country: "South Africa", qty: "10,000 Bottles", industry: "Ayurvedic & Herbal", review: "Natural products with great margins. Our retail chain is now fully stocked via GoExports." },
  { date: "Feb 15, 2026", product: "Steel Pipes", code: "qa", country: "Qatar", qty: "150 MT", industry: "Ores & Metals", review: "Bulk steel delivered on time for our construction project. Trustworthy suppliers." },
  { date: "Feb 14, 2026", product: "Printer Cartridges", code: "nl", country: "Netherlands", qty: "5,000 Pcs", industry: "Printing & Publishing", review: "Compatible cartridges at wholesale rates. GoExports is our go-to sourcing platform." },
  { date: "Feb 14, 2026", product: "Wooden Furniture", code: "kw", country: "Kuwait", qty: "300 Sets", industry: "Furniture", review: "Beautifully crafted furniture delivered with proper packaging. Very satisfied." },
  { date: "Feb 14, 2026", product: "Security Cameras", code: "sg", country: "Singapore", qty: "1,500 Units", industry: "Security Devices", review: "High-quality CCTV systems at unbeatable prices. GoExports delivers what they promise." },
  { date: "Feb 13, 2026", product: "Cricket Bats", code: "bd", country: "Bangladesh", qty: "2,000 Pcs", industry: "Sports Goods", review: "Top-grade cricket equipment sourced directly from manufacturers. Great experience." },
  { date: "Feb 13, 2026", product: "Marble Tiles", code: "om", country: "Oman", qty: "5,000 sqm", industry: "Stones & Marble", review: "Premium marble for our hotel project. GoExports made international sourcing easy." },
  { date: "Feb 13, 2026", product: "Corrugated Boxes", code: "mx", country: "Mexico", qty: "25,000 Pcs", industry: "Packaging Material", review: "Custom packaging at scale. The suppliers on GoExports understood our specs perfectly." },
  { date: "Feb 12, 2026", product: "Urea Fertilizer", code: "ng", country: "Nigeria", qty: "500 MT", industry: "Chemicals & Fertilizers", review: "Bulk fertilizer procurement done in days. GoExports simplified our supply chain." },
  { date: "Feb 12, 2026", product: "Automobile Brake Pads", code: "br", country: "Brazil", qty: "10,000 Pcs", industry: "Automobiles & Spares", review: "OEM-quality brake pads at wholesale rates. Our auto parts business grew 40% with GoExports." },
  { date: "Feb 12, 2026", product: "Handicraft Items", code: "es", country: "Spain", qty: "1,000 Pcs", industry: "Handicrafts & Gifts", review: "Unique handcrafted items that our European customers absolutely love. Thank you GoExports!" },
  { date: "Feb 11, 2026", product: "Poultry Feed", code: "ke", country: "Kenya", qty: "200 MT", industry: "Agro, Poultry & Dairy", review: "Consistent quality feed supply for our farms. GoExports is a game-changer for agri imports." },
  { date: "Feb 11, 2026", product: "Stainless Steel Cookware", code: "pl", country: "Poland", qty: "3,000 Sets", industry: "Kitchen Utensils", review: "Durable cookware that meets EU standards. Our retail stores are fully stocked now." },
  { date: "Feb 11, 2026", product: "Laptop Batteries", code: "kr", country: "South Korea", qty: "8,000 Units", industry: "Computer Hardware", review: "Certified laptop batteries at competitive prices. Fast turnaround through GoExports." },
  { date: "Feb 10, 2026", product: "Fashion Earrings", code: "tr", country: "Turkey", qty: "15,000 Pcs", industry: "Fashion Accessories", review: "Trendy designs at wholesale prices. Our fashion boutiques love the collection." },
  { date: "Feb 10, 2026", product: "Telecom Cables", code: "ph", country: "Philippines", qty: "50 km", industry: "Telecom Products", review: "Infrastructure-grade cables delivered on schedule. GoExports handled logistics perfectly." },
  { date: "Feb 10, 2026", product: "A4 Copy Paper", code: "eg", country: "Egypt", qty: "100 MT", industry: "Paper Products", review: "Bulk paper supply at unmatched rates. GoExports is now our primary sourcing partner." },
  { date: "Feb 09, 2026", product: "Cosmetic Creams", code: "th", country: "Thailand", qty: "20,000 Units", industry: "Cosmetics & Toiletries", review: "Dermatologically tested products with proper labeling. Our beauty chain is thriving." },
  { date: "Feb 09, 2026", product: "Home Curtains", code: "id", country: "Indonesia", qty: "5,000 Pcs", industry: "Home Furnishings", review: "Beautiful fabric curtains for our hotel chain. GoExports matched us with perfect suppliers." },
  { date: "Feb 09, 2026", product: "Industrial Bearings", code: "vn", country: "Vietnam", qty: "4,000 Units", industry: "Industrial Supplies", review: "Precision bearings that met our factory specifications. Reliable sourcing platform." },
  { date: "Feb 08, 2026", product: "Builders Hardware", code: "ru", country: "Russia", qty: "6,000 Units", industry: "Builders Hardware", review: "Heavy-duty hardware for construction projects. GoExports connects us with verified factories." },
  { date: "Feb 08, 2026", product: "Apparel - T-shirts", code: "cl", country: "Chile", qty: "10,000 Pcs", industry: "Apparel & Garments", review: "Custom printed t-shirts delivered in 3 weeks. Excellent quality and communication." },
  { date: "Feb 08, 2026", product: "LED Light Panels", code: "my", country: "Malaysia", qty: "3,500 Units", industry: "Electronic Goods", review: "Energy-efficient LED panels at great prices. GoExports made bulk buying effortless." },
  { date: "Feb 07, 2026", product: "Mechanical Gears", code: "cz", country: "Czech Republic", qty: "2,000 Pcs", industry: "Mechanical Components", review: "Custom-machined gears that fit our assembly line perfectly. Outstanding quality." },
  { date: "Feb 07, 2026", product: "Lab Microscopes", code: "gh", country: "Ghana", qty: "500 Units", industry: "Scientific Instruments", review: "Equipped our university labs with quality microscopes. GoExports is trusted for education." },
  { date: "Feb 07, 2026", product: "Steel Fabrication", code: "co", country: "Colombia", qty: "100 MT", industry: "Fabrication", review: "Structural steel for our warehouse project. On-time delivery and fair pricing." },
  { date: "Feb 06, 2026", product: "Bicycle Spare Parts", code: "tz", country: "Tanzania", qty: "5,000 Sets", industry: "Bicycles & Rickshaws", review: "Affordable spare parts that keep our bicycle rental fleet running smoothly." },
  { date: "Feb 06, 2026", product: "IT Consulting", code: "se", country: "Sweden", qty: "12 Months", industry: "IT Services", review: "Found skilled IT consultants for our digital transformation. GoExports isn't just for goods!" },
  { date: "Feb 06, 2026", product: "Relocation Services", code: "no", country: "Norway", qty: "1 Project", industry: "Packers & Movers", review: "Professional relocation service for our office move. Smooth and hassle-free experience." },
  { date: "Feb 05, 2026", product: "Legal Consulting", code: "ch", country: "Switzerland", qty: "Retainer", industry: "Finance & Law Services", review: "Expert legal advice on international trade compliance. GoExports has quality service providers." },
  { date: "Feb 05, 2026", product: "Training Programs", code: "ie", country: "Ireland", qty: "50 Seats", industry: "Education & Training", review: "Corporate training modules that upskilled our entire team. Fantastic partnership." },
  { date: "Feb 05, 2026", product: "Hotel Booking Services", code: "mv", country: "Maldives", qty: "200 Bookings", industry: "Travel & Tourism", review: "Bulk hotel rates for our travel agency. GoExports opened new business opportunities for us." },
  { date: "Feb 04, 2026", product: "BPO Services", code: "us", country: "United States", qty: "25 Agents", industry: "Call Center & BPO", review: "Outsourced our customer support seamlessly. Quality agents at competitive rates." },
  { date: "Feb 04, 2026", product: "Whey Protein Powder", code: "at", country: "Austria", qty: "5,000 kg", industry: "Drugs & Medicines", review: "Lab-tested protein supplements for our fitness brand. GoExports ensures quality compliance." },
  { date: "Feb 04, 2026", product: "Tractor Parts", code: "et", country: "Ethiopia", qty: "1,000 Sets", industry: "Plant & Machinery", review: "Durable tractor components that withstand tough farming conditions. Great sourcing." },
  { date: "Feb 03, 2026", product: "Silk Sarees", code: "us", country: "United States", qty: "2,000 Pcs", industry: "Textiles & Yarn", review: "Authentic Indian silk sarees for our ethnic boutique. Customers are delighted!" },
  { date: "Feb 03, 2026", product: "Diagnostic Kits", code: "be", country: "Belgium", qty: "10,000 Kits", industry: "Medical & Pharma", review: "CE-marked diagnostic kits delivered with full documentation. Regulatory-ready sourcing." },
  { date: "Feb 03, 2026", product: "Granite Slabs", code: "pt", country: "Portugal", qty: "500 sqm", industry: "Stones & Marble", review: "Stunning granite for our kitchen showroom. GoExports made international stone sourcing easy." },
  { date: "Feb 02, 2026", product: "Coconut Oil", code: "lk", country: "Sri Lanka", qty: "30 MT", industry: "Agro & Farm", review: "Pure cold-pressed coconut oil for our FMCG brand. Consistent quality every shipment." },
  { date: "Feb 02, 2026", product: "Rubber Gaskets", code: "hu", country: "Hungary", qty: "20,000 Pcs", industry: "Industrial Supplies", review: "Custom-molded gaskets that met our exact specifications. Reliable manufacturing partners." },
  { date: "Feb 02, 2026", product: "Wooden Toys", code: "dk", country: "Denmark", qty: "3,000 Pcs", industry: "Handicrafts & Gifts", review: "Safe, non-toxic wooden toys for our children's store. Parents love the craftsmanship." },
  { date: "Feb 01, 2026", product: "Insulin Syringes", code: "pk", country: "Pakistan", qty: "100,000 Pcs", industry: "Medical & Pharma", review: "Medical-grade syringes at scale. GoExports helped us meet urgent healthcare demand." },
  { date: "Feb 01, 2026", product: "Office Chairs", code: "ro", country: "Romania", qty: "500 Pcs", industry: "Furniture", review: "Ergonomic office chairs for our co-working spaces. Bulk pricing was unbeatable." },
  { date: "Feb 01, 2026", product: "Jute Bags", code: "fi", country: "Finland", qty: "10,000 Pcs", industry: "Bags, Belts & Wallets", review: "Eco-friendly jute bags for our retail chain's green initiative. Perfect quality." },
  { date: "Jan 31, 2026", product: "Herbal Tea", code: "jp", country: "Japan", qty: "5,000 Boxes", industry: "Ayurvedic & Herbal", review: "Authentic herbal teas that our health-conscious customers keep reordering." },
  { date: "Jan 31, 2026", product: "CCTV Systems", code: "iq", country: "Iraq", qty: "1,000 Units", industry: "Security Devices", review: "Complete surveillance systems for our commercial buildings. Excellent after-sales support." },
  { date: "Jan 31, 2026", product: "Copper Wire", code: "ma", country: "Morocco", qty: "50 MT", industry: "Ores & Metals", review: "High-conductivity copper wire for our electrical projects. Delivered ahead of schedule." },
  { date: "Jan 30, 2026", product: "Antibiotic Capsules", code: "ug", country: "Uganda", qty: "200,000 Caps", industry: "Drugs & Medicines", review: "WHO-approved antibiotics for our hospital chain. GoExports ensures pharma compliance." },
  { date: "Jan 30, 2026", product: "Plastic Containers", code: "gr", country: "Greece", qty: "20,000 Pcs", industry: "Packaging Material", review: "Food-grade containers for our olive oil brand. Perfect packaging solution." },
  { date: "Jan 30, 2026", product: "Cotton Yarn", code: "bg", country: "Bulgaria", qty: "25 MT", industry: "Textiles & Yarn", review: "Premium yarn for our textile mill. GoExports consistently delivers quality raw materials." },
  { date: "Jan 29, 2026", product: "HR Consulting", code: "nz", country: "New Zealand", qty: "6 Months", industry: "Human Resource Services", review: "Streamlined our hiring process with expert HR consultants. Great service marketplace." },
  { date: "Jan 29, 2026", product: "Aluminium Windows", code: "jo", country: "Jordan", qty: "1,000 Units", industry: "Builders Hardware", review: "Custom aluminium frames for our residential project. Precise measurements and fast delivery." },
  { date: "Jan 29, 2026", product: "Lipstick & Makeup", code: "ua", country: "Ukraine", qty: "15,000 Pcs", industry: "Cosmetics & Toiletries", review: "Private-label cosmetics for our beauty brand. GoExports helped us launch 3 months early." },
  { date: "Jan 28, 2026", product: "Transport Logistics", code: "lb", country: "Lebanon", qty: "Monthly Contract", industry: "Transportation Services", review: "Reliable freight partners for our import business. Logistics sorted in one platform." },
  { date: "Jan 28, 2026", product: "Washing Machines", code: "pe", country: "Peru", qty: "800 Units", industry: "Electronic Goods", review: "Affordable home appliances for our electronics chain. Great wholesale rates." },
  { date: "Jan 28, 2026", product: "Floor Cleaning Supplies", code: "bh", country: "Bahrain", qty: "5,000 Units", industry: "Home Supplies", review: "Professional cleaning products for our facilities management company. Top quality." },
  { date: "Jan 27, 2026", product: "Dumbbells & Weights", code: "hr", country: "Croatia", qty: "2,000 Sets", industry: "Sports Goods", review: "Commercial-grade gym equipment for our fitness centers. Built to last." },
  { date: "Jan 27, 2026", product: "Vaccine Vials", code: "mz", country: "Mozambique", qty: "50,000 Vials", industry: "Drugs & Medicines", review: "Temperature-sensitive vaccines handled with proper cold chain. Trusted platform." },
  { date: "Jan 27, 2026", product: "Woven Carpets", code: "us", country: "United States", qty: "1,500 Pcs", industry: "Home Furnishings", review: "Hand-woven carpets that became bestsellers in our home décor store. Stunning quality." },
  { date: "Jan 26, 2026", product: "Transformer Coils", code: "ec", country: "Ecuador", qty: "500 Units", industry: "Electrical Equipment", review: "Industrial transformers sourced at 30% below local prices. GoExports saves us money." },
  { date: "Jan 26, 2026", product: "Interior Design", code: "ae", country: "UAE", qty: "3 Projects", industry: "Architectural Services", review: "Connected with talented interior designers for our luxury villas. Outstanding creativity." },
  { date: "Jan 26, 2026", product: "R&D Chemicals", code: "sg", country: "Singapore", qty: "100 Litres", industry: "Research & Development", review: "Specialty chemicals for our research lab. GoExports found niche suppliers fast." },
  { date: "Jan 25, 2026", product: "Leather Shoes", code: "gb", country: "United Kingdom", qty: "5,000 Pairs", industry: "Leather Products", review: "Handcrafted leather shoes for our premium brand. The craftsmanship is remarkable." },
  { date: "Jan 25, 2026", product: "Facility Maintenance", code: "kz", country: "Kazakhstan", qty: "Annual Contract", industry: "Facility Management", review: "Comprehensive maintenance services for our commercial buildings. Very professional." },
  { date: "Jan 25, 2026", product: "PCB Boards", code: "tw", country: "Taiwan", qty: "10,000 Pcs", industry: "Electronics Components", review: "Multi-layer PCBs manufactured to exact specifications. Zero defect rate so far." },
  { date: "Jan 24, 2026", product: "Blood Pressure Monitors", code: "cm", country: "Cameroon", qty: "2,000 Units", industry: "Medical & Pharma", review: "Affordable medical devices for our rural health clinics. GoExports bridges the gap." },
  { date: "Jan 24, 2026", product: "Trade Show Setup", code: "de", country: "Germany", qty: "5 Booths", industry: "Trade Promotion", review: "Professional exhibition booths that made our brand stand out at the trade fair." },
  { date: "Jan 24, 2026", product: "Business Registration", code: "us", country: "United States", qty: "10 Companies", industry: "Business Facilitation", review: "Helped us set up subsidiary companies in multiple countries. Hassle-free process." },
  { date: "Jan 23, 2026", product: "Rental Equipment", code: "au", country: "Australia", qty: "6 Months", industry: "Rental Services", review: "Heavy equipment rentals for our mining operations. Reliable machinery, fair rates." },
  { date: "Jan 23, 2026", product: "Hospital Beds", code: "rw", country: "Rwanda", qty: "200 Units", industry: "Hospital & Consultation", review: "Equipped our new hospital wing with quality beds. GoExports supports healthcare growth." },
  { date: "Jan 23, 2026", product: "Small Business Kits", code: "ph", country: "Philippines", qty: "500 Kits", industry: "Small Businesses", review: "Starter kits for our micro-enterprise program. GoExports empowers small businesses." },
  { date: "Jan 22, 2026", product: "Stethoscopes", code: "zm", country: "Zambia", qty: "3,000 Pcs", industry: "Medical & Pharma", review: "Diagnostic instruments for our medical supply chain. Consistent quality guaranteed." },
  { date: "Jan 22, 2026", product: "Rice Bran Oil", code: "mm", country: "Myanmar", qty: "50 MT", industry: "Agro & Farm", review: "Heart-healthy cooking oil for our food processing plant. Excellent raw material quality." },
  { date: "Jan 22, 2026", product: "Glass Bangles", code: "bd", country: "Bangladesh", qty: "50,000 Pcs", industry: "Fashion Accessories", review: "Colorful traditional bangles that sell out instantly in our accessory shops." },
  { date: "Jan 21, 2026", product: "Diesel Generators", code: "sd", country: "Sudan", qty: "100 Units", industry: "Electrical Equipment", review: "Backup power solutions for our telecom towers. Reliable generators at scale." },
  { date: "Jan 21, 2026", product: "Packing Tape", code: "cr", country: "Costa Rica", qty: "10,000 Rolls", industry: "Packaging Material", review: "Industrial packing tape for our logistics warehouse. Great adhesion and durability." },
  { date: "Jan 21, 2026", product: "Turmeric Powder", code: "us", country: "United States", qty: "10 MT", industry: "Agro & Farm", review: "Organic turmeric for our health food brand. Lab-tested and certified organic." },
  { date: "Jan 20, 2026", product: "Brass Fittings", code: "it", country: "Italy", qty: "8,000 Pcs", industry: "Builders Hardware", review: "Premium brass fittings for our plumbing distribution business. Impeccable finish." },
  { date: "Jan 20, 2026", product: "Pain Relief Gel", code: "fr", country: "France", qty: "15,000 Tubes", industry: "Drugs & Medicines", review: "Effective pain relief formulations for our pharmacy network. Patients report great results." },
  { date: "Jan 20, 2026", product: "Cotton Towels", code: "de", country: "Germany", qty: "20,000 Pcs", industry: "Textiles & Yarn", review: "Hotel-grade towels for our hospitality chain. Soft, absorbent, and long-lasting." },
  { date: "Jan 19, 2026", product: "Cashew Nuts", code: "nl", country: "Netherlands", qty: "40 MT", industry: "Agro & Farm", review: "Premium grade cashews for our snack brand. GoExports ensures food safety compliance." },
  { date: "Jan 19, 2026", product: "Fire Extinguishers", code: "ke", country: "Kenya", qty: "2,000 Units", industry: "Security Devices", review: "Safety equipment for our commercial buildings. Certified and delivered promptly." },
  { date: "Jan 19, 2026", product: "Embroidered Cushions", code: "se", country: "Sweden", qty: "3,000 Pcs", industry: "Home Furnishings", review: "Artisan-made cushions that add character to our Scandinavian home décor stores." },
  { date: "Jan 18, 2026", product: "Multivitamin Tablets", code: "gh", country: "Ghana", qty: "100,000 Tabs", industry: "Drugs & Medicines", review: "Affordable multivitamins for our pharmacy distribution network across West Africa." },
  { date: "Jan 18, 2026", product: "Welding Machines", code: "mx", country: "Mexico", qty: "500 Units", industry: "Fabrication", review: "Industrial welding equipment for our manufacturing plants. Robust and dependable." },
  { date: "Jan 18, 2026", product: "Wooden Handicrafts", code: "ca", country: "Canada", qty: "2,000 Pcs", industry: "Handicrafts & Gifts", review: "Unique artisan pieces for our gift shops. Each item tells a beautiful story." },
  { date: "Jan 17, 2026", product: "Server Racks", code: "jp", country: "Japan", qty: "300 Units", industry: "Computer Hardware", review: "Data center equipment at wholesale prices. GoExports is our IT procurement partner." },
  { date: "Jan 17, 2026", product: "Surgical Masks", code: "br", country: "Brazil", qty: "500,000 Pcs", industry: "Medical & Pharma", review: "Medical-grade masks during peak demand. GoExports ensured uninterrupted supply." },
  { date: "Jan 17, 2026", product: "Plastic Chairs", code: "tz", country: "Tanzania", qty: "5,000 Pcs", industry: "Furniture", review: "Durable outdoor furniture for our restaurant chain. Affordable and weather-resistant." },
  { date: "Jan 16, 2026", product: "Saffron", code: "ae", country: "UAE", qty: "500 kg", industry: "Agro & Farm", review: "Grade-1 saffron for our luxury spice brand. Authentic quality from trusted growers." },
  { date: "Jan 16, 2026", product: "Mobile Covers", code: "tr", country: "Turkey", qty: "30,000 Pcs", industry: "Fashion Accessories", review: "Trendy phone cases for our e-commerce store. Fast production and great margins." },
  { date: "Jan 16, 2026", product: "Cement Bags", code: "mz", country: "Mozambique", qty: "1,000 MT", industry: "Builders Hardware", review: "Construction-grade cement for our infrastructure projects. Reliable bulk supply." },
  { date: "Jan 15, 2026", product: "Ghee & Butter", code: "us", country: "United States", qty: "5 MT", industry: "Agro, Poultry & Dairy", review: "Pure A2 ghee for our Indian grocery distribution. Customers can taste the authenticity." },
  { date: "Jan 15, 2026", product: "Paper Napkins", code: "pl", country: "Poland", qty: "100,000 Pcs", industry: "Paper Products", review: "Custom-printed napkins for our restaurant franchise. Consistent quality across orders." },
  { date: "Jan 15, 2026", product: "Yoga Mats", code: "au", country: "Australia", qty: "5,000 Pcs", industry: "Sports Goods", review: "Eco-friendly yoga mats for our wellness studio chain. Our members love them." },
  { date: "Jan 14, 2026", product: "Electric Motors", code: "vn", country: "Vietnam", qty: "1,000 Units", industry: "Plant & Machinery", review: "Energy-efficient motors for our factory automation. Significant cost savings achieved." },
  { date: "Jan 14, 2026", product: "Shampoo & Conditioner", code: "eg", country: "Egypt", qty: "20,000 Bottles", industry: "Cosmetics & Toiletries", review: "Private-label haircare for our salon chain. GoExports handled formulation and packaging." },
  { date: "Jan 14, 2026", product: "Wall Clocks", code: "sa", country: "Saudi Arabia", qty: "3,000 Pcs", industry: "Home Supplies", review: "Decorative clocks for our home accessories stores. Elegant designs at great prices." },
  { date: "Jan 13, 2026", product: "Rubber Sheets", code: "my", country: "Malaysia", qty: "10 MT", industry: "Industrial Supplies", review: "Industrial-grade rubber for our gasket manufacturing. Meets all our quality standards." },
  { date: "Jan 13, 2026", product: "Diamond Necklaces", code: "gb", country: "United Kingdom", qty: "100 Pcs", industry: "Gems & Jewellery", review: "Certified diamonds with GIA grading. Our luxury jewellery store clients are thrilled." },
  { date: "Jan 13, 2026", product: "Paracetamol Syrup", code: "cd", country: "DR Congo", qty: "50,000 Bottles", industry: "Drugs & Medicines", review: "Essential medicines for our community health centres. GoExports ensures pharma quality." },
  { date: "Jan 12, 2026", product: "Organic Honey", code: "fi", country: "Finland", qty: "2,000 Jars", industry: "Ayurvedic & Herbal", review: "Pure forest honey that became our bestselling organic product line overnight." },
  { date: "Jan 12, 2026", product: "Rickshaw Parts", code: "bd", country: "Bangladesh", qty: "10,000 Sets", industry: "Bicycles & Rickshaws", review: "Replacement parts that keep our transport fleet operational. Dependable supply chain." },
  { date: "Jan 12, 2026", product: "SIM Card Dispensers", code: "ng", country: "Nigeria", qty: "500 Units", industry: "Telecom Products", review: "Automated dispensers for our telecom retail network. Modern technology at fair prices." },
  { date: "Jan 11, 2026", product: "Henna Powder", code: "om", country: "Oman", qty: "5 MT", industry: "Cosmetics & Toiletries", review: "Natural henna powder for our beauty brand. Organic and chemical-free as promised." },
  { date: "Jan 11, 2026", product: "Garments Stitching", code: "es", country: "Spain", qty: "20,000 Pcs", industry: "Apparel & Garments", review: "Custom fashion garments for our clothing line. Flawless stitching and fast turnaround." },
  { date: "Jan 11, 2026", product: "Water Purifiers", code: "ke", country: "Kenya", qty: "1,500 Units", industry: "Home Supplies", review: "Clean water solutions for rural communities. GoExports helps us make a real difference." },
  { date: "Jan 10, 2026", product: "Chemical Dyes", code: "id", country: "Indonesia", qty: "20 MT", industry: "Chemicals & Fertilizers", review: "Vibrant textile dyes for our fabric printing business. Colors that don't fade." },
  { date: "Jan 10, 2026", product: "Tooth Paste", code: "cm", country: "Cameroon", qty: "30,000 Tubes", industry: "Cosmetics & Toiletries", review: "Private-label toothpaste for our retail distribution. GoExports handled everything." },
  { date: "Jan 10, 2026", product: "Steel Utensils", code: "qa", country: "Qatar", qty: "5,000 Sets", industry: "Kitchen Utensils", review: "Premium stainless steel utensils for our hospitality supply business. Top-notch quality." },
];

const INITIAL_COUNT = 30;

export default function SellerVideos() {
  const [showAll, setShowAll] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<typeof buyers[0] | null>(null);
  const visible = showAll ? buyers : buyers.slice(0, INITIAL_COUNT);

  return (
    <section id="buyers" className="bg-white text-[#0F1111] py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="text-center mb-10">
            <span className="inline-block bg-[#111111] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Live Export Leads
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-3">
              Latest Buyer Requirements
            </h2>
            <p className="text-center text-[#565959] text-base max-w-[560px] mx-auto leading-relaxed">
              Real-time export leads from verified international buyers across 120+ countries. Register to connect with these buyers directly.
            </p>
          </div>
        </FadeIn>

        {/* Stats strip */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { value: `${buyers.length}+`, label: "Active Leads" },
              { value: "120+", label: "Countries" },
              { value: "24hrs", label: "Avg Response Time" },
              { value: "92%", label: "Conversion Rate" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="text-2xl font-extrabold text-[#0F1111]">{stat.value}</span>
                <span className="text-xs text-[#999] leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((buyer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.5), duration: 0.3 }}
            >
              <div className="bg-[#FAFAFA] border border-[#e7e7e7] rounded-xl p-5 px-6 transition-all duration-200 hover:border-[#111111] hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[12px] text-[#999]">{buyer.date}</span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Verified Lead
                  </span>
                </div>

                <h3 className="text-[15px] font-bold text-[#0F1111] mb-2.5">
                  WANTED: {buyer.product}
                </h3>

                <div className="flex items-center gap-2.5 mb-3">
                  <img
                    src={`https://flagcdn.com/24x18/${buyer.code}.png`}
                    srcSet={`https://flagcdn.com/48x36/${buyer.code}.png 2x`}
                    width="24"
                    height="18"
                    alt={`${buyer.country} flag`}
                    className="rounded-[2px] shrink-0 object-cover shadow-sm"
                    loading="lazy"
                  />
                  <span className="text-sm font-semibold text-[#0F1111]">{buyer.country}</span>
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <div className="flex items-center gap-2 text-[12px] text-[#565959]">
                    <span className="text-[#999]">📦</span>
                    Quantity: <span className="text-[#0F1111] font-semibold">{buyer.qty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-[#565959]">
                    <span className="text-[#999]">🏷️</span>
                    Industry: <span className="text-[#0F1111] font-semibold">{buyer.industry}</span>
                  </div>
                </div>

                {/* Review */}
                <div className="flex-1 mb-4">
                  <div className="bg-white border border-[#f0f0f0] rounded-lg p-3">
                    <div className="flex gap-0.5 mb-1.5">
                      {[1,2,3,4,5].map((s) => (
                        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#565959] leading-relaxed italic">&ldquo;{buyer.review}&rdquo;</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedBuyer(buyer)}
                  className="w-full py-2.5 rounded-lg text-[12px] font-bold text-center transition-all duration-200 cursor-pointer border-none
                    bg-[#111111] text-white hover:bg-[#333333] shadow-sm hover:shadow-md"
                >
                  Connect with Buyer →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More */}
        {buyers.length > INITIAL_COUNT && (
          <FadeIn delay={0.2}>
            <div className="text-center mt-10">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] text-white font-bold text-sm rounded-full cursor-pointer transition-all duration-200 hover:bg-[#333333] shadow-lg shadow-black/15"
              >
                {showAll
                  ? "Show Less ↑"
                  : `View All ${buyers.length} Export Leads ↓`
                }
              </motion.button>
              {!showAll && (
                <p className="text-xs text-[#999] mt-3">
                  Showing {INITIAL_COUNT} of {buyers.length} leads • New leads added daily
                </p>
              )}
            </div>
          </FadeIn>
        )}
      </div>
      {/* ═══ CONTACT FORM MODAL ═══ */}
      <AnimatePresence>
        {selectedBuyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            onClick={() => setSelectedBuyer(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl shadow-black/20 w-full max-w-[440px] max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedBuyer(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#565959] hover:bg-[#e7e7e7] transition-colors cursor-pointer border-none z-10"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>

              <div className="p-7 pt-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#111111] flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0F1111]">Get in Touch</h3>
                    <p className="text-sm text-[#565959]">We&apos;ll get back to you within 24 hours</p>
                  </div>
                </div>

                {/* Buyer context */}
                <div className="bg-[#FAFAFA] border border-[#e7e7e7] rounded-xl p-4 mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#999] mb-2">Enquiring about</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://flagcdn.com/24x18/${selectedBuyer.code}.png`}
                      srcSet={`https://flagcdn.com/48x36/${selectedBuyer.code}.png 2x`}
                      width="24"
                      height="18"
                      alt={`${selectedBuyer.country} flag`}
                      className="rounded-[2px] shrink-0"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#0F1111]">{selectedBuyer.product}</p>
                      <p className="text-[12px] text-[#565959]">{selectedBuyer.country} • {selectedBuyer.qty} • {selectedBuyer.industry}</p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#0F1111] mb-2">Full Name</label>
                    <div className="relative">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        type="text"
                        placeholder="John Doe"
                        required
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#e0e0e0] text-sm text-[#0F1111] placeholder:text-[#bbb] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#0F1111] mb-2">Email Address</label>
                    <div className="relative">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        required
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#e0e0e0] text-sm text-[#0F1111] placeholder:text-[#bbb] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#0F1111] mb-2">Phone Number</label>
                    <div className="relative">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#e0e0e0] text-sm text-[#0F1111] placeholder:text-[#bbb] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#0F1111] mb-2">Company Name</label>
                    <div className="relative">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Acme Inc."
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#e0e0e0] text-sm text-[#0F1111] placeholder:text-[#bbb] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#111111] text-white font-bold text-sm rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#333333] shadow-lg shadow-black/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 border-none mt-1"
                  >
                    Submit Enquiry
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}