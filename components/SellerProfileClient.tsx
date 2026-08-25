"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Globe,
  MapPin,
  Calendar,
  Award,
  CheckCircle2,
  Mail,
  Phone,
  Share2,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Send,
  Check,
  User,
  TrendingUp,
  Edit3,
  Lock
} from "lucide-react";
import { toast } from "sonner";
import { SellerProfile } from "@/lib/seller";

interface SellerProfileClientProps {
  seller: SellerProfile;
}

export default function SellerProfileClient({ seller }: SellerProfileClientProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    try {
      const localUserStr = typeof window !== "undefined" ? localStorage.getItem("exporter_user") : null;
      if (localUserStr) {
        const localUser = JSON.parse(localUserStr);
        if (
          localUser &&
          (localUser.email?.toLowerCase() === seller.email?.toLowerCase() ||
            localUser.id === seller.id ||
            localUser.slug === seller.slug)
        ) {
          setIsOwner(true);
        }
      }
    } catch {}
  }, [seller]);

  // Buyer RFQ Form state
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerCountry, setBuyerCountry] = useState("");
  const [inquiryType, setInquiryType] = useState("Bulk Order / RFQ");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      toast.success("Profile Link Copied!", {
        description: "Public seller storefront URL copied to your clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!buyerName || !buyerEmail || !message) {
      toast.error("Required Fields Missing", {
        description: "Please provide your Name, Work Email, and Inquiry Message.",
      });
      return;
    }

    setIsSubmittingInquiry(true);

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
          inquiryType,
          quantity: quantity || "Not specified",
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to submit inquiry");
      }

      setInquirySubmitted(true);
      toast.success("Inquiry Sent Successfully!", {
        description: `Your RFQ was routed directly to ${seller.companyName}.`,
      });
    } catch (err: any) {
      toast.error("Submission Failed", {
        description: err.message || "Could not send inquiry. Please try again.",
      });
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  // WhatsApp click to chat URL
  const cleanPhone = (seller.phone || "").replace(/[^0-9]/g, "");
  const whatsappMsg = encodeURIComponent(
    `Hello ${seller.companyName}, I found your export profile on Goexports and would like to inquire about your ${seller.productCategory} offerings.`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMsg}`;

  const isApproved =
    (seller.status || "pending").toLowerCase() === "approved" ||
    (seller.status || "").toLowerCase() === "verified";

  if (!isApproved) {
    return (
      <div className="min-h-screen py-16 px-4 bg-[var(--canvas)] flex items-center justify-center">
        <div className="max-w-xl w-full p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] text-center shadow-lg space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-8 h-8 text-amber-700" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 inline-block">
              🔒 Profile Locked • Pending Verification
            </span>
            <h1 className="text-2xl font-extrabold text-[var(--ink)] tracking-tight">
              {seller.companyName} is Currently Locked
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              This exporter profile is currently undergoing compliance verification by the Goexports admin team. Once approved by our team, this public storefront will automatically unlock and go live to global buyers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--canvas)] border border-[var(--hairline)] text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-[var(--hairline)] pb-2">
              <span className="text-[var(--muted)]">Exporter ID:</span>
              <span className="font-mono font-bold text-[var(--ink)]">{seller.id}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--hairline)] pb-2">
              <span className="text-[var(--muted)]">Category:</span>
              <span className="font-bold text-[var(--ink)]">{seller.productCategory}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--hairline)] pb-2">
              <span className="text-[var(--muted)]">Country / Region:</span>
              <span className="font-bold text-[var(--ink)]">{seller.country} ({seller.postCode})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Account Status:</span>
              <span className="font-extrabold text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {seller.status || "Pending Verification"}
              </span>
            </div>
          </div>

          {isOwner ? (
            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs font-medium">
                👋 You are logged in as the account owner (<strong>{seller.email}</strong>). You will receive an email notification as soon as your account is approved.
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link
                  href="/exporter/profile"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[var(--brand-ochre)] text-[var(--ink)] no-underline hover:opacity-90 transition-all shadow-xs"
                >
                  Go to Exporter Dashboard &rarr;
                </Link>
                <Link
                  href="/exporter/profile?tab=edit"
                  className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-[var(--canvas)] text-[var(--ink)] border border-[var(--hairline)] no-underline hover:bg-[var(--surface-soft)] transition-colors"
                >
                  Edit Profile Details
                </Link>
              </div>
            </div>
          ) : (
            <div className="pt-2">
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[var(--ink)] text-white no-underline hover:bg-slate-800 transition-colors inline-block"
              >
                Return to Goexports Homepage
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "var(--canvas)" }}>
      {/* ── Owner Mode Banner ── */}
      {isOwner && (
        <div className="bg-[var(--ink)] text-white py-2.5 px-4 text-xs border-b border-white/10 shadow-sm">
          <div className="section-wrap flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-ochre)] animate-pulse" />
              <span className="font-bold">Storefront Owner Mode:</span>
              <span className="text-white/80 hidden sm:inline">You are viewing your public exporter profile.</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white">
                {seller.status || "Pending Verification"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/exporter/profile?tab=edit"
                className="px-3 py-1 rounded-lg text-xs font-bold text-[var(--ink)] bg-[var(--brand-ochre)] hover:opacity-90 no-underline transition-opacity flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </Link>
              <Link
                href="/exporter/profile"
                className="px-3 py-1 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/20 no-underline transition-colors"
              >
                Exporter Dashboard →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Breadcrumb & Top Verified Bar ── */}
      <div className="border-b border-[var(--hairline)] bg-[var(--surface-soft)] py-3">
        <div className="section-wrap flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-2 text-[var(--muted)]">
            <Link href="/" className="hover:text-[var(--ink)] no-underline text-[var(--muted)]">
              Home
            </Link>
            <span>/</span>
            <Link href="/create-export-profile" className="hover:text-[var(--ink)] no-underline text-[var(--muted)]">
              Exporters
            </Link>
            <span>/</span>
            <span className="text-[var(--ink)] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {seller.companyName}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Goexports Registered Exporter</span>
            </div>
            <Link
              href="/exporter/login"
              className="text-[11px] font-medium text-[var(--muted)] hover:text-[var(--ink)] no-underline hidden sm:inline"
            >
              Exporter Login →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Header Banner ── */}
      <div className="border-b border-[var(--hairline)] bg-[var(--canvas)] py-8 sm:py-12">
        <div className="section-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Company Main Info */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--brand-ochre)] text-[var(--ink)]">
                  {seller.productCategory}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--body)] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[var(--muted)]" />
                  {seller.country} {seller.postCode ? `(${seller.postCode})` : ""}
                </span>
                {seller.yearEstablished && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--body)] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[var(--muted)]" />
                    Est. {seller.yearEstablished}
                  </span>
                )}
                {seller.exportCapacity && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--body)] flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[var(--muted)]" />
                    Capacity: {seller.exportCapacity}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ink)] leading-tight">
                {seller.companyName}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--muted)]">
                <User className="w-4 h-4" />
                <span>Primary Representative: <strong className="text-[var(--ink)]">{seller.fullName}</strong></span>
                <span className="mx-1">•</span>
                <span>Ref: <strong className="font-mono text-[var(--ink)]">{seller.id}</strong></span>
              </div>
            </div>

            {/* Quick Action Card on Right */}
            <div className="lg:col-span-4 p-6 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Contact Exporter
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Verified Listing
                </span>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById("inquiry-section");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-[var(--ink)] flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.98] border-none shadow-sm"
                style={{ backgroundColor: "var(--brand-ochre)" }}
              >
                <Send className="w-4 h-4" />
                <span>Send Direct Inquiry / RFQ</span>
              </button>

              {seller.phone && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2 no-underline transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp / Direct Message</span>
                </a>
              )}

              {seller.website && (
                <a
                  href={seller.website.startsWith("http") ? seller.website : `https://${seller.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] hover:bg-[var(--surface-soft)] flex items-center justify-center gap-2 no-underline transition-colors"
                >
                  <Globe className="w-4 h-4 text-[var(--muted)]" />
                  <span className="truncate">Visit Website</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--muted)] shrink-0" />
                </a>
              )}

              <button
                onClick={handleShare}
                className="w-full py-2 px-3 rounded-xl text-xs font-medium text-[var(--muted)] hover:text-[var(--ink)] bg-transparent border border-dashed border-[var(--hairline)] flex items-center justify-center gap-1.5 cursor-pointer hover:border-[var(--ink)] transition-colors"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Storefront Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Exporter Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="section-wrap py-10 space-y-10">
        {/* Company Overview & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Bio */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-4">
              <h2 className="text-xl font-bold text-[var(--ink)] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[var(--brand-ochre)]" />
                Company Overview & Bio
              </h2>
              <div className="text-sm sm:text-base text-[var(--body)] leading-relaxed whitespace-pre-line">
                {seller.companyProfile}
              </div>
            </div>

            {/* Target Markets (if selected) */}
            {seller.targetMarkets && seller.targetMarkets.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-4">
                <h3 className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
                  <Globe className="w-5 h-5 text-sky-600" />
                  Target Export Geographies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {seller.targetMarkets.map((market, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--canvas)] border border-[var(--hairline)] text-[var(--ink)]"
                    >
                      {market}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications (if selected) */}
            {seller.certifications && seller.certifications.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-4">
                <h3 className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  Quality & Compliance Certifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {seller.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-[var(--ink)]">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Business Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--ink)] border-b border-[var(--hairline)] pb-3">
                Business Information
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[var(--muted)] block">Business Name:</span>
                  <span className="font-semibold text-[var(--ink)] text-sm">{seller.companyName}</span>
                </div>

                <div>
                  <span className="text-[var(--muted)] block">Primary Product Category:</span>
                  <span className="font-semibold text-[var(--ink)]">{seller.productCategory}</span>
                </div>

                <div>
                  <span className="text-[var(--muted)] block">Location & Origin:</span>
                  <span className="font-semibold text-[var(--ink)]">{seller.country} ({seller.postCode})</span>
                </div>

                {seller.yearEstablished && (
                  <div>
                    <span className="text-[var(--muted)] block">Year Established:</span>
                    <span className="font-semibold text-[var(--ink)]">{seller.yearEstablished}</span>
                  </div>
                )}

                {seller.exportCapacity && (
                  <div>
                    <span className="text-[var(--muted)] block">Monthly Export Capacity:</span>
                    <span className="font-semibold text-[var(--ink)]">{seller.exportCapacity}</span>
                  </div>
                )}

                <div>
                  <span className="text-[var(--muted)] block">Primary Contact:</span>
                  <span className="font-semibold text-[var(--ink)]">{seller.fullName}</span>
                </div>

                <div>
                  <span className="text-[var(--muted)] block">Direct Phone:</span>
                  <span className="font-semibold text-[var(--ink)]">{seller.phone}</span>
                </div>

                <div>
                  <span className="text-[var(--muted)] block">Official Email:</span>
                  <span className="font-semibold text-[var(--ink)]">{seller.email}</span>
                </div>
              </div>
            </div>

            {/* Zero Commission Trust Box */}
            <div className="p-5 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-soft)] space-y-2.5 text-xs">
              <div className="flex items-center gap-1.5 text-[var(--ink)] font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Goexports Direct Trade</span>
              </div>
              <p className="text-[var(--muted)] leading-relaxed m-0">
                You communicate and transact directly with {seller.companyName}. We never charge commissions on export contracts.
              </p>
            </div>
          </div>
        </div>

        {/* ── Direct Inquiry / RFQ Form Section ── */}
        <div id="inquiry-section" className="pt-4">
          <div className="p-6 sm:p-10 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] shadow-sm max-w-3xl mx-auto">
            {inquirySubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-700">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--ink)]">Inquiry Successfully Sent!</h3>
                <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[var(--ink)]">{buyerName}</strong>. Your export inquiry has been forwarded directly to <strong className="text-[var(--ink)]">{seller.companyName}</strong> at <strong className="text-[var(--ink)]">{seller.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setInquirySubmitted(false);
                    setMessage("");
                  }}
                  className="px-5 py-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-xs font-semibold text-[var(--ink)] hover:bg-[var(--surface-soft)] cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-ochre)] text-[var(--ink)] mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Direct Trade Inquiry
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight">
                    Send Inquiry to {seller.companyName}
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
                    Fill out the form below to connect directly with {seller.fullName} for bulk pricing and trade terms.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. John Smith"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                      Your Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="john@buyercompany.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                      Your Country / Destination
                    </label>
                    <input
                      type="text"
                      value={buyerCountry}
                      onChange={(e) => setBuyerCountry(e.target.value)}
                      placeholder="e.g. United States / United Kingdom"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                      Inquiry Type
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    >
                      <option value="Bulk Order / RFQ">Bulk Order / RFQ</option>
                      <option value="Sample Order Request">Sample Order Request</option>
                      <option value="General Business Inquiry">General Business Inquiry</option>
                      <option value="Distribution Partnership">Distribution Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                      Estimated Order Quantity
                    </label>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 1,000 Units / 1 Container"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                    Requirement Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Hello ${seller.companyName}, we are interested in your ${seller.productCategory} offerings. Please provide your latest price list and catalog...`}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingInquiry}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-[var(--ink)] border-none cursor-pointer transition-all flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] disabled:opacity-50 shadow-sm"
                  style={{ backgroundColor: "var(--brand-ochre)" }}
                >
                  {isSubmittingInquiry ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Official RFQ to {seller.companyName}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
