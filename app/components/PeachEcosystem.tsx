"use client";

import { useState, useRef, useEffect } from "react";
import NextImage from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, Wallet2, Cpu, Globe2, Fingerprint } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PILLARS = [
  {
    title: "Prop Capital",
    subtitle: "Direct Funding",
    desc: "Graduate and step onto our floor with a Prop Firm account funded at our expense. Trade our capital, keep the lion's share of the profits.",
    img: "https://images.unsplash.com/photo-1556157382-97dee2dcb96a?q=80&w=2000",
    icon: <Wallet2 size={20} />
  },
  {
    title: "AI Ecosystem",
    subtitle: "Tech Mastery",
    desc: "Master Power BI visualization and AI-driven growth tools. We build the tech that automates your path to financial freedom.",
    img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2000",
    icon: <Cpu size={20} />
  },
  {
    title: "Global Hub",
    subtitle: "Elite Network",
    desc: "An international diaspora of elite minds. From Bayelsa to London, we trade live and win together. No one is left behind.",
    img: "https://images.unsplash.com/photo-1523240715632-d984bc310f11?q=80&w=2000",
    icon: <Globe2 size={20} />
  }
];

export default function HighVisibilityEcosystem() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const protonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(protonRef.current, {
        left: "100%",
        duration: 3,
        repeat: -1,
        ease: "linear",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] py-16 md:py-24 overflow-hidden">
      
      {/* RADIANT BACKGROUND MESH (Fixes Dark Dead-Zones) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#050505_100%)] opacity-50 pointer-events-none" />

      {/* PROTON BORDER */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/30">
        <div ref={protonRef} className="absolute top-0 left-[-15%] w-[15%] h-full bg-gradient-to-r from-transparent via-[#FEE6B4] to-transparent shadow-[0_0_15px_#D4AF37]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="mb-10 text-center lg:text-left">
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-7xl text-white font-light italic leading-none">
            Our <span className="text-[#D4AF37] not-italic">Core</span> Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* NAVIGATION */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory lg:snap-none pb-4">
            {PILLARS.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`pillar-btn snap-center flex-shrink-0 w-[80%] sm:w-[300px] lg:w-full text-left p-6 lg:p-8 rounded-xl transition-all duration-500 border relative ${
                  active === i ? "bg-white/[0.07] border-[#D4AF37]/60 shadow-[0_0_30px_rgba(212,175,55,0.1)]" : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-5">
                  <span className={active === i ? "text-[#D4AF37]" : "text-white/30"}>{item.icon}</span>
                  <div>
                    <h4 className={`font-[family-name:var(--font-cormorant)] text-xl transition-all ${active === i ? "text-white italic" : "text-white/50"}`}>{item.title}</h4>
                    <p className={`font-mono text-[8px] uppercase tracking-widest mt-1 ${active === i ? "text-[#D4AF37]" : "text-white/20"}`}>{item.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* MAIN CONTENT CARD */}
          <div className="lg:col-span-8 relative">
            <div className="relative w-full min-h-[550px] lg:aspect-video rounded-3xl overflow-hidden border border-white/20 bg-zinc-900 shadow-2xl">
              
              <div key={active} className="animate-in fade-in duration-700 h-full w-full relative">
                {/* IMAGE LAYER */}
                <div className="absolute inset-0 z-0">
                  <NextImage 
                    src={PILLARS[active].img} 
                    alt={PILLARS[active].title}
                    fill
                    className="object-cover opacity-80"
                    priority
                  />
                  {/* MULTI-STOP GRADIENT FOR LEGIBILITY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
                  {/* GLASS OVERLAY BEHIND TEXT ONLY */}
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/40 backdrop-blur-md lg:backdrop-blur-none lg:bg-transparent" />
                </div>

                {/* CONTENT LAYER */}
                <div className="relative z-10 h-full p-8 lg:p-16 flex flex-col justify-end lg:justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Fingerprint className="text-[#FEE6B4] drop-shadow-md" size={18} />
                    <span className="font-mono text-[#FEE6B4] text-[9px] lg:text-[10px] tracking-[0.4em] uppercase font-bold">Verified Access</span>
                  </div>
                  
                  <h3 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl text-white italic mb-4 leading-tight drop-shadow-2xl">
                    {PILLARS[active].title}
                  </h3>
                  
                  <p className="font-[family-name:var(--font-montserrat)] text-[#F5F5F5] text-sm lg:text-lg font-normal leading-relaxed mb-8 max-w-xl drop-shadow-lg">
                    {PILLARS[active].desc}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-10 py-4 bg-gradient-to-tr from-[#D4AF37] via-[#FEE6B4] to-[#B59410] text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-sm shadow-[0_10px_20px_rgba(212,175,55,0.3)] active:scale-95 transition-all">
                      Apply Now
                    </button>
                    <button className="text-white hover:text-[#D4AF37] font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 group/btn py-2 transition-colors">
                      Details <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CEO CALLOUT */}
            <div className="mt-6 lg:mt-0 lg:absolute lg:-bottom-6 lg:-right-6 bg-gradient-to-br from-[#D4AF37] to-[#B59410] p-5 rounded-xl border border-white/20 shadow-2xl lg:max-w-[300px]">
               <p className="font-mono text-black text-[10px] leading-tight font-black italic">
                 "Unable to enroll? Book a 1-on-1 consultation with our Founder. No one is left behind."
               </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}