import React, { useRef } from "react";
import { ArrowUpRight, Anchor, Construction, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const capabilitiesData = [
  { 
    num: "01", 
    title: "Capital Dredging", 
    icon: <Anchor size={20} />,
    desc: "Precision deepening of navigational channels and turning basins using advanced TSHD and CSD technology to accommodate modern mega-vessels.",
    specs: ["Max Depth: 32m", "CSD & TSHD Fleet", "Navigational Precision"]
  },
  { 
    num: "02", 
    title: "Land Reclamation", 
    icon: <Construction size={20} />,
    desc: "Engineering structurally sound artificial landmasses and island expansions for industrial, port, and commercial infrastructure development.",
    specs: ["Soil Stabilization", "Hydraulic Filling", "Geotextile Engineering"]
  },
  { 
    num: "03", 
    title: "Coastal Protection", 
    icon: <ShieldCheck size={20} />,
    desc: "Robust coastal defense systems including breakwaters, groynes, and sea walls designed to mitigate tidal erosion and rising sea levels.",
    specs: ["Accropode Armor", "Rock Bund Construction", "Erosion Modeling"]
  },
];

export default function CapabilitiesSection() {
  const containerRef = useRef(null);

  useGSAP(() => {

    // Header — staggered text reveal
    const headerEls = containerRef.current.querySelectorAll('.cap-header-el');
    gsap.fromTo(headerEls,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".cap-header", start: "top 85%" }
      }
    );

    // Cards — clip-path reveal with stagger
    gsap.fromTo(".cap-card", 
      { clipPath: "inset(100% 0% 0% 0%)", y: 80 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cap-grid", start: "top 80%" }
      }
    );

    // Background numbers — subtle parallax drift
    const bgNums = containerRef.current.querySelectorAll('.cap-bg-num');
    bgNums.forEach((num) => {
      gsap.fromTo(num,
        { y: 20 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: num.closest('.cap-card'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    });

    // Spec items — slide in on scroll
    const specGroups = containerRef.current.querySelectorAll('.cap-specs');
    specGroups.forEach((group) => {
      const items = group.querySelectorAll('.cap-spec-item');
      gsap.fromTo(items,
        { x: -12, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 90%" }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 lg:py-48 bg-white relative overflow-hidden">
      {/* Background Technical Detail */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-slate-100 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="cap-header mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-200 pb-12">
          <div className="max-w-2xl">
            <p className="cap-header-el text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#B38356]"></span> Core Competencies
            </p>
            <h2 className="cap-header-el text-4xl md:text-6xl font-serif text-slate-900 leading-tight">
              Strategic execution across the <span className="text-[#B38356] italic">maritime value chain.</span>
            </h2>
          </div>
          <p className="cap-header-el text-slate-500 font-light max-w-sm leading-relaxed text-sm lg:pb-2">
            Deploying a high-performance fleet and specialized engineering teams to solve complex hydrographic challenges worldwide.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="cap-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilitiesData.map((item, index) => (
            <div 
              key={index} 
              className="cap-card group relative bg-[#FAFAFA] border border-slate-200 p-8 lg:p-10 flex flex-col min-h-[450px] transition-all duration-500 hover:border-[#B38356] hover:bg-white hover:shadow-[0_8px_40px_-12px_rgba(179,131,86,0.12)]"
            >
              {/* Massive Background Number — parallax layer */}
              <span className="cap-bg-num absolute top-4 right-8 text-8xl font-serif text-slate-100 group-hover:text-[#B38356]/10 transition-colors duration-500 pointer-events-none select-none" style={{ willChange: 'transform' }}>
                {item.num}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-[#B38356] group-hover:text-[#B38356] transition-all duration-500 mb-10">
                {item.icon}
              </div>

              <div className="flex-grow">
                <h4 className="text-2xl lg:text-3xl font-serif text-slate-900 mb-6 group-hover:text-[#B38356] transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-light mb-8 max-w-[280px]">
                  {item.desc}
                </p>
              </div>

              {/* Technical Specs */}
              <div className="cap-specs space-y-3 pt-6 border-t border-slate-200 group-hover:border-[#B38356]/30 transition-colors duration-500">
                {item.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="cap-spec-item flex items-center gap-3">
                    <div 
                      className="w-1 h-1 rounded-full bg-[#B38356] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ transitionDelay: `${sIdx * 60}ms` }}
                    />
                    <span 
                      className="text-[10px] tracking-[0.1em] uppercase font-bold text-slate-400 group-hover:text-slate-600 transition-colors duration-500"
                      style={{ transitionDelay: `${sIdx * 60}ms` }}
                    >
                      {spec}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Indicator */}
              <div className="absolute bottom-10 right-10 text-slate-300 group-hover:text-[#B38356] transition-all duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight size={20} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}