export default function GlobalShoppingCTA() {
  const insights = [
    { icon: "🌐", stat: "200+", desc: "Expand your business globally. Access 200+ countries and 18 international marketplaces." },
    { icon: "💵", stat: "$750 Billion+", desc: "Size of products exports from UK to the world. Connect with customers from all corners of the globe." },
    { icon: "🔗", stat: "100,000+", desc: "Exporters are thriving on morelife mall. Elevate your sales and expand your reach internationally." },
    { icon: "📋", stat: "30 Million+", desc: "Successful buyer requirements are added to our platform every month from across the globe." },
  ];

  return (
    <section className="bg-[#0A0A0A] text-white relative overflow-hidden py-16 px-6">
      <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[200%] bg-[radial-gradient(ellipse,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-50%] right-[-20%] w-[60%] h-[200%] bg-[radial-gradient(ellipse,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <h2 className="text-4xl font-extrabold text-center mb-2 tracking-wide">INSIGHTS</h2>
        <p className="text-center text-white/50 text-[15px] max-w-[480px] mx-auto mb-12">
          Key numbers that showcase our global reach and impact.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((item, i) => (
            <div key={i} className="text-center p-8 px-5 rounded-xl transition-all duration-300 hover:bg-white/5 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-[28px] mx-auto mb-5 transition-all duration-300 hover:bg-white/20 hover:border-white">
                {item.icon}
              </div>
              <h3 className="text-[28px] font-extrabold text-white mb-3">{item.stat}</h3>
              <p className="text-sm leading-relaxed text-white/65 max-w-[240px] mx-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}