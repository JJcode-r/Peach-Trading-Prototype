"use client";

import { useRef, useEffect } from "react";
import NextImage from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LIFESTYLE_ITEMS = [
  { 
    task: "PS5 Arena", 
    desc: "Cognitive Reset",
    img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070"
  },
  { 
    task: "Snooker Lounge", 
    desc: "Strategic Networking",
    img: "https://images.unsplash.com/photo-1544365737-fe5792471675?q=80&w=2070"
  },
  { 
    task: "Tennis Court", 
    desc: "Physical Edge",
    img: "https://images.unsplash.com/photo-1622279457486-62dcc4a497a8?q=80&w=2070"
  },
  { 
    task: "Social Lounge", 
    desc: "Elite Community",
    img: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=2070"
  },
];

export default function LifestyleSection() {
  const containerRef = useRef(null);
  const protonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Kinetic Proton Border Animation
      gsap.to(protonRef.current, {
        left: "100%",
        duration: 3,
        repeat: -1,
        ease: "linear",
      });

      // 2. Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });

      tl.from(".header-text", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      })
      .from(".lifestyle-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "expo.out"
      }, "-=0.6");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#000000] py-24 md:py-32 overflow-hidden">
      
      {/* KINETIC TOP BORDER */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/30">
        <div 
          ref={protonRef} 
          className="absolute top-0 left-[-15%] w-[15%] h-full bg-gradient-to-r from-transparent via-[#FEE6B4] to-transparent shadow-[0_0_15px_#D4AF37]" 
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* CENTERED HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="header-text font-mono text-[10px] text-[#D4AF37] tracking-[0.8em] uppercase mb-4 block">The Lifestyle</span>
          <h2 className="header-text font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl text-white font-light leading-tight mb-6 md:mb-8">
            The <span className="italic text-[#D4AF37]">Equilibrium</span> Hub
          </h2>
          <p className="header-text font-[family-name:var(--font-montserrat)] text-white/60 text-base md:text-lg font-light leading-relaxed">
            High-performance trading is fueled by professional recovery. Discover a facility where lifestyle meets institutional discipline.
          </p>
        </div>

        {/* HIGH-CLARITY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LIFESTYLE_ITEMS.map((item, i) => (
            <div 
              key={i} 
              className="lifestyle-card group relative h-[350px] md:h-[500px] overflow-hidden rounded-lg bg-zinc-900 border border-white/5"
            >
              <NextImage 
                src={item.img} 
                alt={item.task} 
                fill 
                className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                priority={i < 2}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                 <h3 className="font-[family-name:var(--font-cormorant)] text-3xl text-white italic mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                   {item.task}
                 </h3>
                 <p className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500">
                   {item.desc}
                 </p>
              </div>
            </div>
          ))}
        </div>

        {/* REVERSED CTA: BACK TO SOLID GOLD GRADIENT */}
        <div className="mt-16 md:mt-20 flex justify-center header-text">
           <button className="w-full md:w-auto px-16 py-6 bg-gradient-to-tr from-[#D4AF37] via-[#FEE6B4] to-[#B59410] text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-sm shadow-[0_10px_40px_rgba(212,175,55,0.3)] hover:scale-105 hover:shadow-[0_20px_50px_rgba(212,175,55,0.5)] transition-all duration-500 active:scale-95">
             Join the Culture
           </button>
        </div>

      </div>
    </section>
  );
}