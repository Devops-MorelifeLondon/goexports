"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ─── Animation helper ─── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Category data ─── */
type CategoryItem = { name: string; desc: string };
const categories: { title: string; image: string; desc: string; items: CategoryItem[] }[] = [
  {
    title: "Common Disease Medicines",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    desc: "Explore a wide range of pharmaceutical medicines for common diseases including fever, infections, allergies, and chronic conditions. Connect with verified manufacturers and wholesalers globally.",
    items: [
      { name: "Pharmaceutical Medicine", desc: "General-purpose medicines for treating common health conditions" },
      { name: "Pharmaceutical Syrup", desc: "Liquid oral formulations for easy dosage and fast absorption" },
      { name: "Pharmaceutical Tablets", desc: "Solid dosage forms for precise and convenient medication delivery" },
      { name: "Pharmaceutical Drug", desc: "Branded and generic drugs for a wide range of ailments" },
      { name: "Antihistamines", desc: "Allergy relief medicines for rhinitis, urticaria, and hay fever" },
      { name: "Cough & Cold Medicine", desc: "OTC remedies for cough suppression, congestion, and cold symptoms" },
    ],
  },
  {
    title: "Nutraceuticals & Dietary Supplements",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop",
    desc: "Source premium nutraceuticals and dietary supplements including protein concentrates, vitamins, and health powders from trusted global suppliers.",
    items: [
      { name: "Whey Protein Concentrate", desc: "High-quality dairy-derived protein for muscle recovery and nutrition" },
      { name: "Milk Protein Concentrates", desc: "Casein and whey blends for sustained amino acid release" },
      { name: "Soybean Protein Concentrate", desc: "Plant-based protein ideal for vegan and vegetarian formulations" },
      { name: "Protein Supplement", desc: "Ready-to-consume protein products for fitness and wellness" },
      { name: "Protein Powder", desc: "Versatile powder formulations for shakes, bars, and food fortification" },
      { name: "Multivitamin Tablets", desc: "Essential daily vitamins and minerals in convenient tablet form" },
    ],
  },
  {
    title: "Anti Infective Drugs & Medicines",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop",
    desc: "Find antibacterial, antiviral, and antifungal medicines from certified pharmaceutical manufacturers. High-quality anti-infective drugs for global healthcare needs.",
    items: [
      { name: "Antibacterial Drugs", desc: "Broad-spectrum and targeted medicines to fight bacterial infections" },
      { name: "Penicillin G Injections", desc: "Injectable antibiotic for severe bacterial infections and sepsis" },
      { name: "Antibiotic Tablets & Capsules", desc: "Oral antibiotics for respiratory, urinary, and skin infections" },
      { name: "Antibiotic Injection", desc: "Parenteral antibiotics for hospital and critical care settings" },
      { name: "Amoxicillin Drugs", desc: "Widely prescribed penicillin-type antibiotic for common infections" },
      { name: "Antifungal Medicine", desc: "Treatments for fungal infections of skin, nails, and systemic conditions" },
    ],
  },
  {
    title: "Pharma Ingredients & Raw Materials",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
    desc: "Source active pharmaceutical ingredients (APIs), excipients, and intermediates from verified manufacturers for drug formulation and production.",
    items: [
      { name: "API (Active Pharmaceutical Ingredients)", desc: "Core chemical compounds responsible for the therapeutic effect of drugs" },
      { name: "Streptomycin Sulfate API", desc: "Aminoglycoside antibiotic API used in TB and bacterial treatments" },
      { name: "Anti Infective API", desc: "Raw materials for manufacturing antibacterial and antiviral drugs" },
      { name: "API Intermediate", desc: "Chemical intermediates used in the synthesis of final API products" },
      { name: "Pharmaceutical Excipients", desc: "Inactive ingredients like binders, fillers, and coatings for drug formulation" },
      { name: "Drug Formulation Chemicals", desc: "Specialty chemicals for tablet, capsule, and injectable formulations" },
    ],
  },
  {
    title: "Cardiovascular Drugs & Medication",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop",
    desc: "Access a comprehensive range of cardiovascular medications including cardiac drugs, blood pressure medicines, and anticoagulants from reliable suppliers.",
    items: [
      { name: "Cardiac Drugs", desc: "Medicines for heart failure, arrhythmia, and coronary artery disease" },
      { name: "Diabetes Medicine", desc: "Oral hypoglycemics and insulin products for blood sugar management" },
      { name: "Blood Pressure Medicine", desc: "Antihypertensive drugs including ACE inhibitors and beta-blockers" },
      { name: "Anticoagulant and Antiplatelet Drugs", desc: "Blood thinners to prevent clots, stroke, and embolism" },
      { name: "Kidney Drugs", desc: "Nephrology medicines for renal failure and dialysis patients" },
      { name: "Cholesterol Medicine", desc: "Statins and lipid-lowering drugs for cardiovascular risk reduction" },
    ],
  },
  {
    title: "TB, Tumor & Cancer Drugs",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop",
    desc: "Specialized oncology and tuberculosis medications from globally certified pharmaceutical companies. Access life-saving drugs for critical care treatments.",
    items: [
      { name: "Anti Cancer Medicines", desc: "Chemotherapy and targeted therapy drugs for various cancer types" },
      { name: "Human Albumin Injection", desc: "Plasma protein used in critical care and oncology supportive treatment" },
      { name: "Anti Cancer Injection", desc: "Injectable oncology drugs for hospital and infusion center use" },
      { name: "Ondansetron", desc: "Anti-nausea medication commonly used during chemotherapy treatments" },
      { name: "Ondansetron Tablet", desc: "Oral formulation for preventing nausea and vomiting post-treatment" },
      { name: "TB Treatment Drugs", desc: "First-line and second-line tuberculosis medications per WHO guidelines" },
    ],
  },
  {
    title: "Pain Relief Drugs & Pharmaceuticals",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=300&fit=crop",
    desc: "Source analgesics, anti-inflammatory drugs, and pain management pharmaceuticals. From OTC painkillers to prescription-grade medications for global distribution.",
    items: [
      { name: "Diclofenac Paracetamol and Chlorzoxazone Tablet", desc: "Combination analgesic for pain, inflammation, and muscle spasm relief" },
      { name: "Anti Inflammatory Drugs", desc: "NSAIDs and corticosteroids for reducing inflammation and swelling" },
      { name: "Antipyretic Medication", desc: "Fever-reducing medicines including paracetamol and ibuprofen" },
      { name: "Diclofenac", desc: "Widely used NSAID for arthritis, sprains, and post-operative pain" },
      { name: "Arthritic Drugs", desc: "Disease-modifying and symptomatic treatments for joint conditions" },
      { name: "Muscle Relaxants", desc: "Medicines to relieve muscle spasms, stiffness, and tension" },
    ],
  },
  {
    title: "Digestive System Drugs & Medicines",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop",
    desc: "Gastrointestinal medicines including antacids, proton pump inhibitors, and digestive health supplements from verified pharmaceutical suppliers worldwide.",
    items: [
      { name: "Antacid Drugs", desc: "Acid-neutralizing medicines for heartburn and indigestion relief" },
      { name: "Gastrointestinal Drugs", desc: "Broad-spectrum GI medicines for stomach and intestinal disorders" },
      { name: "Pantoprazole Drugs", desc: "Proton pump inhibitors for GERD and peptic ulcer treatment" },
      { name: "Rabeprazole Domperidone Capsule", desc: "Combination therapy for acid reflux and gastric motility disorders" },
      { name: "Anti Ulcer Drugs", desc: "H2 blockers and PPIs for healing and preventing stomach ulcers" },
      { name: "Laxative Medicine", desc: "Bowel-stimulating medicines for constipation and digestive regularity" },
    ],
  },
  {
    title: "Brain & Nervous System Drugs",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    desc: "Neurological and psychiatric medicines including antidepressants, anti-anxiety drugs, and nervous system treatments from trusted global manufacturers.",
    items: [
      { name: "Antidepressant & Anti Anxiety Medicines", desc: "SSRIs, SNRIs, and benzodiazepines for mood and anxiety disorders" },
      { name: "Psychotherapeutic Agents", desc: "Antipsychotics and mood stabilizers for psychiatric conditions" },
      { name: "Antimigraine Drug", desc: "Triptans and preventive medicines for migraine management" },
      { name: "Immunomodulator Drugs", desc: "Medicines that modify immune response for autoimmune and neurological conditions" },
      { name: "Neuropathy Medicine", desc: "Treatments for nerve pain, diabetic neuropathy, and nerve damage" },
      { name: "Anticonvulsant Drugs", desc: "Epilepsy and seizure-control medications for neurological care" },
    ],
  },
  {
    title: "Animal Medicines & Health Care",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&h=300&fit=crop",
    desc: "Supply veterinary pharmaceuticals, animal healthcare products, and livestock medicines to farms, veterinary clinics, and animal care facilities worldwide.",
    items: [
      { name: "Veterinary Pharmaceuticals", desc: "Prescription and OTC medicines formulated for animal health" },
      { name: "Veterinary Medicines", desc: "General-purpose treatments for livestock, poultry, and pets" },
      { name: "Veterinary Instruments", desc: "Surgical and diagnostic tools for veterinary clinics and hospitals" },
      { name: "Veterinary Drugs", desc: "Antibiotics, antiparasitics, and vaccines for animal disease control" },
      { name: "Veterinary Injections", desc: "Injectable treatments for rapid action in animal healthcare" },
      { name: "Animal Feed Supplements", desc: "Nutritional additives to boost animal health, growth, and immunity" },
    ],
  },
  {
    title: "Sexual Wellness Products",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
    desc: "Distribute sexual health and wellness products including hygiene products, fertility enhancers, contraceptives, and diagnostic test kits to global markets.",
    items: [
      { name: "Female Hygiene Products & Test Kits", desc: "Sanitary products and home diagnostic kits for women's health" },
      { name: "Fertility Enhancer Drugs", desc: "Medicines to support reproductive health and fertility treatments" },
      { name: "Contraceptives", desc: "Oral, barrier, and hormonal contraceptive products for family planning" },
      { name: "Pregnancy Test Kits", desc: "Rapid home-testing kits for early pregnancy detection" },
      { name: "Birth Control Pills", desc: "Hormonal oral contraceptives for reliable birth control" },
      { name: "Sexual Health Supplements", desc: "Vitamins and herbal supplements for sexual wellness and vitality" },
    ],
  },
  {
    title: "Respiratory System Drugs",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop",
    desc: "Access respiratory medicines including asthma inhalers, bronchodilators, nebulizer solutions, and anti-allergy medications from certified pharmaceutical manufacturers.",
    items: [
      { name: "Anti Asthma Drug", desc: "Bronchodilators and corticosteroids for asthma management" },
      { name: "Levocetirizine HCl & Montelukast Sodium Tablet", desc: "Combination anti-allergy tablet for rhinitis and asthma symptoms" },
      { name: "Asthma Inhaler", desc: "Metered-dose and dry powder inhalers for quick asthma relief" },
      { name: "Budesonide Inhaler & Nebulizer", desc: "Corticosteroid inhaler for long-term asthma and COPD control" },
      { name: "Beclomethasone Dipropionate Cream", desc: "Topical corticosteroid for skin allergies and inflammatory conditions" },
      { name: "Cough Suppressants", desc: "Antitussive medicines for dry cough and throat irritation relief" },
    ],
  },
  {
    title: "Healthcare Products & Aids",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop",
    desc: "Sell health drinks, glucose supplements, nebulizer machines, steam vaporizers, and personal healthcare aids to consumers and medical facilities globally.",
    items: [
      { name: "Health Drinks", desc: "Nutritional beverages with vitamins, minerals, and protein" },
      { name: "Glucose Powder", desc: "Instant energy supplements for dehydration and low blood sugar" },
      { name: "Nebulizer Machine & Parts", desc: "Respiratory therapy devices for administering inhaled medications" },
      { name: "Steam Vaporizer", desc: "Portable steam inhalers for congestion and respiratory relief" },
      { name: "Massagers", desc: "Electric and manual massage devices for pain relief and relaxation" },
      { name: "Blood Pressure Monitors", desc: "Digital BP monitors for home and clinical health tracking" },
    ],
  },
  {
    title: "Immunization & Vaccination Drugs",
    image: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=400&h=300&fit=crop",
    desc: "Supply vaccines and immunization products to hospitals, government health programs, and healthcare providers. Access the rapidly growing global vaccination market.",
    items: [
      { name: "Vaccines", desc: "Preventive biological preparations for immunization against diseases" },
      { name: "Hepatitis B Vaccine", desc: "Recombinant vaccine for hepatitis B virus prevention" },
      { name: "Typhoid Vaccine", desc: "Oral and injectable vaccines for typhoid fever protection" },
      { name: "Cholera Vaccine", desc: "Oral vaccine for protection against cholera in endemic regions" },
      { name: "Diphtheria Antitoxin Injection", desc: "Antitoxin serum for emergency diphtheria treatment" },
      { name: "Influenza Vaccine", desc: "Seasonal flu shots for annual immunization programs" },
    ],
  },
  {
    title: "Homeopathic Medicines & Remedies",
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=400&h=300&fit=crop",
    desc: "Reach global buyers for homeopathic drugs, remedies, syrups, and drops. Tap into the growing demand for alternative and complementary medicine worldwide.",
    items: [
      { name: "Homeopathic Drugs", desc: "Potentized remedies for holistic treatment of various conditions" },
      { name: "Homeopathy Treatment", desc: "Complete treatment kits and protocols for common health issues" },
      { name: "Homoeopathic Syrup", desc: "Liquid homeopathic formulations for easy and precise dosing" },
      { name: "Homeopathic Drops", desc: "Sublingual drop remedies for quick absorption and gentle action" },
      { name: "Homeopathic Consultant", desc: "Professional consultation services for personalized homeopathic care" },
      { name: "Homeopathic Dilutions", desc: "Mother tinctures and serial dilutions for remedy preparation" },
    ],
  },
  {
    title: "Ayurvedic, Herbal Products & Medicine",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    desc: "Export traditional Ayurvedic medicines, herbal products, natural honey, and herbal syrups to health-conscious consumers seeking natural wellness solutions globally.",
    items: [
      { name: "Ayurvedic Medicine", desc: "Traditional Indian medicines based on centuries-old Ayurvedic principles" },
      { name: "Natural Honey", desc: "Pure, organic honey sourced from trusted apiaries for health and wellness" },
      { name: "Honey & Sweeteners", desc: "Natural sweetening products including raw honey and herbal syrups" },
      { name: "Ayurvedic Herbal Syrups & Tonics", desc: "Herbal liquid formulations for immunity, digestion, and vitality" },
      { name: "Ayurvedic Digestive Medicine", desc: "Traditional remedies for bloating, acidity, and digestive wellness" },
      { name: "Herbal Supplements", desc: "Plant-based capsules and tablets for natural health support" },
    ],
  },
];

