"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MarketPulse() {
  const sectionRef = useRef(null);
  const protonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. THE PROTON LINE (Infinite Gold Movement)
      gsap.to(protonRef.current, {
        x: "100vw",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. THE MECHANICAL SHUTTER REVEAL
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          // ONLY PLAY ONCE: This prevents the annoying re-triggering
          toggleActions: "play none none none", 
        }
      });

      tl.to(".shutter-layer", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "expo.inOut",
        stagger: 0.2
      })
      .from(".pulse-heading", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      }, "-=1")
      .from(".pulse-data", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#04080F] py-32 overflow-hidden">
      
      {/* GOLD PROTON TRACK */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/30 z-30">
        <div 
          ref={protonRef}
          className="absolute top-0 left-[-150px] w-64 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_#D4AF37]"
        />
      </div>

      <div className="max-w-[1800px] mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="mb-16 overflow-hidden">
          <h2 className="pulse-heading font-[family-name:var(--font-cormorant)] text-7xl md:text-[10rem] text-white font-light tracking-tighter leading-none">
            Market <span className="italic text-[#D4AF37]">Pulse.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MAIN IMAGE WINDOW */}
          <div className="lg:col-span-8 relative aspect-[16/9] bg-[#080E1A] border border-white/10 overflow-hidden">
            {/* MECHANICAL SHUTTER */}
            <div className="shutter-layer absolute inset-0 bg-[#0D1424] z-20" />
            
            <img 
              src="https://images.unsplash.com/photo-1444653356734-79fa988151c0?q=80&w=2070&auto=format&fit=crop" 
              alt="High-End Trading Terminal" 
              className="w-full h-full object-cover brightness-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
            
            <div className="absolute bottom-10 left-10 z-20 pulse-data">
              <h3 className="text-4xl md:text-6xl text-white font-black uppercase tracking-tighter mb-2">London Session</h3>
              <p className="text-[#D4AF37] font-mono text-xs uppercase tracking-[0.5em]">Focus: EURUSD / GBPUSD</p>
            </div>
          </div>

          {/* SIDE DATA PANEL */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="pulse-data flex-1 p-10 bg-white/[0.02] border border-white/10 relative">
              <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
              
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.4em] mb-12 block">Bias Overview</span>
              
              <h4 className="text-5xl text-white font-black mb-4 tracking-tighter">EURUSD</h4>
              <p className="text-white/60 text-lg italic font-[family-name:var(--font-cormorant)] mb-10 border-b border-white/5 pb-4">Bullish Order Flow</p>

              <p className="text-white/30 text-[11px] leading-relaxed uppercase tracking-widest">
                HTF Narrative: Mitigating H4 Demand Zone. High-probability retracement anticipated during NY overlap.
              </p>
            </div>

            {/* SECONDARY IMAGE WINDOW */}
            <div className="relative flex-1 aspect-video bg-[#080E1A] border border-white/10 overflow-hidden">
              <div className="shutter-layer absolute inset-0 bg-[#0D1424] z-20" />
              <img 
                src="https://images.unsplash.com/photo-1611974714658-058f1376046e?q=80&w=2070&auto=format&fit=crop" 
                alt="Institutional Analysis" 
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20 pulse-data">
                <span className="text-white text-[10px] font-black uppercase tracking-[1em] px-4 py-2 bg-black/60 backdrop-blur-sm border border-white/10">High Volatility</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}