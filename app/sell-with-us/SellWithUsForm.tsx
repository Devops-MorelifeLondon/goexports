"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Package,
  Globe,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  PhoneCall,
  Mail,
  Layers,
  Check
} from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = [
  "Spices & Seasonings",
  "Textiles, Garments & Yarns",
  "Agriculture, Grains & Food Products",
  "Health Products, Pharmaceuticals & Herbs",
  "Chemicals, Dyes & Solvents",
  "Industrial Machinery & Plants",
  "Packaging Materials & Goods",
  "Building & Construction Hardware",
  "Consumer Electronics & Electrical",
  "Automobile Parts & Accessories",
  "Leather Goods & Footwear",
  "Gems, Jewelry & Handicrafts",
  "Other Product Lines",
];

const BUSINESS_TYPES = [
  "Manufacturer / Factory",
  "Direct Farmer / Mill Producer",
  "Merchant Exporter / Trader",
  "Wholesaler / Bulk Stockist",
];

export default function SellWithUsForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "India",
    businessType: "Manufacturer / Factory",
    productCategory: "",
    productsDescription: "",
    monthlyCapacity: "",
    targetAudience: "Both", // "Export", "Domestic", "Both"
    website: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.companyName.trim()) {
      toast.error("Company Name is required");
      return;
    }
    if (!formData.contactName.trim()) {
      toast.error("Contact Person Name is required");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast.error("A valid Email address is required");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 6) {
      toast.error("Valid Contact Phone Number is required");
      return;
    }
    if (!formData.productCategory) {
      toast.error("Please select the product category you want to sell");
      return;
    }
    if (!formData.productsDescription.trim()) {
      toast.error("Please describe your products / specifications");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/sell-with-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit request.");
      }

      setSubmitted(true);
      toast.success("Application Submitted!", {
        description: "Our vendor acquisition team will review and contact you within 24 hours.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      toast.error("Submission Failed", {
        description: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] text-center max-w-2xl mx-auto shadow-sm animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5 shadow-2xs">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3 inline-block">
          Supplier Onboarding Application Received
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] mb-3">
          Thank you, {formData.contactName}!
        </h2>
        <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-6">
          We have registered <strong className="text-[var(--ink)]">{formData.companyName}</strong> for our supplier marketplace. One of our category procurement managers will get in touch with you at <strong className="text-[var(--ink)]">{formData.email}</strong> / <strong className="text-[var(--ink)]">{formData.phone}</strong> to onboard your catalog.
        </p>

        <div className="p-4 rounded-2xl bg-[var(--canvas)] border border-[var(--hairline)] text-left mb-6 text-xs sm:text-sm space-y-2">
          <div className="flex justify-between pb-2 border-b border-[var(--hairline)]">
            <span className="text-[var(--muted)]">Category:</span>
            <span className="font-semibold text-[var(--ink)]">{formData.productCategory}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-[var(--hairline)]">
            <span className="text-[var(--muted)]">Business Type:</span>
            <span className="font-semibold text-[var(--ink)]">{formData.businessType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--muted)]">Target Channels:</span>
            <span className="font-semibold text-[var(--ink)]">
              {formData.targetAudience === "Both"
                ? "Domestic + Global Export"
                : formData.targetAudience === "Export"
                ? "International Export"
                : "Domestic Market"}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full text-xs font-bold text-[var(--ink)] border border-[var(--hairline)] bg-[var(--canvas)] no-underline hover:bg-[var(--surface-soft)] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/create-export-profile"
            className="px-6 py-2.5 rounded-full text-xs font-bold text-[var(--ink)] no-underline transition-all hover:opacity-95 shadow-sm"
            style={{ backgroundColor: "var(--brand-ochre)" }}
          >
            Create Full Business Profile →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] shadow-sm space-y-6">
      <div className="border-b border-[var(--hairline)] pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
          Partner & Sell With Us
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
          Tell us about your company and what you want to sell. We connect approved manufacturers & suppliers with bulk buyers across India & worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Company Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[var(--body-strong)]">
            Company / Business Name <span className="text-rose-500">*</span>
          </label>
          <input
            name="companyName"
            type="text"
            required
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Paramount Spices & Mills"
            className="w-full px-4 py-2.5 rounded-xl text-sm border border-[var(--hairline)] bg-[var(--canvas)] text-[var(--ink)] outline-none focus:border-[var(--ink)] h-[44px]"
          />
        </div>

        {/* Contact Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[var(--body-strong)]">
            Contact Person Name <span className="text-rose-500">*</span>
          </label>
          <input
            name="contactName"
            type="text"
            required
            value={formData.contactName}
            onChange={handleChange}
            placeholder="e.g. Rajesh Kumar"
            className="w-full px-4 py-2.5 rounded-xl text-sm border border-[var(--hairline)] bg-[var(--canvas)] text-[var(--ink)] outline-none focus:border-[var(--ink)] h-[44px]"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[var(--body-strong)]">
            Business Email <span className="text-rose-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. sales@yourbusiness.com"
            className="w-full px-4 py-2.5 rounded-xl text-sm border border-[var(--hairline)] bg-[var(--canvas)] text-[var(--ink)] outline-none focus:border-[var(--ink)] h-[44px]"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[var(--body-strong)]">
            Phone / WhatsApp Number <span className="text-rose-500">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +91 98765 43210"
            className="w-full px-4 py-2.5 rounded-xl text-sm border border-[var(--hairline)] bg-[var(--canvas)] text-[var(--ink)] outline-none focus:border-[var(--ink)] h-[44px]"
          />
        </div>

        {/* Business Type */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[var(--body-strong)]">
            Business Type <span className="text-rose-500">*</span>
          </label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl text-sm border border-[var(--hairline)] bg-[var(--canvas)] text-[var(--ink)] outline-none focus:border-[var(--ink)] h-[44px]"
          >
            {BUSINESS_TYPES.map((bt) => (
              <option key={bt} value={bt}>
                {bt}
              </option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[var(--body-strong)]">
            Base Country / Location <span className="text-rose-500">*</span>
          </label>
          <input
            name="country"
            type="text"
            required
            value={formData.country}
            onChange={handleChange}
            placeholder="e.g. India"
            className="w-full px-4 py-2.5 rounded-xl text-sm border border-[var(--hairline)] bg-[var(--canvas)] text-[var(--ink)] outline-none focus:border-[var(--ink)] h-[44px]"
          />
        </div>

        {/* Product Category */}
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-xs font-semibold text-[var(--body-strong)]">
            Primary Product Category To Sell <span className="text-rose-500">*</span>
          </label>
          <select
            name="productCategory"
            required
            value={formData.productCategory}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl text-sm border border-[var(--hairline)] bg-[var(--canvas)] text-[var(--ink)] outline-none focus:border-[var(--ink)] h-[44px]"
          >
            <option value="">Select a Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Products Description */}
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-xs font-semibold text-[var(--body-strong)]">
            What specific products do you want to sell with us? <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="productsDescription"
            required
            rows={3}
            value={formData.productsDescription}
            onChange={handleChange}
            placeholder="e.g. Red Chilli (Guntur S17, Byadagi), Turmeric fingers, Cumin seeds whole and powder in 25kg bulk bags..."
            className="w-full px-4 py-3 rounded-xl text-sm border border-[var(--hairline)] bg-[var(--canvas)] text-[var(--ink)] outline-none focus:border-[var(--ink)]"
          />
        </div>

        {/* Monthly Supply Capacity */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[var(--body-strong)]">
            Estimated Monthly Supply Capacity <span className="text-[var(--muted)] font-normal">(Optional)</span>
          </label>
          <input
            name="monthlyCapacity"
            type="text"
            value={formData.monthlyCapacity}
            onChange={handleChange}
            placeholder="e.g. 50 Tons / 3 Containers / month"
            className="w-full px-4 py-2.5 rounded-xl text-sm border border-[var(--hairline)] bg-[var(--canvas)] text-[var(--ink)] outline-none focus:border-[var(--ink)] h-[44px]"
          />
        </div>

        {/* Website */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[var(--body-strong)]">
            Company Website / Catalog URL <span className="text-[var(--muted)] font-normal">(Optional)</span>
          </label>
          <input
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://www.yourcompany.com"
            className="w-full px-4 py-2.5 rounded-xl text-sm border border-[var(--hairline)] bg-[var(--canvas)] text-[var(--ink)] outline-none focus:border-[var(--ink)] h-[44px]"
          />
        </div>

        {/* Where do you want to sell? */}
        <div className="flex flex-col gap-2 sm:col-span-2 pt-2">
          <label className="text-xs font-semibold text-[var(--body-strong)]">
            Where do you want to sell your products?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: "Both", label: "Both Global & Domestic", icon: Globe },
              { id: "Export", label: "International Export Only", icon: TrendingUp },
              { id: "Domestic", label: "Domestic Market Only", icon: Building2 },
            ].map((opt) => {
              const Icon = opt.icon;
              const isSelected = formData.targetAudience === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setFormData((prev) => ({ ...prev, targetAudience: opt.id }))}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[var(--ink)] text-white border-[var(--ink)] shadow-xs"
                      : "bg-[var(--canvas)] text-[var(--ink)] border-[var(--hairline)] hover:border-[var(--muted)]"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-[var(--brand-ochre)]" : "text-[var(--muted)]"}`} />
                  <span className="text-xs font-semibold">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--hairline)]">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-full font-bold text-sm text-[var(--ink)] border-none cursor-pointer transition-all flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] disabled:opacity-50 shadow-md"
          style={{ backgroundColor: "var(--brand-ochre)" }}
        >
          {isSubmitting ? (
            <span>Sending Application...</span>
          ) : (
            <>
              <span>Submit Sell With Us Application</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-[var(--muted)] mt-2.5">
          By applying, you agree to connect with verified B2B buyers through Goexports. Zero upfront charges.
        </p>
      </div>
    </form>
  );
}