/* ─── FAQ data ─── */
const faqs = [
  {
    q: "What types of pharmaceutical products can I sell on this platform?",
    a: "You can sell a wide range of pharmaceutical products including prescription medicines, OTC drugs, nutraceuticals, dietary supplements, APIs (Active Pharmaceutical Ingredients), pharma raw materials, surgical consumables, and medical devices. All products must comply with relevant regulatory standards.",
  },
  {
    q: "Do I need specific licenses or certifications to list drugs and medicines?",
    a: "Yes, sellers must hold valid pharmaceutical manufacturing or distribution licenses as per their country's regulations (e.g., Drug License, GMP certification, WHO-GMP, FDA approval). You'll need to upload these documents during the registration process for verification.",
  },
  {
    q: "How are international buyers verified on the platform?",
    a: "All buyers go through a multi-step verification process including business registration validation, trade license checks, and import permit verification. This ensures you're dealing with legitimate pharmaceutical distributors, hospitals, and pharmacy chains.",
  },
  {
    q: "What are the shipping and logistics options for pharmaceutical products?",
    a: "We offer temperature-controlled cold chain logistics, express air freight for urgent shipments, and cost-effective sea freight for bulk orders. All shipments include real-time tracking, insurance coverage, and compliance with international pharmaceutical shipping regulations (GDP guidelines).",
  },
  {
    q: "How do you ensure the quality and authenticity of medicines listed?",
    a: "Every pharmaceutical seller undergoes a rigorous onboarding process including facility verification, quality certification review, and batch testing documentation. We also conduct periodic quality audits and maintain a strict counterfeit prevention policy.",
  },
  {
    q: "What are the payment terms for international pharmaceutical trade?",
    a: "We support multiple secure payment methods including Letter of Credit (L/C), bank wire transfers, escrow services, and trade financing options. Payment terms can be negotiated between buyers and sellers with our platform facilitating secure transactions.",
  },
  {
    q: "Can I sell pharmaceutical products to regulated markets like the US and EU?",
    a: "Yes, provided your products meet the regulatory requirements of the target market (FDA approval for US, CE marking for EU, etc.). Our compliance team can guide you through the documentation and approval processes required for each market.",
  },
  {
    q: "What is the commission or fee structure for sellers?",
    a: "We offer flexible plans starting from ₹25,000/month. Commission rates vary by product category and order volume. High-volume sellers qualify for reduced rates. There are no hidden fees — you only pay for the plan you choose plus a small transaction fee on completed orders.",
  },
  {
    q: "How long does it take to get my pharmaceutical products listed?",
    a: "Once you submit your registration with all required documents (drug license, GMP certificate, product catalog), verification typically takes 3-5 business days. After approval, you can start listing products immediately through our seller dashboard.",
  },
  {
    q: "Do you provide support for regulatory compliance in different countries?",
    a: "Yes, our dedicated compliance team provides guidance on import/export regulations, labeling requirements, packaging standards, and documentation needed for pharmaceutical trade in over 190 countries. We also offer paid regulatory consulting services for complex market entries.",
  },
];

