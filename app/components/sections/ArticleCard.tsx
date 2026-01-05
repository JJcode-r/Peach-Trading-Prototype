"use client";

import { motion, Variants } from "framer-motion";
import NextImage from "next/image";
import { Zap, ShieldAlert, BarChart3, Database, ChevronRight } from "lucide-react";

const INTEL_PILLARS = [
  {
    title: "Order Flow Dynamics",
    desc: "Track institutional buy/sell imbalances before they hit the retail charts with surgical precision.",
    icon: <BarChart3 className="text-[#D4AF37]" size={24} strokeWidth={2.5} />,
    stats: "98.2% Accuracy"
  },
  {
    title: "Liquidity Heatmaps",
    desc: "Visualizing the 'Dark Pools' where central banks and hedge funds position their largest orders.",
    icon: <Database className="text-[#D4AF37]" size={24} strokeWidth={2.5} />,
    stats: "Real-time Feed"
  },
  {
    title: "Sentiment Algos",
    desc: "Proprietary algorithms scanning global news and social sentiment for high-impact volatility.",
    icon: <Zap className="text-[#D4AF37]" size={24} strokeWidth={2.5} />,
    stats: "Ultra-Low Latency"
  }
];

// Explicitly typing variants to avoid the 'ease' string error
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export default function ResearchHub() {
  return (
    <section className="relative py-24 md:py-32 bg-[#050505] overflow-hidden border-b border-white/5">
      
      {/* THE PROTON TOP BORDER */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/30 z-20">
        <motion.div 
          initial={{ left: "-15%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 w-[15%] h-full bg-gradient-to-r from-transparent via-[#FEE6B4] to-transparent shadow-[0_0_20px_#D4AF37]" 
        />
      </div>

      {/* BACKGROUND DEPTH */}
      <div className="absolute inset-0 z-0">
        <NextImage 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070"
          alt="Technical Infrastructure"
          fill
          className="object-cover opacity-[0.08] mix-blend-lighten"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <motion.div 
        className="relative z-10 max-w-[1400px] mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: CONTENT BLOCK */}
          <motion.div className="lg:col-span-5" variants={itemVariants}>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl text-white mb-8 leading-[1.1] italic font-medium">
              Access the <span className="not-italic text-[#D4AF37] font-bold">Institutional</span> Edge
            </h2>
            
            <p className="text-white/80 font-[family-name:var(--font-montserrat)] text-base md:text-xl mb-10 leading-relaxed max-w-xl font-light">
              We don't teach "retail patterns." We provide the <span className="text-white font-bold">market intelligence</span> used by Tier-1 desks to identify liquidity traps.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-6 rounded-sm bg-[#D4AF37]/5 border border-[#D4AF37]/20 backdrop-blur-md shadow-2xl">
                <ShieldAlert className="text-[#D4AF37] shrink-0" size={24} />
                <p className="text-[12px] text-white/90 font-mono uppercase tracking-widest leading-relaxed font-bold">
                  <span className="text-[#D4AF37]">Live Intel:</span> USD Liquidity cycle reaching terminal exhaustion. Position for reversals.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: THE PILLARS GRID */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {INTEL_PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ borderColor: "rgba(212, 175, 55, 0.6)", y: -8, backgroundColor: "rgba(255,255,255,0.04)" }}
                className={`p-10 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group transition-all duration-500 ${i === 2 ? 'md:col-span-2' : ''}`}
              >
                {/* SCANLINE EFFECT */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[2000ms] pointer-events-none" />

                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 rounded-lg bg-black/80 border border-[#D4AF37]/40 shadow-inner">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-mono font-black text-[#D4AF37] uppercase tracking-widest px-3 py-1.5 border border-[#D4AF37]/40 rounded bg-[#D4AF37]/10">
                    {pillar.stats}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-cormorant)] text-3xl text-white mb-4 italic tracking-wide font-bold group-hover:text-[#FEE6B4] transition-colors">{pillar.title}</h3>
                <p className="text-sm md:text-base text-white/70 font-[family-name:var(--font-montserrat)] leading-relaxed mb-8 font-medium">
                  {pillar.desc}
                </p>

                <div className="flex items-center text-[#D4AF37] text-[11px] font-black tracking-[0.3em] uppercase cursor-pointer group/link font-mono">
                  Enter Dossier 
                  <ChevronRight size={16} className="ml-2 group-hover/link:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM: SYSTEM STATUS */}
        <motion.div variants={itemVariants} className="mt-24 relative h-16 md:h-20 rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-black/80 flex items-center justify-center">
          <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-[linear-gradient(90deg,transparent_0%,#D4AF37_50%,transparent_100%)] animate-pulse" />
          </div>
          <p className="relative z-10 font-mono text-[9px] md:text-xs text-[#D4AF37] tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold text-center px-6">
            // Global Liquidity Feed: Online // Tracking Institutional Volume // System Secure //
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}