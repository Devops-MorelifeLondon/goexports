"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./MotionWrappers";

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "Premium Textiles Ltd",
    country: "India",
    image: "👔",
    content: "GoExports transformed our export business. Within 3 months, we connected with 15 verified buyers across Europe and Middle East. Our export revenue grew by 200%!",
    rating: 5,
    industry: "Textiles",
    results: "200% Revenue Growth"
  },
  {
    name: "Maria Rodriguez",
    company: "Organic Foods International",
    country: "Brazil", 
    image: "👩‍💼",
    content: "The quality of buyer leads on GoExports is exceptional. We found distributors in 8 countries and our organic products are now in premium retail chains globally.",
    rating: 5,
    industry: "Agro & Farm",
    results: "8 New Markets"
  },
  {
    name: "Chen Wei",
    company: "Tech Manufacturing Co",
    country: "China",
    image: "👨‍💻",
    content: "As a manufacturer, finding reliable international buyers was challenging. GoExports made it simple. We now have consistent orders from verified buyers worldwide.",
    rating: 5,
    industry: "Electronics",
    results: "Consistent Orders"
  },
  {
    name: "Ahmed Hassan",
    company: "Global Chemical Supplies",
    country: "UAE",
    image: "🧪",
    content: "The platform's verified buyer network helped us expand from regional to global markets. The support team is excellent and always helps us find the right buyers.",
    rating: 5,
    industry: "Chemicals",
    results: "Global Expansion"
  },
  {
    name: "Sarah Johnson",
    company: "Fashion Forward Exports",
    country: "USA",
    image: "👗",
    content: "GoExports connected us with high-end fashion retailers in Asia and Europe. Our brand recognition has grown tremendously thanks to these international partnerships.",
    rating: 5,
    industry: "Fashion",
    results: "Brand Recognition"
  },
  {
    name: "Priya Sharma",
    company: "Herbal Wellness Products",
    country: "India",
    image: "🌿",
    content: "The platform helped us find buyers who value quality herbal products. We've established long-term relationships with importers who appreciate our traditional formulations.",
    rating: 5,
    industry: "Ayurvedic",
    results: "Long-term Partnerships"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-[#FAFAFA] text-[#0F1111] py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block bg-[#111111] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
              Exporters Growing Globally
            </h2>
            <p className="text-center text-[#565959] text-base max-w-[560px] mx-auto leading-relaxed">
              Join thousands of successful exporters who found verified international buyers through our global sourcing platform.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white border border-[#e7e7e7] rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-[#565959] text-sm leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#111111] rounded-full flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-[#0F1111]">{testimonial.name}</div>
                    <div className="text-xs text-[#565959]">{testimonial.company}</div>
                    <div className="text-xs text-[#999]">{testimonial.country} • {testimonial.industry}</div>
                  </div>
                </div>

                {/* Results Badge */}
                <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1 text-xs font-semibold text-green-700">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {testimonial.results}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Stats Section */}
        <FadeIn delay={0.5}>
          <div className="mt-16 bg-white border border-[#e7e7e7] rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#0F1111] mb-2">10,000+</div>
                <div className="text-sm text-[#565959]">Active Exporters</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0F1111] mb-2">50,000+</div>
                <div className="text-sm text-[#565959]">Verified Buyers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0F1111] mb-2">$2.5B+</div>
                <div className="text-sm text-[#565959]">Trade Volume</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0F1111] mb-2">95%</div>
                <div className="text-sm text-[#565959]">Success Rate</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
