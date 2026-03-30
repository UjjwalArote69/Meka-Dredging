import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const columnsRef = useRef([]);
  const counterRef = useRef(null);
  const brandLeftRef = useRef(null);
  const brandRightRef = useRef(null);
  const bottomTextRef = useRef(null);
  const progressLineRef = useRef(null);
  const contentWrapperRef = useRef(null);

  const columnsCount = 5;

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 1. Entrance: Brand Text (Using clipPath for a sharper, "sliced" reveal)
    tl.fromTo(
      [brandLeftRef.current, brandRightRef.current],
      { y: 100, clipPath: "inset(0% 0% 100% 0%)" },
      { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.out", stagger: 0.1 },
      "+=0.2"
    )
    .fromTo(
      bottomTextRef.current,
      { opacity: 0, letterSpacing: "0.1em" },
      { opacity: 1, letterSpacing: "0.3em", duration: 1.5, ease: "power3.out" },
      "-=1"
    );

    // 2. The Massive Background Counter & Progress Line
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 2.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          const val = Math.round(counter.value);
          counterRef.current.innerText = val < 10 ? `0${val}` : val;
        }
      }
    }, "-=1.5")
    // Subtle scale up of the counter to create a feeling of pressure/depth
    .to(counterRef.current, {
      scale: 1.1,
      duration: 2.8,
      ease: "power2.inOut"
    }, "<")
    // Fills a tiny tracking line at the bottom
    .fromTo(progressLineRef.current, 
      { scaleX: 0 }, 
      { scaleX: 1, duration: 2.8, ease: "power2.inOut" }, 
      "<"
    );

    // 3. The Exit: Content fades and scales down smoothly
    tl.to(contentWrapperRef.current, {
      scale: 0.9,
      opacity: 0,
      filter: "blur(10px)", // Adds a cinematic depth-of-field blur as it exits
      duration: 0.8,
      ease: "power3.inOut"
    }, "+=0.1");

    // 4. The Grand Reveal: Vertical columns stagger upwards
    tl.to(columnsRef.current, {
      yPercent: -100,
      duration: 1.2,
      stagger: 0.06, 
      ease: "expo.inOut"
    }, "-=0.5");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[999] pointer-events-none bg-transparent">
      
      {/* 5 Vertical Staggered Columns (Added borders to look like steel shutters) */}
      <div className="absolute inset-0 flex w-full h-full">
        {[...Array(columnsCount)].map((_, i) => (
          <div
            key={i}
            ref={(el) => columnsRef.current[i] = el}
            className="h-full bg-[#050A15] border-r border-white/5 last:border-r-0"
            style={{ width: `${100 / columnsCount}%`, willChange: 'transform' }}
          />
        ))}
      </div>

      {/* Foreground Content */}
      <div 
        ref={contentWrapperRef} 
        className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      >
        
        {/* Massive Serif Counter */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            ref={counterRef}
            className="font-serif text-[50vw] md:text-[35vw] leading-none text-[#B38356] opacity-[0.07] select-none tracking-tighter origin-center"
          >
            00
          </span>
        </div>

        {/* Split Brand Typography - Updated to match Navbar Serif styling */}
        <div className="absolute inset-0 flex items-center justify-between px-8 md:px-24 lg:px-32 w-full max-w-[1600px] mx-auto z-10">
          <div className="overflow-hidden pb-4">
            <span
              ref={brandLeftRef}
              className="inline-block font-serif font-bold text-3xl md:text-5xl lg:text-6xl tracking-widest uppercase text-white"
            >
              Meka
            </span>
          </div>
          <div className="overflow-hidden pb-4">
            <span
              ref={brandRightRef}
              className="inline-block font-serif font-bold text-3xl md:text-5xl lg:text-6xl tracking-widest uppercase text-[#B38356]"
            >
              Dredging
            </span>
          </div>
        </div>

        {/* Bottom Status Text & Micro-Progress Bar */}
        <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[200px] flex flex-col items-center gap-4">
          <div className="w-full h-[1px] bg-white/10 overflow-hidden relative">
             <div ref={progressLineRef} className="absolute inset-0 bg-[#B38356] origin-left" />
          </div>
          <p 
            ref={bottomTextRef}
            className="font-sans text-[9px] md:text-[10px] uppercase text-slate-400 font-semibold tracking-widest"
          >
            Establishing Target Depth
          </p>
        </div>

      </div>
    </div>
  );
}