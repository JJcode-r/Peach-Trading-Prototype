"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { isMobile } from "../utils/device";

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071",
  "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
];

const headline = [
  { word: "Institutional", gold: true },
  { word: "Trading.", gold: false },
  { word: "Structured.", gold: true },
  { word: "Disciplined.", gold: true },
];

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const primaryCtaRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); 
      const hour = now.getHours();
      setIsOpen(day >= 1 && day <= 5 && hour >= 9 && hour < 17);
    };
    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  // 1. REVEAL + HOVER ANIMATION ENGINE
  useGSAP(() => {
    // Reveal Animation
    const startHeroAnimation = () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".char", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.015, duration: 1 })
        .fromTo(".hero-content-fade", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=0.7");
    };
    
    window.addEventListener("preloaderComplete", startHeroAnimation);

    // RESTORED HOVER ANIMATION
    if (!isMobile() && primaryCtaRef.current) {
      const btn = primaryCtaRef.current;
      
      const onMouseEnter = () => {
        gsap.to(btn, {
          scale: 1.05,
          y: -4,
          boxShadow: "0 20px 40px -10px rgba(212,175,55,0.5)",
          duration: 0.4,
          ease: "power2.out"
        });
      };

      const onMouseLeave = () => {
        gsap.to(btn, {
          scale: 1,
          y: 0,
          boxShadow: "0 10px 30px rgba(212,175,55,0.2)",
          duration: 0.4,
          ease: "power2.out"
        });
      };

      btn.addEventListener("mouseenter", onMouseEnter);
      btn.addEventListener("mouseleave", onMouseLeave);
      
      return () => {
        window.removeEventListener("preloaderComplete", startHeroAnimation);
        btn.removeEventListener("mouseenter", onMouseEnter);
        btn.removeEventListener("mouseleave", onMouseLeave);
      };
    }

    return () => window.removeEventListener("preloaderComplete", startHeroAnimation);
  }, { scope: container });

  useEffect(() => {
    const rotateImages = () => {
      const nextIndex = (index + 1) % BG_IMAGES.length;
      gsap.timeline()
        .to(`.bg-img-${index}`, { scale: 1.15, opacity: 0, duration: 4, ease: "none" })
        .fromTo(`.bg-img-${nextIndex}`, 
          { opacity: 0, scale: 1.35 }, 
          { opacity: 0.85, scale: 1.2, duration: 4, ease: "none", onStart: () => setIndex(nextIndex) }, 
          "<"
        );
    };
    const interval = setInterval(rotateImages, 8000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section ref={container} className="relative min-h-[100dvh] w-full flex flex-col bg-black overflow-hidden">
      
      {/* BG ENGINE */}
      <div className="absolute inset-0 z-0">
        {BG_IMAGES.map((src, i) => (
          <div key={src} className={`bg-img-${i} absolute inset-0 transition-opacity`} style={{ opacity: i === 0 ? 0.85 : 0 }}>
            <Image src={src} alt="Trading Floor" fill unoptimized className="object-cover grayscale-[2%] brightness-[0.45]" />
          </div>
        ))}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_transparent_70%,_rgba(0,0,0,0.9)_100%)]" />
        <div className="absolute inset-0 z-11 bg-gradient-to-b from-black/10 via-transparent to-black" />
      </div>

      <div className="relative z-20 flex flex-col min-h-[100dvh] w-full pt-28 pb-12 px-6 sm:px-12">
        
        {/* FLOOR STATUS */}
        <div className="hero-content-fade flex justify-center lg:justify-start mb-10 opacity-0">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl">
            <div className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'} animate-pulse`} />
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/90">
              Floor Status: {isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          
          <div className="max-w-[1100px] w-full mx-auto mb-10">
            <h1 className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-1 font-[family-name:var(--font-cormorant)] text-[clamp(2.4rem,9vw,5.2rem)] leading-[1] font-bold tracking-tight text-white">
              {headline.map((item, i) => (
                <span key={i} className={`inline-block whitespace-nowrap ${item.gold ? "text-[#D4AF37]" : ""}`}>
                  {item.word.split("").map((char, j) => (
                    <span key={j} className="char inline-block opacity-0">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          </div>

          <div className="hero-content-fade opacity-0 max-w-2xl mx-auto">
            <p className="font-[family-name:var(--font-montserrat)] text-base sm:text-lg leading-[1.8] text-white/80 mb-12 font-light tracking-wide">
              We are an education-first trading community focused on technology and financial research. 
              Learn inside a <span className="text-[#D4AF37] font-semibold border-b border-[#D4AF37]/30">live trading floor</span> — with real risk management and structured mentorship.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                ref={primaryCtaRef}
                className="w-full sm:w-auto px-12 py-5 bg-gradient-to-tr from-[#D4AF37] via-[#FEE6B4] to-[#B59410] text-black font-black uppercase tracking-[0.25em] text-[11px] rounded-sm transition-transform active:scale-95 shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
              >
                Apply for Cohort
              </button>
              
              <button className="group relative w-full sm:w-auto px-12 py-5 border border-[#D4AF37]/50 text-[#D4AF37] font-bold uppercase tracking-[0.25em] text-[11px] overflow-hidden rounded-sm backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5">
                <span className="relative z-10">Explore Programs</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent transition-transform duration-700" />
              </button>
            </div>
          </div>
        </div>

        <div className="hero-content-fade opacity-0 mt-12 flex flex-col items-center gap-4">
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.6em] text-white/40 font-bold ml-[0.6em] text-center leading-relaxed">
            2,400+ Mentored Traders • <span className="text-white/80">Jan 2026 Cohort Closing Soon</span>
          </span>
        </div>
      </div>
    </section>
  );
}