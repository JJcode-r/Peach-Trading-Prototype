"use client";

import { useRef, useEffect } from "react";
import NextImage from "next/image"; 
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { isMobile } from "../utils/device";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProgramsBento() {
  const sectionRef = useRef(null);
  const protonRef = useRef(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. PROTON SYNC
      gsap.to(protonRef.current, {
        x: "100vw",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. MECHANICAL CENTRAL ENTRANCE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      tl.from(".central-header", {
        scale: 0.9,
        opacity: 0,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "expo.out"
      })
      .from(".central-para", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1")
      .from(".bento-card", {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.4,
        ease: "power4.out"
      }, "-=0.8")
      .from(".bottom-gold-glow", {
        opacity: 0,
        scale: 0.8,
        duration: 2,
        ease: "power2.out"
      }, "-=1.5");

      // 3. APPLY HERO CTA HOVER ENGINE
      if (!isMobile()) {
        cardRefs.current.forEach((btn) => {
          if (!btn) return;
          btn.addEventListener("mouseenter", () => {
            gsap.to(btn, {
              scale: 1.05,
              y: -4,
              boxShadow: "0 20px 40px -10px rgba(212,175,55,0.5)",
              duration: 0.4,
              ease: "power2.out"
            });
          });
          btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
              scale: 1,
              y: 0,
              boxShadow: "0 10px 30px rgba(212,175,55,0.2)",
              duration: 0.4,
              ease: "power2.out"
            });
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050505] py-32 overflow-hidden border-b border-white/5">
      
      {/* 1. TOP GOLD PROTON TRACK */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/30 z-30">
        <div ref={protonRef} className="absolute top-0 left-[-150px] w-64 h-[1.5px] bg-gradient-to-r from-transparent via-[#FEE6B4] to-transparent shadow-[0_0_20px_#D4AF37]" />
      </div>

      {/* 2. THE BOTTOM RIGHT GOLD GLOW */}
      <div className="bottom-gold-glow absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="central-header font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl text-white font-medium tracking-tight leading-none mb-10">
            Training That Actually <br /> <span className="italic text-[#D4AF37]">Works.</span>
          </h2>
          <p className="central-para font-[family-name:var(--font-montserrat)] text-white/70 text-base md:text-xl font-light leading-relaxed">
            We deliver world-class products and physical infrastructure for talented traders worldwide. Whether you are a newcomer or a professional seeking funding, we elevate your edge.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 h-full md:min-h-[850px]">
          
          {/* CARD 1: 1-MONTH */}
          <div className="bento-card md:col-span-7 md:row-span-1 relative overflow-hidden border border-white/10 group bg-[#080B12] p-10 flex flex-col justify-between">
             <NextImage src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=2070" fill className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-[3s]" alt="Trading Sprint" />
             <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
             <div className="relative z-20">
                <span className="font-mono text-[11px] text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block font-bold">Fast-Track Sprint</span>
                <h3 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl text-white italic mb-4">1-Month Bootcamp</h3>
                <p className="font-[family-name:var(--font-montserrat)] text-white/70 text-sm md:text-base max-w-sm font-light">From ground zero to advanced execution. Daily live sessions and private community access included.</p>
             </div>
             <div className="flex justify-between items-end relative z-20">
                <div className="font-mono text-left">
                   <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Investment</p>
                   <p className="text-2xl text-white font-medium">₦250,000 <span className="text-[#D4AF37] text-sm ml-2">/ $250</span></p>
                </div>
                <button ref={(el) => { cardRefs.current[0] = el; }} className="px-10 py-4 bg-gradient-to-tr from-[#D4AF37] via-[#FEE6B4] to-[#B59410] text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-sm shadow-[0_10px_30px_rgba(212,175,55,0.2)]">Enroll Now</button>
             </div>
          </div>

          {/* CARD 2: THE FLOOR */}
          <div className="bento-card md:col-span-5 md:row-span-2 relative overflow-hidden border border-[#D4AF37]/40 group bg-[#080B12]">
             <NextImage src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070" fill className="object-cover opacity-40 group-hover:scale-110 transition-transform duration-[3s]" alt="Trading Floor HQ" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
             <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                <span className="font-mono text-[11px] text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block font-bold">Physical HQ // Floor</span>
                <h3 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl text-white italic mb-6 leading-none">The Trading Floor</h3>
                <p className="font-[family-name:var(--font-montserrat)] text-white/80 text-sm md:text-base mb-8 leading-relaxed font-light">Showcase your skills on our physical floor. We cover Prop Firm expenses for skilled traders. Equilibrium Lounge included.</p>
                <button ref={(el) => { cardRefs.current[1] = el; }} className="w-full py-5 bg-gradient-to-tr from-[#D4AF37] via-[#FEE6B4] to-[#B59410] text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-sm shadow-[0_10px_30px_rgba(212,175,55,0.2)]">Join The Floor</button>
             </div>
          </div>

          {/* CARD 3: 3-MONTH MASTERCLASS */}
          <div className="bento-card md:col-span-7 md:row-span-1 relative overflow-hidden border border-white/10 group bg-[#0D1424] p-10 flex flex-col justify-between">
             <NextImage src="https://images.unsplash.com/photo-1611974714658-058f1376046e?q=80&w=2070" fill className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-[3s]" alt="Deep Dive Analysis" />
             <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
             <div className="relative z-20">
                <div className="flex justify-between items-start">
                   <span className="font-mono text-[11px] text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block font-bold">Institutional Mastery</span>
                   <span className="text-[10px] px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 uppercase font-mono tracking-widest font-bold">Elite Tier</span>
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl text-white italic mb-4">3-Month Bootcamp</h3>
                <p className="font-[family-name:var(--font-montserrat)] text-white/70 text-sm md:text-base max-w-lg mb-6 leading-relaxed font-light">One-on-one coaching and professional certification. Designed for traders seeking absolute market sovereignty.</p>
             </div>
             <div className="flex justify-between items-end relative z-20">
                <div className="font-mono text-left">
                   <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Tuition</p>
                   <p className="text-2xl text-white font-medium">₦500,000 <span className="text-[#D4AF37] text-sm ml-2">/ $500</span></p>
                </div>
                <button ref={(el) => { cardRefs.current[2] = el; }} className="px-10 py-4 bg-gradient-to-tr from-[#D4AF37] via-[#FEE6B4] to-[#B59410] text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-sm shadow-[0_10px_30px_rgba(212,175,55,0.2)]">Book Interview</button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}