/* ─── Component ─── */
export default function DrugsAndMedicinesPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const active = categories[activeCategory];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">

      {/* ═══ HERO ═══ */}
      <section className="relative bg-white text-[#0F1111] overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #111 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-[1200px] mx-auto px-6 py-20 md:py-28">
          <FadeIn>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-[#999]">
                <li><Link href="/" className="hover:text-[#0F1111] transition-colors no-underline">Home</Link></li>
                <li className="text-[#ccc]">/</li>
                <li><Link href="/#industries" className="hover:text-[#0F1111] transition-colors no-underline">Industries</Link></li>
                <li className="text-[#ccc]">/</li>
                <li className="text-[#0F1111] font-medium">Drugs & Medicines</li>
              </ol>
            </nav>
          </FadeIn>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="flex-1 max-w-[650px]">
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 bg-[#F5F5F5] border border-[#e7e7e7] rounded-full px-4 py-1.5 text-sm text-[#565959] mb-6">
                  <span className="text-lg">💊</span>
                  Health Products, Drug and Medicine
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] mb-5 text-[#0F1111]">
                  Drugs &<br />
                  <span className="text-[#999]">Medicines</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-lg text-[#565959] leading-relaxed mb-8 max-w-[540px]">
                  Connect with verified global buyers for pharmaceutical products, OTC medicines, nutraceuticals, APIs, and healthcare supplements. Expand your pharma business to 190+ countries.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="flex flex-wrap gap-4 mb-8">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] text-white font-bold text-sm rounded-full no-underline transition-all duration-200 hover:bg-[#333333] shadow-lg shadow-black/15 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    Contact Us Now →
                  </a>
                  <a
                    href="#categories"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-[#111111] text-[#0F1111] font-bold text-sm rounded-full no-underline transition-all duration-200 hover:bg-[#111111] hover:text-white"
                  >
                    Browse Categories
                  </a>
                </div>
              </FadeIn>

              {/* Stats strip */}
              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-6 mb-8">
                  {[
                    { value: "$1.5T+", label: "Market Size" },
                    { value: "50K+", label: "Active Buyers" },
                    { value: "190+", label: "Countries" },
                    { value: "16", label: "Categories" },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="text-2xl font-extrabold text-[#0F1111]">{stat.value}</span>
                      <span className="text-xs text-[#999] leading-tight">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Trust badges */}
              <FadeIn delay={0.35}>
                <div className="flex flex-wrap gap-3">
                  {["WHO-GMP Certified", "FDA Compliant", "Cold Chain Logistics", "Verified Buyers Only"].map((badge, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-[#F5F5F5] border border-[#e7e7e7] rounded-full px-3.5 py-1.5 text-[12px] text-[#565959]"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12" /></svg>
                      {badge}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Hero Form */}
            <FadeIn delay={0.3}>
              <div className="w-full lg:w-[400px] bg-[#FAFAFA] border border-[#e7e7e7] rounded-2xl p-7 shadow-xl shadow-black/5">
                <h3 className="text-xl font-extrabold text-[#0F1111] mb-1">Get Started Today</h3>
                <p className="text-sm text-[#565959] mb-5">Fill in your details and our team will reach out within 24 hours.</p>

                <form className="flex flex-col gap-3.5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-sm text-[#0F1111] placeholder:text-[#aaa] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Email Address *</label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-sm text-[#0F1111] placeholder:text-[#aaa] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-sm text-[#0F1111] placeholder:text-[#aaa] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Company Name</label>
                    <input
                      type="text"
                      placeholder="Your company name"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-sm text-[#0F1111] placeholder:text-[#aaa] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Product Category</label>
                    <select
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-sm text-[#0F1111] bg-white focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>Select a category</option>
                      <option>Common Disease Medicines</option>
                      <option>Nutraceuticals & Dietary Supplements</option>
                      <option>Anti Infective Drugs & Medicines</option>
                      <option>Pharma Ingredients & Raw Materials</option>
                      <option>Cardiovascular Drugs & Medication</option>
                      <option>TB, Tumor & Cancer Drugs</option>
                      <option>Pain Relief Drugs & Pharmaceuticals</option>
                      <option>Digestive System Drugs & Medicines</option>
                      <option>Brain & Nervous System Drugs</option>
                      <option>Animal Medicines & Health Care</option>
                      <option>Sexual Wellness Products</option>
                      <option>Respiratory System Drugs</option>
                      <option>Healthcare Products & Aids</option>
                      <option>Immunization & Vaccination Drugs</option>
                      <option>Homeopathic Medicines & Remedies</option>
                      <option>Ayurvedic, Herbal Products & Medicine</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#111111] text-white font-bold text-sm rounded-lg mt-1 cursor-pointer transition-all duration-200 hover:bg-[#333333] shadow-lg shadow-black/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Submit Enquiry →
                  </button>
                </form>

              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ ALL CATEGORIES GRID ═══ */}
      <section id="categories" className="py-16 px-6 scroll-mt-8">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0F1111] mb-2">
              All Product Categories
            </h2>
            <p className="text-center text-[#565959] text-[15px] max-w-[550px] mx-auto mb-10">
              Explore our comprehensive range of pharmaceutical products across 16 specialized categories.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <button
                  onClick={() => {
                    setActiveCategory(i);
                    document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full text-left flex items-start gap-4 p-5 rounded-xl border transition-all duration-200 cursor-pointer
                    ${activeCategory === i
                      ? "bg-[#111111] text-white border-[#111111] shadow-lg shadow-black/15"
                      : "bg-white text-[#0F1111] border-[#e7e7e7] hover:border-[#111111] hover:shadow-md"
                    }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className={`text-sm font-bold mb-1 ${activeCategory === i ? "text-white" : "text-[#0F1111]"}`}>
                      {cat.title}
                    </h4>
                    <p className={`text-xs leading-relaxed ${activeCategory === i ? "text-white/60" : "text-[#565959]"}`}>
                      {cat.items.slice(0, 3).map(it => it.name).join(" • ")}
                    </p>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BROWSE CATEGORY DETAIL ═══ */}
      <section id="browse" className="py-16 px-6 bg-white scroll-mt-8">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0F1111] mb-2">
              Browse Product Categories
            </h2>
            <p className="text-center text-[#565959] text-[15px] max-w-[550px] mx-auto mb-10">
              Click on a category to see detailed product listings and start selling.
            </p>
          </FadeIn>

          {/* Tabs */}
          <FadeIn delay={0.1}>
            <div className="flex gap-2 justify-center mb-10 flex-wrap">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(i)}
                  className={`px-4 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer whitespace-nowrap transition-all duration-200
                    ${activeCategory === i
                      ? "bg-[#111111] text-white shadow-lg shadow-black/20"
                      : "bg-[#FAFAFA] text-[#565959] border border-[#e7e7e7] hover:border-[#111111] hover:text-[#0F1111] hover:shadow-sm"
                    }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Active category content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="bg-[#FAFAFA] border border-[#e7e7e7] rounded-2xl overflow-hidden shadow-lg shadow-black/5"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-[360px] h-[240px] md:h-auto shrink-0 relative overflow-hidden bg-[#F5F5F5]">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-[#111111] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                      {active.items.length} Products
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-7 md:p-9">
                  <h3 className="text-2xl font-bold text-[#0F1111] mb-3">{active.title}</h3>
                  <p className="text-[15px] text-[#565959] leading-relaxed mb-6">{active.desc}</p>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#999] mb-3">Products in this category</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {active.items.map((item, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.06, duration: 0.3 }}
                        className="flex items-start gap-2.5 py-2.5 px-3 bg-white rounded-lg text-sm text-[#0F1111] hover:bg-[#F0F0F0] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0 mt-1.5" />
                        <div>
                          <span className="font-semibold text-[#0F1111]">{item.name}</span>
                          <p className="text-xs text-[#888] leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#e7e7e7]">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-white font-bold text-sm rounded-full no-underline transition-all duration-200 hover:bg-[#333333] shadow-md shadow-black/20 hover:scale-[1.03] active:scale-[0.97]"
                    >
                      Sell {active.title} →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-extrabold text-center text-[#0F1111] mb-10">
              Why Sell Drugs & Medicines With Us?
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "🌍", title: "Global Reach", desc: "Access verified buyers in 190+ countries across hospitals, pharmacies, and distributors." },
              { icon: "🔒", title: "Verified Buyers", desc: "Every buyer is verified with trade licenses, import permits, and business registration." },
              { icon: "🚚", title: "Pharma Logistics", desc: "Temperature-controlled cold chain shipping with real-time tracking and GDP compliance." },
              { icon: "📋", title: "Compliance Support", desc: "Dedicated team to help with FDA, CE, WHO-GMP documentation and market-specific regulations." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-[#FAFAFA] border border-[#e7e7e7] rounded-xl p-6 text-center hover:border-[#111111] transition-all duration-200 hover:shadow-md h-full">
                  <span className="text-4xl block mb-4">{item.icon}</span>
                  <h4 className="text-base font-bold text-[#0F1111] mb-2">{item.title}</h4>
                  <p className="text-sm text-[#565959] leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQs ═══ */}
      <section className="py-16 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0F1111] mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-[#565959] text-[15px] max-w-[480px] mx-auto mb-10">
              Everything you need to know about selling pharmaceutical products on our platform.
            </p>
          </FadeIn>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div
                  className={`bg-white border rounded-xl overflow-hidden transition-all duration-300
                    ${openFaq === i ? "border-[#111111] shadow-md" : "border-[#e7e7e7] hover:border-[#999]"}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer bg-transparent border-none"
                  >
                    <span className="text-[15px] font-semibold text-[#0F1111] leading-snug">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center text-lg text-[#0F1111] shrink-0 font-light"
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-0">
                          <div className="border-t border-[#e7e7e7] pt-4">
                            <p className="text-sm text-[#565959] leading-[1.7]">{faq.a}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-16 px-6 bg-[#0F1111] text-white">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Ready to Export Drugs & Medicines Globally?
            </h2>
            <p className="text-white/60 text-base mb-8 leading-relaxed">
              Join thousands of pharmaceutical sellers already growing their business across 190+ countries. Get started today with zero upfront costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#0F1111] font-bold text-sm rounded-full no-underline transition-all duration-200 hover:bg-gray-100 shadow-lg shadow-white/20 hover:scale-[1.03] active:scale-[0.97]"
              >
                Register as a Seller →
              </a>
              <Link
                href="/#industries"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-white/30 text-white font-bold text-sm rounded-full no-underline transition-all duration-200 hover:border-white hover:bg-white/10"
              >
                Explore Other Industries
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}