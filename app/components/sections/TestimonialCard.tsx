"use client";

import { motion, Variants } from "framer-motion"; // Added Variants import
import { CheckCircle2, Globe, Award } from "lucide-react";

const LIVE_PAYOUTS = [
  { name: "Alex M.", amount: "$12,450", firm: "Topstep", time: "2m ago" },
  { name: "Sarah K.", amount: "$8,200", firm: "MyFundedFX", time: "5m ago" },
  { name: "James L.", amount: "$25,000", firm: "FTMO", time: "12m ago" },
  { name: "David R.", amount: "$5,100", firm: "Apex", time: "15m ago" },
];

const CERTIFICATES = [
  { title: "Master Trader Certificate", firm: "TopTier Capital", student: "Marcus J." },
  { title: "Funded $100k Account", firm: "The5ers", student: "Elena V." },
  { title: "Consistent Payout Award", firm: "MyFundedFX", student: "Raj P." },
  { title: "Institutional Badge", firm: "FTMO", student: "Thomas K." },
];

// Added explicit : Variants type
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

// Added explicit : Variants type
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export default function ProfitWall() {
  return (
    <section className="relative w-full bg-[#050505] py-24 md:py-32 overflow-hidden">
      
      {/* VIGNETTE GRADIENT */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_#0F0F0F_0%,_#050505_100%)] opacity-90" />

      {/* PROTON TOP BORDER */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/30 z-20">
        <motion.div 
          initial={{ left: "-15%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 w-[15%] h-full bg-gradient-to-r from-transparent via-[#FEE6B4] to-transparent shadow-[0_0_20px_#D4AF37]" 
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-[1400px] mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* HEADER BLOCK */}
        <motion.div variants={itemVariants} className="text-center mb-16 md:mb-24">
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl text-white font-medium italic leading-tight mb-6">
            The <span className="text-[#D4AF37] not-italic font-bold">Wall</span> of Proof
          </h2>
          <p className="max-w-2xl mx-auto text-white/70 font-[family-name:var(--font-montserrat)] text-base md:text-xl leading-relaxed font-light">
            Real traders. Real payouts. Irrefutable <span className="text-white font-medium">third-party audits</span> from the world’s leading prop firms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. LIVE LEDGER */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-4 bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-3xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-5">
              <h3 className="font-mono font-bold text-[#D4AF37] text-xs tracking-widest uppercase flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full animate-pulse shadow-[0_0_12px_#22C55E]" />
                Live Audit Feed
              </h3>
              <Globe size={16} className="text-white/40" />
            </div>
            
            <div className="space-y-7">
              {LIVE_PAYOUTS.map((payout, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <div className="space-y-1">
                    <p className="text-white font-semibold text-base">{payout.name}</p>
                    <p className="text-[11px] text-[#D4AF37] tracking-wider uppercase font-bold font-mono">{payout.firm}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[#FEE6B4] font-[family-name:var(--font-cormorant)] text-2xl font-bold italic">{payout.amount}</p>
                    <p className="text-[11px] text-white/40 uppercase font-bold font-mono">{payout.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-10 py-4 bg-white/5 border border-[#D4AF37]/30 rounded-sm text-[#D4AF37] font-bold font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
              View Audit Logs
            </button>
          </motion.div>

          {/* 2. CERTIFICATE SHOWCASE */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CERTIFICATES.map((cert, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, borderColor: "rgba(212, 175, 55, 0.5)", backgroundColor: "rgba(255,255,255,0.04)" }}
                className="relative min-h-[260px] bg-[#0F0F0F] border border-white/10 rounded-xl p-8 flex flex-col justify-between group overflow-hidden transition-all duration-500 shadow-xl"
              >
                <Award className="absolute -right-4 -bottom-4 w-32 h-32 text-[#D4AF37]/10 rotate-12 group-hover:text-[#D4AF37]/20 transition-all duration-500" />
                
                <div className="relative z-10">
                  <CheckCircle2 className="text-[#D4AF37] mb-5" size={24} />
                  <h4 className="font-[family-name:var(--font-cormorant)] text-3xl text-white group-hover:text-[#FEE6B4] transition-colors italic leading-tight font-medium">{cert.title}</h4>
                  <p className="text-[11px] text-[#D4AF37] tracking-[0.2em] uppercase mt-3 font-bold font-mono">{cert.firm}</p>
                </div>

                <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-5">
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold font-mono">Issued to</p>
                    <p className="text-white font-sans text-base font-medium">{cert.student}</p>
                  </div>
                  <div className="text-[10px] text-[#D4AF37]/80 font-mono font-bold">
                    ID: #TA-{4902 + i}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* 3. PERFORMANCE METRICS */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-0 border-y border-white/10 bg-white/[0.02]"
        >
          {[
            { label: "Total Payouts", val: "$4.2M+" },
            { label: "Avg. Win Rate", val: "72.4%" },
            { label: "Students Funded", val: "1,240+" },
            { label: "Audit Accuracy", val: "100%" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-10 border-r border-white/10 last:border-r-0">
              <p className="text-4xl md:text-5xl font-[family-name:var(--font-cormorant)] text-[#D4AF37] mb-2 font-bold italic tracking-tight">{stat.val}</p>
              <p className="text-[11px] text-white/60 tracking-[0.3em] uppercase font-bold font-mono">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}