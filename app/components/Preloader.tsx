"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const logoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });

    // 1. Initial Logo State: Perfect Center
    gsap.set(logoRef.current, { 
      top: "50%", 
      left: "50%", 
      xPercent: -50, 
      yPercent: -50,
      scale: 1 
    });

    // 2. Animation Sequence
    const startAnimation = () => {
      const target = document.getElementById("logo-destination");
      if (!target) return;

      const rect = target.getBoundingClientRect();

      // Step A: Shimmer the logo to signal "Loading/Active"
      tl.to(".logo-shimmer", { 
        backgroundPosition: "200% center", 
        duration: 1.2,
        ease: "power2.inOut" 
      })
      // Step B: Fly Logo to Navbar and fade background
      .to(logoRef.current, {
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width / 2,
        yPercent: -45, // Fine-tuned for visual centering in the nav slot
        xPercent: -50,
        scale: 0.16, // Shrinks to fit the navbar destination size
        duration: 1.8,
      })
      .to(overlayRef.current, { 
        opacity: 0, 
        duration: 1.5, 
        pointerEvents: "none" 
      }, "<") // Start at the same time as logo flight
      
      // Step C: Reveal UI Elements
      .to(".nav-container", { 
        opacity: 1, 
        y: 0, 
        duration: 0.8 
      }, "-=0.8")
      .to(".hero-main-content", { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        onComplete: () => {
          // 3. TRIGGER HERO ANIMATIONS
          window.dispatchEvent(new Event("preloaderComplete"));
        }
      }, "-=0.5");
    };

    // Small delay to ensure Navbar DOM is fully painted
    const timeout = setTimeout(startAnimation, 150);
    return () => clearTimeout(timeout);
  }, { scope: overlayRef });

  return (
    <>
      {/* OVERLAY LAYER 
          Using #0A1428 to match your scrolled Navbar state.
      */}
      <div 
        ref={overlayRef}
        className="blackout-overlay fixed inset-0 z-[110] bg-[#0A1428] flex items-center justify-center"
      >
        {/* LIGHTING: Makes the logo "pop" from the midnight blue */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.12)_0%,_transparent_65%)]" />
        
        {/* GRID ACCENT: Subtle high-tech feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      {/* MOVING LOGO LAYER */}
      <div 
        ref={logoRef} 
        className="fixed z-[120] w-64 h-64 pointer-events-none flex items-center justify-center"
      >
        {/* The Golden Shimmer Overlay */}
        <div className="logo-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-[#FEE6B4]/40 to-transparent bg-[length:200%_100%] bg-[-100%_0] z-10" />
        
        <Image 
          src="/logo.png" 
          alt="Peach Trading Floor" 
          fill 
          className="object-contain" 
          priority 
        />
      </div>
    </>
  );
}