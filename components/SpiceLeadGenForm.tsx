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
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface SpiceLeadGenFormProps {
  spiceCategory: string;
  hsCode?: string | number;
  availableForms?: { form: string }[];
  className?: string;
  buttonText?: string;
}

const GRADE_OPTIONS = [
  { id: "steam", label: "Steam Sterilized", desc: "EU / FDA MRL Compliant" },
  { id: "organic", label: "Certified Organic", desc: "NPOP / USDA / EU" },
  { id: "conventional", label: "Conventional", desc: "Machine Cleaned" },
];

const VOLUME_OPTIONS = [
  "1x 20ft FCL (~12-14 MT)",
  "1x 40ft HC (~24-26 MT)",
  "Trial LCL (1-5 MT)",
  "Lab Samples (1-5 kg)",
];

export default function SpiceLeadGenForm({
  spiceCategory,
  hsCode,
  availableForms = [],
  className = "",
  buttonText = "Get Exporter Quotes & Specifications",
}: SpiceLeadGenFormProps) {
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState(""); // Email or WhatsApp
  const [company, setCompany] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(GRADE_OPTIONS[0].label);
  const [selectedVolume, setSelectedVolume] = useState(VOLUME_OPTIONS[0]);
  const [selectedForm, setSelectedForm] = useState(
    availableForms[0]?.form || "Standard Export Form"
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customNotes, setCustomNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !contact.trim()) {
      setErrorMessage("Please enter your name and email or phone number.");
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
      productCategory: `Spices: ${spiceCategory} (HS: ${hsCode || "N/A"}) | Grade: ${selectedGrade} | Vol: ${selectedVolume} | Form: ${selectedForm} | Contact: ${contact} | Notes: ${customNotes || "None"}`,
      inquiryDate: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch("/api/jotform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send inquiry");

      toast.success("Quote Request Sent!", {
        description: `Your inquiry for ${spiceCategory} was sent to Indian spice exporters.`,
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
      id="quick-rfq"
    >
      {/* Top Accent Glow Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500" />

      {/* Live Status Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EAE5D9]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">
            Live Procurement Desk
          </span>
        </div>
        <span className="rounded-full bg-[#FAF5E8] px-2.5 py-0.5 text-[11px] font-medium text-[#8B6008] border border-[#E5E0D0]">
          Instant Match
        </span>
      </div>

      <div className="mt-3">
        <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A]">
          Request Pricing &amp; Specifications
        </h3>
        <p className="mt-1 text-xs text-[#6A6A6A]">
          Direct supplier pricing for <strong className="text-[#1A1A1A]">{spiceCategory}</strong>
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 py-6 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h4 className="mt-3 text-base font-bold text-[#0A0A0A]">
              Inquiry Dispatched Successfully!
            </h4>
            <p className="mt-1.5 text-xs text-[#5A5A5A] leading-relaxed max-w-sm mx-auto">
              Our export trade desk will connect your requirement for <strong>{spiceCategory} ({selectedVolume})</strong> directly with Indian spice export processors.
            </p>
            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="mt-4 text-xs font-semibold text-[#8B6008] hover:underline"
            >
              Submit another request &rarr;
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="mt-4 space-y-3.5"
          >
            {/* Step 1: Quick Selectable Requirement Chips */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#767676] mb-1.5">
                1. Select Quality Grade
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {GRADE_OPTIONS.map((g) => {
                  const active = selectedGrade === g.label;
                  return (
                    <button
                      type="button"
                      key={g.id}
                      onClick={() => setSelectedGrade(g.label)}
                      className={`relative rounded-xl p-2 text-center text-xs font-semibold transition-all border ${
                        active
                          ? "border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-xs"
                          : "border-[#E5E0D0] bg-[#FAF7F0] text-[#3A3A3A] hover:bg-[#F5F0E0]"
                      }`}
                    >
                      <div>{g.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Volume Selection Pills */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#767676] mb-1.5">
                2. Target Volume
              </label>
              <div className="flex flex-wrap gap-1.5">
                {VOLUME_OPTIONS.map((vol) => {
                  const active = selectedVolume === vol;
                  return (
                    <button
                      type="button"
                      key={vol}
                      onClick={() => setSelectedVolume(vol)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition border ${
                        active
                          ? "border-amber-400 bg-amber-50 text-amber-900 ring-1 ring-amber-400"
                          : "border-[#EAE5D9] bg-[#FAF7F0] text-[#5A5A5A] hover:bg-[#F5F0E0]"
                      }`}
                    >
                      {vol}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Minimal Friction Contact Inputs */}
            <div className="pt-2 border-t border-[#EAE5D9] space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1A1A1A] mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8A8A8A]" />
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2 pl-8 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1A1A1A] mb-1">
                    Email or WhatsApp *
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8A8A8A]" />
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="email@company.com or +44..."
                      className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2 pl-8 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1A1A1A] mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8A8A8A]" />
                    <input
                      type="text"
                      disabled={isSubmitting}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your company / business"
                      className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2 pl-8 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1A1A1A] mb-1">
                    Destination Port / Country
                  </label>
                  <div className="relative">
                    <Globe2 className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8A8A8A]" />
                    <input
                      type="text"
                      disabled={isSubmitting}
                      value={destinationCountry}
                      onChange={(e) => setDestinationCountry(e.target.value)}
                      placeholder="e.g. Rotterdam, UK, USA"
                      className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2 pl-8 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Specifics Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#8B6008] hover:underline"
              >
                <span>{showAdvanced ? "- Hide custom notes" : "+ Add custom mesh / packaging notes"}</span>
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2"
                  >
                    <textarea
                      rows={2}
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      placeholder="Specify target ASTA color, SHU heat, mesh size, or private labeling..."
                      className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] p-2.5 text-xs text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition resize-none"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {errorMessage && (
              <p className="rounded-lg bg-red-50 p-2 text-xs text-red-600 border border-red-200">
                {errorMessage}
              </p>
            )}

            {/* High Conversion CTA Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A0A0A] hover:bg-neutral-800 text-white py-3 px-4 text-xs sm:text-sm font-bold transition shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing Request...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 text-amber-400" />
                  {buttonText}
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </>
              )}
            </motion.button>

            <div className="flex items-center justify-center gap-3 text-[10px] text-[#767676] pt-1">
              <span>🔒 100% Free Buyer Service</span>
              <span>•</span>
              <span>Direct Exporter Connection</span>
              <span>•</span>
              <span>No Spam</span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
