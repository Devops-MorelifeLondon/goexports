"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  MapPin,
  Calendar,
  TrendingUp,
  Package,
  Share2,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  Send,
  Check,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Info,
  CheckCircle2,
  Layers,
  Tag,
  Truck,
  Globe,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { SellerProfile, SellerProduct } from "@/lib/seller";

interface ProductDetailClientProps {
  seller: SellerProfile;
  product: SellerProduct;
  otherProducts: SellerProduct[];
}

const UNIT_OPTIONS = [
  "Metric Tons (MT)",
  "Kilograms (KG)",
  "Pieces (Pcs)",
  "Containers (20ft FCL)",
  "Containers (40ft FCL)",
  "Boxes",
  "Cartons",
  "Bags / Sacks",
  "Units / Sets",
  "Other Unit (Specify in message)",
];

export default function ProductDetailClient({
  seller,
  product,
  otherProducts,
}: ProductDetailClientProps) {
  const [isCopied, setIsCopied] = useState(false);

  // Multi-image gallery state
  const allImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.imageUrl ? [product.imageUrl] : [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const currentImage = allImages[activeImageIndex] || product.imageUrl || "";

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  // Inquiry Form State
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerCountry, setBuyerCountry] = useState("");
  const [quantity, setQuantity] = useState(product.moq ? product.moq.replace(/[^0-9]/g, "") || "100" : "100");
  const [unit, setUnit] = useState("Pieces (Pcs)");
  const [message, setMessage] = useState(
    `Hello ${seller.companyName},\n\nI am interested in sourcing "${product.title}". Please provide your FOB price quotation, lead time, and sample availability for an initial order of ${quantity} ${unit}.\n\nLooking forward to your prompt response.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const storefrontUrl = `/${seller.slug || seller.id}`;
  const whatsappToUse = (seller as any).whatsapp || seller.phone || "";
  const cleanSellerWhatsapp = whatsappToUse.replace(/[^0-9]/g, "");
  const cleanSellerPhone = (seller.phone || "").replace(/[^0-9+]/g, "");

  const whatsappMsg = encodeURIComponent(
    `Hello ${seller.companyName}, I found your product "${product.title}" on Goexports (${typeof window !== "undefined" ? window.location.href : ""}) and would like to request an FOB quotation and MOQ details.`
  );
  const whatsappUrl = cleanSellerWhatsapp
    ? `https://wa.me/${cleanSellerWhatsapp}?text=${whatsappMsg}`
    : null;
  const telUrl = cleanSellerPhone ? `tel:${cleanSellerPhone}` : null;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      toast.success("Product Link Copied!", {
        description: "Direct product URL copied to your clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!buyerName || !buyerEmail || !message) {
      toast.error("Missing Required Fields", {
        description: "Please provide your Name, Work Email, and Inquiry Message.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/seller-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sellerId: seller.id,
          sellerCompanyName: seller.companyName,
          sellerEmail: seller.email,
          buyerName,
          buyerEmail,
          buyerPhone,
          buyerCountry,
          inquiryType: `Product Order: ${product.title}`,
          quantity: `${quantity} ${unit}`,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to submit inquiry");
      }

      setIsSubmitted(true);
      toast.success("Quotation Request Sent!", {
        description: `Your RFQ for "${product.title}" was routed directly to ${seller.companyName}.`,
      });
    } catch (err: any) {
      toast.error("Submission Failed", {
        description: err.message || "Could not send inquiry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToInquiry = () => {
    const el = document.getElementById("product-rfq-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "var(--canvas)" }}>
      {/* ── Breadcrumb & Top Bar ── */}
      <div className="border-b border-[var(--hairline)] bg-[var(--surface-soft)] py-3">
        <div className="section-wrap flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[var(--muted)] flex-wrap">
            <Link href="/" className="hover:text-[var(--ink)] no-underline text-[var(--muted)]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={storefrontUrl}
              className="hover:text-[var(--ink)] no-underline text-[var(--muted)] truncate max-w-[150px] sm:max-w-xs"
            >
              {seller.companyName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--ink)] font-bold truncate max-w-[200px] sm:max-w-md">
              {product.title}
            </span>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[var(--ink)] bg-[var(--surface-card)] border border-[var(--hairline)] hover:bg-[var(--surface-soft)] transition-colors cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[var(--muted)]" />
                  <span>Share Product</span>
                </>
              )}
            </button>

            <Link
              href={storefrontUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--brand-ochre)] hover:opacity-90 no-underline transition-opacity shadow-2xs"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Product Hero Section ── */}
      <div className="section-wrap py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Product Image Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-4/3 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] overflow-hidden shadow-sm flex items-center justify-center p-4">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={`${product.title} - Image ${activeImageIndex + 1}`}
                  className="w-full h-full object-contain transition-all duration-300"
                />
              ) : (
                <div className="text-center p-8 text-[var(--muted)] flex flex-col items-center gap-3">
                  <Package className="w-16 h-16 opacity-30 text-[var(--muted)]" />
                  <span className="text-sm font-semibold">Verified Export Listing</span>
                </div>
              )}

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[var(--ink)] text-white shadow-sm">
                  <Tag className="w-3 h-3 text-[var(--brand-ochre)]" />
                  {product.category || seller.productCategory}
                </span>
              </div>

              {/* Photo Counter Badge if multiple */}
              {allImages.length > 1 && (
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-xs text-white shadow-sm">
                    {activeImageIndex + 1} / {allImages.length}
                  </span>
                </div>
              )}

              {/* Prev / Next Arrows if multiple */}
              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[var(--ink)] flex items-center justify-center shadow-md border border-[var(--hairline)] cursor-pointer transition-all hover:scale-105"
                    title="Previous Photo"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[var(--ink)] flex items-center justify-center shadow-md border border-[var(--hairline)] cursor-pointer transition-all hover:scale-105"
                    title="Next Photo"
                  >
                    ›
                  </button>
                </>
              )}

              <div className="absolute bottom-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/90 backdrop-blur-xs text-emerald-900 border border-emerald-300 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Verified Exporter Origin
                </span>
              </div>
            </div>

            {/* Thumbnail Strip if multiple images */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 overflow-hidden bg-[var(--surface-card)] p-1 shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-[var(--brand-ochre)] ring-2 ring-[var(--brand-ochre)]/30 scale-105"
                        : "border-[var(--hairline)] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </button>
                ))}
              </div>
            )}


          </div>

          {/* Right Column: Commercial Details & CTAs */}
          <div className="lg:col-span-6 space-y-5">

            {/* 1. Category pill + Origin */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full font-extrabold bg-[var(--brand-ochre)] text-[var(--ink)] uppercase tracking-wider text-[10px]">
                {product.category || seller.productCategory}
              </span>
              <span className="text-[var(--muted)] flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5" />
                Origin: <strong className="text-[var(--ink)] ml-0.5">{seller.country}</strong>
              </span>
            </div>

            {/* 2. Product Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--ink)] tracking-tight leading-tight">
                {product.title}
              </h1>
            </div>

            {/* 3. Seller / Exporter byline */}
            <div className="flex items-center gap-3 py-3 px-4 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-soft)]">
              <Link
                href={storefrontUrl}
                className="flex items-center gap-3 group no-underline text-[var(--ink)] w-full"
              >
                {seller.logoUrl ? (
                  <img
                    src={seller.logoUrl}
                    alt={seller.companyName}
                    className="w-10 h-10 rounded-xl object-contain border border-[var(--hairline)] bg-white p-1 shrink-0"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs border border-[var(--hairline)] shrink-0"
                    style={{ backgroundColor: "var(--brand-ochre)" }}
                  >
                    {seller.companyName.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-sm group-hover:text-[var(--brand-ochre)] transition-colors block truncate">
                    {seller.companyName}
                  </span>
                  <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                    Verified Exporter · {seller.country}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--muted)] shrink-0" />
              </Link>
            </div>

            {/* 4. Key Specifications Table */}
            <div className="rounded-2xl border border-[var(--hairline)] overflow-hidden">
              <div className="px-4 py-2.5 bg-[var(--surface-soft)] border-b border-[var(--hairline)]">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--muted)]">
                  Key Specifications
                </span>
              </div>
              <div className="divide-y divide-[var(--hairline)]">
                {[
                  { label: "Category", value: product.category || seller.productCategory },
                  { label: "Country of Origin", value: seller.country },
                  { label: "Annual Export Capacity", value: seller.exportCapacity || "Flexible / On Request" },
                  { label: "Company Est.", value: seller.yearEstablished ? `Est. ${seller.yearEstablished}` : "Verified Exporter" },
                  { label: "Target Markets", value: Array.isArray(seller.targetMarkets) && seller.targetMarkets.length > 0 ? seller.targetMarkets.join(", ") : "Worldwide" },
                ].map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-2 text-xs">
                    <span className="px-4 py-2.5 text-[var(--muted)] font-medium bg-[var(--canvas)]/50 border-r border-[var(--hairline)]">
                      {label}
                    </span>
                    <span className="px-4 py-2.5 font-semibold text-[var(--ink)]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Price & MOQ Box */}
            <div className="p-5 sm:p-6 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] shadow-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-extrabold text-[var(--muted)] uppercase tracking-wider block mb-1.5">
                    FOB Price (Export Rate)
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] leading-tight">
                    {product.price || "On Request"}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
                    Volume discounts available
                  </span>
                </div>

                <div className="border-l border-[var(--hairline)] pl-4">
                  <span className="text-[10px] font-extrabold text-[var(--muted)] uppercase tracking-wider block mb-1.5">
                    Min. Order Qty (MOQ)
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] leading-tight">
                    {product.moq || "Flexible"}
                  </div>
                  <span className="text-[11px] text-[var(--muted)] mt-1 block">
                    Samples &amp; trial batches available
                  </span>
                </div>
              </div>
            </div>

            {/* 6. Product Overview */}
            {product.description && (
              <div className="rounded-2xl border border-[var(--hairline)] overflow-hidden">
                {/* Header */}
                <div className="px-5 py-3 bg-[var(--surface-soft)] border-b border-[var(--hairline)] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[var(--brand-ochre)]" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--muted)]">
                    Product Overview
                  </span>
                </div>

                {/* Body */}
                <div className="px-5 py-4 bg-[var(--surface-card)]">
                  <p className="text-sm text-[var(--body)] leading-7 whitespace-pre-line m-0">
                    {product.description}
                  </p>
                </div>
              </div>
            )}

            {/* 7. CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                type="button"
                onClick={scrollToInquiry}
                className="flex-1 py-3.5 px-5 rounded-2xl font-bold text-sm text-[var(--ink)] flex items-center justify-center gap-2 shadow-sm cursor-pointer border-none transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--brand-ochre)" }}
              >
                <Send className="w-4 h-4" />
                <span>Request Quotation &amp; Samples</span>
              </button>

              {telUrl && (
                <a
                  href={telUrl}
                  className="py-3.5 px-4 rounded-2xl font-bold text-sm text-[var(--ink)] bg-[var(--surface-soft)] border border-[var(--hairline)] hover:bg-[var(--surface-card)] no-underline flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  <span>Call</span>
                </a>
              )}

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-5 rounded-2xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 no-underline flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Dedicated RFQ Form Section ── */}
      <div id="product-rfq-section" className="section-wrap py-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 sm:p-10 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--hairline)] pb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-ochre)] text-[var(--ink)] mb-2">
                  <Send className="w-3.5 h-3.5" />
                  Direct Exporter RFQ
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
                  Request Quotation for {product.title}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
                  Send your wholesale specifications directly to <strong>{seller.companyName}</strong>. You will receive direct pricing, packing lists, and sample options.
                </p>
              </div>

              {cleanSellerPhone && (
                <a
                  href={`tel:${seller.phone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] hover:bg-[var(--surface-soft)] transition-colors no-underline self-start sm:self-auto"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Exporter</span>
                </a>
              )}
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900">RFQ Sent Successfully!</h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Your quotation request for <strong>{product.title}</strong> has been transmitted directly to {seller.companyName} at <strong>{seller.email}</strong>.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-50 cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                  <Link
                    href={storefrontUrl}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white no-underline hover:bg-emerald-800"
                  >
                    Browse Seller Storefront
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-5">
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[var(--ink)]">
                      Full Name / Contact Person <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. David Miller"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[var(--ink)]">
                      Work Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="e.g. procurement@globalimporters.com"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Phone + Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[var(--ink)]">
                      Phone Number / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[var(--ink)]">
                      Destination Country / Port <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerCountry}
                      onChange={(e) => setBuyerCountry(e.target.value)}
                      placeholder="e.g. Germany (Hamburg Port)"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Quantity + Unit */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[var(--ink)]">
                    Order Quantity &amp; Unit
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="100"
                      className="w-32 px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)] transition-colors"
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)] transition-colors"
                    >
                      {UNIT_OPTIONS.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[var(--ink)]">
                    Requirements, Target FOB Price &amp; Customization Details <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)] resize-y leading-relaxed transition-colors"
                  />
                </div>

                {/* Footer: Security note + Submit */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <div className="text-[11px] text-[var(--muted)] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Protected by Goexports Direct Trade Security (0% Broker Fees)</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-2xl font-bold text-sm text-[var(--ink)] border-none cursor-pointer flex items-center gap-2 shadow-sm transition-opacity disabled:opacity-50"
                    style={{ backgroundColor: "var(--brand-ochre)" }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending RFQ...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Direct Quotation Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Seller Profile Overview Card ── */}
      <div className="section-wrap py-8">
        <div className="p-6 sm:p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              {seller.logoUrl ? (
                <img
                  src={seller.logoUrl}
                  alt={seller.companyName}
                  className="w-16 h-16 rounded-2xl object-contain border border-[var(--hairline)] bg-white p-1.5 shadow-sm shrink-0"
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-extrabold text-[var(--ink)] border border-[var(--hairline)] shadow-sm shrink-0"
                  style={{ backgroundColor: "var(--brand-ochre)" }}
                >
                  {seller.companyName.slice(0, 2).toUpperCase()}
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-bold text-[var(--ink)]">
                    {seller.companyName}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Exporter
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)] m-0">
                  {seller.productCategory} • {seller.country} {seller.postCode ? `(${seller.postCode})` : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={storefrontUrl}
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] hover:bg-[var(--surface-soft)] no-underline transition-colors shadow-2xs"
              >
                View Full Company Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── More Products from this Exporter ── */}
      {otherProducts.length > 0 && (
        <div className="section-wrap py-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                More Export Products from {seller.companyName}
              </h2>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                Explore additional verified export catalog listings from this supplier.
              </p>
            </div>

            <Link
              href={storefrontUrl}
              className="text-xs font-bold text-[var(--ink)] hover:underline flex items-center gap-1 no-underline"
            >
              <span>View All ({otherProducts.length + 1})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {otherProducts.slice(0, 4).map((prod) => (
              <Link
                key={prod.id}
                href={`/${seller.slug || seller.id}/products/${prod.id}`}
                className="group p-4 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] hover:border-[var(--brand-ochre)] transition-all no-underline text-[var(--ink)] shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-4/3 rounded-2xl bg-[var(--canvas)] border border-[var(--hairline)] overflow-hidden flex items-center justify-center p-2">
                    {prod.imageUrl ? (
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Package className="w-10 h-10 opacity-30 text-[var(--muted)]" />
                    )}
                  </div>

                  <div>
                    {prod.category && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] block">
                        {prod.category}
                      </span>
                    )}
                    <h4 className="text-sm font-bold text-[var(--ink)] group-hover:text-[var(--brand-ochre)] transition-colors line-clamp-2 mt-0.5">
                      {prod.title}
                    </h4>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--hairline)] mt-3 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[var(--ink)]">
                    {prod.price || "FOB on Request"}
                  </span>
                  <span className="text-[10px] font-semibold text-[var(--brand-ochre)] group-hover:translate-x-0.5 transition-transform">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
