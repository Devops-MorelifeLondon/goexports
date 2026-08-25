"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Building2,
  Globe2,
  TrendingUp,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

function ExporterLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/exporter/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Missing Credentials", {
        description: "Please enter both your registered work email and password.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/exporter/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Invalid login credentials");
      }

      if (typeof window !== "undefined") {
        if (data.seller) {
          localStorage.setItem("exporter_user", JSON.stringify(data.seller));
        }
        if (data.token) {
          localStorage.setItem("exporter_token", data.token);
        }
        window.dispatchEvent(new Event("exporter_auth_change"));
      }

      toast.success("Welcome Back!", {
        description: `Logged in as ${data.seller?.companyName || "Exporter"}. Redirecting to your portal...`,
      });

      setTimeout(() => {
        router.push(redirectTarget);
        router.refresh();
      }, 600);
    } catch (err: any) {
      toast.error("Login Failed", {
        description: err.message || "Could not log into your exporter portal.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4.5">
      {/* Work Email */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-[var(--ink)]">
          Work Email Address
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="email"
            required
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exports@yourcompany.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] placeholder:text-[var(--muted-soft)] focus:outline-none focus:border-[var(--brand-ochre)] focus:ring-2 focus:ring-[var(--brand-ochre)]/20 transition-all disabled:opacity-50"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[var(--ink)]">
            Account Password
          </label>
          <Link
            href="/exporter/forgot-password"
            className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--brand-ochre)] transition-colors no-underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type={showPassword ? "text" : "password"}
            required
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your account password"
            className="w-full pl-10 pr-11 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] placeholder:text-[var(--muted-soft)] focus:outline-none focus:border-[var(--brand-ochre)] focus:ring-2 focus:ring-[var(--brand-ochre)]/20 transition-all disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)] border-none bg-transparent cursor-pointer p-1.5 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 py-3.5 rounded-xl border-none font-bold text-sm text-[var(--ink)] cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-[0.99] disabled:opacity-50"
        style={{ backgroundColor: "var(--brand-ochre)" }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Verifying Credentials...</span>
          </>
        ) : (
          <>
            <span>Sign In to Exporter Portal</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

export default function ExporterLoginPage() {
  return (
    <main
      className="min-h-screen py-10 sm:py-16 flex flex-col justify-center relative overflow-hidden"
      style={{ backgroundColor: "var(--canvas)" }}
    >
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[var(--brand-ochre)]/10 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="section-wrap max-w-lg mx-auto w-full">
        {/* Navigation back bar */}
        <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-[var(--ink)] transition-colors no-underline text-[var(--muted)] font-medium"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Encrypted Trade Portal</span>
          </div>
        </div>

        {/* Main Login Card */}
        <div
          className="rounded-3xl border border-[var(--hairline)] shadow-[0_12px_40px_rgba(10,10,10,0.06)] overflow-hidden"
          style={{ backgroundColor: "var(--surface-card)" }}
        >
          {/* Card Top Banner */}
          <div className="p-8 sm:p-10 pb-6 text-center border-b border-[var(--hairline)] bg-[var(--surface-soft)]/50">
            <Link href="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
              <Image
                src="/logo/logo.png"
                alt="Goexports Logo"
                width={130}
                height={34}
                className="object-contain mx-auto"
                priority
              />
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2.5 bg-[var(--brand-ochre)] text-[var(--ink)]">
              <Building2 className="w-3.5 h-3.5" />
              <span>Exporter Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight">
              Sign In to Your Storefront
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted)] mt-1.5 max-w-sm mx-auto leading-relaxed">
              Manage your global exporter profile and respond to direct international buyer inquiries.
            </p>
          </div>

          {/* Form Container */}
          <div className="p-8 sm:p-10 pt-6">
            <Suspense fallback={<div className="py-8 text-center text-xs text-[var(--muted)]">Loading login portal...</div>}>
              <ExporterLoginForm />
            </Suspense>

            {/* Feature Highlights Strip */}
            <div className="mt-8 pt-6 border-t border-[var(--hairline)] grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-[var(--canvas)] border border-[var(--hairline)]">
                <Globe2 className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-[var(--ink)]">Global Reach</div>
                <div className="text-[9px] text-[var(--muted)]">Direct Inquiries</div>
              </div>
              <div className="p-2 rounded-xl bg-[var(--canvas)] border border-[var(--hairline)]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-[var(--ink)]">Verified Badge</div>
                <div className="text-[9px] text-[var(--muted)]">Buyer Trust</div>
              </div>
              <div className="p-2 rounded-xl bg-[var(--canvas)] border border-[var(--hairline)]">
                <TrendingUp className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-[var(--ink)]">0% Fees</div>
                <div className="text-[9px] text-[var(--muted)]">Zero Commission</div>
              </div>
            </div>

            {/* Registration Callout */}
            <div className="mt-6 text-center text-xs text-[var(--muted)]">
              <span>New exporter to Goexports? </span>
              <Link
                href="/create-export-profile"
                className="font-bold text-[var(--ink)] underline hover:text-[var(--brand-ochre)] transition-colors"
              >
                Create your export profile free →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Trust Lock */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--muted)]">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>256-bit SSL Encrypted • Goexports Verified Exporter Network</span>
        </div>
      </div>
    </main>
  );
}
