"use client";

import { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  productCategory: string;
}

export default function GetInTouchForm() {
  const [formData, setFormData] = useState<FormData>({ 
    fullName: "", 
    email: "", 
    phone: "", 
    company: "", 
    productCategory: ""
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);
      setFormData({ 
        fullName: "", 
        email: "", 
        phone: "", 
        company: "", 
        productCategory: ""
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe", icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 110 8 4 4 0 010-8z", fullWidth: false },
    { name: "phone", label: "Phone", type: "tel", placeholder: "+91 98765 43210", icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z", fullWidth: false },
    { name: "email", label: "Email Address", type: "email", placeholder: "john@company.com", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 2l-8 5-8-5", fullWidth: true },
    { name: "company", label: "Company", type: "text", placeholder: "Your company name", icon: "M3 21h18M3 10h18M3 7l9 4 9-4M3 3h18v18H3V3z", fullWidth: true },
  ];

  return (
    <div className="flex-1 w-full max-w-[420px]" id="contact-form">
      <div className="relative bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="absolute top-0 left-6 right-6 h-0.5 bg-gray-900 rounded-full" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Get in Touch</h2>
            <p className="text-xs text-gray-600">We&apos;ll get back within 24 hours</p>
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3 animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-900 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="gray-900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-base font-semibold text-gray-900">Thank you!</p>
            <p className="text-xs text-gray-600 text-center">Our team will reach out shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 animate-in fade-in duration-300">
            <div className="flex flex-wrap gap-3">
              {inputFields.map((field) => (
                <div key={field.name} className={`flex flex-col gap-1.5 ${field.fullWidth ? 'w-full' : 'w-[calc(50%-6px)]'}`}>
                  <label htmlFor={field.name} className="text-xs font-semibold text-gray-700">
                    {field.label}
                  </label>
                  <div className={`relative flex items-center rounded-lg border transition-all duration-200 bg-white ${
                    focusedField === field.name
                      ? "border-gray-900 shadow-sm"
                      : "border-gray-300 hover:border-gray-400"
                  }`}>
                    <span className={`pl-3 transition-colors duration-200 ${
                      focusedField === field.name ? "text-gray-900" : "text-gray-400"
                    }`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={field.icon} />
                      </svg>
                    </span>
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
                      className="w-full px-3 py-2.5 text-sm text-gray-900 placeholder-gray-500 outline-none bg-transparent disabled:opacity-50"
                    />
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-1.5 w-full">
                <label htmlFor="productCategory" className="text-xs font-semibold text-gray-700">
                  Product Category
                </label>
                <div className={`relative flex items-center rounded-lg border transition-all duration-200 bg-white ${
                  focusedField === "productCategory"
                    ? "border-gray-900 shadow-sm"
                    : "border-gray-300 hover:border-gray-400"
                }`}>
                  <span className={`pl-3 transition-colors duration-200 ${
                    focusedField === "productCategory" ? "text-gray-900" : "text-gray-400"
                  }`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                      <polyline points="8 1 16 1"/>
                      <line x1="12" y1="1" x2="12" y2="3"/>
                    </svg>
                  </span>
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
                    placeholder="Product category"
                    className="w-full px-3 py-2.5 text-sm text-gray-900 placeholder-gray-500 outline-none bg-transparent disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-2.5">
                <p className="text-xs text-red-600 font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-gray-900 text-white font-semibold text-sm rounded-lg border-none cursor-pointer transition-all duration-200 hover:bg-gray-800 active:scale-[0.98] mt-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
          </form>
        )}
      </div>
    </div>
  );
}
