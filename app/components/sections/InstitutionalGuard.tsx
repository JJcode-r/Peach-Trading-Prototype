"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldCheck, Target, PenTool, Award } from "lucide-react";

export default function InstitutionalGuard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Explicitly typing variants to resolve the [number, number, number, number] error
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 1 }
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] // Now correctly recognized as Cubic Bezier
      } 
    }
  };

  // Using hex codes directly to prevent build errors if tailwind config aliases aren't loaded
  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden border-t border-white/5">
      
      {/* Background Layer (55% Visibility) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          alt="Executive Environment"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Portrait Block */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="relative"
          >
            <motion.div 
              variants={fadeUp}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#D4AF37]/20 group shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-[2000ms]"
                alt="Head Mentor"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: 1, duration: 1 }}
                   className="flex items-center gap-3"
                >
                  <PenTool className="text-[#D4AF37]" size={20} />
                  <span className="font-[family-name:var(--font-cormorant)] text-2xl text-[#D4AF37] italic tracking-tight font-bold">Chief Strategist</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Experience Badge */}
            <motion.div 
              variants={fadeUp}
              className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 bg-[#0A1428]/90 backdrop-blur-xl border border-[#D4AF37]/30 p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <Award className="text-[#D4AF37] mb-3" size={32} />
              <p className="text-3xl font-[family-name:var(--font-cormorant)] text-white font-bold">12+ YRS</p>
              <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.3em] font-bold">Market Depth</p>
            </motion.div>
          </motion.div>

          {/* RIGHT: Biography & Philosophy */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.span variants={fadeUp} className="text-[#D4AF37] font-mono text-xs font-bold tracking-[0.5em] uppercase mb-6 block">
              // The Architect
            </motion.span>
            
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-[family-name:var(--font-cormorant)] text-white mb-8 leading-[1.1] italic font-medium">
              A Legacy Built on <span className="not-italic text-[#D4AF37] font-bold">Capital Preservation</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-6 text-white/70 font-[family-name:var(--font-montserrat)] text-lg mb-12 font-light leading-relaxed">
              <p>
                Founded by a former proprietary desk trader, the Academy was built to strip away the <span className="text-white font-medium">"retail noise"</span> that keeps 95% of traders in a cycle of loss.
              </p>
              <p>
                Our philosophy is simple: Market patterns are secondary. <span className="text-[#D4AF37] font-medium italic">Liquidity and central bank sentiment</span> are primary. We teach you to trade alongside the money, not against it.
              </p>
            </motion.div>

            {/* Risk Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <ShieldCheck />, title: "Risk First", desc: "Every trade begins with an exit. We prioritize survival over speculative gains." },
                { icon: <Target />, title: "Precision Only", desc: "We wait for high-probability institutional traps rather than chasing volume." }
              ].map((pillar, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeUp}
                  className="p-6 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-[#D4AF37]/30 transition-colors group"
                >
                  <div className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-500">
                    {pillar.icon}
                  </div>
                  <h4 className="text-white font-[family-name:var(--font-cormorant)] text-xl mb-2 italic font-bold">{pillar.title}</h4>
                  <p className="text-[11px] text-white/40 leading-relaxed uppercase tracking-wider font-bold">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Milestone Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { year: "2014", event: "Prop Desk Analyst" },
            { year: "2018", event: "Senior Portfolio Lead" },
            { year: "2021", event: "Algorithmic Advisor" },
            { year: "2026", event: "Academy Director" },
          ].map((item, i) => (
            <div key={i} className="text-center md:text-left group">
              <p className="text-[#D4AF37] font-[family-name:var(--font-cormorant)] text-3xl mb-1 font-bold group-hover:translate-x-1 transition-transform">{item.year}</p>
              <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase font-mono font-black">{item.event}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}