"use client";

import { useState, useEffect } from "react";

interface FormData {
  fullName: string;
  email: string;
  contactNumber: string;
  country: string;
  message: string;
  pageURL: string;
}

export default function GetInTouchForm() {
  const [formData, setFormData] = useState<FormData>({ 
    fullName: "", 
    email: "", 
    contactNumber: "", 
    country: "", 
    message: "", 
    pageURL: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFormData((prev) => ({ ...prev, pageURL: window.location.href }));
    }
  }, []);

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
        contactNumber: "", 
        country: "", 
        message: "", 
        pageURL: window.location.href // Reset pageURL as well
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
    { name: "contactNumber", label: "Phone", type: "tel", placeholder: "+91 98765 43210", icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z", fullWidth: false },
    { name: "email", label: "Email Address", type: "email", placeholder: "john@company.com", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 2l-8 5-8-5", fullWidth: true },
    { name: "country", label: "Country", type: "text", placeholder: "India", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", fullWidth: true },
  ];

  return (
    <div className="flex-1 w-full max-w-[420px]" id="contact-form">
      <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-[18px] font-extrabold text-white leading-tight">Get in Touch</h2>
            <p className="text-[12px] text-white/70">We&apos;ll get back within 24 hours</p>
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3 animate-in fade-in zoom-in duration-300">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-base font-bold text-white">Thank you!</p>
            <p className="text-xs text-white/70 text-center">Our team will reach out shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 animate-in fade-in duration-300">
            <div className="flex flex-wrap gap-3">
              {inputFields.map((field) => (
                <div key={field.name} className={`flex flex-col gap-1 ${field.fullWidth ? 'w-full' : 'w-[calc(50%-6px)]'}`}>
                  <label htmlFor={field.name} className="text-[11px] font-bold text-white/90 uppercase tracking-wider">
                    {field.label}
                  </label>
                  <div className={`relative flex items-center rounded-lg border-[1.5px] transition-all duration-200 bg-black/20 ${
                    focusedField === field.name
                      ? "border-white shadow-sm shadow-black/20"
                      : "border-white/20 hover:border-white/50"
                  }`}>
                    <span className={`pl-2.5 transition-colors duration-200 ${
                      focusedField === field.name ? "text-white" : "text-white/50"
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
                      className="w-full px-2.5 py-2 text-[13px] text-white placeholder-white/40 outline-none bg-transparent disabled:opacity-50"
                    />
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="message" className="text-[11px] font-bold text-white/90 uppercase tracking-wider">
                  Message
                </label>
                <div className={`relative flex items-center rounded-lg border-[1.5px] transition-all duration-200 bg-black/20 ${
                  focusedField === "message"
                    ? "border-white shadow-sm shadow-black/20"
                    : "border-white/20 hover:border-white/50"
                }`}>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your message..."
                    className="w-full px-2.5 py-2 text-[13px] text-white placeholder-white/40 outline-none bg-transparent disabled:opacity-50 resize-y"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-[11px] text-red-400 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-white text-black font-bold text-[14px] rounded-lg border-none cursor-pointer transition-transform duration-200 hover:bg-gray-200 hover:shadow-lg active:scale-95 mt-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : (
                <>
                  Submit Enquiry
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
