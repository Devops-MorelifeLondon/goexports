"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Share2,
  Check,
  Edit3,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Sparkles,
  Inbox,
  AlertCircle,
  Clock,
  Send,
  MessageCircle,
  Save,
  RotateCcw,
  LayoutDashboard,
  ShieldAlert,
  Loader2,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

export interface ExporterProfileData {
  id: string;
  slug: string;
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  country: string;
  productCategory: string;
  website?: string;
  postCode: string;
  companyProfile: string;
  targetMarkets: string[];
  yearEstablished?: string;
  exportCapacity?: string;
  certifications: string[];
  status?: string;
  selectedPackage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BuyerInquiry {
  id: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  buyerCountry?: string;
  inquiryType: string;
  quantity?: string;
  message: string;
  createdAt: string;
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
];

interface ExporterProfileDashboardProps {
  initialProfile?: ExporterProfileData | null;
  initialInquiries?: BuyerInquiry[];
}

export default function ExporterProfileDashboard({
  initialProfile,
  initialInquiries = [],
}: ExporterProfileDashboardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";

  const [activeTab, setActiveTab] = useState<"overview" | "edit" | "inquiries" | "security">(
    (initialTab as any) || "overview"
  );

  const [profile, setProfile] = useState<ExporterProfileData | null>(initialProfile || null);
  const [inquiries, setInquiries] = useState<BuyerInquiry[]>(initialInquiries);
  const [isLoading, setIsLoading] = useState(!initialProfile);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Edit Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    companyName: "",
    country: "",
    productCategory: "",
    customCategory: "",
    website: "",
    postCode: "",
    companyProfile: "",
    targetMarkets: [] as string[],
    yearEstablished: "",
    exportCapacity: "",
    certifications: [] as string[],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Populate edit form data when profile is loaded
  const syncFormDataWithProfile = (data: ExporterProfileData) => {
    const isCustomCat = !CATEGORY_OPTIONS.includes(data.productCategory);
    setFormData({
      fullName: data.fullName || "",
      phone: data.phone || "",
      email: data.email || "",
      companyName: data.companyName || "",
      country: data.country || "",
      productCategory: isCustomCat ? "Other (Specify Below)" : data.productCategory || "",
      customCategory: isCustomCat ? data.productCategory : "",
      website: data.website || "",
      postCode: data.postCode || "",
      companyProfile: data.companyProfile || "",
      targetMarkets: Array.isArray(data.targetMarkets) ? data.targetMarkets : [],
      yearEstablished: data.yearEstablished || "",
      exportCapacity: data.exportCapacity || "",
      certifications: Array.isArray(data.certifications) ? data.certifications : [],
    });
  };

  // Fetch authenticated exporter profile
  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/exporter/profile");
      if (!res.ok) {
        if (res.status === 401) {
          // Check local storage fallback if any
          const localUserStr = typeof window !== "undefined" ? localStorage.getItem("exporter_user") : null;
          if (localUserStr) {
            try {
              const localUser = JSON.parse(localUserStr);
              if (localUser && localUser.email) {
                // User may need to re-login
              }
            } catch {}
          }
          router.push("/exporter/login?redirect=/exporter/profile");
          return;
        }
        throw new Error("Failed to load profile");
      }

      const data = await res.json();
      if (data.seller) {
        setProfile(data.seller);
        syncFormDataWithProfile(data.seller);
        if (typeof window !== "undefined") {
          localStorage.setItem("exporter_user", JSON.stringify(data.seller));
        }
      }
      if (data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err: any) {
      console.error("Error loading exporter profile:", err);
      toast.error("Could not load profile", {
        description: "Please check your login credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialProfile) {
      loadProfile();
    } else {
      syncFormDataWithProfile(initialProfile);
    }
  }, []);

  // Update URL search params when tab changes
  const handleTabChange = (tab: "overview" | "edit" | "inquiries" | "security") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Handle Copy Storefront Link
  const handleCopyLink = () => {
    if (typeof window !== "undefined" && profile) {
      const storefrontUrl = `${window.location.origin}/${profile.slug || profile.id}`;
      navigator.clipboard.writeText(storefrontUrl);
      setIsCopied(true);
      toast.success("Storefront URL Copied!", {
        description: storefrontUrl,
      });
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/exporter/logout", { method: "POST" });
      if (typeof window !== "undefined") {
        localStorage.removeItem("exporter_user");
        localStorage.removeItem("exporter_token");
      }
      toast.success("Logged out successfully");
      router.push("/exporter/login");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Multi-select toggle helpers
  const toggleTargetMarket = (market: string) => {
    setFormData((prev) => ({
      ...prev,
      targetMarkets: prev.targetMarkets.includes(market)
        ? prev.targetMarkets.filter((m) => m !== market)
        : [...prev.targetMarkets, market],
    }));
  };

  const toggleCertification = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert],
    }));
  };

  // Handle Edit Profile Form Submission
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validations
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.companyName.trim()) errors.companyName = "Business name is required";
    if (!formData.country.trim()) errors.country = "Country of origin is required";
    if (!formData.postCode.trim()) errors.postCode = "Postal code is required";
    if (!formData.companyProfile.trim()) errors.companyProfile = "Company bio is required";
    else if (formData.companyProfile.trim().length < 20) errors.companyProfile = "Please provide at least 20 characters for your bio";

    const finalCategory =
      formData.productCategory === "Other (Specify Below)"
        ? formData.customCategory.trim()
        : formData.productCategory.trim();

    if (!finalCategory) {
      errors.productCategory = "Please select or specify a product category";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Form Validation Error", {
        description: "Please fill in all required fields accurately.",
      });
      return;
    }

    setFormErrors({});
    setIsSaving(true);

    try {
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
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
      };

      const res = await fetch("/api/exporter/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to update profile");
      }

      toast.success("Profile Updated Successfully!", {
        description: "Your business storefront and export profile have been updated live.",
      });

      if (data.seller) {
        setProfile(data.seller);
        syncFormDataWithProfile(data.seller);
        if (typeof window !== "undefined") {
          localStorage.setItem("exporter_user", JSON.stringify(data.seller));
        }
      }

      // Switch to overview tab to show updated profile
      setActiveTab("overview");
    } catch (err: any) {
      toast.error("Update Failed", {
        description: err.message || "An error occurred while saving your changes.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Change Password Form Submission
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Missing Password Fields", {
        description: "Please fill in current password, new password, and confirmation.",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Weak Password", {
        description: "New password must be at least 6 characters.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords Do Not Match", {
        description: "New password and confirmation password do not match.",
      });
      return;
    }

    setIsChangingPassword(true);

    try {
      const res = await fetch("/api/exporter/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to change password");
      }

      toast.success("Password Updated!", {
        description: "Your account password was changed successfully.",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error("Password Update Failed", {
        description: err.message || "Could not change password.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Calculate Profile Completeness Score
  const calculateCompleteness = (p: ExporterProfileData | null) => {
    if (!p) return 0;
    let score = 30; // base for registration
    if (p.website && p.website.length > 3) score += 15;
    if (p.yearEstablished) score += 10;
    if (p.exportCapacity) score += 15;
    if (p.targetMarkets && p.targetMarkets.length > 0) score += 15;
    if (p.certifications && p.certifications.length > 0) score += 15;
    return Math.min(100, score);
  };

  const completeness = calculateCompleteness(profile);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
        style={{ backgroundColor: "var(--canvas)" }}
      >
        <Loader2 className="w-8 h-8 text-[var(--brand-ochre)] animate-spin mb-3" />
        <h2 className="text-xl font-bold text-[var(--ink)]">Loading Your Exporter Portal...</h2>
        <p className="text-xs text-[var(--muted)] mt-1">Retrieving profile data and buyer inquiries</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
        style={{ backgroundColor: "var(--canvas)" }}
      >
        <div className="p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] max-w-md w-full shadow-sm space-y-4">
          <ShieldAlert className="w-12 h-12 text-amber-600 mx-auto" />
          <h2 className="text-2xl font-bold text-[var(--ink)]">Session Expired</h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
            Please sign in to access your exporter profile management portal and respond to buyer inquiries.
          </p>
          <Link
            href="/exporter/login?redirect=/exporter/profile"
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-[var(--ink)] no-underline"
            style={{ backgroundColor: "var(--brand-ochre)" }}
          >
            <span>Sign In to Exporter Portal</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const isVerified = (profile.status || "").toLowerCase() === "approved" || (profile.status || "").toLowerCase() === "verified";
  const storefrontSlug = profile.slug || profile.id;

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "var(--canvas)" }}>
      {/* ── Top Header Banner & Stats Bar ── */}
      <div className="border-b border-[var(--hairline)] bg-[var(--surface-card)]">
        <div className="section-wrap py-6 sm:py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Avatar & Company Info */}
            <div className="flex items-start sm:items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-extrabold text-[var(--ink)] border border-[var(--hairline)] shadow-sm shrink-0"
                style={{ backgroundColor: "var(--brand-ochre)" }}
              >
                {profile.companyName ? profile.companyName.slice(0, 2).toUpperCase() : "EX"}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight">
                    {profile.companyName}
                  </h1>

                  {isVerified ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Exporter
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Pending Verification
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--muted)]">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {profile.fullName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {profile.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {profile.country}
                  </span>
                  <span className="font-mono text-[var(--ink)] font-semibold">
                    ID: {profile.id}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href={`/${storefrontSlug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] hover:bg-[var(--surface-soft)] transition-colors no-underline shadow-sm"
              >
                <Globe className="w-3.5 h-3.5 text-[var(--muted)]" />
                <span>View Public Storefront</span>
                <ExternalLink className="w-3 h-3 text-[var(--muted)]" />
              </Link>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] hover:border-[var(--ink)] transition-colors cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Link</span>
                  </>
                )}
              </button>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer disabled:opacity-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Verification Notice Banner if Pending */}
          {!isVerified && (
            <div className="mt-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Your exporter profile is currently under review by Goexports compliance.</strong> You can edit your profile details below at any time to speed up verification.
                </span>
              </div>
              <button
                onClick={() => handleTabChange("edit")}
                className="px-3 py-1 rounded-lg font-bold bg-amber-200 hover:bg-amber-300 text-amber-900 border-none cursor-pointer text-[11px] shrink-0"
              >
                Complete Profile →
              </button>
            </div>
          )}
        </div>

        {/* ── Navigation Tabs ── */}
        <div className="border-t border-[var(--hairline)]">
          <div className="section-wrap flex items-center gap-1 overflow-x-auto py-2">
            <button
              onClick={() => handleTabChange("overview")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border-none cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === "overview"
                  ? "bg-[var(--ink)] text-white shadow-sm"
                  : "bg-transparent text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--canvas)]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Profile Overview</span>
            </button>

            <button
              onClick={() => handleTabChange("edit")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border-none cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === "edit"
                  ? "bg-[var(--ink)] text-white shadow-sm"
                  : "bg-transparent text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--canvas)]"
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit & Submit Profile</span>
              <span className="w-2 h-2 rounded-full bg-[var(--brand-ochre)]" />
            </button>

            <button
              onClick={() => handleTabChange("inquiries")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border-none cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === "inquiries"
                  ? "bg-[var(--ink)] text-white shadow-sm"
                  : "bg-transparent text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--canvas)]"
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Buyer RFQs & Inquiries</span>
              {inquiries.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--brand-ochre)] text-[var(--ink)]">
                  {inquiries.length}
                </span>
              )}
            </button>

            <button
              onClick={() => handleTabChange("security")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border-none cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === "security"
                  ? "bg-[var(--ink)] text-white shadow-sm"
                  : "bg-transparent text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--canvas)]"
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Account Security</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Tab Content ── */}
      <div className="section-wrap py-8">
        {/* ══════════════════════════════════════════
            TAB 1: PROFILE OVERVIEW & PREVIEW
            ══════════════════════════════════════════ */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Top Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                  <span className="font-semibold uppercase tracking-wider">Profile Completeness</span>
                  <Sparkles className="w-4 h-4 text-[var(--brand-ochre)]" />
                </div>
                <div className="text-2xl font-bold text-[var(--ink)]">{completeness}%</div>
                <div className="w-full bg-[var(--hairline)] h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${completeness}%`,
                      backgroundColor: completeness >= 80 ? "#22c55e" : "var(--brand-ochre)",
                    }}
                  />
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                  <span className="font-semibold uppercase tracking-wider">Verification Status</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-xl font-bold text-[var(--ink)] capitalize">
                  {profile.status || "Pending"}
                </div>
                <p className="text-[11px] text-[var(--muted)] m-0">
                  {isVerified ? "Direct inquiries enabled" : "Under review by Goexports"}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                  <span className="font-semibold uppercase tracking-wider">Product Category</span>
                  <Building2 className="w-4 h-4 text-sky-600" />
                </div>
                <div className="text-sm font-bold text-[var(--ink)] truncate">
                  {profile.productCategory}
                </div>
                <p className="text-[11px] text-[var(--muted)] m-0 truncate">
                  Capacity: {profile.exportCapacity || "Not set"}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                  <span className="font-semibold uppercase tracking-wider">Buyer Inquiries</span>
                  <Inbox className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-[var(--ink)]">{inquiries.length}</div>
                <button
                  onClick={() => handleTabChange("inquiries")}
                  className="text-[11px] font-semibold text-[var(--ink)] hover:underline border-none bg-transparent p-0 cursor-pointer text-left"
                >
                  View incoming leads →
                </button>
              </div>
            </div>

            {/* Profile Overview Card & Quick Edit CTA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Business Bio & Export Highlights */}
              <div className="lg:col-span-8 space-y-6">
                {/* Company Bio */}
                <div className="p-6 sm:p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
                    <h2 className="text-lg font-bold text-[var(--ink)] flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[var(--brand-ochre)]" />
                      Company Overview & Bio
                    </h2>
                    <button
                      onClick={() => handleTabChange("edit")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] hover:bg-[var(--surface-soft)] transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Bio</span>
                    </button>
                  </div>
                  <div className="text-sm text-[var(--body)] leading-relaxed whitespace-pre-line">
                    {profile.companyProfile}
                  </div>
                </div>

                {/* Target Export Markets */}
                <div className="p-6 sm:p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
                    <h3 className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
                      <Globe className="w-5 h-5 text-sky-600" />
                      Target Export Geographies
                    </h3>
                    <button
                      onClick={() => handleTabChange("edit")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)] border-none bg-transparent cursor-pointer"
                    >
                      Edit Markets
                    </button>
                  </div>

                  {profile.targetMarkets && profile.targetMarkets.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.targetMarkets.map((market, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--canvas)] border border-[var(--hairline)] text-[var(--ink)] shadow-2xs"
                        >
                          {market}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[var(--muted)] italic">
                      No target markets selected yet. Click Edit to add target export regions.
                    </p>
                  )}
                </div>

                {/* Certifications */}
                <div className="p-6 sm:p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
                    <h3 className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-600" />
                      Quality & Compliance Certifications
                    </h3>
                    <button
                      onClick={() => handleTabChange("edit")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)] border-none bg-transparent cursor-pointer"
                    >
                      Edit Certifications
                    </button>
                  </div>

                  {profile.certifications && profile.certifications.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {profile.certifications.map((cert, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] flex items-center gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-xs font-bold text-[var(--ink)]">{cert}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[var(--muted)] italic">
                      No certifications listed. Adding ISO, CE, or FDA certifications increases buyer RFQs.
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Business Summary Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                      Business Details
                    </h3>
                    <button
                      onClick={() => handleTabChange("edit")}
                      className="text-xs font-semibold text-[var(--ink)] hover:underline border-none bg-transparent cursor-pointer p-0"
                    >
                      Edit →
                    </button>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div>
                      <span className="text-[var(--muted)] block">Business Name</span>
                      <span className="font-bold text-[var(--ink)] text-sm">{profile.companyName}</span>
                    </div>

                    <div>
                      <span className="text-[var(--muted)] block">Primary Product Category</span>
                      <span className="font-semibold text-[var(--ink)]">{profile.productCategory}</span>
                    </div>

                    <div>
                      <span className="text-[var(--muted)] block">Country & Location</span>
                      <span className="font-semibold text-[var(--ink)]">
                        {profile.country} {profile.postCode ? `(${profile.postCode})` : ""}
                      </span>
                    </div>

                    {profile.yearEstablished && (
                      <div>
                        <span className="text-[var(--muted)] block">Established Year</span>
                        <span className="font-semibold text-[var(--ink)]">{profile.yearEstablished}</span>
                      </div>
                    )}

                    {profile.exportCapacity && (
                      <div>
                        <span className="text-[var(--muted)] block">Export Capacity</span>
                        <span className="font-semibold text-[var(--ink)]">{profile.exportCapacity}</span>
                      </div>
                    )}

                    <div>
                      <span className="text-[var(--muted)] block">Primary Representative</span>
                      <span className="font-semibold text-[var(--ink)]">{profile.fullName}</span>
                    </div>

                    <div>
                      <span className="text-[var(--muted)] block">Official Email</span>
                      <span className="font-semibold text-[var(--ink)]">{profile.email}</span>
                    </div>

                    <div>
                      <span className="text-[var(--muted)] block">Direct Phone</span>
                      <span className="font-semibold text-[var(--ink)]">{profile.phone}</span>
                    </div>

                    {profile.website && (
                      <div>
                        <span className="text-[var(--muted)] block">Website</span>
                        <a
                          href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[var(--ink)] underline hover:text-[var(--brand-ochre)] truncate block"
                        >
                          {profile.website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleTabChange("edit")}
                      className="w-full py-3 rounded-xl font-bold text-xs text-[var(--ink)] flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.99] border-none shadow-sm"
                      style={{ backgroundColor: "var(--brand-ochre)" }}
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit My Exporter Profile</span>
                    </button>
                  </div>
                </div>

                {/* Direct Storefront Access Card */}
                <div className="p-6 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-soft)] space-y-3 text-xs shadow-2xs">
                  <div className="flex items-center gap-2 font-bold text-[var(--ink)]">
                    <Globe className="w-4 h-4 text-sky-600" />
                    <span>Your Public Storefront</span>
                  </div>
                  <p className="text-[var(--muted)] leading-relaxed m-0">
                    Buyers from across the world discover and send RFQs to your public link:
                  </p>
                  <div className="p-2.5 rounded-xl bg-[var(--canvas)] border border-[var(--hairline)] font-mono text-[11px] text-[var(--ink)] truncate">
                    /{storefrontSlug}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Link
                      href={`/${storefrontSlug}`}
                      target="_blank"
                      className="flex-1 py-2 rounded-xl text-center font-bold text-xs text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] hover:bg-[var(--surface-card)] no-underline"
                    >
                      Preview Storefront ↗
                    </Link>
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] hover:bg-[var(--surface-card)] cursor-pointer"
                    >
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB 2: EDIT & SUBMIT PROFILE FORM
            ══════════════════════════════════════════ */}
        {activeTab === "edit" && (
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSaveProfile} className="space-y-8">
              {/* Card 1: Representative & Contact Information */}
              <div className="p-6 sm:p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-6 shadow-sm">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-ochre)] text-[var(--ink)] mb-2">
                    <User className="w-3.5 h-3.5" />
                    Section 1: Contact Details
                  </div>
                  <h2 className="text-xl font-bold text-[var(--ink)]">
                    Primary Exporter Representative
                  </h2>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Details of the primary business contact handling export inquiries and buyer communication.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Full Representative Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Alexander Wright"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 20 7946 0958"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Registered Work Email
                    </label>
                    <input
                      type="email"
                      disabled
                      value={formData.email}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--surface-soft)] text-sm text-[var(--muted)] cursor-not-allowed opacity-80"
                    />
                    <p className="text-[11px] text-[var(--muted)] mt-1">
                      Your registered account email used for portal login and buyer RFQ delivery.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Company & Business Information */}
              <div className="p-6 sm:p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-6 shadow-sm">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-ochre)] text-[var(--ink)] mb-2">
                    <Building2 className="w-3.5 h-3.5" />
                    Section 2: Business & Origin
                  </div>
                  <h2 className="text-xl font-bold text-[var(--ink)]">
                    Company Information & Location
                  </h2>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Your official company brand and registered country of export origin.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Business / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Apex Global Industries Ltd."
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                    {formErrors.companyName && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Country of Origin *
                    </label>
                    <input
                      type="text"
                      list="country-options"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Select or enter country"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                    <datalist id="country-options">
                      {COMMON_COUNTRIES.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                    {formErrors.country && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.country}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      ZIP / Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postCode}
                      onChange={(e) => setFormData({ ...formData, postCode: e.target.value })}
                      placeholder="e.g. EC1A 1BB"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                    {formErrors.postCode && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.postCode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Official Website
                    </label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://yourcompany.com"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Year Established
                    </label>
                    <input
                      type="number"
                      min="1800"
                      max={new Date().getFullYear()}
                      value={formData.yearEstablished}
                      onChange={(e) => setFormData({ ...formData, yearEstablished: e.target.value })}
                      placeholder="e.g. 2012"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                  </div>
                </div>
              </div>

              {/* Card 3: Export Capabilities & Company Bio */}
              <div className="p-6 sm:p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-6 shadow-sm">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-ochre)] text-[var(--ink)] mb-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Section 3: Export Capabilities
                  </div>
                  <h2 className="text-xl font-bold text-[var(--ink)]">
                    Products & Export Profile Bio
                  </h2>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Describe your primary product line and production/export capacity.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Primary Product Category *
                    </label>
                    <select
                      value={formData.productCategory}
                      onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    >
                      <option value="">Select Category...</option>
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {formErrors.productCategory && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.productCategory}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Monthly Export Capacity
                    </label>
                    <input
                      type="text"
                      value={formData.exportCapacity}
                      onChange={(e) => setFormData({ ...formData, exportCapacity: e.target.value })}
                      placeholder="e.g. 5 Containers / 50,000 Units"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                  </div>

                  {formData.productCategory === "Other (Specify Below)" && (
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                        Specify Custom Category *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customCategory}
                        onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                        placeholder="e.g. Marine Hardware & Rigging"
                        className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                      />
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-[var(--ink)]">
                        Company Bio & Export Profile *
                      </label>
                      <span className="text-[11px] text-[var(--muted)]">
                        {formData.companyProfile.length} characters
                      </span>
                    </div>
                    <textarea
                      required
                      rows={5}
                      value={formData.companyProfile}
                      onChange={(e) => setFormData({ ...formData, companyProfile: e.target.value })}
                      placeholder="Provide a detailed overview of your manufacturing capabilities, product offerings, quality standards, and export track record..."
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)] leading-relaxed"
                    />
                    {formErrors.companyProfile && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.companyProfile}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 4: Target Export Geographies */}
              <div className="p-6 sm:p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-4 shadow-sm">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-ochre)] text-[var(--ink)] mb-2">
                    <Globe className="w-3.5 h-3.5" />
                    Section 4: Geographies
                  </div>
                  <h2 className="text-xl font-bold text-[var(--ink)]">
                    Target Export Markets
                  </h2>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Select the key international regions where you actively export or seek distribution partners.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2">
                  {TARGET_MARKET_OPTIONS.map((market) => {
                    const isSelected = formData.targetMarkets.includes(market);
                    return (
                      <button
                        type="button"
                        key={market}
                        onClick={() => toggleTargetMarket(market)}
                        className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-[var(--ink)] text-white border-[var(--ink)] shadow-2xs"
                            : "bg-[var(--canvas)] text-[var(--ink)] border-[var(--hairline)] hover:bg-[var(--surface-soft)]"
                        }`}
                      >
                        <span>{market}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[var(--brand-ochre)] shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card 5: Quality & Compliance Certifications */}
              <div className="p-6 sm:p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-4 shadow-sm">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-ochre)] text-[var(--ink)] mb-2">
                    <Award className="w-3.5 h-3.5" />
                    Section 5: Compliance
                  </div>
                  <h2 className="text-xl font-bold text-[var(--ink)]">
                    Quality & Standards Certifications
                  </h2>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Check all active certifications held by your company to build buyer confidence.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  {CERTIFICATION_OPTIONS.map((cert) => {
                    const isSelected = formData.certifications.includes(cert);
                    return (
                      <button
                        type="button"
                        key={cert}
                        onClick={() => toggleCertification(cert)}
                        className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-emerald-800 text-white border-emerald-900 shadow-2xs"
                            : "bg-[var(--canvas)] text-[var(--ink)] border-[var(--hairline)] hover:bg-[var(--surface-soft)]"
                        }`}
                      >
                        <span>{cert}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Submission Action Bar */}
              <div className="p-6 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <button
                  type="button"
                  onClick={() => {
                    if (profile) syncFormDataWithProfile(profile);
                    setActiveTab("overview");
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-[var(--muted)] hover:text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] cursor-pointer transition-colors"
                >
                  Discard Changes
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-[var(--ink)] border-none cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-[0.99] disabled:opacity-50"
                  style={{ backgroundColor: "var(--brand-ochre)" }}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Profile Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save & Submit Profile Updates</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB 3: BUYER RFQs & INQUIRIES
            ══════════════════════════════════════════ */}
        {activeTab === "inquiries" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[var(--ink)] flex items-center gap-2">
                  <Inbox className="w-6 h-6 text-[var(--brand-ochre)]" />
                  Buyer Inquiries & Direct RFQs
                </h2>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Direct inquiries received from international buyers visiting your Goexports storefront.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--surface-card)] border border-[var(--hairline)] text-[var(--ink)]">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>0% Commission • 100% Direct</span>
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[var(--surface-soft)] border border-[var(--hairline)] flex items-center justify-center mx-auto text-[var(--muted)]">
                  <Inbox className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[var(--ink)]">No Buyer Inquiries Yet</h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
                  As international buyers discover your exporter profile, their inquiries, quotation requests, and sample requests will appear here instantly.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href={`/${storefrontSlug}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-[var(--ink)] no-underline shadow-sm"
                    style={{ backgroundColor: "var(--brand-ochre)" }}
                  >
                    <span>View Public Storefront</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleTabChange("edit")}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Optimize Profile</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => {
                  const cleanBuyerPhone = (inq.buyerPhone || "").replace(/[^0-9]/g, "");
                  const mailtoUrl = `mailto:${inq.buyerEmail}?subject=${encodeURIComponent(
                    `Re: Inquiry for ${profile.companyName} on Goexports`
                  )}`;
                  const whatsappUrl = cleanBuyerPhone
                    ? `https://wa.me/${cleanBuyerPhone}?text=${encodeURIComponent(
                        `Hello ${inq.buyerName}, thank you for your inquiry on Goexports regarding ${profile.companyName}.`
                      )}`
                    : null;

                  return (
                    <div
                      key={inq.id}
                      className="p-6 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-4 shadow-sm hover:border-[var(--brand-ochre)] transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--hairline)] pb-3">
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--brand-ochre)] text-[var(--ink)] mr-2">
                            {inq.inquiryType || "RFQ"}
                          </span>
                          <span className="text-base font-bold text-[var(--ink)]">
                            {inq.buyerName}
                          </span>
                          {inq.buyerCountry && (
                            <span className="text-xs text-[var(--muted)] ml-2">
                              • {inq.buyerCountry}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-[var(--muted)] block">Work Email:</span>
                          <span className="font-semibold text-[var(--ink)]">{inq.buyerEmail}</span>
                        </div>
                        <div>
                          <span className="text-[var(--muted)] block">Phone / WhatsApp:</span>
                          <span className="font-semibold text-[var(--ink)]">
                            {inq.buyerPhone || "Not provided"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[var(--muted)] block">Requested Quantity:</span>
                          <span className="font-semibold text-[var(--ink)]">
                            {inq.quantity || "Not specified"}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[var(--canvas)] border border-[var(--hairline)] text-xs text-[var(--body)] leading-relaxed whitespace-pre-line">
                        {inq.message}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                          href={mailtoUrl}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[var(--ink)] no-underline shadow-2xs"
                          style={{ backgroundColor: "var(--brand-ochre)" }}
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply via Email</span>
                        </a>

                        {whatsappUrl && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 no-underline transition-colors shadow-2xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Reply on WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB 4: ACCOUNT SECURITY & PASSWORD
            ══════════════════════════════════════════ */}
        {activeTab === "security" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-6 shadow-sm">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-ochre)] text-[var(--ink)] mb-2">
                  <Lock className="w-3.5 h-3.5" />
                  Security Settings
                </div>
                <h2 className="text-xl font-bold text-[var(--ink)]">
                  Change Account Password
                </h2>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Ensure your exporter portal account uses a strong, unique password.
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Current Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords ? "text" : "password"}
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full pl-4 pr-11 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)] border-none bg-transparent cursor-pointer p-1"
                    >
                      {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    New Password * (min 6 characters)
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Confirm New Password *
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-[var(--ink)] border-none cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-[0.99] disabled:opacity-50"
                    style={{ backgroundColor: "var(--brand-ochre)" }}
                  >
                    {isChangingPassword ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Update Password</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Session Information */}
            <div className="p-6 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-soft)] space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-[var(--ink)]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Encrypted Exporter Session</span>
              </div>
              <p className="text-[var(--muted)] leading-relaxed m-0">
                Your portal session is secured with 256-bit SSL encryption. Logging out terminates active tokens across devices.
              </p>
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-rose-700 hover:underline border-none bg-transparent cursor-pointer p-0"
              >
                Sign out of all sessions →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
