"use client";

import { useState, useEffect, useRef } from "react";
import { Montserrat } from 'next/font/google';
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { isMobile } from "../utils/device";

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600', '900'] 
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navCtaRef = useRef<HTMLButtonElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useGSAP(() => {
    if (!isMobile() && navCtaRef.current) {
      const btn = navCtaRef.current;
      const onMouseEnter = () => {
        gsap.to(btn, {
          scale: 1.02,
          y: -1,
          boxShadow: "0 10px 25px -5px rgba(212,175,55,0.4)",
          duration: 0.3,
        });
      };
      const onMouseLeave = () => {
        gsap.to(btn, {
          scale: 1,
          y: 0,
          boxShadow: "0 4px 15px -5px rgba(212,175,55,0.2)",
          duration: 0.3,
        });
      };
      btn.addEventListener("mouseenter", onMouseEnter);
      btn.addEventListener("mouseleave", onMouseLeave);
      return () => {
        btn.removeEventListener("mouseenter", onMouseEnter);
        btn.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, { scope: container });

  return (
    <header 
      ref={container} 
      className={`${montserrat.className} nav-container fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
        isScrolled ? "h-16" : "h-20"
      } opacity-0 -translate-y-5`}
    >
      {/* BACKGROUND OVERLAY */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          isScrolled 
            ? "bg-[#0A1428]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl" 
            : "bg-transparent border-b border-transparent"
        }`} 
      />

      <div className="w-full h-full flex items-center justify-between px-6 lg:px-12 relative z-[120] max-w-[1800px] mx-auto">
        
        {/* 1. BRANDING (Left Aligned) */}
        <div className="flex items-center gap-3 shrink-0">
          <div id="logo-destination" className="w-8 h-8 md:w-10 md:h-10 shrink-0" /> 
          <div className="flex flex-col leading-tight">
            <span className="text-[#E2E8F0] text-xs md:text-sm xl:text-base font-black tracking-wider uppercase whitespace-nowrap">
              Peach Trading Floor
            </span>
            <span className="text-[#D4AF37] text-[7px] md:text-[8px] font-medium tracking-[0.3em] uppercase opacity-90 whitespace-nowrap">
              Learn and Earn
            </span>
          </div>
        </div>

        {/* 2. DYNAMIC NAV LINKS (Centered via Flex-Grow) */}
        <nav className="hidden lg:flex items-center justify-center gap-2 xl:gap-8 flex-1 px-4">
          {["Programs", "Institutional", "Floor", "Insights"].map((link) => (
            <a key={link} className="group relative px-2 xl:px-4 py-2 text-[10px] xl:text-[11px] uppercase tracking-[0.2em] xl:tracking-[0.3em] text-[#E2E8F0]/80 hover:text-[#D4AF37] transition-all duration-300 font-bold whitespace-nowrap cursor-pointer">
              <span className="relative z-10">{link}</span>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* 3. ACTIONS (Right Aligned) */}
        <div className="flex items-center gap-4 shrink-0">
          <button 
            ref={navCtaRef}
            className="hidden lg:block px-6 xl:px-8 py-2.5 xl:py-3 bg-gradient-to-tr from-[#D4AF37] via-[#FEE6B4] to-[#B59410] text-[#0A1428] text-[10px] font-black uppercase tracking-widest rounded-sm"
          >
            Join Floor
          </button>

          <button 
            className={`lg:hidden p-2 text-[#D4AF37] transition-all duration-300 ${
              isOpen ? "opacity-0 pointer-events-none scale-50" : "opacity-100 scale-100"
            }`} 
            onClick={() => setIsOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER (Remains same but with z-index safety) */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 lg:hidden z-[200] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`} 
        onClick={() => setIsOpen(false)} 
      />
      
      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-[80%] max-w-[400px] bg-[#0A1428] transition-transform duration-500 ease-in-out lg:hidden z-[210] border-l border-[#D4AF37]/20 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6 pt-8">
          <button className="p-2 text-[#D4AF37]" onClick={() => setIsOpen(false)}>
            <X size={32} strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex flex-col gap-8 px-10 pt-4">
          {["Programs", "Institutional", "Trading Floor", "Insights"].map((link) => (
            <a key={link} className="text-sm uppercase tracking-[0.3em] text-white font-bold border-b border-white/5 pb-4" onClick={() => setIsOpen(false)}>{link}</a>
          ))}
          <button className="w-full py-5 bg-gradient-to-tr from-[#D4AF37] via-[#FEE6B4] to-[#B59410] text-[#0A1428] text-xs font-black uppercase tracking-widest rounded-sm">
            Apply to Floor
          </button>
        </div>
      </div>
    </header>
  );
}