"use client";

import { useState } from "react";
import { Share2, Link as LinkIcon, Check } from "lucide-react";
import { toast } from "sonner";
import { FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa";

interface BlogShareBarProps {
  title: string;
  url: string;
}

export default function BlogShareBar({ title, url }: BlogShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const fullUrl = typeof window !== "undefined" ? window.location.href : url;
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("Article link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const getFullUrl = () => (typeof window !== "undefined" ? window.location.href : url);

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getFullUrl())}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getFullUrl())}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${getFullUrl()}`)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mr-1 flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5 text-[var(--muted)]" />
        <span>Share:</span>
      </span>

      <button
        onClick={handleCopy}
        type="button"
        title="Copy article link"
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border border-[var(--hairline)] bg-[var(--surface-soft)] hover:bg-[var(--surface-card)] text-[var(--ink)] cursor-pointer transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-emerald-600" />
            <span className="text-emerald-700">Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3 h-3 text-[var(--muted)]" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <button
        onClick={shareLinkedIn}
        type="button"
        title="Share on LinkedIn"
        className="w-7 h-7 rounded-full flex items-center justify-center border border-[var(--hairline)] bg-[var(--surface-soft)] hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] text-[var(--muted)] cursor-pointer transition-colors"
      >
        <FaLinkedinIn size={12} />
      </button>

      <button
        onClick={shareTwitter}
        type="button"
        title="Share on X (Twitter)"
        className="w-7 h-7 rounded-full flex items-center justify-center border border-[var(--hairline)] bg-[var(--surface-soft)] hover:bg-[#000000] hover:text-white hover:border-[#000000] text-[var(--muted)] cursor-pointer transition-colors"
      >
        <FaTwitter size={12} />
      </button>

      <button
        onClick={shareWhatsApp}
        type="button"
        title="Share on WhatsApp"
        className="w-7 h-7 rounded-full flex items-center justify-center border border-[var(--hairline)] bg-[var(--surface-soft)] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] text-[var(--muted)] cursor-pointer transition-colors"
      >
        <FaWhatsapp size={13} />
      </button>
    </div>
  );
}
