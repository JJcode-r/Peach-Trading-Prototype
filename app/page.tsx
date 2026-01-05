"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import GlobalTrustBar from "./components/Trustbars";
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import { gsap } from "gsap";

const HeroSection = dynamic(() => import("./components/HeroSection"), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#0A1428]" /> 
});

// import MarketPulse from "./components/Live";
import EcosystemSection from "./components/PeachEcosystem";
import Philosophy from "./components/whyUs";
import ProgramsBento from "./components/programs";
import  LifestyleSection from "./components/TradingFloor";
import FoundersSection from "./components/FounderCoaches";
import ScarcityCTA from './components/sections/finalCTA';


import InstitutionalFooter from './components/sections/footer';


import ProfitWall from './components/sections/TestimonialCard';

import StudentVoices from './components/StudentVoices';

import ResearchHub from './components/sections/ArticleCard';

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-cormorant',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '600', '900'],
  variable: '--font-montserrat',
});

export default function HomePage() {
  useEffect(() => {
    // 1. Initially lock scroll
    document.documentElement.classList.add('hide-scrollbar');

    // 2. Setup Premium Reveal Timeline
    const tl = gsap.timeline({
      delay: 3.5, // Adjust this to match your Preloader's exit
      onStart: () => {
        // Unlock scrollbar exactly when animation starts
        document.documentElement.classList.remove('hide-scrollbar');
      }
    });

    tl.to(".hero-main-content", {
      opacity: 1,
      duration: 0.1, // Instant switch to visible
    })
    .from(".hero-text-reveal", {
      y: 100,
      skewY: 7,
      stagger: 0.2,
      duration: 1.5,
      ease: "power4.out",
    })
    .from(".hero-cta-reveal", {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "back.out(1.7)",
    }, "-=1"); // Overlaps with text reveal

  }, []);

  return (
    <div className={`${cormorant.variable} ${montserrat.variable} bg-[#0A1428] min-h-screen relative overflow-x-hidden`}>
      <Preloader />
      <Navbar />
      
      <main className="hero-main-content opacity-0">
        <HeroSection />
        <GlobalTrustBar />
        <EcosystemSection />
        <Philosophy />
        <ProgramsBento />
        < LifestyleSection />
        < FoundersSection />
         
          <section id="apply">
                 <ProfitWall />
               </section>
         
         
               <section id="apply">
                 <ResearchHub />
               </section>

               <StudentVoices />
             
              
               <section id="apply">
                 <ScarcityCTA />
               </section>
        < InstitutionalFooter />
      </main>
    </div>
  );
}