"use client";

import { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  productCategory: string;
}

export default function GetInTouchForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    productCategory: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/jotform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      setSubmitted(true);
      setFormData({ fullName: "", email: "", phone: "", company: "", country: "", productCategory: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe", fullWidth: false },
    { name: "phone", label: "Phone", type: "tel", placeholder: "+1 (555) 000-0000", fullWidth: false },
    { name: "email", label: "Email Address", type: "email", placeholder: "john@company.com", fullWidth: true },
    { name: "company", label: "Company", type: "text", placeholder: "Your company name", fullWidth: false },
    { name: "country", label: "Country", type: "text", placeholder: "e.g. United Kingdom", fullWidth: false },
  ];

  return (
    <div className="flex-1 w-full max-w-[420px]" id="contact-form">
      <div
        className="relative"
        style={{
          backgroundColor: "var(--surface-card)",
          borderRadius: "var(--r-xl)",
          padding: "var(--space-xl)",
          border: "1px solid var(--hairline)",
        }}
      >
        {/* Ochre accent bar */}
        <div
          className="absolute top-0 left-8 right-8 h-[3px] rounded-full"
          style={{ backgroundColor: "var(--brand-ochre)" }}
        />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pt-2">
          <div
            className="w-10 h-10 flex items-center justify-center"
            style={{ backgroundColor: "var(--primary)", borderRadius: "var(--r-sm)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>
              Get in Touch
            </h2>
            <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "2px" }}>
              We&apos;ll get back within 24 hours
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div
              className="w-12 h-12 flex items-center justify-center"
              style={{ backgroundColor: "var(--brand-mint)", borderRadius: "var(--r-full, 50%)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink)" }}>Thank you!</p>
            <p style={{ fontSize: "13px", color: "var(--muted)", textAlign: "center" }}>
              Our team will reach out shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              {inputFields.map((field) => (
                <div
                  key={field.name}
                  className={`flex flex-col gap-1.5 ${field.fullWidth ? "w-full" : "w-[calc(50%-6px)]"}`}
                >
                  <label
                    htmlFor={field.name}
                    style={{ fontSize: "12px", fontWeight: 600, color: "var(--body-strong)" }}
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required
                    disabled={isSubmitting}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    placeholder={field.placeholder}
                    style={{
                      height: "44px",
                      padding: "0 16px",
                      backgroundColor: "var(--canvas)",
                      color: "var(--ink)",
                      fontSize: "14px",
                      border: `1px solid ${focusedField === field.name ? "var(--ink)" : "var(--hairline)"}`,
                      borderRadius: "var(--r-md)",
                      outline: "none",
                      transition: "border-color 0.2s",
                      width: "100%",
                    }}
                    className="placeholder:text-[var(--muted-soft)] disabled:opacity-50"
                  />
                </div>
              ))}

              {/* Product Category */}
              <div className="flex flex-col gap-1.5 w-full">
                <label
                  htmlFor="productCategory"
                  style={{ fontSize: "12px", fontWeight: 600, color: "var(--body-strong)" }}
                >
                  Product Category
                </label>
                <input
                  id="productCategory"
                  name="productCategory"
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={formData.productCategory}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("productCategory")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. Textiles, Electronics, Agro..."
                  style={{
                    height: "44px",
                    padding: "0 16px",
                    backgroundColor: "var(--canvas)",
                    color: "var(--ink)",
                    fontSize: "14px",
                    border: `1px solid ${focusedField === "productCategory" ? "var(--ink)" : "var(--hairline)"}`,
                    borderRadius: "var(--r-md)",
                    outline: "none",
                    transition: "border-color 0.2s",
                    width: "100%",
                  }}
                  className="placeholder:text-[var(--muted-soft)] disabled:opacity-50"
                />
              </div>
            </div>

            {error && (
              <p style={{ fontSize: "13px", color: "var(--error)", padding: "8px 12px", backgroundColor: "#fff1f1", borderRadius: "var(--r-sm)" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: "var(--r-md)", height: "44px", fontSize: "14px", fontWeight: 600 }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Enquiry
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>

            <p style={{ fontSize: "12px", color: "var(--muted-soft)", textAlign: "center" }}>
              Free consultation • No commitment
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
