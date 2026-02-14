"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./MotionWrappers";

type Country = { name: string; code: string };

const locationData: Record<string, Country[]> = {
  Africa: [
    { name: "Algeria", code: "dz" },{ name: "Angola", code: "ao" },{ name: "Benin", code: "bj" },
    { name: "Botswana", code: "bw" },{ name: "Burkina Faso", code: "bf" },{ name: "Burundi", code: "bi" },
    { name: "Cameroon", code: "cm" },{ name: "Cape Verde", code: "cv" },{ name: "Central African Republic", code: "cf" },
    { name: "Chad", code: "td" },{ name: "Comoros", code: "km" },{ name: "Congo", code: "cg" },
    { name: "Cote D'Ivoire (Ivory Coast)", code: "ci" },{ name: "Democratic Republic of the Congo", code: "cd" },
    { name: "Djibouti", code: "dj" },{ name: "Egypt", code: "eg" },{ name: "Equatorial Guinea", code: "gq" },
    { name: "Eritrea", code: "er" },{ name: "Ethiopia", code: "et" },{ name: "Gabon", code: "ga" },
    { name: "Gambia", code: "gm" },{ name: "Ghana", code: "gh" },{ name: "Guinea", code: "gn" },
    { name: "Guinea-Bissau", code: "gw" },{ name: "Kenya", code: "ke" },{ name: "Lesotho", code: "ls" },
    { name: "Liberia", code: "lr" },{ name: "Libya", code: "ly" },{ name: "Madagascar", code: "mg" },
    { name: "Malawi", code: "mw" },{ name: "Mali", code: "ml" },{ name: "Mauritania", code: "mr" },
    { name: "Mauritius", code: "mu" },{ name: "Mayotte", code: "yt" },{ name: "Morocco", code: "ma" },
    { name: "Mozambique", code: "mz" },{ name: "Namibia", code: "na" },{ name: "Niger", code: "ne" },
    { name: "Nigeria", code: "ng" },{ name: "Reunion", code: "re" },{ name: "Rwanda", code: "rw" },
    { name: "Saint Helena", code: "sh" },{ name: "Sao Tome and Principe", code: "st" },
    { name: "Senegal", code: "sn" },{ name: "Seychelles", code: "sc" },{ name: "Sierra Leone", code: "sl" },
    { name: "Somalia", code: "so" },{ name: "South Africa", code: "za" },{ name: "Sudan", code: "sd" },
    { name: "Swaziland", code: "sz" },{ name: "Tanzania", code: "tz" },{ name: "Togo", code: "tg" },
    { name: "Tunisia", code: "tn" },{ name: "Uganda", code: "ug" },{ name: "Western Sahara", code: "eh" },
    { name: "Zambia", code: "zm" },{ name: "Zimbabwe", code: "zw" },
  ],
  Americas: [
    { name: "Argentina", code: "ar" },{ name: "Bahamas", code: "bs" },{ name: "Barbados", code: "bb" },
    { name: "Belize", code: "bz" },{ name: "Bolivia", code: "bo" },{ name: "Brazil", code: "br" },
    { name: "Canada", code: "ca" },{ name: "Chile", code: "cl" },{ name: "Colombia", code: "co" },
    { name: "Costa Rica", code: "cr" },{ name: "Cuba", code: "cu" },{ name: "Dominican Republic", code: "do" },
    { name: "Ecuador", code: "ec" },{ name: "El Salvador", code: "sv" },{ name: "Guatemala", code: "gt" },
    { name: "Guyana", code: "gy" },{ name: "Haiti", code: "ht" },{ name: "Honduras", code: "hn" },
    { name: "Jamaica", code: "jm" },{ name: "Mexico", code: "mx" },{ name: "Nicaragua", code: "ni" },
    { name: "Panama", code: "pa" },{ name: "Paraguay", code: "py" },{ name: "Peru", code: "pe" },
    { name: "Suriname", code: "sr" },{ name: "Trinidad and Tobago", code: "tt" },
    { name: "United States", code: "us" },{ name: "Uruguay", code: "uy" },{ name: "Venezuela", code: "ve" },
  ],
  Asia: [
    { name: "Afghanistan", code: "af" },{ name: "Bahrain", code: "bh" },{ name: "Bangladesh", code: "bd" },
    { name: "Brunei", code: "bn" },{ name: "Cambodia", code: "kh" },{ name: "China", code: "cn" },
    { name: "India", code: "in" },{ name: "Indonesia", code: "id" },{ name: "Iran", code: "ir" },
    { name: "Iraq", code: "iq" },{ name: "Israel", code: "il" },{ name: "Japan", code: "jp" },
    { name: "Jordan", code: "jo" },{ name: "Kazakhstan", code: "kz" },{ name: "Kuwait", code: "kw" },
    { name: "Kyrgyzstan", code: "kg" },{ name: "Lebanon", code: "lb" },{ name: "Malaysia", code: "my" },
    { name: "Maldives", code: "mv" },{ name: "Mongolia", code: "mn" },{ name: "Myanmar", code: "mm" },
    { name: "Nepal", code: "np" },{ name: "Oman", code: "om" },{ name: "Pakistan", code: "pk" },
    { name: "Philippines", code: "ph" },{ name: "Qatar", code: "qa" },{ name: "Saudi Arabia", code: "sa" },
    { name: "Singapore", code: "sg" },{ name: "South Korea", code: "kr" },{ name: "Sri Lanka", code: "lk" },
    { name: "Syria", code: "sy" },{ name: "Taiwan", code: "tw" },{ name: "Tajikistan", code: "tj" },
    { name: "Thailand", code: "th" },{ name: "Turkmenistan", code: "tm" },
    { name: "United Arab Emirates", code: "ae" },{ name: "Uzbekistan", code: "uz" },
    { name: "Vietnam", code: "vn" },{ name: "Yemen", code: "ye" },
  ],
  Europe: [
    { name: "Albania", code: "al" },{ name: "Austria", code: "at" },{ name: "Belgium", code: "be" },
    { name: "Bosnia", code: "ba" },{ name: "Bulgaria", code: "bg" },{ name: "Croatia", code: "hr" },
    { name: "Czech Republic", code: "cz" },{ name: "Denmark", code: "dk" },{ name: "Estonia", code: "ee" },
    { name: "Finland", code: "fi" },{ name: "France", code: "fr" },{ name: "Germany", code: "de" },
    { name: "Greece", code: "gr" },{ name: "Hungary", code: "hu" },{ name: "Iceland", code: "is" },
    { name: "Ireland", code: "ie" },{ name: "Italy", code: "it" },{ name: "Latvia", code: "lv" },
    { name: "Lithuania", code: "lt" },{ name: "Luxembourg", code: "lu" },{ name: "Malta", code: "mt" },
    { name: "Moldova", code: "md" },{ name: "Montenegro", code: "me" },{ name: "Netherlands", code: "nl" },
    { name: "North Macedonia", code: "mk" },{ name: "Norway", code: "no" },{ name: "Poland", code: "pl" },
    { name: "Portugal", code: "pt" },{ name: "Romania", code: "ro" },{ name: "Serbia", code: "rs" },
    { name: "Slovakia", code: "sk" },{ name: "Slovenia", code: "si" },{ name: "Spain", code: "es" },
    { name: "Sweden", code: "se" },{ name: "Switzerland", code: "ch" },{ name: "Turkey", code: "tr" },
    { name: "Ukraine", code: "ua" },{ name: "United Kingdom", code: "gb" },
  ],
  Oceania: [
    { name: "Australia", code: "au" },{ name: "Fiji", code: "fj" },{ name: "New Zealand", code: "nz" },
    { name: "Papua New Guinea", code: "pg" },{ name: "Samoa", code: "ws" },{ name: "Tonga", code: "to" },
    { name: "Vanuatu", code: "vu" },
  ],
};

