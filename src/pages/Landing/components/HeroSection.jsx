import React, { useEffect, useRef } from "react";
import { ArrowRight, Waves } from "lucide-react";
import { Link } from "react-router"; 
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const textRefs = useRef([]);
  const lineRef = useRef(null);
  const badgeRef = useRef(null);

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // 1. Image Container Reveal (Slides up like a curtain)
      tl.fromTo(
        imageWrapperRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" }
      )
      // 2. Image Scale inside container (De-scales as container opens)
      .fromTo(
        imageRef.current,
        { scale: 1.3 },
        { scale: 1, duration: 2, ease: "power3.out" },
        "-=1.5"
      )
      // 3. Typography & Accents Reveal
      .fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=1.2"
      )
      .fromTo(
        textRefs.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "expo.out" },
        "-=1"
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power3.inOut" },
        "-=0.8"
      );

      // 4. Smooth Parallax on Scroll
      // Moves the image slightly upward within its frame as the user scrolls down
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#FAFAFA] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden"
    >
      {/* Subtle Background Pattern (Optional Grid for Engineering vibe) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── LEFT: TYPOGRAPHY & CTA ── */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 pt-10 lg:pt-0">
            
            <div ref={badgeRef} className="flex items-center gap-4 mb-8">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B38356]/10 text-[#B38356]">
                <Waves size={14} strokeWidth={2.5} />
              </span>
              <p className="text-[#B38356] font-bold tracking-[0.25em] text-[10px] uppercase">
                Marine Infrastructure Specialists
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif text-slate-900 leading-[0.95] mb-8 tracking-tight">
              <div className="overflow-hidden pb-2"><div ref={addToRefs}>Redefining</div></div>
              <div className="overflow-hidden pb-2">
                <div ref={addToRefs} className="flex items-center gap-4">
                  The <span className="text-[#B38356] italic font-light ml-2">Coastal</span>
                </div>
              </div>
              <div className="overflow-hidden pb-2"><div ref={addToRefs}>Boundary.</div></div>
            </h1>

            <div className="overflow-hidden mb-12 flex gap-6 items-start">
              <div ref={lineRef} className="w-12 h-[2px] bg-[#B38356] mt-3 origin-left shrink-0" />
              <p ref={addToRefs} className="text-slate-600 text-sm md:text-base leading-relaxed font-light max-w-lg">
                Executing complex capital dredging, land reclamation, and port expansion projects worldwide. We leverage advanced trailing suction hopper technology to engineer sustainable maritime economies.
              </p>
            </div>
            
            <div className="overflow-hidden">
              <div ref={addToRefs}>
                <Link to="/projects">
                  <button className="group relative overflow-hidden bg-slate-900 hover:bg-[#B38356] text-white px-8 py-4.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 flex items-center gap-4 w-fit shadow-xl shadow-slate-900/10 hover:shadow-[#B38356]/20">
                    <span className="relative z-10">Discover Capabilities</span>
                    <ArrowRight size={14} className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Micro-stats / Trust indicators */}
            <div className="mt-16 flex items-center gap-10 opacity-80">
               <div className="overflow-hidden">
                 <p ref={addToRefs} className="text-[10px] tracking-[0.15em] uppercase text-slate-500 font-bold">
                   <span className="text-slate-900 text-lg font-serif mr-2">40+</span> Years Experience
                 </p>
               </div>
               <div className="overflow-hidden">
                 <p ref={addToRefs} className="text-[10px] tracking-[0.15em] uppercase text-slate-500 font-bold">
                   <span className="text-slate-900 text-lg font-serif mr-2">10M+</span> CBM Dredged
                 </p>
               </div>
            </div>

          </div>

          {/* ── RIGHT: IMAGE W/ PARALLAX ── */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            {/* The image wrapper dictates the framing and masks the overflow */}
            <div 
              ref={imageWrapperRef} 
              className="relative w-full h-[55vh] lg:h-[80vh] overflow-hidden bg-slate-200"
            >
              {/* The image itself is taller than the wrapper (120%) to allow room to scroll (parallax) */}
              <img
                ref={imageRef}
                src="/hero/meka-dredging-hero-2.jpg"
                alt="Meka Dredging Cutter Suction operations"
                className="absolute top-[-10%] left-0 w-full h-[120%] object-cover object-center"
              />
              {/* Optional: Very subtle light overlay to soften the image slightly if it's too harsh */}
              <div className="absolute inset-0 bg-slate-900/5 mix-blend-multiply pointer-events-none" />
            </div>
            
            {/* Architectural accent lines around the image */}
            <div className="absolute top-10 right-6 lg:right-12 w-16 h-[1px] bg-slate-900/20" />
            <div className="absolute bottom-10 right-6 lg:right-12 w-[1px] h-16 bg-slate-900/20" />
          </div>

        </div>
      </div>
    </section>
  );
}