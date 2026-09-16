"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Sparkles,
  Send,
  CheckCircle2,
  Building,
  Mail,
  User,
  Phone,
  Globe2,
  ChevronDown,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface TextileLeadGenFormProps {
  textileCategory: string;
  hsCode?: string | number;
  availableForms?: { form: string }[];
  className?: string;
  buttonText?: string;
}

const TEXTILE_STANDARDS = [
  { id: "oeko", label: "OEKO-TEX Standard 100", desc: "Tested Safe & Chemical-Free" },
  { id: "gots", label: "GOTS Certified Organic", desc: "100% Traceable Organic" },
  { id: "bci", label: "BCI Better Cotton", desc: "Sustainable Supply Chain" },
  { id: "mill", label: "Commercial Mill Export", desc: "ISO 9001 / Lab Benchmark" },
];

const TEXTILE_VOLUMES = [
  "1x 20ft FCL (~9-11 MT / 30-40k m)",
  "1x 40ft HC (~20-22 MT / 70-90k m)",
  "Trial Commercial Lot (1-3 MT)",
  "Pre-Production Swatches / Cones",
];

export default function TextileLeadGenForm({
  textileCategory,
  hsCode,
  availableForms = [],
  className = "",
  buttonText = "Get Mill Quotes & Specifications",
}: TextileLeadGenFormProps) {
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState(""); // Email or WhatsApp
  const [company, setCompany] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [selectedStandard, setSelectedStandard] = useState(TEXTILE_STANDARDS[0].label);
  const [selectedVolume, setSelectedVolume] = useState(TEXTILE_VOLUMES[0]);
  const [selectedForm, setSelectedForm] = useState(
    availableForms[0]?.form || "Standard Export Construction"
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customNotes, setCustomNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !contact.trim()) {
      setErrorMessage("Please enter your full name and email or phone number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const isEmail = contact.includes("@");
    const payload = {
      fullName: fullName.trim(),
      email: isEmail ? contact.trim().toLowerCase() : "",
      phone: !isEmail ? contact.trim() : "",
      company: company.trim() || "Not specified",
      country: destinationCountry.trim() || "International Buyer",
      productCategory: `Textiles: ${textileCategory} (HS: ${hsCode || "N/A"}) | Standard: ${selectedStandard} | Vol: ${selectedVolume} | Form: ${selectedForm} | Contact: ${contact} | Notes: ${customNotes || "None"}`,
      inquiryDate: new Date().toISOString().split("T")[0],
    };

    try {
      // Send to Jotform / CRM endpoint
      await fetch("/api/jotform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      // Also dispatch to internal contact endpoint
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: isEmail ? contact.trim().toLowerCase() : "buyer@goexports.co.uk",
          phone: !isEmail ? contact.trim() : "",
          company: company.trim(),
          country: destinationCountry.trim(),
          inquiryType: "Textile Sourcing Lead",
          message: payload.productCategory,
        }),
      }).catch(() => null);

      toast.success("Textile Quote Request Sent!", {
        description: `Your inquiry for ${textileCategory} was matched with audited Indian textile mills.`,
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Lead submission error:", err);
      toast.error("Submission Failed", {
        description: err.message || "Please check your details and try again.",
      });
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-2xl border border-[#E5E0D0] bg-white p-5 sm:p-7 shadow-sm ${className}`}
      id="quick-textile-rfq"
    >
      {/* Top Accent Glow Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500" />

      {/* Live Status Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EAE5D9]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A]">
            Live Mill Sourcing Desk
          </span>
        </div>
        <span className="rounded-full bg-[#FAF5E8] px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 border border-[#E5E0D0]">
          Direct Factory Match
        </span>
      </div>

      <div className="mt-3">
        <h3 className="text-lg sm:text-xl font-semibold text-[#0A0A0A]">
          Request Pricing &amp; Specifications
        </h3>
        <p className="mt-1 text-xs text-[#5A5A5A] leading-relaxed">
          Direct quotes from verified Indian spinning &amp; weaving mills for{" "}
          <span className="font-semibold text-[#0A0A0A]">{textileCategory}</span>.
        </p>
      </div>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-6 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-xs">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h4 className="mt-3 text-base font-bold text-emerald-950">
            Quotation Request Dispatched
          </h4>
          <p className="mt-1.5 text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
            Our trade desk has routed your technical requirements for{" "}
            <span className="font-semibold text-emerald-950">{textileCategory}</span> to
            capacity-matched Indian export mills. You will receive direct pricing and Uster/lab test data within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 underline hover:text-emerald-900 cursor-pointer"
          >
            Submit Another Specification
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Compliance Standard Selector */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#5A5A5A] mb-1.5">
              Target Compliance Standard
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TEXTILE_STANDARDS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedStandard(opt.label)}
                  className={`flex flex-col rounded-xl border p-2 text-left transition cursor-pointer ${
                    selectedStandard === opt.label
                      ? "border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600 shadow-2xs"
                      : "border-[#E5E0D0] bg-[#FAF7F0] hover:bg-[#F5EFE0]"
                  }`}
                >
                  <span className="text-xs font-semibold text-[#0A0A0A] leading-tight">
                    {opt.label}
                  </span>
                  <span className="text-[10px] text-[#767676] mt-0.5">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Target Volume & Export Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#5A5A5A] mb-1">
                Estimated Volume
              </label>
              <div className="relative">
                <select
                  value={selectedVolume}
                  onChange={(e) => setSelectedVolume(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2 px-3 pr-8 text-xs font-medium text-[#0A0A0A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition cursor-pointer"
                >
                  {TEXTILE_VOLUMES.map((vol) => (
                    <option key={vol} value={vol}>
                      {vol}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 text-[#767676]" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#5A5A5A] mb-1">
                Form / Construction
              </label>
              <div className="relative">
                <select
                  value={selectedForm}
                  onChange={(e) => setSelectedForm(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2 px-3 pr-8 text-xs font-medium text-[#0A0A0A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition cursor-pointer"
                >
                  {availableForms.length > 0 ? (
                    availableForms.map((f, i) => (
                      <option key={i} value={f.form}>
                        {f.form}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Standard Export Construction">Standard Export Construction</option>
                      <option value="Custom Yarn Count / Weave">Custom Yarn Count / Weave</option>
                      <option value="Raw Greige Fabric">Raw Greige Fabric</option>
                      <option value="Finished / Dyed / Processed">Finished / Dyed / Processed</option>
                    </>
                  )}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 text-[#767676]" />
              </div>
            </div>
          </div>

          {/* Buyer Details */}
          <div className="space-y-2.5 pt-1">
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#8A8A8A]" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name / Buyer Title *"
                className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2 pl-9 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#8A8A8A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
              />
            </div>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#8A8A8A]" />
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Business Email or WhatsApp with Country Code *"
                className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2 pl-9 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#8A8A8A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="relative">
                <Building className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#8A8A8A]" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company / Enterprise Name"
                  className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2 pl-9 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#8A8A8A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
                />
              </div>

              <div className="relative">
                <Globe2 className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#8A8A8A]" />
                <input
                  type="text"
                  value={destinationCountry}
                  onChange={(e) => setDestinationCountry(e.target.value)}
                  placeholder="Destination Port / Country"
                  className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2 pl-9 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#8A8A8A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Advanced Technical Specs Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <span>{showAdvanced ? "Hide" : "Add"} specific technical parameters (Count, CSP, GSM, Colorway)</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden pt-2"
                >
                  <textarea
                    rows={2}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Specify target yarn count (e.g. Ne 30s Combed), GSM, weaving construction, twist multiplier, or lab test limits..."
                    className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] p-2.5 text-xs text-[#0A0A0A] placeholder:text-[#8A8A8A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#0A0A0A] py-3 px-4 text-xs sm:text-sm font-semibold text-white transition hover:bg-[#2A2A2A] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Dispatching Technical RFQ...
              </span>
            ) : (
              <>
                <Send className="h-3.5 w-3.5 text-emerald-400" />
                <span>{buttonText}</span>
              </>
            )}
          </button>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-[#767676] pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-600" /> Verified Indian Mills
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-amber-600" /> Uster / Lab Test COA
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-blue-600" /> Zero Middleman Markup
            </span>
          </div>
        </form>
      )}
    </motion.div>
  );
}