const continents = Object.keys(locationData);

export default function Locations() {
  const [activeTab, setActiveTab] = useState(0);
  const activeContinent = continents[activeTab];
  const countries = locationData[activeContinent];

  return (
    <section className="bg-[#0A0A0A] text-white py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <h2 className="text-4xl font-extrabold text-center mb-2 tracking-wide">LOCATIONS</h2>
          <p className="text-center text-white/50 text-[15px] max-w-[480px] mx-auto mb-9">
            We connect sellers with buyers across the globe.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex gap-2.5 justify-center mb-8 flex-wrap">
            {continents.map((c, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(i)}
                className={`px-7 py-3 rounded-lg text-sm font-bold cursor-pointer whitespace-nowrap transition-all duration-200
                  ${activeTab === i
                    ? "bg-white border border-white text-black shadow-lg shadow-white/20"
                    : "bg-transparent border border-white/15 text-white/60 hover:border-white hover:text-white"
                  }`}
              >
                {c}
              </motion.button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-white/[0.04] border border-white/10 rounded-[14px] p-7 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/10 border-l-4 border-l-white py-3.5 px-5 rounded-r-lg mb-6 text-xl font-bold text-white">
                  {activeContinent}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-1">
                  {countries.map((country, i) => (
                    <motion.div
                      key={country.code}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: Math.min(i * 0.015, 0.6), duration: 0.3 }}
                      className="flex items-center gap-2.5 py-1.5 text-sm text-white/80 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      <img
                        src={`https://flagcdn.com/20x15/${country.code}.png`}
                        srcSet={`https://flagcdn.com/40x30/${country.code}.png 2x`}
                        width="20"
                        height="15"
                        alt={`${country.name} flag`}
                        className="rounded-[2px] shrink-0 object-cover"
                        loading="lazy"
                      />
                      {country.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}