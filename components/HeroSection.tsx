"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  { prefix: "Sell ", keyword: "Global" },
  { prefix: "Export ", keyword: "Worldwide" },
  { prefix: "Expand ", keyword: "International" },
];

export default function HeroSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "" });
  const [submitted, setSubmitted] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<number[]>([]);
  const [phase, setPhase] = useState<"typing" | "paused" | "deleting">("typing");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (phase === "typing" && currentLine >= lines.length) {
      const timeout = setTimeout(() => {
        setPhase("deleting");
        setCurrentLine(lines.length - 1);
        setCharIndex((lines[lines.length - 1].prefix + lines[lines.length - 1].keyword + ".").length);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (phase === "typing") {
      const fullText = lines[currentLine].prefix + lines[currentLine].keyword + ".";
      if (charIndex < fullText.length) {
        const timeout = setTimeout(() => setCharIndex((prev) => prev + 1), 70);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCompletedLines((prev) => [...prev, currentLine]);
          setCurrentLine((prev) => prev + 1);
          setCharIndex(0);
        }, 400);
        return () => clearTimeout(timeout);
      }
    }

    if (phase === "deleting") {
      if (charIndex > 0) {
        const timeout = setTimeout(() => setCharIndex((prev) => prev - 1), 40);
        return () => clearTimeout(timeout);
      } else {
        setCompletedLines((prev) => prev.filter((l) => l !== currentLine));
        if (currentLine > 0) {
          const prevLine = currentLine - 1;
          setCurrentLine(prevLine);
          setCharIndex((lines[prevLine].prefix + lines[prevLine].keyword + ".").length);
        } else {
          const timeout = setTimeout(() => {
            setPhase("typing");
            setCurrentLine(0);
            setCharIndex(0);
            setCompletedLines([]);
          }, 500);
          return () => clearTimeout(timeout);
        }
      }
    }
  }, [charIndex, currentLine, phase]);

  const getDisplayText = (lineIndex: number) => {
    const full = lines[lineIndex].prefix + lines[lineIndex].keyword + ".";
    if (lineIndex === currentLine) return full.slice(0, charIndex);
    if (completedLines.includes(lineIndex)) return full;
    return "";
  };

  const renderLine = (lineIndex: number) => {
    const text = getDisplayText(lineIndex);
    const { prefix, keyword } = lines[lineIndex];
    const isActive = lineIndex === currentLine;
    const isComplete = completedLines.includes(lineIndex) && !isActive;
    const showCursor = isActive;

    if (!isComplete && !isActive) return <span className="block h-[1.15em]">&nbsp;</span>;
    if (text.length === 0 && !showCursor) return <span className="block h-[1.15em]">&nbsp;</span>;

    const prefixEnd = prefix.length;
    const keywordEnd = prefix.length + keyword.length;
    const typedPrefix = text.slice(0, Math.min(text.length, prefixEnd));
    const typedKeyword = text.length > prefixEnd ? text.slice(prefixEnd, Math.min(text.length, keywordEnd)) : "";
    const typedDot = text.length > keywordEnd ? "." : "";

    return (
      <span className="block">
        {typedPrefix}
        {typedKeyword && (
          <motion.span
            animate={isComplete ? { backgroundPosition: ["0% center", "200% center"] } : {}}
            transition={isComplete ? { duration: 3, repeat: Infinity, ease: "linear", delay: lineIndex * 1 } : {}}
            style={{
              backgroundImage: "linear-gradient(90deg, #000000 0%, #888888 40%, #000000 80%, #000000 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {typedKeyword}
          </motion.span>
        )}
        {typedDot}
        {showCursor && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-[3px] h-[0.85em] bg-black ml-[2px] align-middle"
          />
        )}
      </span>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", phone: "", company: "" });
  };

  const inputFields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 110 8 4 4 0 010-8z" },
    { name: "email", label: "Email Address", type: "email", placeholder: "john@company.com", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 2l-8 5-8-5" },
    { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" },
    { name: "company", label: "Company Name", type: "text", placeholder: "Acme Inc.", icon: "M3 21h18M3 7v14M21 7v14M6 11h.01M6 15h.01M10 11h.01M10 15h.01M14 11h.01M14 15h.01M18 11h.01M18 15h.01M6 7l6-4 6 4" },
  ];

  return (
    <section className="bg-linear-to-br from-[#FFFFFF] via-[#F5F5F5] to-[#ECECEC] text-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-full opacity-5 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[length:20px_20px]" />

      <motion.div
        animate={{
          background: [
            "radial-gradient(600px circle at 20% 30%, rgba(0,0,0,0.03), transparent 60%)",
            "radial-gradient(600px circle at 60% 70%, rgba(0,0,0,0.03), transparent 60%)",
            "radial-gradient(600px circle at 80% 20%, rgba(0,0,0,0.03), transparent 60%)",
            "radial-gradient(600px circle at 20% 30%, rgba(0,0,0,0.03), transparent 60%)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="max-w-[1200px] mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-[1.2] text-center lg:text-left">

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block bg-black/10 border border-black/20 rounded-full px-3.5 py-1 text-[13px] font-semibold text-black mb-4"
            >
              Global Selling
            </motion.div>

            <h1 className="text-[32px] lg:text-[48px] font-extrabold leading-[1.15] tracking-tight mb-5 text-black">
              {lines.map((_, i) => (
                <span key={i} className="block">{renderLine(i)}</span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="text-lg leading-relaxed text-black/70 max-w-[520px] mb-4 mx-auto lg:mx-0"
            >
              Active Buyers from over 190+ countries
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.25 }}
              className="text-lg leading-relaxed text-black/70 max-w-[520px] mb-8 mx-auto lg:mx-0"
            >
              Get access to millions of customers around the world. Accelerate your international sales.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/your-number-here"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#25D366] text-white font-bold text-[15px] rounded-full no-underline transition-all duration-200 hover:bg-[#1EBE5D] shadow-lg shadow-[#25D366]/30"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat with us
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="flex-1 w-full max-w-[440px]"
            id="contact-form"
          >
            <div className="relative bg-white rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden border border-black/10">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#111111] via-[#666666] to-[#111111]" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#111111] to-[#333333] flex items-center justify-center shadow-md shadow-black/25">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-[20px] font-extrabold text-[#0F1111] leading-tight">Get in Touch</h2>
                  <p className="text-[13px] text-[#565959]">We&apos;ll get back to you within 24 hours</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center justify-center py-10 gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-[#111111] to-[#333333] flex items-center justify-center shadow-lg shadow-black/30"
                    >
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                    <p className="text-lg font-bold text-[#0F1111]">Thank you!</p>
                    <p className="text-sm text-[#565959] text-center">Our team will reach out to you shortly.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3.5"
                  >
                    {inputFields.map((field, i) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                        className="flex flex-col gap-1"
                      >
                        <label htmlFor={field.name} className="text-[12px] font-bold text-[#0F1111] uppercase tracking-wider">
                          {field.label}
                        </label>
                        <div className={`relative flex items-center rounded-lg border-2 transition-all duration-200 ${
                          focusedField === field.name
                            ? "border-[#111111] shadow-md shadow-black/10"
                            : "border-[#e7e7e7] hover:border-[#c0c0c0]"
                        }`}>
                          <span className={`pl-3.5 transition-colors duration-200 ${
                            focusedField === field.name ? "text-[#111111]" : "text-[#aaa]"
                          }`}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d={field.icon} />
                            </svg>
                          </span>
                          <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            required
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleChange}
                            onFocus={() => setFocusedField(field.name)}
                            onBlur={() => setFocusedField(null)}
                            placeholder={field.placeholder}
                            className="w-full px-3 py-3 text-sm text-[#0F1111] placeholder-[#bbb] outline-none bg-transparent"
                          />
                        </div>
                      </motion.div>
                    ))}

                    <motion.button
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-[#111111] to-[#333333] text-white font-bold text-[15px] rounded-lg border-none cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-black/25 mt-2 flex items-center justify-center gap-2"
                    >
                      Submit Enquiry
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}