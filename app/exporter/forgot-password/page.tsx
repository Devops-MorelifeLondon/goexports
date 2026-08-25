"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  KeyRound
} from "lucide-react";
import { toast } from "sonner";

export default function ExporterForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Invalid Email", {
        description: "Please enter a valid work email address.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/exporter/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to process request.");
      }

      setIsSubmitted(true);
      toast.success("Instructions Sent", {
        description: "If an account exists for this email, reset instructions have been sent.",
      });
    } catch (err: any) {
      toast.error("Request Failed", {
        description: err.message || "Could not process password reset request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <ArrowLeft className="w-3.5 h-3.5" />
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
          {/* Top Banner */}
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
              <span>Password Recovery</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight">
              {isSubmitted ? "Check Your Inbox" : "Forgot Password?"}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted)] mt-1.5 max-w-sm mx-auto leading-relaxed">
              {isSubmitted
                ? `We have sent password reset instructions to ${email}`
                : "Enter your registered exporter work email address to receive password reset instructions."}
            </p>
          </div>

          {/* Body Container */}
          <div className="p-8 sm:p-10 pt-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4.5">
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3.5 rounded-xl border-none font-bold text-sm text-[var(--ink)] cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-[0.99] disabled:opacity-50"
                  style={{ backgroundColor: "var(--brand-ochre)" }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Reset Instructions...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center space-y-5">
                <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2 text-xs text-[var(--muted)] leading-relaxed">
                  <p>
                    If an exporter account is associated with <strong className="text-[var(--ink)]">{email}</strong>, you will receive an email shortly with a secure link to reset your password.
                  </p>
                  <p>
                    Please check your inbox as well as your junk or spam folder.
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--hairline)] flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-semibold text-[var(--ink)] hover:text-[var(--brand-ochre)] transition-colors bg-transparent border-none cursor-pointer"
                  >
                    Didn&apos;t receive email? Try another email
                  </button>

                  <Link
                    href="/exporter/login"
                    className="w-full py-3 rounded-xl border border-[var(--hairline)] font-bold text-xs text-[var(--ink)] bg-[var(--canvas)] hover:bg-[var(--surface-soft)] transition-colors inline-flex items-center justify-center gap-2 no-underline"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Exporter Sign In</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Support Callout */}
            <div className="mt-8 text-center text-xs text-[var(--muted)] border-t border-[var(--hairline)] pt-4">
              <span>Need further assistance? </span>
              <a
                href="mailto:info@goexports.co.uk"
                className="font-bold text-[var(--ink)] underline hover:text-[var(--brand-ochre)] transition-colors"
              >
                Contact Trade Support →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--muted)]">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>256-bit SSL Encrypted • Goexports Verified Exporter Network</span>
        </div>
      </div>
    </main>
  );
}
