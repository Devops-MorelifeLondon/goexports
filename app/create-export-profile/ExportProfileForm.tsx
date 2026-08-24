"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Building2,
  User,
  Globe,
  FileText,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  ShieldCheck,
  Zap,
  Crown,
  Check,
  PackageCheck
} from "lucide-react";
import { toast } from "sonner";
import { BUYER_PLANS, BuyerPlan } from "@/data/plans";

interface ExportProfileFormData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  country: string;
  productCategory: string;
  customCategory: string;
  website: string;
  postCode: string;
  companyProfile: string;
  targetMarkets: string[];
  yearEstablished: string;
  exportCapacity: string;
  certifications: string[];
  selectedPackage: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  companyName?: string;
  country?: string;
  productCategory?: string;
  customCategory?: string;
  website?: string;
  postCode?: string;
  companyProfile?: string;
  yearEstablished?: string;
}

const CATEGORY_OPTIONS = [
  "Textiles, Apparel & Garments",
  "Health Products, Drug & Medicine",
  "Agriculture, Spices & Food Products",
  "Chemicals, Petrochemicals & Polymers",
  "Machinery, Tools & Industrial Equipment",
  "Electronics, Electrical & Gadgets",
  "Gems, Jewelry & Precious Metals",
  "Leather Goods & Footwear",
  "Automotive Parts & Accessories",
  "Handicrafts, Carpets & Home Decor",
  "Construction Materials, Tiles & Hardware",
  "Plastics, Rubber & Packaging",
  "Cosmetics & Personal Care",
  "Renewable Energy & Solar",
  "Other (Specify Below)",
];

const TARGET_MARKET_OPTIONS = [
  "North America (USA, Canada)",
  "European Union & UK",
  "Middle East & GCC (UAE, Saudi)",
  "Asia-Pacific (Japan, Australia, Singapore)",
  "Southeast Asia (Vietnam, Malaysia)",
  "Latin America & Caribbean",
  "Africa",
  "Worldwide / All Regions",
];

const CERTIFICATION_OPTIONS = [
  "ISO 9001",
  "ISO 14001",
  "CE Mark",
  "FDA Registered",
  "GMP Certified",
  "HACCP",
  "Halal / Kosher",
  "Organic Certified",
  "OEKO-TEX",
];

const COMMON_COUNTRIES = [
  "United Kingdom",
  "United States",
  "India",
  "United Arab Emirates",
  "Germany",
  "Canada",
  "Australia",
  "China",
  "Turkey",
  "Vietnam",
  "Italy",
  "France",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "Brazil",
  "Mexico",
  "Indonesia",
  "Pakistan",
  "Bangladesh",
  "Other",
];

