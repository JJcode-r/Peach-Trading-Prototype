"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// NIGERIAN INSTITUTIONAL DATASET
const PARTNERS = [
  { name: "NGX GROUP", role: "Equities & Derivatives" },
  { name: "FMDQ GOLD", role: "FX & Debt Capital" },
  { name: "ACCESS BANK", role: "Liquidity Provider" },
  { name: "ZENITH BANK", role: "Tier-1 Clearing" },
  { name: "SEC NIGERIA", role: "Regulatory Standard" },
  { name: "CBN", role: "Monetary Framework" },
];

export default function GlobalTrustBar() {
  const container = useRef<HTMLDivElement>(null);
  const revealLine = useRef<HTMLDivElement>(null);
  const protonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      // 1. THE PROTON PULSE (Always Active)
      gsap.to(protonRef.current, {
        x: "100vw",
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. THE MECHANICAL APERTURE ENTRANCE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
      });

      tl.set(".reveal-content", { opacity: 0 })
        .fromTo(revealLine.current, 
          { scaleX: 0, opacity: 0 }, 
          { scaleX: 1, opacity: 1, duration: 1.2, ease: "expo.inOut" }
        )
        // The "Vault Split" - expanding from the center line to full height
        .to(revealLine.current, { 
          height: "100%", 
          opacity: 0.03, 
          duration: 1.4, 
          ease: "expo.inOut" 
        })
        .to(".reveal-content", { 
          opacity: 1, 
          duration: 0.8 
        }, "-=1")
        .from(".trust-text-element", {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out"
        }, "-=0.6");

      // 3. KINETIC DRIFT
      gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 40,
        ease: "none",
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={container} 
      className="relative w-full h-[30vh] min-h-[300px] bg-[#060B14] overflow-hidden flex items-center justify-center"
    >
      {/* THE MECHANICAL APERTURE LINE (Vault Gate) */}
      <div 
        ref={revealLine}
        className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#D4AF37] z-50 pointer-events-none origin-center"
      />

      {/* THE GOLD PROTON TRACK (Top Border) */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-[#D4AF37]/20 z-20 overflow-hidden">
        <div 
          ref={protonRef}
          className="absolute top-0 left-[-150px] w-64 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_#D4AF37,0_0_8px_#fff]"
        />
      </div>

      <div className="reveal-content relative z-10 w-full flex flex-col items-center justify-between h-full py-10">
        
        {/* HEADING */}
        <div className="trust-text-element text-center px-6">
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl text-white font-light leading-none tracking-tight">
            Trusted in <span className="text-[#D4AF37] italic font-medium">Bayelsa</span> & Across Nigeria.
          </h2>
        </div>

        {/* NIGERIAN INSTITUTIONAL SPOTLIGHT MARQUEE */}
        <div className="trust-text-element relative w-full h-20 flex items-center justify-center">
          <div 
            className="w-full h-full flex items-center overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 35%, black 50%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.1) 100%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 38%, black 50%, rgba(0,0,0,0.1) 62%, rgba(0,0,0,0.1) 100%)'
            }}
          >
            <div className="marquee-inner flex whitespace-nowrap items-center">
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className="flex gap-40 items-center px-20">
                  {PARTNERS.map((partner, i) => (
                    <div key={i} className="flex flex-col items-center min-w-[350px]">
                      <span className="text-white text-3xl md:text-5xl font-black tracking-[-0.03em] uppercase leading-none">
                        {partner.name}
                      </span>
                      <span className="text-[8px] uppercase tracking-[0.6em] text-[#D4AF37] mt-3 font-bold opacity-90">
                        {partner.role}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-12 bg-[#D4AF37]/40 shadow-[0_0_10px_#D4AF37]" />
        </div>

        {/* AUTHORITY FOOTER */}
        <div className="trust-text-element flex flex-col items-center px-6">
          <div className="px-10 py-2 border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-sm mb-3">
             <span className="text-[10px] text-white font-bold uppercase tracking-[0.5em]">
              Mentorship — <span className="text-[#D4AF37]">Not Signals</span>
            </span>
          </div>
          <p className="text-[9px] text-white/70 font-medium font-mono uppercase tracking-[0.4em] text-center">
            South-South Nigeria <span className="text-[#D4AF37]/40">•</span> Regional Research Floor
          </p>
        </div>
      </div>

      {/* AMBIENT SPOTLIGHT GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.02)_0%,_transparent_60%)] pointer-events-none" />
    </section>
  );
}