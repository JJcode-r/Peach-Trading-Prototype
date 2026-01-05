"use client";

import { useRef, useEffect } from "react";
import NextImage from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react"; 

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COACHES = [
  { name: "Coach Emeka", specialty: "Institutional Flow", img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=2000" },
  { name: "Coach Amara", specialty: "Psychology & Risk", img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=2000" },
  { name: "Coach Tunde", specialty: "Algo-Execution", img: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=2000" },
  { name: "Coach Kofi", specialty: "Macro Economics", img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=2000" },
  { name: "Coach Chioma", specialty: "Scalping Lead", img: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=2000" },
];

export default function FoundersSection() {
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const protonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Top Border Proton Animation
      gsap.to(protonRef.current, {
        left: "100%",
        duration: 4,
        repeat: -1,
        ease: "linear",
      });

      // 2. Section Entry Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      tl.from(".slide-header", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      })
      .from(".founder-box", {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
      }, "-=0.6")
      .from(".founder-text", {
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
      }, "-=1.2")
      .from(".coach-slide-card", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#000000] py-20 md:py-24 overflow-hidden border-b border-white/5">
      
      {/* PROTON BORDER */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/20">
        <div ref={protonRef} className="absolute top-0 left-[-15%] w-[15%] h-full bg-gradient-to-r from-transparent via-[#FEE6B4] to-transparent shadow-[0_0_15px_#D4AF37]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* CENTRALIZED HEADER */}
        <div className="slide-header max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl text-white font-light leading-tight mb-6">
            The Minds Behind <br /> <span className="italic text-[#D4AF37]">The Movement.</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-white/50 text-base font-light leading-relaxed">
            Success in the markets isn't just about strategy—it's about mentorship. Our faculty is comprised of verified institutional traders dedicated to your professional evolution.
          </p>
        </div>

        {/* FOUNDER BLOCK - STAGGERED SLIDE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20 border-b border-white/5 pb-20">
          <div className="founder-box lg:col-span-5 relative h-[420px] w-full rounded-lg overflow-hidden border border-white/10">
             <NextImage 
               src="https://images.unsplash.com/photo-1556157382-97dee2dcb96a?q=80&w=2000" 
               alt="Founder" 
               fill 
               className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />
             <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[#D4AF37] text-[9px] tracking-[0.4em] uppercase mb-1 drop-shadow-md">Founder & CEO</p>
                <h3 className="font-[family-name:var(--font-cormorant)] text-3xl text-white italic drop-shadow-lg leading-none">The Lead Trader</h3>
             </div>
          </div>

          <div className="founder-text lg:col-span-7 space-y-5 lg:pl-6">
            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl text-white italic leading-tight">
              "We don't teach. We build professional traders."
            </h3>
            <p className="font-[family-name:var(--font-montserrat)] text-white/60 text-sm md:text-base font-light leading-relaxed max-w-xl">
              Based out of our Bayelsa HQ, we are creating a hub for African excellence in the global financial markets.
            </p>
            <div className="h-[1px] w-12 bg-[#D4AF37]" />
          </div>
        </div>

        {/* COACHES SECTION */}
        <div className="flex justify-between items-end mb-8">
          <div className="slide-header">
            <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.6em] uppercase mb-1 block">The Faculty</span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-4xl text-white font-light italic">Meet Your Coaches</h2>
          </div>
          
          <div className="flex gap-2 slide-header">
            <button onClick={() => scroll("left")} className="p-2.5 border border-white/10 rounded-full hover:border-[#D4AF37] text-white transition-all active:scale-90">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll("right")} className="p-2.5 border border-white/10 rounded-full hover:border-[#D4AF37] text-white transition-all active:scale-90">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* CAROUSEL - VERTICAL STAGGER SLIDE */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {COACHES.map((coach, i) => (
            <div 
              key={i} 
              className="coach-slide-card snap-center flex-shrink-0 w-[240px] md:w-[280px]"
            >
              <div className="relative h-[340px] md:h-[360px] w-full overflow-hidden rounded-lg border border-white/10 group">
                <NextImage src={coach.img} alt={coach.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-5 left-5">
                  <h4 className="font-[family-name:var(--font-cormorant)] text-xl text-white italic mb-1 leading-none">{coach.name}</h4>
                  <p className="font-mono text-[8px] text-[#D4AF37] uppercase tracking-[0.2em]">{coach.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FINAL CTA */}
        <div className="mt-4 flex justify-center coach-slide-card">
           <button className="px-12 py-5 bg-gradient-to-tr from-[#D4AF37] via-[#FEE6B4] to-[#B59410] text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-sm shadow-xl hover:scale-105 transition-all">
              Apply For Mentorship
           </button>
        </div>

      </div>
    </section>
  );
}