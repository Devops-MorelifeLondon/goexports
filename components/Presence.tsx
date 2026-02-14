export default function Presence() {
  const regions = [
    { title: "North America", countries: "USA, Canada and Mexico", desc: "Make the most of UK's expanding export trade with developed countries. Sell in North America now!" },
    { title: "Europe", countries: "Germany, UK, France, Italy, Spain, Sweden, Poland and the Netherlands", desc: "Empower your business with one platform that opens doors to customers in 8 different countries. Maximise your global reach effortlessly!" },
    { title: "Asia-Pacific", countries: "Japan, Singapore and Australia", desc: "Embrace the vast opportunities in Japan, the world's third-largest economy, or capture the momentum of growing customer bases in Singapore and Australia." },
    { title: "Middle East", countries: "UAE and GCC Countries", desc: "Unlock the middle east markets. Kickstart your selling journey in the lucrative UAE, Saudi Arabia, Kuwait, Bahrain, Oman & Qatar markets." },
  ];

  return (
    <section id="presence" className="bg-[#FAFAFA] py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[#0F1111] tracking-wide">PRESENCE</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {regions.map((region, i) => (
            <div key={i} className="bg-[#0A0A0A] rounded-[14px] p-9 px-7 flex flex-col gap-4 h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:bg-[#141414]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.04)_0%,transparent_60%)] pointer-events-none" />
              <h3 className="text-2xl font-bold text-white leading-snug relative z-10">{region.title}</h3>
              <p className="text-sm font-semibold text-white/90 leading-normal relative z-10">{region.countries}</p>
              <div className="w-10 h-0.5 bg-white/40 rounded relative z-10" />
              <p className="text-sm leading-relaxed text-white/55 relative z-10">{region.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}