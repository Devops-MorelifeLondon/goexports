import Link from "next/link";
import GetInTouchForm from "./GetInTouchForm";

export default function HeroSection() {
  return (
    <section
      className="min-h-[calc(100vh-64px)] flex items-center"
      style={{
        backgroundColor: "var(--canvas)",
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="section-wrap w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* ── Left: Headline + CTA ── */}
          <div className="flex-[1.3] text-center lg:text-left">

            {/* Highlighted Badge */}
            <div className="mb-6 flex justify-center lg:justify-start">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 text-[15px] font-semibold"
                style={{
                  color: "var(--primary)",
                  backgroundColor: "var(--surface-soft)",
                  borderRadius: "var(--r-md)",
                  border: "1px solid var(--hairline)",
                  lineHeight: 1.2,
                }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                Verified International Buyers & Global Trade Directory
              </span>
            </div>

            {/* H1 */}
            <h1
              className="mb-6 display-xl"
              style={{
                fontSize: "clamp(38px, 5.8vw, 70px)",
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: "-2.5px",
                color: "var(--ink)",
              }}
            >
              <span className="block">
                Get <span style={{ color: "var(--brand-ochre)" }}>Buyer Leads</span>.
              </span>
              <span className="block">
                Find <span style={{ color: "var(--brand-ochre)" }}>Verified Buyers</span>.
              </span>
              <span className="block">
                Connect <span style={{ color: "var(--brand-ochre)" }}>Globally</span>.
              </span>
            </h1>
            <p
              className="mb-10 max-w-[480px] mx-auto lg:mx-0"
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              Get access to verified buyer leads from around the world. Accelerate your international sales.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#contact-form"
                className="btn-primary"
              >
                Get Buyer Leads
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <Link
                href="/create-export-profile"
                className="btn-secondary"
              >
                Create Export Profile
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>


          </div>

          {/* ── Right: Form ── */}
          <GetInTouchForm />
        </div>
      </div>
    </section>
  );
}