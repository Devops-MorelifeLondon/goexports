"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  KeyRound
} from "lucide-react";
import { toast } from "sonner";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!token || !email) {
    return (
      <div className="text-center py-4 space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[var(--ink)]">Invalid Reset Link</h3>
          <p className="text-xs text-[var(--muted)] max-w-xs mx-auto">
            This password reset link is missing required security parameters or has expired.
          </p>
        </div>
        <Link
          href="/exporter/forgot-password"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--brand-ochre)] no-underline hover:opacity-95 transition-opacity"
        >
          <span>Request New Reset Link</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Missing Input", {
        description: "Please fill in both password fields.",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("Weak Password", {
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match", {
        description: "Please make sure your new password and confirmation match.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/exporter/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to reset password.");
      }

      setIsSuccess(true);
      toast.success("Password Updated!", {
        description: "Your password has been reset successfully. Redirecting to login...",
      });

      setTimeout(() => {
        router.push("/exporter/login");
      }, 1800);
    } catch (err: any) {
      toast.error("Reset Failed", {
        description: err.message || "Could not reset your password. The link may have expired.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-4 space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 animate-bounce" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[var(--ink)]">Password Updated Successfully!</h3>
          <p className="text-xs text-[var(--muted)] max-w-xs mx-auto">
            Your exporter account password has been changed. You will be redirected to the sign in page in a moment...
          </p>
        </div>
        <Link
          href="/exporter/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--brand-ochre)] no-underline shadow-md hover:opacity-95 transition-opacity"
        >
          <span>Sign In Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleResetPassword} className="space-y-4.5">
      {/* Target Email Banner */}
      <div className="p-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--hairline)] text-xs text-[var(--muted)] flex items-center justify-between">
        <span>Resetting password for:</span>
        <strong className="text-[var(--ink)] font-semibold">{email}</strong>
      </div>

      {/* New Password */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-[var(--ink)]">
          New Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type={showPassword ? "text" : "password"}
            required
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
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

      {/* Confirm New Password */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-[var(--ink)]">
          Confirm New Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            required
            disabled={isLoading}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your new password"
            className="w-full pl-10 pr-11 py-3 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-sm text-[var(--ink)] placeholder:text-[var(--muted-soft)] focus:outline-none focus:border-[var(--brand-ochre)] focus:ring-2 focus:ring-[var(--brand-ochre)]/20 transition-all disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)] border-none bg-transparent cursor-pointer p-1.5 transition-colors"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Password match helper indicator */}
      {password && confirmPassword && (
        <div className="text-[11px] font-semibold">
          {password === confirmPassword ? (
            <span className="text-emerald-600">✓ Passwords match</span>
          ) : (
            <span className="text-rose-600">✗ Passwords do not match</span>
          )}
        </div>
      )}

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
            <span>Updating Password...</span>
          </>
        ) : (
          <>
            <span>Save New Password & Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

export default function ExporterResetPasswordPage() {
  return (
    <main
      className="min-h-screen py-10 sm:py-16 flex flex-col justify-center relative overflow-hidden"
      style={{ backgroundColor: "var(--canvas)" }}
    >
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[var(--brand-ochre)]/10 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="section-wrap max-w-lg mx-auto w-full">
        {/* Navigation back bar */}
        <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-6">
          <Link
            href="/exporter/login"
            className="inline-flex items-center gap-1.5 hover:text-[var(--ink)] transition-colors no-underline text-[var(--muted)] font-medium"
          >
            <span>←</span>
            <span>Back to Sign In</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Encrypted Trade Portal</span>
          </div>
        </div>

        {/* Main Card */}
        <div
          className="rounded-3xl border border-[var(--hairline)] shadow-[0_12px_40px_rgba(10,10,10,0.06)] overflow-hidden"
          style={{ backgroundColor: "var(--surface-card)" }}
        >
          {/* Header Banner */}
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
              <KeyRound className="w-3.5 h-3.5" />
              <span>Set New Password</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight">
              Create New Password
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted)] mt-1.5 max-w-sm mx-auto leading-relaxed">
              Please enter your new account password below to regain access to your exporter storefront.
            </p>
          </div>

          {/* Form Container */}
          <div className="p-8 sm:p-10 pt-6">
            <Suspense fallback={<div className="py-8 text-center text-xs text-[var(--muted)]">Loading reset portal...</div>}>
              <ResetPasswordForm />
            </Suspense>

            <div className="mt-8 text-center text-xs text-[var(--muted)] border-t border-[var(--hairline)] pt-4">
              <span>Remembered your password? </span>
              <Link
                href="/exporter/login"
                className="font-bold text-[var(--ink)] underline hover:text-[var(--brand-ochre)] transition-colors"
              >
                Sign in here →
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
