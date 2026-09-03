"use client";

import { useState, useEffect, useTransition, useMemo } from "react";
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
  ChevronRight,
  Package,
  Plus,
  Trash2,
  UploadCloud,
  ImageIcon,
  X,
  Tag,
  Layers,
  UserCheck,
  Radio,
  PhoneCall,
  Filter,
  Search,
  ChevronLeft,
  ArrowUpDown,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";

export interface ExporterProduct {
  id: string;
  title: string;
  description?: string;
  category?: string;
  price?: string;
  moq?: string;
  imageUrl?: string;
  imageKey?: string;
  images?: string[];
  createdAt?: string;
}

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
  logoUrl?: string;
  logoKey?: string;
  products?: ExporterProduct[];
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
  engagementMode?: string;
  status?: string;
  callingDate?: string;
  callingPerson?: string;
  assignedTo?: string;
  assignedCompany?: string;
  message: string;
  createdAt: string;
  isAssigned?: boolean;
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

  const [activeTab, setActiveTab] = useState<"overview" | "products" | "edit" | "inquiries" | "security">(
    (initialTab as any) || "overview"
  );

  const [profile, setProfile] = useState<ExporterProfileData | null>(initialProfile || null);
  const [products, setProducts] = useState<ExporterProduct[]>(initialProfile?.products || []);
  const [inquiries, setInquiries] = useState<BuyerInquiry[]>(initialInquiries);
  // Inquiry Search, Filters, Sorting & Pagination State
  const [inquirySearchQuery, setInquirySearchQuery] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");
  const [inquiryEngagementFilter, setInquiryEngagementFilter] = useState("all");
  const [inquirySortOrder, setInquirySortOrder] = useState<"latest" | "oldest">("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage, setLeadsPerPage] = useState(6);

  const [isLoading, setIsLoading] = useState(!initialProfile);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const filteredAndSortedInquiries = useMemo(() => {
    let list = inquiries.filter((inq) => {
      // Status filter
      if (inquiryStatusFilter !== "all" && (inq.status || "To be Called") !== inquiryStatusFilter) return false;

      // Engagement mode filter
      if (inquiryEngagementFilter !== "all" && (inq.engagementMode || "") !== inquiryEngagementFilter) return false;

      // Search query
      if (inquirySearchQuery.trim()) {
        const q = inquirySearchQuery.toLowerCase();
        const matches =
          inq.buyerName?.toLowerCase().includes(q) ||
          inq.buyerEmail?.toLowerCase().includes(q) ||
          inq.buyerPhone?.toLowerCase().includes(q) ||
          inq.buyerCountry?.toLowerCase().includes(q) ||
          inq.inquiryType?.toLowerCase().includes(q) ||
          inq.engagementMode?.toLowerCase().includes(q) ||
          inq.status?.toLowerCase().includes(q) ||
          inq.callingPerson?.toLowerCase().includes(q) ||
          inq.message?.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });

    // Default sort: Latest to Oldest
    list.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime() || 0;
      const dateB = new Date(b.createdAt).getTime() || 0;
      return inquirySortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });

    return list;
  }, [inquiries, inquiryStatusFilter, inquiryEngagementFilter, inquirySearchQuery, inquirySortOrder]);

  const totalPages = Math.ceil(filteredAndSortedInquiries.length / leadsPerPage) || 1;
  const paginatedInquiries = filteredAndSortedInquiries.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [inquirySearchQuery, inquiryStatusFilter, inquiryEngagementFilter, inquirySortOrder, leadsPerPage]);

  // Product Management State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ExporterProduct | null>(null);
  const [productForm, setProductForm] = useState({
    title: "",
    description: "",
    category: "",
    customCategory: "",
    price: "",
    moq: "",
    imageUrl: "",
    imageKey: "",
    images: [] as string[],
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

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
    logoUrl: initialProfile?.logoUrl || "",
    logoKey: initialProfile?.logoKey || "",
  });

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Delete Profile State
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteProfile = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch("/api/exporter/profile", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete profile");
      }
      if (typeof window !== "undefined") {
        localStorage.removeItem("exporter_user");
        localStorage.removeItem("exporter_token");
      }
      toast.success("Profile Deleted", {
        description: "Your exporter profile has been deleted permanently.",
      });
      router.push("/");
      router.refresh();
    } catch (err: any) {
      toast.error("Delete Failed", {
        description: err.message || "Could not delete profile.",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

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
      logoUrl: data.logoUrl || "",
      logoKey: data.logoKey || "",
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
        if (Array.isArray(data.seller.products)) {
          setProducts(data.seller.products);
        }
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

  // Product Catalog Handlers
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    const defaultCat = profile?.productCategory || CATEGORY_OPTIONS[0];
    const isCustomCat = !CATEGORY_OPTIONS.includes(defaultCat);
    setProductForm({
      title: "",
      description: "",
      category: isCustomCat ? "Other (Specify Below)" : defaultCat,
      customCategory: isCustomCat ? defaultCat : "",
      price: "",
      moq: "",
      imageUrl: "",
      imageKey: "",
      images: [],
    });
    setIsProductModalOpen(true);
    setTimeout(() => {
      const el = document.getElementById("product-form-card");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  const handleOpenEditProduct = (prod: ExporterProduct) => {
    setEditingProduct(prod);
    const rawCat = prod.category || profile?.productCategory || CATEGORY_OPTIONS[0];
    const isCustomCat = !CATEGORY_OPTIONS.includes(rawCat);
    const existingImages = Array.isArray(prod.images) && prod.images.length > 0
      ? prod.images
      : prod.imageUrl ? [prod.imageUrl] : [];

    setProductForm({
      title: prod.title || "",
      description: prod.description || "",
      category: isCustomCat ? "Other (Specify Below)" : rawCat,
      customCategory: isCustomCat ? rawCat : "",
      price: prod.price || "",
      moq: prod.moq || "",
      imageUrl: prod.imageUrl || existingImages[0] || "",
      imageKey: prod.imageKey || "",
      images: existingImages,
    });
    setIsProductModalOpen(true);
    setTimeout(() => {
      const el = document.getElementById("product-form-card");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    for (const file of fileList) {
      if (!file.type.startsWith("image/")) {
        toast.error("Invalid Image File", {
          description: `${file.name} is not a valid image file.`,
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File Too Large", {
          description: `${file.name} exceeds the 5MB size limit.`,
        });
        return;
      }
    }

    setIsUploadingImage(true);
    const uploadedUrls: string[] = [];
    let firstFileId = "";

    try {
      for (const file of fileList) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("type", "product");

        const res = await fetch("/api/exporter/upload-image", {
          method: "POST",
          body: fd,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || data.error || `Failed to upload ${file.name}`);
        }

        if (data.url) {
          uploadedUrls.push(data.url);
          if (!firstFileId && data.fileId) firstFileId = data.fileId;
        }
      }

      setProductForm((prev) => {
        const prevImgs = Array.isArray(prev.images) ? prev.images : (prev.imageUrl ? [prev.imageUrl] : []);
        const combined = [...prevImgs, ...uploadedUrls];
        return {
          ...prev,
          images: combined,
          imageUrl: prev.imageUrl || combined[0] || "",
          imageKey: prev.imageKey || firstFileId,
        };
      });

      toast.success(
        fileList.length === 1 ? "Product Image Uploaded!" : `${fileList.length} Images Uploaded Successfully!`,
        {
          description: "Photos are uploaded via ImageKit and added to your product gallery.",
        }
      );
    } catch (err: any) {
      toast.error("Upload Failed", {
        description: err.message || "An error occurred while uploading product image(s).",
      });
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleSetPrimaryProductImage = (imgUrl: string) => {
    setProductForm((prev) => {
      const filtered = prev.images.filter((img) => img !== imgUrl);
      return {
        ...prev,
        imageUrl: imgUrl,
        images: [imgUrl, ...filtered],
      };
    });
    toast.success("Primary Cover Image Updated", {
      description: "This photo will be displayed as the main catalog image.",
    });
  };

  const handleRemoveProductImage = (indexToRemove: number) => {
    setProductForm((prev) => {
      const updatedImages = prev.images.filter((_, idx) => idx !== indexToRemove);
      const newPrimary = updatedImages.length > 0
        ? (prev.imageUrl === prev.images[indexToRemove] ? updatedImages[0] : prev.imageUrl)
        : "";
      return {
        ...prev,
        images: updatedImages,
        imageUrl: newPrimary,
      };
    });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid Image File", {
        description: "Please select a valid image file (PNG, JPG, WEBP, SVG).",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File Too Large", {
        description: "Company logo file size must be 5MB or less.",
      });
      return;
    }

    setIsUploadingLogo(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("type", "logo");

      const res = await fetch("/api/exporter/upload-image", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to upload company logo");
      }

      setFormData((prev) => ({
        ...prev,
        logoUrl: data.url,
        logoKey: data.fileId || "",
      }));

      if (profile) {
        setProfile({
          ...profile,
          logoUrl: data.url,
          logoKey: data.fileId || "",
        });
      }

      toast.success("Logo Uploaded Successfully!", {
        description: "Company logo uploaded via ImageKit. Click 'Save Changes' to update profile.",
      });
    } catch (err: any) {
      toast.error("Logo Upload Failed", {
        description: err.message || "An error occurred while uploading company logo.",
      });
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productForm.title.trim()) {
      toast.error("Missing Product Title", {
        description: "Please enter a title for your product.",
      });
      return;
    }

    const finalCategory =
      productForm.category === "Other (Specify Below)"
        ? productForm.customCategory.trim()
        : productForm.category.trim();

    if (!finalCategory) {
      toast.error("Missing Category", {
        description: "Please select or specify a category for your product.",
      });
      return;
    }

    setIsSavingProduct(true);

    try {
      const isEdit = !!editingProduct;
      const url = isEdit
        ? `/api/exporter/products?id=${editingProduct.id}`
        : "/api/exporter/products";
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        title: productForm.title.trim(),
        description: productForm.description.trim(),
        category: finalCategory,
        price: productForm.price.trim(),
        moq: productForm.moq.trim(),
        imageUrl: productForm.imageUrl.trim() || (productForm.images[0] || ""),
        imageKey: productForm.imageKey.trim(),
        images: productForm.images,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to save product");
      }

      toast.success(isEdit ? "Product Updated!" : "Product Added to Catalog!", {
        description: `${productForm.title} is now visible on your storefront.`,
      });

      if (data.products) {
        setProducts(data.products);
        if (profile) {
          setProfile({ ...profile, products: data.products });
        }
      }

      setIsProductModalOpen(false);
      setEditingProduct(null);
      setProductForm({
        title: "",
        description: "",
        category: "",
        customCategory: "",
        price: "",
        moq: "",
        imageUrl: "",
        imageKey: "",
        images: [],
      });
    } catch (err: any) {
      toast.error("Save Failed", {
        description: err.message || "Could not save product.",
      });
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    setDeletingProductId(productId);
    try {
      const res = await fetch(`/api/exporter/products?id=${productId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to delete product");
      }

      toast.success("Product Deleted", {
        description: "The product was removed from your catalog.",
      });

      if (data.products) {
        setProducts(data.products);
        if (profile) {
          setProfile({ ...profile, products: data.products });
        }
      }
    } catch (err: any) {
      toast.error("Delete Failed", {
        description: err.message || "Could not delete product.",
      });
    } finally {
      setDeletingProductId(null);
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
  const handleTabChange = (tab: "overview" | "products" | "edit" | "inquiries" | "security") => {
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
        logoUrl: formData.logoUrl,
        logoKey: formData.logoKey,
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
              <div className="relative shrink-0">
                {profile.logoUrl ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-[var(--hairline)] p-1.5 shadow-sm flex items-center justify-center overflow-hidden">
                    <img
                      src={profile.logoUrl}
                      alt={profile.companyName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-xl font-extrabold text-[var(--ink)] border border-[var(--hairline)] shadow-sm shrink-0"
                    style={{ backgroundColor: "var(--brand-ochre)" }}
                  >
                    {profile.companyName ? profile.companyName.slice(0, 2).toUpperCase() : "EX"}
                  </div>
                )}
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
              onClick={() => handleTabChange("products")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border-none cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === "products"
                  ? "bg-[var(--ink)] text-white shadow-sm"
                  : "bg-transparent text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--canvas)]"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Manage Products</span>
              {products.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--brand-ochre)] text-[var(--ink)]">
                  {products.length}
                </span>
              )}
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
              <span>Buyer RFQs & Leads</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                  <span className="font-semibold uppercase tracking-wider">Products Listed</span>
                  <Package className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-[var(--ink)]">
                  {products.length}
                </div>
                <button
                  onClick={() => handleTabChange("products")}
                  className="text-[11px] font-semibold text-[var(--ink)] hover:underline border-none bg-transparent p-0 cursor-pointer text-left"
                >
                  Manage catalog →
                </button>
              </div>

              <div className="p-5 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                  <span className="font-semibold uppercase tracking-wider">Buyer Leads & RFQs</span>
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
            TAB: PRODUCT CATALOG & IMAGEKIT MANAGEMENT
            ══════════════════════════════════════════ */}
        {activeTab === "products" && (
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header & Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] shadow-sm">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-ochre)] text-[var(--ink)] mb-2">
                  <Package className="w-3.5 h-3.5" />
                  <span>Product Catalog</span>
                </div>
                <h2 className="text-2xl font-bold text-[var(--ink)] tracking-tight">
                  Manage Exporter Product Catalog
                </h2>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Upload product images, specify bulk pricing & MOQs to display on your public storefront.
                </p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-[var(--ink)] border-none cursor-pointer shadow-sm hover:opacity-95 transition-all shrink-0"
                style={{ backgroundColor: "var(--brand-ochre)" }}
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* In-Page Inline Form Card for Add / Edit Product (Not Popup) */}
            {isProductModalOpen && (
              <div id="product-form-card" className="p-6 sm:p-8 rounded-3xl border-2 border-[var(--brand-ochre)] bg-[var(--surface-card)] shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[var(--brand-ochre)] text-[var(--ink)] flex items-center justify-center font-bold shadow-xs">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--ink)]">
                        {editingProduct ? "Edit Product Listing" : "Add New Product"}
                      </h3>
                      <p className="text-xs text-[var(--muted)] mt-0.5">
                        Fill out product specifications and upload product image.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsProductModalOpen(false);
                      setEditingProduct(null);
                    }}
                    className="p-2 rounded-xl text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--canvas)] border-none bg-transparent cursor-pointer"
                    title="Close form"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-[var(--ink)] mb-1">
                      Product Title / Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={productForm.title}
                      onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                      placeholder="e.g. Premium Organic Basmati Rice 1121 XXL"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[var(--ink)] mb-1">
                        Product Category *
                      </label>
                      <select
                        required
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                      >
                        <option value="">Select Category...</option>
                        {CATEGORY_OPTIONS.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-[var(--ink)] mb-1">
                        FOB Price / Range
                      </label>
                      <input
                        type="text"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        placeholder="e.g. $12.50 - $18.00 / Metric Ton"
                        className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                      />
                    </div>
                  </div>

                  {productForm.category === "Other (Specify Below)" && (
                    <div>
                      <label className="block font-bold text-[var(--ink)] mb-1">
                        Specify Custom Category *
                      </label>
                      <input
                        type="text"
                        required
                        value={productForm.customCategory}
                        onChange={(e) => setProductForm({ ...productForm, customCategory: e.target.value })}
                        placeholder="e.g. Marine Hardware & Rigging"
                        className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block font-bold text-[var(--ink)] mb-1">
                      Minimum Order Quantity (MOQ)
                    </label>
                    <input
                      type="text"
                      value={productForm.moq}
                      onChange={(e) => setProductForm({ ...productForm, moq: e.target.value })}
                      placeholder="e.g. 1 FCL (20ft Container) / 500 Pieces"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[var(--ink)] mb-1">
                      Detailed Product Description
                    </label>
                    <textarea
                      rows={3}
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      placeholder="Describe specifications, grade, packaging types, shelf life, or origin..."
                      className="w-full px-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)] leading-relaxed"
                    />
                  </div>

                  {/* Amazon-Style Product Photo Boxes */}
                  <div className="space-y-3 pt-3 border-t border-[var(--hairline)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block font-bold text-[var(--ink)] text-sm">
                          Product Photos
                        </label>
                        <p className="text-[11px] text-[var(--muted)] m-0 mt-0.5">
                          Add up to 9 photos · First photo is the cover image · PNG, JPG, WEBP up to 5MB each
                        </p>
                      </div>
                      {isUploadingImage && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span className="text-xs font-bold">Uploading...</span>
                        </div>
                      )}
                    </div>

                    {/* Photo Slot Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                      {/* Filled image slots */}
                      {productForm.images.map((imgUrl, idx) => {
                        const isPrimary = (productForm.imageUrl === imgUrl) || (!productForm.imageUrl && idx === 0);
                        return (
                          <div
                            key={idx}
                            className={`relative group aspect-square rounded-xl border-2 overflow-hidden bg-slate-50 transition-all ${
                              isPrimary
                                ? "border-amber-400 ring-2 ring-amber-400/30"
                                : "border-[var(--hairline)] hover:border-[var(--brand-ochre)]"
                            }`}
                          >
                            <img
                              src={imgUrl}
                              alt={`Product photo ${idx + 1}`}
                              className="w-full h-full object-contain"
                            />

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[10px] flex flex-col items-center justify-center gap-1.5">
                              {!isPrimary && (
                                <button
                                  type="button"
                                  onClick={() => handleSetPrimaryProductImage(imgUrl)}
                                  className="px-2 py-1 rounded-lg text-[9px] font-extrabold bg-amber-400 text-[var(--ink)] cursor-pointer hover:bg-amber-300 transition-colors shadow-sm"
                                >
                                  ⭐ Set Cover
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveProductImage(idx)}
                                className="px-2 py-1 rounded-lg text-[9px] font-extrabold bg-rose-500 text-white cursor-pointer hover:bg-rose-600 transition-colors shadow-sm"
                              >
                                Remove
                              </button>
                            </div>

                            {/* Badges */}
                            {isPrimary && (
                              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wide bg-amber-400 text-[var(--ink)] shadow-xs leading-none">
                                Cover
                              </span>
                            )}
                            <span className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-black/50 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                              {idx + 1}
                            </span>
                          </div>
                        );
                      })}

                      {/* Add-Photo slot boxes (fill up to 9 total) */}
                      {productForm.images.length < 9 && (
                        <div className="relative aspect-square">
                          <div
                            className={`w-full h-full rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-1 cursor-pointer text-center ${
                              isUploadingImage
                                ? "border-amber-300 bg-amber-50 cursor-wait"
                                : "border-[var(--hairline)] bg-[var(--canvas)] hover:border-[var(--brand-ochre)] hover:bg-amber-50/40"
                            }`}
                          >
                            {isUploadingImage ? (
                              <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
                            ) : (
                              <>
                                <div className="w-7 h-7 rounded-full bg-[var(--surface-card)] border border-[var(--hairline)] flex items-center justify-center text-[var(--muted)]">
                                  <UploadCloud className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[9px] font-bold text-[var(--muted)] leading-tight px-1">
                                  {productForm.images.length === 0 ? "Add Cover Photo" : "Add Photo"}
                                </span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              disabled={isUploadingImage}
                              onChange={handleImageUpload}
                              className="absolute inset-0 w-full h-full opacity-0 disabled:cursor-not-allowed cursor-pointer"
                            />
                          </div>
                        </div>
                      )}

                      {/* Empty placeholder boxes to fill the row visually */}
                      {Array.from({
                        length: Math.max(0, Math.min(4, 9 - productForm.images.length - 1))
                      }).map((_, i) => (
                        <div
                          key={`empty-${i}`}
                          className="aspect-square rounded-xl border-2 border-dashed border-[var(--hairline)]/50 bg-[var(--canvas)]/50"
                        />
                      ))}
                    </div>

                    {productForm.images.length > 0 && (
                      <p className="text-[11px] text-[var(--muted)]">
                        <span className="font-bold text-[var(--ink)]">{productForm.images.length}</span> of 9 photos added · Hover a photo to set cover or remove
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--hairline)]">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProductModalOpen(false);
                        setEditingProduct(null);
                      }}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs text-[var(--muted)] bg-[var(--canvas)] border border-[var(--hairline)] cursor-pointer hover:text-[var(--ink)]"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSavingProduct || isUploadingImage}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs text-[var(--ink)] border-none cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50"
                      style={{ backgroundColor: "var(--brand-ochre)" }}
                    >
                      {isSavingProduct ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving Product...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>{editingProduct ? "Update Product" : "Save Product"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products List Grid */}
            {products.length === 0 ? (
              <div className="p-12 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[var(--surface-soft)] border border-[var(--hairline)] flex items-center justify-center mx-auto text-[var(--muted)]">
                  <Package className="w-8 h-8 text-[var(--brand-ochre)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--ink)]">No Products Added Yet</h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
                  Showcase your products with high-resolution images, MOQs, and FOB prices on your public storefront to attract international buyer RFQs.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleOpenAddProduct}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-[var(--ink)] border-none cursor-pointer shadow-sm"
                    style={{ backgroundColor: "var(--brand-ochre)" }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Your First Product</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="group rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-4/3 bg-[var(--canvas)] border-b border-[var(--hairline)] overflow-hidden flex items-center justify-center">
                        {prod.imageUrl ? (
                          <img
                            src={prod.imageUrl}
                            alt={prod.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-[var(--muted)] space-y-2 p-4 text-center">
                            <ImageIcon className="w-10 h-10 stroke-1 opacity-50" />
                            <span className="text-[11px] font-semibold">No Image Uploaded</span>
                          </div>
                        )}

                        {prod.category && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-[var(--ink)] text-white shadow-xs">
                            {prod.category}
                          </span>
                        )}

                      </div>

                      {/* Product Content */}
                      <div className="p-5 space-y-3">
                        <h3 className="text-base font-bold text-[var(--ink)] line-clamp-2 leading-snug">
                          {prod.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 text-xs">
                          {prod.price && (
                            <span className="px-2.5 py-1 rounded-xl font-bold bg-amber-50 text-amber-900 border border-amber-200">
                              💰 {prod.price}
                            </span>
                          )}
                          {prod.moq && (
                            <span className="px-2.5 py-1 rounded-xl font-bold bg-sky-50 text-sky-900 border border-sky-200">
                              📦 MOQ: {prod.moq}
                            </span>
                          )}
                        </div>

                        {prod.description && (
                          <p className="text-xs text-[var(--muted)] line-clamp-3 leading-relaxed m-0 pt-1">
                            {prod.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-4 border-t border-[var(--hairline)] bg-[var(--canvas)] flex items-center justify-between gap-2">
                      <Link
                        href={`/${profile.slug || profile.id}/products/${prod.id}`}
                        target="_blank"
                        className="py-2 px-3 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--surface-card)] border border-[var(--hairline)] hover:bg-[var(--surface-soft)] transition-colors no-underline flex items-center justify-center gap-1 shadow-2xs"
                        title="View Live Dedicated Product Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[var(--muted)]" />
                        <span>Live Page</span>
                      </Link>

                      <button
                        onClick={() => handleOpenEditProduct(prod)}
                        className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--surface-card)] border border-[var(--hairline)] hover:bg-[var(--surface-soft)] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        disabled={deletingProductId === prod.id}
                        className="py-2 px-3 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1"
                        title="Delete Product"
                      >
                        {deletingProductId === prod.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB 2: EDIT & SUBMIT PROFILE FORM
            ══════════════════════════════════════════ */}
        {activeTab === "edit" && (
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSaveProfile} className="space-y-8">
              {/* Card 0: Brand Identity & Logo Upload Card */}
              <div className="p-6 sm:p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--hairline)] pb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-ochre)] text-[var(--ink)] mb-2">
                      <ImageIcon className="w-3.5 h-3.5" />
                      Company Branding
                    </div>
                    <h2 className="text-xl font-bold text-[var(--ink)]">
                      Company Brand Logo
                    </h2>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      Upload your official company logo using ImageKit to appear on your verified public storefront and buyer inquiry cards.
                    </p>
                  </div>
                  {formData.logoUrl && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Logo Active
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* Logo Preview Avatar */}
                  <div className="relative group shrink-0">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl border-2 border-dashed border-[var(--hairline)] bg-[var(--canvas)] flex items-center justify-center overflow-hidden p-2 shadow-xs group-hover:border-[var(--brand-ochre)] transition-colors">
                      {formData.logoUrl ? (
                        <img
                          src={formData.logoUrl}
                          alt="Company Logo"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-center p-3 text-[var(--muted)] flex flex-col items-center gap-1.5">
                          <Building2 className="w-8 h-8 opacity-40" />
                          <span className="text-[10px] font-semibold">No Logo Uploaded</span>
                        </div>
                      )}
                    </div>

                    {formData.logoUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, logoUrl: "", logoKey: "" }));
                          if (profile) {
                            setProfile({ ...profile, logoUrl: "", logoKey: "" });
                          }
                        }}
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md border-2 border-white cursor-pointer transition-colors"
                        title="Remove Logo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-4 w-full">
                    <div>
                      <label className="block text-xs font-bold text-[var(--ink)] mb-1.5">
                        Upload Logo via ImageKit
                      </label>
                      <div className="flex flex-wrap items-center gap-3">
                        <label className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer shadow-xs transition-all ${
                          isUploadingLogo
                            ? "bg-[var(--surface-soft)] text-[var(--muted)] cursor-not-allowed"
                            : "bg-[var(--brand-ochre)] text-[var(--ink)] hover:opacity-90"
                        }`}>
                          {isUploadingLogo ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-[var(--ink)]" />
                              <span>Uploading to ImageKit...</span>
                            </>
                          ) : (
                            <>
                              <UploadCloud className="w-4 h-4" />
                              <span>{formData.logoUrl ? "Replace Logo via ImageKit" : "Upload Logo via ImageKit"}</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                            disabled={isUploadingLogo}
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                        </label>

                        {formData.logoUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, logoUrl: "", logoKey: "" }));
                              if (profile) {
                                setProfile({ ...profile, logoUrl: "", logoKey: "" });
                              }
                            }}
                            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 cursor-pointer transition-colors"
                          >
                            Remove Logo
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--muted)] mt-2">
                        Supported formats: PNG, JPG, WEBP, SVG. Max file size: 5MB. Transparent PNG recommended for best presentation.
                      </p>
                    </div>

                    {/* Direct Image URL input */}
                    <div className="pt-2 border-t border-[var(--hairline)]">
                      <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                        Or enter direct Image / CDN URL:
                      </label>
                      <input
                        type="url"
                        value={formData.logoUrl}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                        placeholder="https://ik.imagekit.io/goexports/logos/company-logo.png"
                        className="w-full px-3.5 py-2 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--brand-ochre)]"
                      />
                    </div>
                  </div>
                </div>
              </div>

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
            TAB 3: BUYER RFQs & LEADS
            ══════════════════════════════════════════ */}
        {activeTab === "inquiries" && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[var(--ink)] flex items-center gap-2">
                  <Inbox className="w-6 h-6 text-[var(--brand-ochre)]" />
                  Buyer Inquiries & Leads
                </h2>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Direct RFQs and buyer inquiries received for your export products.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--surface-card)] border border-[var(--hairline)] text-[var(--ink)]">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>0% Commission • 100% Direct Contact</span>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="p-4 sm:p-5 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] shadow-xs space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted)]" />
                  <input
                    type="text"
                    value={inquirySearchQuery}
                    onChange={(e) => setInquirySearchQuery(e.target.value)}
                    placeholder="Search name, country, specs..."
                    className="w-full rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] py-2 pl-9 pr-3 text-xs text-[var(--ink)] outline-none focus:border-[var(--brand-ochre)]"
                  />
                  {inquirySearchQuery && (
                    <button
                      onClick={() => setInquirySearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)] hover:text-[var(--ink)] border-none bg-transparent cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <div>
                  <select
                    value={inquiryStatusFilter}
                    onChange={(e) => setInquiryStatusFilter(e.target.value)}
                    className="w-full rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] py-2 px-3 text-xs text-[var(--ink)] outline-none focus:border-[var(--brand-ochre)]"
                  >
                    <option value="all">All Lead Statuses</option>
                    <option value="Direct Qualified">Direct Qualified</option>
                    <option value="On Call Qualified">On Call Qualified</option>
                    <option value="To be Called">To be Called</option>
                    <option value="Future Reference">Future Reference</option>
                    <option value="Dead">Dead</option>
                  </select>
                </div>

                {/* Engagement Mode Filter */}
                <div>
                  <select
                    value={inquiryEngagementFilter}
                    onChange={(e) => setInquiryEngagementFilter(e.target.value)}
                    className="w-full rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] py-2 px-3 text-xs text-[var(--ink)] outline-none focus:border-[var(--brand-ochre)]"
                  >
                    <option value="all">All Engagement Modes</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                    <option value="Video Call">Video Call</option>
                    <option value="In-Person">In-Person</option>
                    <option value="RFQ Form">RFQ Form</option>
                    <option value="Direct Inquiry">Direct Inquiry</option>
                  </select>
                </div>

                {/* Sort Order (Default: Latest to Oldest) */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <select
                      value={inquirySortOrder}
                      onChange={(e) => setInquirySortOrder(e.target.value as "latest" | "oldest")}
                      className="w-full rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] py-2 px-3 text-xs font-semibold text-[var(--ink)] outline-none focus:border-[var(--brand-ochre)]"
                    >
                      <option value="latest">Sort: Latest to Oldest</option>
                      <option value="oldest">Sort: Oldest to Latest</option>
                    </select>
                  </div>

                  {(inquirySearchQuery || inquiryStatusFilter !== "all" || inquiryEngagementFilter !== "all" || inquirySortOrder !== "latest") && (
                    <button
                      type="button"
                      onClick={() => {
                        setInquirySearchQuery("");
                        setInquiryStatusFilter("all");
                        setInquiryEngagementFilter("all");
                        setInquirySortOrder("latest");
                      }}
                      className="p-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 cursor-pointer"
                      title="Reset all filters"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Active summary */}
              <div className="flex items-center justify-between text-xs text-[var(--muted)] pt-1 border-t border-[var(--hairline)]">
                <span>
                  Showing <strong>{filteredAndSortedInquiries.length}</strong> of {inquiries.length} total leads
                </span>

                <div className="flex items-center gap-2 text-xs">
                  <span>Per page:</span>
                  <select
                    value={leadsPerPage}
                    onChange={(e) => setLeadsPerPage(Number(e.target.value))}
                    className="rounded-lg border border-[var(--hairline)] bg-[var(--canvas)] py-0.5 px-2 text-xs font-semibold text-[var(--ink)]"
                  >
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredAndSortedInquiries.length === 0 ? (
              <div className="p-12 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[var(--surface-soft)] border border-[var(--hairline)] flex items-center justify-center mx-auto text-[var(--muted)]">
                  <Inbox className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[var(--ink)]">
                  {inquirySearchQuery || inquiryStatusFilter !== "all" || inquiryEngagementFilter !== "all"
                    ? "No Matching Leads Found"
                    : "No Buyer Leads Yet"}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
                  {inquirySearchQuery || inquiryStatusFilter !== "all" || inquiryEngagementFilter !== "all"
                    ? "Try adjusting your search terms or clearing active filters to see all buyer leads."
                    : "As international buyers discover your exporter profile, inquiries, quotation requests, and sample requests will appear here instantly."}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  {(inquirySearchQuery || inquiryStatusFilter !== "all" || inquiryEngagementFilter !== "all") ? (
                    <button
                      onClick={() => {
                        setInquirySearchQuery("");
                        setInquiryStatusFilter("all");
                        setInquiryEngagementFilter("all");
                        setInquirySortOrder("latest");
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs text-[var(--ink)] bg-[var(--brand-ochre)] border-none cursor-pointer shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear All Filters</span>
                    </button>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedInquiries.map((inq) => {
                  const cleanBuyerPhone = (inq.buyerPhone || "").replace(/[^0-9]/g, "");
                  const mailtoUrl = `mailto:${inq.buyerEmail}?subject=${encodeURIComponent(
                    `Re: Inquiry for ${profile.companyName} on Goexports`
                  )}`;
                  const whatsappUrl = cleanBuyerPhone
                    ? `https://wa.me/${cleanBuyerPhone}?text=${encodeURIComponent(
                        `Hello ${inq.buyerName}, thank you for your inquiry on Goexports regarding ${profile.companyName}.`
                      )}`
                    : null;
                  const phoneCallUrl = cleanBuyerPhone ? `tel:${inq.buyerPhone}` : null;

                  return (
                    <div
                      key={inq.id}
                      className="p-6 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-4 shadow-sm hover:border-[var(--brand-ochre)] transition-colors"
                    >
                      {/* Card Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--hairline)] pb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--brand-ochre)] text-[var(--ink)]">
                            {inq.inquiryType || "RFQ"}
                          </span>

                          <span className="text-base font-bold text-[var(--ink)]">
                            {inq.buyerName}
                          </span>
                          {inq.buyerCountry && (
                            <span className="text-xs font-semibold text-[var(--muted)] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[var(--muted)]" />
                              {inq.buyerCountry}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Metadata Badges strip (Engagement Mode, Status, Caller) */}
                      {(inq.engagementMode || inq.status || inq.callingPerson || inq.callingDate) && (
                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          {inq.engagementMode && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-[#faf5e8] text-[#0a0a0a] border border-[#e5e5e5]">
                              <Radio className="w-3 h-3 text-amber-600" />
                              <span>Mode: {inq.engagementMode}</span>
                            </span>
                          )}

                          {inq.status && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                              {inq.status}
                            </span>
                          )}

                          {inq.callingPerson && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-medium bg-[var(--surface-soft)] text-[var(--ink)] border border-[var(--hairline)]">
                              <User className="w-3 h-3 text-[var(--muted)]" />
                              <span>Caller: <strong className="font-bold">{inq.callingPerson}</strong></span>
                            </span>
                          )}

                          {inq.callingDate && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-medium bg-[var(--surface-soft)] text-[var(--muted)] border border-[var(--hairline)]">
                              <Calendar className="w-3 h-3" />
                              <span>Call Date: <strong className="text-[var(--ink)]">{inq.callingDate}</strong></span>
                            </span>
                          )}
                        </div>
                      )}

                      {/* Contact & RFQ Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-[var(--canvas)]/60 p-3.5 rounded-2xl border border-[var(--hairline)]">
                        <div>
                          <span className="text-[var(--muted)] block text-[11px]">Work Email:</span>
                          <a
                            href={`mailto:${inq.buyerEmail}`}
                            className="font-bold text-[var(--ink)] hover:underline truncate block"
                          >
                            {inq.buyerEmail || "Not provided"}
                          </a>
                        </div>
                        <div>
                          <span className="text-[var(--muted)] block text-[11px]">Phone / WhatsApp:</span>
                          <span className="font-bold text-[var(--ink)]">
                            {inq.buyerPhone || "Not provided"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[var(--muted)] block text-[11px]">Requested Quantity:</span>
                          <span className="font-bold text-[var(--ink)]">
                            {inq.quantity || "Not specified"}
                          </span>
                        </div>
                      </div>

                      {/* Message / Requirement Description */}
                      <div className="p-4 rounded-2xl bg-[var(--canvas)] border border-[var(--hairline)] text-xs text-[var(--body)] leading-relaxed whitespace-pre-line">
                        {inq.message || "No additional message provided."}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {phoneCallUrl && (
                          <a
                            href={phoneCallUrl}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] hover:bg-[var(--surface-soft)] no-underline transition-colors shadow-2xs"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Call Buyer</span>
                          </a>
                        )}

                        {whatsappUrl && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 no-underline transition-colors shadow-2xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        )}

                        <a
                          href={mailtoUrl}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[var(--ink)] no-underline shadow-2xs"
                          style={{ backgroundColor: "var(--brand-ochre)" }}
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply via Email</span>
                        </a>
                      </div>
                    </div>
                  );
                })}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="p-4 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                    <div className="text-xs text-[var(--muted)]">
                      Showing{" "}
                      <strong>{(currentPage - 1) * leadsPerPage + 1}</strong> -{" "}
                      <strong>{Math.min(currentPage * leadsPerPage, filteredAndSortedInquiries.length)}</strong> of{" "}
                      <strong>{filteredAndSortedInquiries.length}</strong> leads
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] hover:bg-[var(--surface-soft)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Previous</span>
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            currentPage === pageNum
                              ? "bg-[var(--ink)] text-white shadow-xs"
                              : "bg-[var(--canvas)] text-[var(--muted)] border border-[var(--hairline)] hover:text-[var(--ink)]"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] hover:bg-[var(--surface-soft)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
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

            {/* Danger Zone: Delete Profile */}
            <div className="p-6 sm:p-8 rounded-3xl border border-rose-200 bg-rose-50/50 space-y-4 shadow-sm">
              <div className="border-b border-rose-200 pb-3">
                <h3 className="text-base font-bold text-rose-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <span>Delete Exporter Profile</span>
                </h3>
                <p className="text-xs text-rose-700 mt-1 m-0">
                  Permanently delete your company profile, storefront listing, and account data. Only approved/active profiles will exist; deleted profiles are permanently removed.
                </p>
              </div>

              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-rose-700 bg-rose-100 hover:bg-rose-200 border border-rose-300 transition-colors cursor-pointer"
                >
                  Delete Profile Permanently
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-white border border-rose-300 space-y-3">
                  <p className="text-xs font-bold text-rose-900 m-0">
                    Are you sure you want to permanently delete your exporter profile ({profile.companyName})?
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={handleDeleteProfile}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white border-none cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <span>Confirm Permanent Deletion</span>
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] hover:bg-gray-100 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