export default function ExportProfileForm() {
  const [formData, setFormData] = useState<ExportProfileFormData>({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    country: "",
    productCategory: "",
    customCategory: "",
    website: "",
    postCode: "",
    companyProfile: "",
    targetMarkets: [],
    yearEstablished: "",
    exportCapacity: "",
    certifications: [],
    selectedPackage: "Verified Growth Pro",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUrlCopied, setIsUrlCopied] = useState(false);

  // Field validation function
  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value || !value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Full name must be at least 2 characters";
        return undefined;

      case "phone":
        if (!value || !value.trim()) return "Phone / WhatsApp number is required";
        if (value.trim().length < 6) return "Please enter a valid phone number with country code";
        return undefined;

      case "email":
        if (!value || !value.trim()) return "Official email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address (e.g. name@company.com)";
        }
        return undefined;

      case "password":
        if (!value || !value.trim()) return "Account password is required";
        if (value.trim().length < 6) return "Password must be at least 6 characters long";
        return undefined;

      case "confirmPassword":
        if (!value || !value.trim()) return "Please confirm your account password";
        if (value !== formData.password) return "Passwords do not match";
        return undefined;

      case "companyName":
        if (!value || !value.trim()) return "Company / Business name is required";
        if (value.trim().length < 2) return "Company name must be at least 2 characters";
        return undefined;

      case "country":
        if (!value || !value.trim()) return "Please select your country of origin";
        return undefined;

      case "postCode":
        if (!value || !value.trim()) return "Postal / ZIP code is required";
        return undefined;

      case "productCategory":
        if (!value || !value.trim()) return "Please select a product category";
        return undefined;

      case "customCategory":
        if (formData.productCategory === "Other (Specify Below)" && (!value || !value.trim())) {
          return "Please specify your custom product category";
        }
        return undefined;

      case "website":
        if (value && value.trim()) {
          const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
          if (!urlPattern.test(value.trim())) {
            return "Please enter a valid website URL (e.g. https://company.com)";
          }
        }
        return undefined;

      case "yearEstablished":
        if (value && value.trim()) {
          const currentYear = new Date().getFullYear();
          const yearNum = parseInt(value.trim(), 10);
          if (isNaN(yearNum) || yearNum < 1800 || yearNum > currentYear) {
            return `Year must be between 1800 and ${currentYear}`;
          }
        }
        return undefined;

      case "companyProfile":
        if (!value || !value.trim()) return "Company profile description is required";
        if (value.trim().length < 20) {
          return `Please write at least 20 characters (currently ${value.trim().length})`;
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const validateAll = (): FormErrors => {
    const newErrors: FormErrors = {};
    const fieldsToValidate: (keyof ExportProfileFormData)[] = [
      "fullName",
      "phone",
      "email",
      "password",
      "confirmPassword",
      "companyName",
      "country",
      "postCode",
      "productCategory",
      "customCategory",
      "website",
      "yearEstablished",
      "companyProfile",
    ];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field as keyof FormErrors] = error;
      }
    });

    return newErrors;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setFocusedField(null);
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof ExportProfileFormData]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const toggleTargetMarket = (market: string) => {
    setFormData((prev) => {
      const exists = prev.targetMarkets.includes(market);
      return {
        ...prev,
        targetMarkets: exists
          ? prev.targetMarkets.filter((m) => m !== market)
          : [...prev.targetMarkets, market],
      };
    });
  };

  const toggleCertification = (cert: string) => {
    setFormData((prev) => {
      const exists = prev.certifications.includes(cert);
      return {
        ...prev,
        certifications: exists
          ? prev.certifications.filter((c) => c !== cert)
          : [...prev.certifications, cert],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched: Record<string, boolean> = {
      fullName: true,
      phone: true,
      email: true,
      password: true,
      confirmPassword: true,
      companyName: true,
      country: true,
      postCode: true,
      productCategory: true,
      customCategory: true,
      website: true,
      yearEstablished: true,
      companyProfile: true,
    };
    setTouched(allTouched);

    const validationErrors = validateAll();
    setErrors(validationErrors);

    const errorKeys = Object.keys(validationErrors);
    if (errorKeys.length > 0) {
      const firstError = validationErrors[errorKeys[0] as keyof FormErrors];
      toast.error("Form Validation Error", {
        description: firstError || `Please correct ${errorKeys.length} error(s) before submitting.`,
      });

      const firstInvalidElement = document.getElementById(errorKeys[0]);
      if (firstInvalidElement) {
        firstInvalidElement.scrollIntoView({ behavior: "smooth", block: "center" });
        firstInvalidElement.focus();
      }
      return;
    }

    setIsSubmitting(true);

    const finalCategory =
      formData.productCategory === "Other (Specify Below)"
        ? formData.customCategory || "Other"
        : formData.productCategory;

    const payload = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      companyName: formData.companyName,
      country: formData.country,
      productCategory: finalCategory,
      website: formData.website,
      postCode: formData.postCode,
      companyProfile: formData.companyProfile,
      targetMarkets: formData.targetMarkets,
      yearEstablished: formData.yearEstablished,
      exportCapacity: formData.exportCapacity,
      certifications: formData.certifications,
      selectedPackage: formData.selectedPackage,
    };

    try {
      const response = await fetch("/api/export-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to submit export profile");
      }

      toast.success("Profile Submitted for Verification!", {
        description: `Your application (Ref: ${data.profileId || "EXP"}) is under review by our admin team.`,
      });

      if (typeof window !== "undefined") {
        const userToStore = {
          ...(data.data || payload),
          id: data.profileId || "EXP",
          slug: data.slug,
          status: data.status || "pending",
        };
        localStorage.setItem("exporter_user", JSON.stringify(userToStore));
        if (data.token) {
          localStorage.setItem("exporter_token", data.token);
        }
        window.dispatchEvent(new Event("exporter_auth_change"));
      }

      setSubmittedData({
        ...payload,
        id: data.profileId || "EXP-SUBMITTED",
        slug: data.slug,
        status: data.status || "pending",
        profileUrl: data.profileUrl || `/${data.slug || data.profileId}`,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Submission failed:", err);
      toast.error("Submission Failed", {
        description: err.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyStorefrontUrl = () => {
    if (typeof window !== "undefined" && submittedData) {
      const fullUrl = `${window.location.origin}${submittedData.profileUrl || `/${submittedData.slug || submittedData.id}`}`;
      navigator.clipboard.writeText(fullUrl);
      setIsUrlCopied(true);
      toast.success("Storefront URL Copied!", {
        description: fullUrl,
      });
      setTimeout(() => setIsUrlCopied(false), 2500);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      country: "",
      productCategory: "",
      customCategory: "",
      website: "",
      postCode: "",
      companyProfile: "",
      targetMarkets: [],
      yearEstablished: "",
      exportCapacity: "",
      certifications: [],
      selectedPackage: "Verified Growth Pro",
    });
    setErrors({});
    setTouched({});
    setSubmittedData(null);
  };

  // SUCCESS CONFIRMATION VIEW
  if (submittedData) {
    const storefrontHref = submittedData.profileUrl || `/${submittedData.slug || submittedData.id}`;

    return (
      <div
        className="p-8 sm:p-10 rounded-2xl border border-[var(--hairline)] shadow-lg animate-in fade-in duration-300"
        style={{ backgroundColor: "var(--surface-card)" }}
      >
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          {/* Success / Pending Icon */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm bg-amber-100 text-amber-800 border border-amber-300"
          >
            <Sparkles className="w-8 h-8 text-amber-700" />
          </div>

          <span
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 bg-amber-100 text-amber-900 border border-amber-300"
          >
            Application Submitted • Pending Admin Approval
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] mb-3">
            Thank You, {submittedData.fullName}!
          </h2>

          <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-6">
            Your exporter registration for <strong className="text-[var(--ink)]">{submittedData.companyName}</strong> has been received and is being verified by our compliance team.
          </p>

          {/* Reserved URL Box */}
          <div className="w-full p-4 rounded-xl border border-amber-300 bg-amber-50/70 text-left mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Reserved Public Storefront URL:
              </span>
              <span className="text-[11px] font-mono text-amber-800 font-bold">
                Ref: {submittedData.id}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-white border border-amber-200">
              <span className="font-mono text-xs text-amber-950 font-semibold truncate">
                goexports.co.uk{storefrontHref}
              </span>
              <button
                type="button"
                onClick={copyStorefrontUrl}
                className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-700 text-white border-none cursor-pointer hover:bg-amber-800 transition-colors shrink-0 flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>{isUrlCopied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            <p className="text-[11px] text-amber-800 leading-tight m-0 pt-1">
              Your profile will become live at this address immediately upon admin approval. An email notification will be sent to <strong>{submittedData.email}</strong>.
            </p>
          </div>

          {/* Summary Box */}
          <div
            className="w-full text-left p-6 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] space-y-3 mb-6 text-xs sm:text-sm"
          >
            <div className="flex justify-between pb-2 border-b border-[var(--hairline)]">
              <span className="text-[var(--muted)]">Company Name:</span>
              <span className="font-semibold text-[var(--ink)]">{submittedData.companyName}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[var(--hairline)]">
              <span className="text-[var(--muted)]">Selected Package:</span>
              <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-[11px] border border-amber-200">
                {submittedData.selectedPackage || "Verified Growth Pro"}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[var(--hairline)]">
              <span className="text-[var(--muted)]">Category:</span>
              <span className="font-semibold text-[var(--ink)]">{submittedData.productCategory}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[var(--hairline)]">
              <span className="text-[var(--muted)]">Country / ZIP:</span>
              <span className="font-semibold text-[var(--ink)]">{submittedData.country} ({submittedData.postCode})</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[var(--hairline)]">
              <span className="text-[var(--muted)]">Registered Email:</span>
              <span className="font-semibold text-[var(--ink)]">{submittedData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Direct Contact:</span>
              <span className="font-semibold text-[var(--ink)]">{submittedData.phone}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <Link
              href="/exporter/profile"
              className="btn-primary flex-1 no-underline text-center justify-center text-xs sm:text-sm font-bold flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Go to My Profile Portal</span>
            </Link>
            <Link
              href="/exporter/profile?tab=edit"
              className="btn-secondary flex-1 no-underline text-center justify-center text-xs sm:text-sm font-bold flex items-center gap-1.5"
            >
              <span>Edit Profile Details</span>
            </Link>
            <button
              onClick={resetForm}
              className="px-4 py-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
            >
              New Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD FORM VIEW
  return (
    <div
      className="p-6 sm:p-10 rounded-2xl border border-[var(--hairline)] shadow-sm"
      style={{ backgroundColor: "var(--surface-card)" }}
    >
      {/* Form Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[var(--hairline)] gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
            Exporter Registration Form
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
            Fields marked with <span className="text-rose-500 font-bold">*</span> are required to generate your dynamic profile storefront.
          </p>
        </div>
        <Link
          href="/exporter/login"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] hover:bg-[var(--surface-soft)] transition-colors no-underline self-start sm:self-auto"
        >
          <Lock className="w-3.5 h-3.5 text-[var(--muted)]" />
          <span>Already registered? Login</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        {/* ── SECTION 1: PRIMARY CONTACT & CREDENTIALS ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-[var(--brand-ochre)]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--ink)]">
              1. Primary Contact & Account Login
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="text-xs font-semibold text-[var(--body-strong)]">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                disabled={isSubmitting}
                value={formData.fullName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => handleBlur("fullName")}
                placeholder="e.g. Alexander Wright"
                className={`w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none disabled:opacity-50 placeholder:text-[var(--muted-soft)] ${
                  errors.fullName && touched.fullName ? "border-rose-500 ring-1 ring-rose-500/30" : ""
                }`}
                style={{
                  backgroundColor: "var(--canvas)",
                  color: "var(--ink)",
                  border: `1px solid ${
                    errors.fullName && touched.fullName
                      ? "#ef4444"
                      : focusedField === "fullName"
                      ? "var(--ink)"
                      : "var(--hairline)"
                  }`,
                  height: "44px",
                }}
              />
              {errors.fullName && touched.fullName && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-xs font-semibold text-[var(--body-strong)]">
                Phone / WhatsApp <span className="text-rose-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                disabled={isSubmitting}
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => handleBlur("phone")}
                placeholder="e.g. +44 7911 123456"
                className={`w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none disabled:opacity-50 placeholder:text-[var(--muted-soft)] ${
                  errors.phone && touched.phone ? "border-rose-500 ring-1 ring-rose-500/30" : ""
                }`}
                style={{
                  backgroundColor: "var(--canvas)",
                  color: "var(--ink)",
                  border: `1px solid ${
                    errors.phone && touched.phone
                      ? "#ef4444"
                      : focusedField === "phone"
                      ? "var(--ink)"
                      : "var(--hairline)"
                  }`,
                  height: "44px",
                }}
              />
              {errors.phone && touched.phone && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="email" className="text-xs font-semibold text-[var(--body-strong)]">
                Official Business Email Address (Login ID) <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => handleBlur("email")}
                placeholder="e.g. exports@yourcompany.com"
                className={`w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none disabled:opacity-50 placeholder:text-[var(--muted-soft)] ${
                  errors.email && touched.email ? "border-rose-500 ring-1 ring-rose-500/30" : ""
                }`}
                style={{
                  backgroundColor: "var(--canvas)",
                  color: "var(--ink)",
                  border: `1px solid ${
                    errors.email && touched.email
                      ? "#ef4444"
                      : focusedField === "email"
                      ? "var(--ink)"
                      : "var(--hairline)"
                  }`,
                  height: "44px",
                }}
              />
              {errors.email && touched.email ? (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.email}
                </p>
              ) : (
                <span className="text-[11px] text-[var(--muted)]">
                  This email will be used to log in and receive direct global buyer RFQs.
                </span>
              )}
            </div>

            {/* Account Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-xs font-semibold text-[var(--body-strong)]">
                Create Account Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  disabled={isSubmitting}
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => handleBlur("password")}
                  placeholder="Min 6 characters"
                  className={`w-full pl-4 pr-10 py-2.5 rounded-xl text-sm transition-colors outline-none disabled:opacity-50 placeholder:text-[var(--muted-soft)] ${
                    errors.password && touched.password ? "border-rose-500 ring-1 ring-rose-500/30" : ""
                  }`}
                  style={{
                    backgroundColor: "var(--canvas)",
                    color: "var(--ink)",
                    border: `1px solid ${
                      errors.password && touched.password
                        ? "#ef4444"
                        : focusedField === "password"
                        ? "var(--ink)"
                        : "var(--hairline)"
                    }`,
                    height: "44px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)] border-none bg-transparent cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="text-xs font-semibold text-[var(--body-strong)]">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  disabled={isSubmitting}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => handleBlur("confirmPassword")}
                  placeholder="Re-enter your password"
                  className={`w-full pl-4 pr-10 py-2.5 rounded-xl text-sm transition-colors outline-none disabled:opacity-50 placeholder:text-[var(--muted-soft)] ${
                    errors.confirmPassword && touched.confirmPassword ? "border-rose-500 ring-1 ring-rose-500/30" : ""
                  }`}
                  style={{
                    backgroundColor: "var(--canvas)",
                    color: "var(--ink)",
                    border: `1px solid ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "#ef4444"
                        : focusedField === "confirmPassword"
                        ? "var(--ink)"
                        : "var(--hairline)"
                    }`,
                    height: "44px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)] border-none bg-transparent cursor-pointer p-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── SECTION 2: COMPANY & BUSINESS LOCATION ── */}
        <div className="pt-6 border-t border-[var(--hairline)]">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4 text-[var(--brand-ochre)]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--ink)]">
              2. Company & Business Location
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Company Name */}
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="companyName" className="text-xs font-semibold text-[var(--body-strong)]">
                Company / Business Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                disabled={isSubmitting}
                value={formData.companyName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("companyName")}
                onBlur={() => handleBlur("companyName")}
                placeholder="e.g. Apex Global Trade & Manufacturing Ltd"
                className={`w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none disabled:opacity-50 placeholder:text-[var(--muted-soft)] ${
                  errors.companyName && touched.companyName ? "border-rose-500 ring-1 ring-rose-500/30" : ""
                }`}
                style={{
                  backgroundColor: "var(--canvas)",
                  color: "var(--ink)",
                  border: `1px solid ${
                    errors.companyName && touched.companyName
                      ? "#ef4444"
                      : focusedField === "companyName"
                      ? "var(--ink)"
                      : "var(--hairline)"
                  }`,
                  height: "44px",
                }}
              />
              {errors.companyName && touched.companyName ? (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.companyName}
                </p>
              ) : (
                <span className="text-[11px] text-[var(--muted)]">
                  Your storefront URL will be generated as: <strong>goexports.co.uk/[business-name]</strong>
                </span>
              )}
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="text-xs font-semibold text-[var(--body-strong)]">
                Country / Region of Origin <span className="text-rose-500">*</span>
              </label>
              <select
                id="country"
                name="country"
                disabled={isSubmitting}
                value={formData.country}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("country")}
                onBlur={() => handleBlur("country")}
                className={`w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none disabled:opacity-50 ${
                  errors.country && touched.country ? "border-rose-500 ring-1 ring-rose-500/30" : ""
                }`}
                style={{
                  backgroundColor: "var(--canvas)",
                  color: formData.country ? "var(--ink)" : "var(--muted-soft)",
                  border: `1px solid ${
                    errors.country && touched.country
                      ? "#ef4444"
                      : focusedField === "country"
                      ? "var(--ink)"
                      : "var(--hairline)"
                  }`,
                  height: "44px",
                }}
              >
                <option value="">Select Country</option>
                {COMMON_COUNTRIES.map((c) => (
                  <option key={c} value={c} className="text-[var(--ink)]">
                    {c}
                  </option>
                ))}
              </select>
              {errors.country && touched.country && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.country}
                </p>
              )}
            </div>

            {/* Postal Code */}
            <div className="flex flex-col gap-1">
              <label htmlFor="postCode" className="text-xs font-semibold text-[var(--body-strong)]">
                Postal / ZIP Code <span className="text-rose-500">*</span>
              </label>
              <input
                id="postCode"
                name="postCode"
                type="text"
                disabled={isSubmitting}
                value={formData.postCode}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("postCode")}
                onBlur={() => handleBlur("postCode")}
                placeholder="e.g. SW1A 1AA or 110001"
                className={`w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none disabled:opacity-50 placeholder:text-[var(--muted-soft)] ${
                  errors.postCode && touched.postCode ? "border-rose-500 ring-1 ring-rose-500/30" : ""
                }`}
                style={{
                  backgroundColor: "var(--canvas)",
                  color: "var(--ink)",
                  border: `1px solid ${
                    errors.postCode && touched.postCode
                      ? "#ef4444"
                      : focusedField === "postCode"
                      ? "var(--ink)"
                      : "var(--hairline)"
                  }`,
                  height: "44px",
                }}
              />
              {errors.postCode && touched.postCode && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.postCode}
                </p>
              )}
            </div>

            {/* Website URL */}
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="website" className="text-xs font-semibold text-[var(--body-strong)]">
                Company Website <span className="text-[var(--muted)] font-normal">(Optional)</span>
              </label>
              <input
                id="website"
                name="website"
                type="url"
                disabled={isSubmitting}
                value={formData.website}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("website")}
                onBlur={() => handleBlur("website")}
                placeholder="https://www.yourcompany.com"
                className={`w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none disabled:opacity-50 placeholder:text-[var(--muted-soft)] ${
                  errors.website && touched.website ? "border-rose-500 ring-1 ring-rose-500/30" : ""
                }`}
                style={{
                  backgroundColor: "var(--canvas)",
                  color: "var(--ink)",
                  border: `1px solid ${
                    errors.website && touched.website
                      ? "#ef4444"
                      : focusedField === "website"
                      ? "var(--ink)"
                      : "var(--hairline)"
                  }`,
                  height: "44px",
                }}
              />
              {errors.website && touched.website && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.website}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── SECTION 3: PRODUCTS & EXPORT PROFILE ── */}
        <div className="pt-6 border-t border-[var(--hairline)]">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-[var(--brand-ochre)]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--ink)]">
              3. Product Category & Export Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Primary Category */}
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="productCategory" className="text-xs font-semibold text-[var(--body-strong)]">
                Primary Product Category <span className="text-rose-500">*</span>
              </label>
              <select
                id="productCategory"
                name="productCategory"
                disabled={isSubmitting}
                value={formData.productCategory}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("productCategory")}
                onBlur={() => handleBlur("productCategory")}
                className={`w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none disabled:opacity-50 ${
                  errors.productCategory && touched.productCategory ? "border-rose-500 ring-1 ring-rose-500/30" : ""
                }`}
                style={{
                  backgroundColor: "var(--canvas)",
                  color: formData.productCategory ? "var(--ink)" : "var(--muted-soft)",
                  border: `1px solid ${
                    errors.productCategory && touched.productCategory
                      ? "#ef4444"
                      : focusedField === "productCategory"
                      ? "var(--ink)"
                      : "var(--hairline)"
                  }`,
                  height: "44px",
                }}
              >
                <option value="">Select Primary Category</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat} className="text-[var(--ink)]">
                    {cat}
                  </option>
                ))}
              </select>
              {errors.productCategory && touched.productCategory && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.productCategory}
                </p>
              )}
            </div>

            {/* Custom Category if Other */}
            {formData.productCategory === "Other (Specify Below)" && (
              <div className="flex flex-col gap-1 sm:col-span-2 animate-in fade-in duration-200">
                <label htmlFor="customCategory" className="text-xs font-semibold text-[var(--body-strong)]">
                  Specific Product / Industry Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="customCategory"
                  name="customCategory"
                  type="text"
                  disabled={isSubmitting}
                  value={formData.customCategory}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("customCategory")}
                  onBlur={() => handleBlur("customCategory")}
                  placeholder="e.g. Industrial Automation Sensors & Robotics"
                  className="w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none"
                  style={{
                    backgroundColor: "var(--canvas)",
                    color: "var(--ink)",
                    border: "1px solid var(--hairline)",
                    height: "44px",
                  }}
                />
              </div>
            )}

            {/* Year Established */}
            <div className="flex flex-col gap-1">
              <label htmlFor="yearEstablished" className="text-xs font-semibold text-[var(--body-strong)]">
                Year Established <span className="text-[var(--muted)] font-normal">(Optional)</span>
              </label>
              <input
                id="yearEstablished"
                name="yearEstablished"
                type="number"
                disabled={isSubmitting}
                value={formData.yearEstablished}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("yearEstablished")}
                onBlur={() => handleBlur("yearEstablished")}
                placeholder="e.g. 2010"
                className="w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none"
                style={{
                  backgroundColor: "var(--canvas)",
                  color: "var(--ink)",
                  border: "1px solid var(--hairline)",
                  height: "44px",
                }}
              />
            </div>

            {/* Export Capacity */}
            <div className="flex flex-col gap-1">
              <label htmlFor="exportCapacity" className="text-xs font-semibold text-[var(--body-strong)]">
                Monthly Export Capacity <span className="text-[var(--muted)] font-normal">(Optional)</span>
              </label>
              <input
                id="exportCapacity"
                name="exportCapacity"
                type="text"
                disabled={isSubmitting}
                value={formData.exportCapacity}
                onChange={handleInputChange}
                placeholder="e.g. 50,000 Units / 10 Containers"
                className="w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none"
                style={{
                  backgroundColor: "var(--canvas)",
                  color: "var(--ink)",
                  border: "1px solid var(--hairline)",
                  height: "44px",
                }}
              />
            </div>

            {/* Target Export Markets */}
            <div className="flex flex-col gap-2 sm:col-span-2 pt-2">
              <label className="text-xs font-semibold text-[var(--body-strong)]">
                Target Export Geographies <span className="text-[var(--muted)] font-normal">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TARGET_MARKET_OPTIONS.map((market) => {
                  const isChecked = formData.targetMarkets.includes(market);
                  return (
                    <button
                      type="button"
                      key={market}
                      onClick={() => toggleTargetMarket(market)}
                      className={`text-left px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 cursor-pointer ${
                        isChecked
                          ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                          : "bg-[var(--canvas)] text-[var(--body)] border-[var(--hairline)] hover:border-[var(--muted)]"
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[9px] font-bold ${
                          isChecked ? "bg-[var(--brand-ochre)] text-[var(--ink)]" : "border border-[var(--hairline)]"
                        }`}
                      >
                        {isChecked ? "✓" : ""}
                      </span>
                      <span>{market}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Certifications */}
            <div className="flex flex-col gap-2 sm:col-span-2 pt-2">
              <label className="text-xs font-semibold text-[var(--body-strong)]">
                Quality & Compliance Certifications <span className="text-[var(--muted)] font-normal">(Optional)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CERTIFICATION_OPTIONS.map((cert) => {
                  const isChecked = formData.certifications.includes(cert);
                  return (
                    <button
                      type="button"
                      key={cert}
                      onClick={() => toggleCertification(cert)}
                      className={`text-left px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-2 cursor-pointer ${
                        isChecked
                          ? "bg-emerald-800 text-white border-emerald-800"
                          : "bg-[var(--canvas)] text-[var(--body)] border-[var(--hairline)] hover:border-[var(--muted)]"
                      }`}
                    >
                      <span
                        className={`w-3 h-3 rounded-xs flex items-center justify-center text-[8px] font-bold ${
                          isChecked ? "bg-emerald-400 text-emerald-950" : "border border-[var(--hairline)]"
                        }`}
                      >
                        {isChecked ? "✓" : ""}
                      </span>
                      <span className="truncate">{cert}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Company Profile Description */}
            <div className="flex flex-col gap-1 sm:col-span-2 pt-2">
              <label htmlFor="companyProfile" className="text-xs font-semibold text-[var(--body-strong)]">
                Company Overview & Bio <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="companyProfile"
                name="companyProfile"
                rows={4}
                disabled={isSubmitting}
                value={formData.companyProfile}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("companyProfile")}
                onBlur={() => handleBlur("companyProfile")}
                placeholder="Describe your manufacturing facilities, export experience, key product lines, quality assurance practices, and why global buyers should partner with you..."
                className={`w-full px-4 py-3 rounded-xl text-sm transition-colors outline-none disabled:opacity-50 placeholder:text-[var(--muted-soft)] ${
                  errors.companyProfile && touched.companyProfile ? "border-rose-500 ring-1 ring-rose-500/30" : ""
                }`}
                style={{
                  backgroundColor: "var(--canvas)",
                  color: "var(--ink)",
                  border: `1px solid ${
                    errors.companyProfile && touched.companyProfile
                      ? "#ef4444"
                      : focusedField === "companyProfile"
                      ? "var(--ink)"
                      : "var(--hairline)"
                  }`,
                }}
              />
              {errors.companyProfile && touched.companyProfile && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.companyProfile}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── SECTION 4: FIND INTERNATIONAL BUYERS PLANS ── */}
        <div className="pt-6 border-t border-[var(--hairline)]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-[var(--brand-ochre)]" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--ink)]">
                4. Select Find International Buyers Plan
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full hidden sm:inline-flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-600" />
              Verified Trade Leads
            </span>
          </div>
          <p className="text-xs text-[var(--muted)] mb-5">
            Choose your sourcing plan. You can upgrade or modify your package anytime in your exporter dashboard.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {BUYER_PLANS.map((plan) => {
              const isSelected = formData.selectedPackage === plan.name || formData.selectedPackage === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setFormData((prev) => ({ ...prev, selectedPackage: plan.name }))}
                  className={`relative rounded-2xl p-4.5 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? "bg-[var(--canvas)] border-2 border-[var(--brand-ochre)] shadow-md ring-2 ring-[var(--brand-ochre)]/20"
                      : "bg-[var(--canvas)] border border-[var(--hairline)] hover:border-[var(--muted)] hover:shadow-sm opacity-90 hover:opacity-100"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider bg-[var(--brand-ochre)] text-[var(--ink)] shadow-xs">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                            isSelected
                              ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                              : "border-[var(--muted)] bg-transparent"
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <h4 className="text-sm font-bold text-[var(--ink)]">{plan.name}</h4>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-xs font-semibold text-[var(--muted)]">{plan.currency}</span>
                      <span className="text-xl font-bold text-[var(--ink)] tracking-tight">{plan.price}</span>
                      <span className="text-[11px] text-[var(--muted-soft)]">{plan.period}</span>
                    </div>

                    {/* Leads Pill */}
                    <div className="mb-2.5">
                      <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                        {plan.leads} {plan.leadsLabel}
                      </span>
                    </div>

                    <p className="text-[11px] text-[var(--muted)] leading-relaxed mb-3">
                      {plan.tagline}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-1.5 border-t border-[var(--hairline)] pt-2.5 mb-2">
                      {plan.features.slice(0, 4).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11.5px] text-[var(--body-strong)]">
                          <Check className={`w-3 h-3 mt-0.5 shrink-0 ${isSelected ? "text-amber-600 font-bold" : "text-emerald-600"}`} />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                      {plan.features.length > 4 && (
                        <li className="text-[10.5px] text-[var(--muted)] pl-4.5 pt-0.5">
                          + {plan.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-2.5 mt-2 border-t border-[var(--hairline)]/60 text-center">
                    <span
                      className={`inline-block w-full py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        isSelected
                          ? "bg-[var(--ink)] text-white"
                          : "bg-[var(--surface-card)] text-[var(--body-strong)]"
                      }`}
                    >
                      {isSelected ? "Selected Plan ✓" : "Select Plan"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── SUBMIT BUTTON ── */}
        <div className="pt-6 border-t border-[var(--hairline)]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl font-bold text-base text-[var(--ink)] border-none cursor-pointer transition-all flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] disabled:opacity-50 shadow-md"
            style={{ backgroundColor: "var(--brand-ochre)" }}
          >
            {isSubmitting ? (
              <span>Generating Exporter Storefront...</span>
            ) : (
              <>
                <span>Publish Exporter Profile & Get Live Storefront</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-[var(--muted)] mt-3">
            By publishing, you agree to Goexports terms of trade. Zero commissions on closed contracts.
          </p>
        </div>
      </form>
    </div>
  );
}
