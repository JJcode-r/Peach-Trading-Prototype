"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Methodology() {
  const sectionRef = useRef(null);
  const protonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. GOLD PROTON LINE (Visual Continuity)
      gsap.to(protonRef.current, {
        x: "100vw",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. THE MECHANICAL SLIDE ENTRANCE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });

      // Header Slides In from Left
      tl.from(".slide-header", {
        x: -100,
        opacity: 0,
        clipPath: "inset(0 100% 0 0)", // Slides out from a clip
        duration: 1.4,
        ease: "expo.out"
      })
      // Paragraph Slides In from Right
      .from(".slide-para", {
        x: 100,
        opacity: 0,
        clipPath: "inset(0 0 0 100%)",
        duration: 1.4,
        ease: "expo.out"
      }, "-=1.1")
      // Cards Slide Up with a Stagger
      .from(".methodology-card", {
        y: 150,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out"
      }, "-=1");

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#04080F] py-24 md:py-32 overflow-hidden border-b border-white/5">
      
      {/* THE GOLD PROTON TRACK */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/20 z-30">
        <div 
          ref={protonRef}
          className="absolute top-0 left-[-150px] w-64 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_#D4AF37]"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* CENTRALIZED HEADER */}
        <div className="text-center mb-20 md:mb-28 max-w-4xl mx-auto overflow-hidden">
          <h2 className="slide-header font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl text-white font-light tracking-tight leading-none mb-8">
            The <span className="italic text-[#D4AF37]">Peach</span> Methodology
          </h2>
          
          <p className="slide-para font-[family-name:var(--font-montserrat)] text-white/60 text-base md:text-lg font-light leading-relaxed tracking-wide">
            We operate at the core of the financial markets. Most academies teach you to trade the chart—we teach you to trade the <span className="text-[#D4AF37] font-medium uppercase tracking-widest text-xs md:text-sm">Logic</span>. By deconstructing institutional order flow, we provide a sovereign path to profitability.
          </p>
        </div>

        {/* PHOTO-CENTRIC GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Institutional Narrative",
              img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
              desc: "Analysis into Central Bank footprints and Smart Money logic."
            },
            {
              title: "The Bayelsa Hub",
              img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
              desc: "A physical epicenter for collaborative regional research."
            },
            {
              title: "Risk Engineering",
              img: "https://images.unsplash.com/photo-1551288049-bbda4833effb?q=80&w=2070&auto=format&fit=crop",
              desc: "Mathematical models used by Tier-1 clearing houses."
            }
          ].map((item, i) => (
            <div key={i} className="methodology-card group relative aspect-[4/5] overflow-hidden border border-white/10 bg-black">
              
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />

              {/* OVERLAY: Persistent for Mobile / Hover for Desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent md:via-transparent md:bg-black/0 md:group-hover:bg-black/70 transition-all duration-500 z-10" />

              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
                <h3 className="font-[family-name:var(--font-cormorant)] text-3xl text-white font-medium italic mb-2 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h3>
                
                <p className="font-[family-name:var(--font-montserrat)] text-[10px] md:text-[11px] uppercase tracking-widest text-[#D4AF37] md:text-white/0 md:group-hover:text-[#D4AF37] transition-all duration-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}