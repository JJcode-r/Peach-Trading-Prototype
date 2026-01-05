"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Instagram, Twitter, Linkedin, ShieldCheck, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function InstitutionalFooter() {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] pt-24 pb-12 relative overflow-hidden border-t border-[#D4AF37]/20">
      {/* Background Depth Effect - Slightly more visible gold glow */}
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <motion.div whileHover="shimmer" className="relative inline-block mb-6 group cursor-pointer">
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-[#D4AF37] tracking-tighter font-bold italic">
               Peach <span className="text-white not-italic ml-1">Trading</span> Floor
              </h2>
              <motion.div 
                variants={{ shimmer: { x: ["-100%", "200%"] } }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
              />
            </motion.div>
            <p className="font-[family-name:var(--font-montserrat)] text-white/70 text-sm leading-relaxed font-light">
              Empowering disciplined traders with institutional-grade research and precision execution strategies.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-mono font-bold text-[#D4AF37] uppercase tracking-[0.2em] text-[11px] mb-8">The Academy</h4>
            <ul className="space-y-4 font-[family-name:var(--font-montserrat)] text-sm text-white/80 font-medium">
              {["Programs", "Institutional Research", "Profit Wall", "Mentorship"].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase().replace(" ", "-")}`} className="hover:text-[#D4AF37] transition-colors duration-300">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verification Links */}
          <div>
            <h4 className="font-mono font-bold text-[#D4AF37] uppercase tracking-[0.2em] text-[11px] mb-8">Verification</h4>
            <ul className="space-y-4 font-[family-name:var(--font-montserrat)] text-sm text-white/80 font-medium">
              {["Risk Disclosure", "Privacy Policy", "Terms of Service", "Audit Logs"].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-[#D4AF37] transition-colors duration-300">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h4 className="font-mono font-bold text-[#D4AF37] uppercase tracking-[0.2em] text-[11px] mb-8">Intelligence Briefing</h4>
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-transparent border-b border-[#D4AF37]/40 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans text-sm placeholder:text-white/40 font-medium"
              />
              <button type="submit" className="absolute right-0 bottom-3 text-[#D4AF37] hover:text-white transition-colors p-1">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* SINGLE COLUMN DISCLAIMER */}
        <div className="pt-12 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 text-[#D4AF37]">
                <ShieldCheck size={18} />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">Regulatory Disclaimer</span>
              </div>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-[#D4AF37] text-[11px] uppercase tracking-widest font-black hover:text-white transition-colors bg-[#D4AF37]/10 px-3 py-1 rounded"
              >
                {isExpanded ? "Read Less" : "Read More"}
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <ChevronDown size={14} />
                </motion.div>
              </button>
            </div>

            <div className="text-[12px] text-white/60 leading-relaxed font-[family-name:var(--font-montserrat)] space-y-5 font-light">
              <p>
                <span className="text-white font-bold uppercase tracking-wider mr-1">No Financial Advice:</span> The information provided on this website is for educational and informational purposes only. It is not intended as, and shall not be understood or construed as, financial advice. We are not a licensed financial advisor, broker, dealer, or any other regulated financial professional. Any financial decisions you make are solely at your own risk.
              </p>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden space-y-5"
                  >
                    <p>
                      <span className="text-white font-bold uppercase tracking-wider mr-1">No Investment Services:</span> We do not accept money for investment purposes nor do we trade on behalf of individuals. All services provided are purely educational. We do not offer any personalized investment advice, trading tips, or recommendations.
                    </p>
                    <p>
                      <span className="text-white font-bold uppercase tracking-wider mr-1">Risk Acknowledgment:</span> Trading forex and other financial instruments involves a high level of risk and may not be suitable for all investors. The value of investments can go up as well as down. Past performance is not indicative of future results.
                    </p>
                    <p>
                      <span className="text-white font-bold uppercase tracking-wider mr-1">Educational Purpose:</span> All information and materials available on this website, including but not limited to courses, seminars, and trading floor activities, are provided for educational purposes only.
                    </p>
                    <p>
                      <span className="text-white font-bold uppercase tracking-wider mr-1">Limitation of Liability:</span> While we strive to provide accurate and up-to-date information, we make no warranties regarding the completeness or accuracy of the information. Under no circumstances shall we be liable for any loss or damage.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[11px] text-white/50 font-mono tracking-widest uppercase font-bold">
            &copy; {currentYear} Trading Academy. Institutional Excellence.
          </p>
          <div className="flex gap-8 text-[#D4AF37]">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <motion.a key={i} href="#" whileHover={{ y: -3, color: "#FFFFFF" }} className="transition-colors">
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}