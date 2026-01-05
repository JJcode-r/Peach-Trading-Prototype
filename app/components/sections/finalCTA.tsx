"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1611974715853-2b8ef9a3d136?q=80&w=2070", 
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
  "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1974"
];

export default function ScarcityCTA() {
  const [mounted, setMounted] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    const bgTimer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % BG_IMAGES.length);
    }, 8000);

    return () => {
      clearInterval(timer);
      clearInterval(bgTimer);
    };
  }, []);

  // Explicitly typing variants to allow the cubic-bezier array [number, number, number, number]
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.4, 
        ease: [0.16, 1, 0.3, 1], // Fixed: This now passes the type check
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  if (!mounted) return <div className="py-20 md:py-32 bg-[#050505]" />; 

  return (
    <section className="relative py-24 md:py-32 bg-[#050505] overflow-hidden border-t border-white/5">
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={imageIndex}
            src={BG_IMAGES[imageIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: 0.4, 
              scale: 1 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505] z-10" />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto text-center px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="p-10 md:p-16 rounded-3xl border border-[#D4AF37]/20 bg-white/[0.02] backdrop-blur-3xl relative overflow-hidden"
        >
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          
          <motion.h2 variants={itemVariants} className="font-[family-name:var(--font-cormorant)] text-4xl md:text-7xl text-white mb-6 leading-tight italic font-medium">
            Secure Your <span className="not-italic text-[#D4AF37] font-bold">Institutional</span> Seat
          </motion.h2>
          
          <motion.p variants={itemVariants} className="font-[family-name:var(--font-montserrat)] text-white/70 text-base md:text-xl mb-12 max-w-xl mx-auto font-light">
            Our next intake is limited to 20 traders. <br /> Window closes in:
          </motion.p>

          {/* TIMER GRID */}
          <motion.div variants={itemVariants} className="flex justify-center gap-6 md:gap-12 mb-16">
            {[
              { label: "HRS", value: timeLeft.hours },
              { label: "MIN", value: timeLeft.minutes },
              { label: "SEC", value: timeLeft.seconds },
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-[family-name:var(--font-cormorant)] text-[#D4AF37] tabular-nums font-bold">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-[12px] tracking-[0.4em] text-white/40 mt-3 font-mono font-bold uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA BUTTON */}
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto px-12 py-5 rounded-full overflow-hidden bg-gradient-to-tr from-[#D4AF37] via-[#FEE6B4] to-[#B59410] shadow-[0_20px_50px_rgba(212,175,55,0.2)]"
            >
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="relative z-10 font-mono font-black text-black uppercase tracking-[0.2em] text-xs md:text-sm">
                Apply for Enrolment
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}