"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const STUDENT_VOICES = [
  {
    quote: "Joining the 1 month boot camp has been a game-changer for me. The courses are comprehensive and the instructors are incredibly knowledgeable.",
    name: "Precious",
    location: "Nigeria",
    highlight: "1 Month Bootcamp"
  },
  {
    quote: "Peach Hedging Trading Academy provided the perfect foundation. The hands-on experience has boosted my confidence significantly.",
    name: "Bambi Jane",
    location: "Canada",
    highlight: "Structured Learning"
  },
  {
    quote: "A nice trading floor where I can collaborate with other experienced traders. It is a total game changer for me.",
    name: "Peter",
    location: "Nigeria",
    highlight: "Collaborative Floor"
  },
  {
    quote: "The first time I tried this trading floor academy, I was hooked. Everything was so fabulous and easy.",
    name: "Joshua",
    location: "Canada",
    highlight: "Institutional Access"
  }
];

export default function StudentCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="bg-[#050505] py-20 relative overflow-hidden border-b border-white/5">
      
      {/* THE PROTON TOP BORDER */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/30 z-20">
        <motion.div 
          initial={{ left: "-15%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 w-[15%] h-full bg-gradient-to-r from-transparent via-[#FEE6B4] to-transparent shadow-[0_0_20px_#D4AF37]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* CENTRALIZED HEADER */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl text-white italic mb-4"
          >
            Voices from the <span className="text-[#D4AF37] not-italic font-bold">Floor</span>
          </motion.h2>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mb-6 opacity-50" />
          <p className="text-white/70 font-[family-name:var(--font-montserrat)] text-base font-light tracking-wide max-w-2xl mx-auto">
            Real results from our global community of funded traders.
          </p>
        </div>

        {/* CAROUSEL VIEWPORT */}
        <div className="relative group">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-8">
              {STUDENT_VOICES.map((student, i) => (
                <div 
                  key={i} 
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 md:pl-8"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-white/[0.03] border border-white/10 p-6 md:p-8 rounded-xl h-full flex flex-col hover:border-[#D4AF37]/40 transition-all duration-500 shadow-xl backdrop-blur-sm"
                  >
                    <Quote className="text-[#D4AF37] mb-4 opacity-80" size={24} />
                    
                    <p className="font-[family-name:var(--font-montserrat)] text-white/90 text-base md:text-lg leading-relaxed italic mb-6 font-light">
                      "{student.quote}"
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
                      <div>
                        <h4 className="text-white font-bold text-sm tracking-tight">{student.name}</h4>
                        <p className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                          {student.location}
                        </p>
                      </div>
                      <div className="h-8 w-[1px] bg-white/10 mx-3" />
                      <span className="text-white/40 font-mono text-[9px] uppercase tracking-widest font-bold">
                        {student.highlight}
                      </span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* FLOATING CONTROLS (Positioned for lower profile) */}
          <div className="flex justify-center gap-6 mt-12">
            <button 
              onClick={scrollPrev}
              className="p-3 rounded-full border border-white/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={scrollNext}
              className="p-3 rounded-full border border-white/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}