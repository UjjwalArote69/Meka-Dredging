/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metricsData = [
  { value: "40+", label: "Years of Heritage", sub: "Since 1986" },
  { value: "150+", label: "Projects Executed", sub: "Global Operations" },
  { value: "25+", label: "Specialized Vessels", sub: "Technical Fleet" },
  { value: "10M+", label: "CBM Dredged Annually", sub: "Precision Volume" },
];

export default function MetricsSection() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const metricRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Vertical "Depth Scale" Line Animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      // 2. Staggered Metric Reveal
      metricRefs.current.forEach((el, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          el.querySelector(".metric-number"),
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "expo.out" }
        )
        .fromTo(
          el.querySelector(".metric-info"),
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "expo.out" },
          "-=0.8"
        )
        .fromTo(
          el.querySelector(".depth-marker"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
          "-=1"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-40 bg-[#FAFAFA] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        
        {/* Section Header */}
        <div className="mb-32">
          <p className="text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase mb-4">
            Operational Benchmarks
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
            Measured Excellence.
          </h2>
        </div>

        <div className="relative">
          {/* Central Depth Line (The "Scale") */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 origin-top hidden md:block" />
          <div 
            ref={lineRef}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[#B38356] origin-top z-10 hidden md:block" 
          />

          <div className="flex flex-col gap-32 md:gap-48">
            {metricsData.map((metric, index) => (
              <div 
                key={index} 
                ref={(el) => (metricRefs.current[index] = el)}
                className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Depth Marker (The Horizontal Notch) */}
                <div 
                  className={`depth-marker absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 h-px bg-[#B38356] z-20 hidden md:block ${
                    index % 2 === 0 ? "w-24 -translate-x-full" : "w-24"
                  }`} 
                />

                {/* Number Content */}
                <div className={`w-full md:w-1/2 px-0 md:px-16 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <h3 className="metric-number text-7xl md:text-9xl font-serif text-slate-900 leading-none tracking-tighter">
                    {metric.value}
                  </h3>
                </div>

                {/* Label Content */}
                <div className={`w-full md:w-1/2 px-0 md:px-16 mt-4 md:mt-0 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="metric-info">
                    <p className="text-xs tracking-[0.3em] uppercase font-bold text-[#B38356] mb-2">
                      {metric.label}
                    </p>
                    <p className="text-slate-400 font-light text-[10px] tracking-[0.1em] uppercase">
                      {metric.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ambient Technical Detail */}
        <div className="mt-40 pt-10 border-t border-slate-200 flex justify-between items-center opacity-40">
           <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
             Hydrographic Precision Mapping // Status: Active
           </span>
           <span className="text-[9px] font-mono tracking-widest text-slate-400">
             © 2026 MEKA DREDGING
           </span>
        </div>
      </div>
    </section>
  );
}