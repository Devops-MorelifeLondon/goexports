import { FadeIn } from "./MotionWrappers";

export default function Presence() {
  const regions = [
    {
      title: "North America",
      countries: "USA, Canada and Mexico",
      desc: "Make the most of UK's expanding export trade with developed countries. Sell in North America now!",
      cardColor: "var(--brand-pink)",
      dark: true,
    },
    {
      title: "Europe",
      countries: "Germany, UK, France, Italy, Spain, Sweden, Poland and the Netherlands",
      desc: "Empower your business with one platform that opens doors to customers in 8 different countries. Maximise your global reach effortlessly!",
      cardColor: "var(--brand-teal)",
      dark: true,
    },
    {
      title: "Asia-Pacific",
      countries: "Japan, Singapore and Australia",
      desc: "Embrace the vast opportunities in Japan, the world's third-largest economy, or capture the momentum of growing customer bases in Singapore and Australia.",
      cardColor: "var(--brand-lavender)",
      dark: false,
    },
    {
      title: "Middle East",
      countries: "UAE and GCC Countries",
      desc: "Unlock the middle east markets. Kickstart your selling journey in the lucrative UAE, Saudi Arabia, Kuwait, Bahrain, Oman & Qatar markets.",
      cardColor: "var(--brand-peach)",
      dark: false,
    },
  ];

  return (
    <section
      id="presence"
      style={{
        backgroundColor: "var(--canvas)",
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="section-wrap">
        <FadeIn>
          <div className="text-center mb-16">
            <span
              className="inline-block mb-4 caption-upper"
              style={{
                color: "var(--muted)",
                backgroundColor: "var(--surface-card)",
                padding: "6px 16px",
                borderRadius: "var(--r-pill)",
              }}
            >
              Global Presence
            </span>
            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: "-2px",
                color: "var(--ink)",
              }}
            >
              We Operate Worldwide
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {regions.map((region, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="flex flex-col gap-4 h-full"
                style={{
                  backgroundColor: region.cardColor,
                  borderRadius: "var(--r-xl)",
                  padding: "var(--space-xl)",
                }}
              >
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 600,
                    letterSpacing: "-0.3px",
                    color: region.dark ? "#ffffff" : "var(--ink)",
                    lineHeight: 1.25,
                  }}
                >
                  {region.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: region.dark ? "rgba(255,255,255,0.85)" : "var(--body-strong)",
                    lineHeight: 1.5,
                  }}
                >
                  {region.countries}
                </p>
                <div
                  style={{
                    width: "32px",
                    height: "2px",
                    backgroundColor: region.dark ? "rgba(255,255,255,0.4)" : "var(--muted-soft)",
                    borderRadius: "2px",
                  }}
                />
                <p
                  style={{
                    fontSize: "13px",
                    color: region.dark ? "rgba(255,255,255,0.6)" : "var(--muted)",
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {region.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}