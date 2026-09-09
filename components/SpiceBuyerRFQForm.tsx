"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { 
  Building2, 
  Globe, 
  Mail, 
  Phone, 
  User, 
  Package, 
  CheckCircle2, 
  Leaf, 
  ShieldCheck, 
  ArrowRight,
  FileSpreadsheet,
  Anchor
} from "lucide-react";

interface SpiceBuyerRFQFormProps {
  spiceCategory: string;
  hsCode?: string | number;
  exportForms?: { form: string; best_suited_for: string }[];
  className?: string;
}

export default function SpiceBuyerRFQForm({
  spiceCategory,
  hsCode,
  exportForms = [],
  className = "",
}: SpiceBuyerRFQFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    destinationPort: "",
    sourcingGrade: "Steam Sterilized (EU/FDA Compliant)",
    productForm: exportForms[0]?.form || "Whole / Standard",
    estimatedVolume: "1x 20ft FCL (~12-14 MT)",
    incoterm: "CIF (Cost, Insurance & Freight)",
    customSpecs: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const detailedInquiry = `
Product: ${spiceCategory} (HS: ${hsCode || "N/A"})
Grade: ${formData.sourcingGrade}
Form: ${formData.productForm}
Estimated Volume: ${formData.estimatedVolume}
Destination Port: ${formData.destinationPort || "Not specified"}
Incoterm: ${formData.incoterm}
Notes: ${formData.customSpecs || "None"}
    `.trim();

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      country: formData.country,
      productCategory: `Spices: ${spiceCategory} | ${formData.estimatedVolume} | ${formData.sourcingGrade} | Port: ${formData.destinationPort || "TBD"}`,
      inquiryDate: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await fetch("/api/jotform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit sourcing inquiry");
      }

      toast.success("Sourcing Inquiry Dispatched", {
        description: `Your RFQ for ${spiceCategory} has been routed to verified Indian export processors.`,
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      toast.error("Submission Error", {
        description: err.message || "Failed to submit inquiry. Please try again.",
      });
      setError("Failed to send request. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={`rounded-2xl border border-[#E5E0D0] bg-white p-8 text-center shadow-sm ${className}`}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-[#0A0A0A]">
          Commercial RFQ Received
        </h3>
        <p className="mt-2 text-sm text-[#4A4A4A] leading-relaxed">
          Thank you, <strong className="text-[#0A0A0A]">{formData.fullName}</strong>. Your sourcing requirement for <strong className="text-[#0A0A0A]">{spiceCategory}</strong> ({formData.estimatedVolume}) has been submitted.
        </p>

        <div className="mt-6 rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-4 text-xs text-left space-y-2 text-[#5A5A5A]">
          <div className="font-semibold text-[#1A1A1A] border-b border-[#EAE5D9] pb-1.5">
            Procurement Summary
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-[#767676]">Commodity:</span> {spiceCategory}</div>
            <div><span className="text-[#767676]">Target Grade:</span> {formData.sourcingGrade}</div>
            <div><span className="text-[#767676]">Form:</span> {formData.productForm}</div>
            <div><span className="text-[#767676]">Destination:</span> {formData.destinationPort || formData.country}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#8B6008] hover:underline"
        >
          Submit another inquiry &rarr;
        </button>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-[#E5E0D0] bg-white p-6 sm:p-8 shadow-sm ${className}`}
      id="rfq-form"
    >
      {/* Header */}
      <div className="border-b border-[#EAE5D9] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B6008]">
          <Leaf className="h-4 w-4 text-emerald-600" />
          <span>B2B Commercial Sourcing Requisition</span>
        </div>
        <h2 className="mt-1 text-xl font-extrabold text-[#0A0A0A] sm:text-2xl">
          Request Exporter Quotations
        </h2>
        <p className="mt-1 text-xs text-[#767676]">
          Direct inquiry matching for <strong className="text-[#1A1A1A]">{spiceCategory}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Buyer Identity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#8A8A8A]" />
              <input
                type="text"
                name="fullName"
                required
                disabled={isSubmitting}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. David Miller"
                className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2.5 pl-9 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
              Corporate Email *
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#8A8A8A]" />
              <input
                type="email"
                name="email"
                required
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleChange}
                placeholder="procurement@company.com"
                className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2.5 pl-9 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
              Phone / WhatsApp (with Country Code) *
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#8A8A8A]" />
              <input
                type="tel"
                name="phone"
                required
                disabled={isSubmitting}
                value={formData.phone}
                onChange={handleChange}
                placeholder="+44 20 7946 0912"
                className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2.5 pl-9 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
              Company Name &amp; Country *
            </label>
            <div className="relative">
              <Building2 className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#8A8A8A]" />
              <input
                type="text"
                name="company"
                required
                disabled={isSubmitting}
                value={formData.company}
                onChange={handleChange}
                placeholder="Global Spice Imports Ltd, UK"
                className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2.5 pl-9 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Commodity Technical Parameters */}
        <div className="border-t border-[#EAE5D9] pt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#767676] mb-3">
            Procurement &amp; Technical Requirements
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                Quality / Compliance Grade
              </label>
              <select
                name="sourcingGrade"
                disabled={isSubmitting}
                value={formData.sourcingGrade}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2.5 px-3 text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
              >
                <option value="Certified Organic (NPOP / USDA / EU)">Certified Organic (NPOP / USDA / EU Organic)</option>
                <option value="Steam Sterilized (EU/FDA MRL Compliant)">Steam Sterilized (EU / FDA MRL Compliant)</option>
                <option value="Conventional Export Grade (Cleaned)">Conventional Export Grade (Machine Cleaned / Sortex)</option>
                <option value="High Extract / Oleoresin Grade">High Extract / Industrial Oleoresin Grade</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                Required Product Form
              </label>
              <select
                name="productForm"
                disabled={isSubmitting}
                value={formData.productForm}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2.5 px-3 text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
              >
                {exportForms.length > 0 ? (
                  exportForms.map((f, i) => (
                    <option key={i} value={f.form}>
                      {f.form}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Whole / Raw Pods">Whole / Raw Pods</option>
                    <option value="Fine Ground Powder (30-60 Mesh)">Fine Ground Powder (30-60 Mesh)</option>
                    <option value="Crushed Flakes / Coarse Cut">Crushed Flakes / Coarse Cut</option>
                    <option value="Custom Specification">Custom Specification</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Volume & Logistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
              Estimated Order Volume
            </label>
            <select
              name="estimatedVolume"
              disabled={isSubmitting}
              value={formData.estimatedVolume}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2.5 px-3 text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
            >
              <option value="1x 20ft FCL (~12-14 MT)">1x 20ft FCL (~12-14 MT)</option>
              <option value="1x 40ft HC (~24-26 MT)">1x 40ft HC (~24-26 MT)</option>
              <option value="Trial / LCL (1 to 5 MT)">Trial / LCL (1 to 5 MT)</option>
              <option value="Annual Supply Contract (>100 MT)">Annual Contract (&gt;100 MT)</option>
              <option value="Commercial Lab Samples (1-5 kg)">Commercial Lab Samples</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
              Preferred Incoterm
            </label>
            <select
              name="incoterm"
              disabled={isSubmitting}
              value={formData.incoterm}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2.5 px-3 text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
            >
              <option value="CIF (Cost, Insurance & Freight)">CIF (Cost, Insurance &amp; Freight)</option>
              <option value="FOB (Indian Port: Nhava Sheva/Mundra)">FOB (Indian Ocean Port)</option>
              <option value="CFR (Cost & Freight)">CFR (Cost &amp; Freight)</option>
              <option value="DDP (Delivered Duty Paid)">DDP (Delivered Duty Paid)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
              Destination Port / City
            </label>
            <div className="relative">
              <Anchor className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#8A8A8A]" />
              <input
                type="text"
                name="destinationPort"
                disabled={isSubmitting}
                value={formData.destinationPort}
                onChange={handleChange}
                placeholder="e.g. Rotterdam, London, NY"
                className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2.5 pl-9 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Custom Specifications Note */}
        <div>
          <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
            Custom Quality / Packaging Specifications (Optional)
          </label>
          <textarea
            name="customSpecs"
            rows={2}
            disabled={isSubmitting}
            value={formData.customSpecs}
            onChange={handleChange}
            placeholder="Specify target ASTA color, SHU heat, mesh size, packaging (e.g. 25kg vacuum bags), or required lab certifications..."
            className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] p-3 text-xs text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition resize-none"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 p-2.5 text-xs text-red-700 border border-red-200">
            {error}
          </p>
        )}

        {/* Submit Action */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A0A0A] hover:bg-neutral-800 text-white py-3.5 px-6 text-sm font-bold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Routing Inquiry to Verified Exporters...
            </>
          ) : (
            <>
              Submit Commercial Sourcing Requisition
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        <div className="flex flex-wrap items-center justify-between text-[11px] text-[#767676] pt-2">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Direct Manufacturer Matching
          </span>
          <span>Incoterms 2020 Compliant</span>
          <span>Sample &amp; COA Requests Supported</span>
        </div>
      </form>
    </div>
  );
}
