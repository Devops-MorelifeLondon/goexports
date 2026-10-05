"use client";

import { ArrowRight } from "lucide-react";

const WEBINAR_FORM_URL =
  "https://forms.zohopublic.in/shipglobalexpresspvtltd/form/HowtoFindGenuineInternationalBuyers/formperma/HoSwCBsLUlZXs_s_3jBAYLAwO0VtyIu3F2W8NsvEPtg";

export default function WebinarStrip() {
  return (
    <aside
      aria-label="Webinar Announcement"
      className="w-full relative z-40 bg-[#e8b94a] text-[#0a0a0a] border-b border-black/10 transition-colors"
    >
      <a
        href={WEBINAR_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center min-h-[34px] sm:min-h-[36px] px-3 sm:px-6 py-1 text-[#0a0a0a] no-underline hover:opacity-90 transition-opacity group text-center"
        title="Register for Webinar: How to Find International Buyers - 12 Oct, 5 PM - 6 PM IST"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[11.5px] sm:text-[13px] font-bold tracking-tight">
          <span className="group-hover:underline">
            Register for Webinar: How to Find International Buyers
          </span>
          <span className="text-black/50 hidden xs:inline">•</span>
          <span className="font-semibold text-black/90">
            12 Oct, 5 PM – 6 PM IST
          </span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 inline-block" />
        </div>
      </a>
    </aside>
  );
}
