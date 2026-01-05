"use client";

import { useRef } from "react";
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
        yPercent: -45, 
        xPercent: -50,
        scale: 0.16, 
        duration: 1.8,
      })
      // --- REMOVE SHIMMER HERE ---
      .to(".logo-shimmer", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=1.5") // Starts fading out halfway through the flight
      
      .to(overlayRef.current, { 
        opacity: 0, 
        duration: 1.5, 
        pointerEvents: "none" 
      }, "<") 
      
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
          window.dispatchEvent(new Event("preloaderComplete"));
        }
      }, "-=0.5");
    };

    const timeout = setTimeout(startAnimation, 150);
    return () => clearTimeout(timeout);
  }, { scope: overlayRef });

  return (
    <>
      <div 
        ref={overlayRef}
        className="blackout-overlay fixed inset-0 z-[110] bg-[#0A1428] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.12)_0%,_transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

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