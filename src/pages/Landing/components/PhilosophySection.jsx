import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Smooth entrance for the "Our Philosophy" label
    gsap.from(".reveal-line", {
      y: 30,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".reveal-line",
        start: "top 95%",
      }
    });

    // 2. Liquid Color & Position Reveal for the main quote
    const lines = gsap.utils.toArray(".reveal-text");
    lines.forEach((line) => {
      gsap.fromTo(line, 
        { 
          color: "rgba(15, 23, 42, 0.05)", // Start at 5% opacity slate-900
          y: 20, // Start slightly lower for a "rising" effect
        },
        {
          color: "#0f172a", // Transition to full slate-900
          y: 0, // Settle at neutral position
          ease: "none", // Easing is handled by the scrub smoothing
          scrollTrigger: {
            trigger: line,
            start: "top 85%", // Start reveal earlier
            end: "top 55%",   // Finish reveal by the time it hits the center
            scrub: 1.5,       // High scrub value creates a "liquid" lag effect
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center md:text-left">
        
        {/* Label Section */}
        <div className="overflow-hidden mb-12 md:mb-20">
           <p className="reveal-line text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase flex items-center justify-center md:justify-start gap-4">
             <span className="w-8 h-px bg-[#B38356]"></span> Our Philosophy
           </p>
        </div>
        
        {/* Main Quote Reveal */}
        <div className="max-w-5xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.2] tracking-tight">
            {/* Using 'inline-block' or 'block' ensures transform-based smoothness */}
            <span className="reveal-text block will-change-transform">Executing sustainable</span>
            <span className="reveal-text block will-change-transform">
               hydro-infrastructure balances
            </span>
            <span className="reveal-text block will-change-transform">sovereign economic progress with the</span>
            <span className="reveal-text block will-change-transform">strict preservation of coastal biomes.</span>
          </h2>
        </div>

      </div>
    </section>
  );
}