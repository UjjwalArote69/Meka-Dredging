import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Globe, Anchor, ArrowDownRight, Ship } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar'; 

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  // Refs for GSAP
  const heroRef = useRef(null);
  const heroTextRefs = useRef([]);
  const heroImageRef = useRef(null);
  const storyRef = useRef(null);
  const ethosRefs = useRef([]);
  const fleetRef = useRef(null);
  const hseqRef = useRef(null);
  const parallaxImageRefs = useRef([]);


  // --- GSAP ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Animation
      const heroTl = gsap.timeline();
      
      heroTl.fromTo(heroImageRef.current, 
        { scale: 1.2, filter: 'brightness(0.6) contrast(1.1)' },
        { scale: 1, filter: 'brightness(1) contrast(1)', duration: 2.5, ease: 'power3.out' }
      );

      heroTl.fromTo(heroTextRefs.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out' },
        "-=1.8"
      );

      // 2. Story Section Stagger
      if (storyRef.current) {
        gsap.fromTo(storyRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // 3. Parallax Images setup (Reusable for any image)
      parallaxImageRefs.current.forEach((img) => {
        if (img) {
          gsap.fromTo(img,
            { y: '-15%' },
            {
              y: '15%',
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }
      });

      // 4. Fleet Section Animation
      if (fleetRef.current) {
        gsap.fromTo(fleetRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: fleetRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // 5. Ethos Rows Reveal
      ethosRefs.current.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 1, delay: index * 0.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });

      // 6. HSEQ Fade In
      if (hseqRef.current) {
        gsap.fromTo(hseqRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: hseqRef.current,
              start: "top 75%",
            }
          }
        );
      }
    });

    return () => {
      ctx.revert(); 
    };
  }, []);

  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden">
      
      <Navbar />

      {/* Advanced Hero Section */}
      <section ref={heroRef} className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row justify-between lg:items-end gap-12">
          
          <div className="max-w-4xl">
            <div className="overflow-hidden mb-6">
              <p ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase flex items-center gap-4">
                <span className="w-12 h-px bg-[#B38356]"></span> Corporate Heritage
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-serif text-slate-900 leading-[0.95]">
              <div className="overflow-hidden"><div ref={(el) => addToRefs(el, heroTextRefs)}>Decades of</div></div>
              <div className="overflow-hidden"><div ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] italic">Mastery.</div></div>
            </h1>
          </div>

          {/* Animated Scroll Indicator */}
          <div className="overflow-hidden hidden lg:block pb-4">
            <div ref={(el) => addToRefs(el, heroTextRefs)} className="flex items-center gap-4 text-slate-400">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold rotate-90 transform origin-left w-16">Scroll</span>
              <div className="w-px h-24 bg-slate-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-[#B38356] animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image - Edge to Edge */}
        <div className="relative h-[450px] md:h-[650px] w-full mt-16 lg:mt-24">
          <div className="absolute inset-0 overflow-hidden bg-slate-200">
            <img 
              ref={heroImageRef}
              src="/hero/meka-dredging-hero.jpg" 
              alt="Meka Dredging historical fleet" 
              className="w-full h-full object-cover object-center origin-center"
            />
          </div>
          {/* Subtle gradient to blend image into next section */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
        </div>
      </section>

      {/* The Genesis / Editorial Spread */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 relative">
            
            {/* Sticky Left Narrative */}
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-40">
                <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-6">The Genesis</p>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8 leading-[1.2]">
                  Forged in 1980, <br/> refined globally.
                </h2>
                <div className="w-16 h-px bg-[#B38356] mb-8"></div>
                <p className="text-slate-600 font-light leading-relaxed mb-6 text-lg">
                  As the specialized marine engineering division of the Meka Group, Meka Dredging was established to answer the growing international demand for technically advanced, environmentally conscious hydro-infrastructure.
                </p>
                <p className="text-slate-500 font-light leading-relaxed">
                  Operating synergistically alongside Amma Lines, we leverage a massive logistical framework. We don't just clear pathways; we architect the oceanic gateways of tomorrow.
                </p>
              </div>
            </div>

            {/* Right Column Parallax Spread */}
            <div ref={storyRef} className="lg:col-span-7 lg:col-start-6 space-y-32 pt-12 lg:pt-0">
              
              {/* Image 1: Tall Portrait */}
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-slate-100 max-w-xl ml-auto">
                <div className="absolute inset-0 h-[130%] -top-[15%] w-full">
                  <img 
                    ref={(el) => addToRefs(el, parallaxImageRefs)}
                    src="/hero/ammalines-project.jpg" 
                    alt="Early dredging operations" 
                    className="w-full h-full object-cover grayscale opacity-90"
                  />
                </div>
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold">1980 / Lagos, Nigeria</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>

              {/* Image 2: Wide Landscape, offset left */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 -ml-6 lg:-ml-24 shadow-2xl">
                <div className="absolute inset-0 h-[130%] -top-[15%] w-full">
                  <img 
                    ref={(el) => addToRefs(el, parallaxImageRefs)}
                    src="/hero/meka-dredging-hero-2.jpg" 
                    alt="Modern dredging fleet" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold">Present / Global Fleet</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* The Arsenal / Fleet Section (NEW) */}
      <section className="py-32 bg-[#FAFAFA] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20">
            <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4">Our Arsenal</p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900">Advanced Marine Assets</h2>
          </div>

          <div ref={fleetRef} className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Cutter Suction Dredgers", desc: "For hard soils and rock formations.", specs: "Up to 25,000 kW installed power." },
              { title: "Trailing Suction Hopper", desc: "For maintenance and reclamation.", specs: "Capacities up to 30,000 m³." },
              { title: "Auxiliary Fleet", desc: "Tugboats, multicats, and survey vessels.", specs: "Supporting global deployment." }
            ].map((vessel, idx) => (
              <div key={idx} className="group bg-white p-8 border border-slate-200 hover:border-[#B38356] transition-colors duration-500 cursor-pointer">
                <Ship className="w-8 h-8 text-[#B38356] mb-8 opacity-80" strokeWidth={1.5} />
                <h3 className="text-xl font-serif text-slate-900 mb-3">{vessel.title}</h3>
                <p className="text-slate-500 font-light text-sm mb-6">{vessel.desc}</p>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[10px] tracking-[0.1em] text-slate-400 font-bold uppercase">{vessel.specs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Ethos - Premium Row Layout */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20">
            <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4">Corporate Ethos</p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900">The Pillars of Operation</h2>
          </div>

          <div className="border-t border-slate-900/10">
            {[
              { 
                icon: <Anchor className="w-6 h-6" strokeWidth={1.5} />, 
                title: 'Uncompromised Precision', 
                desc: 'Utilizing state-of-the-art DGPS positioning and automated cutter systems to execute dredging parameters down to the centimeter.' 
              },
              { 
                icon: <Globe className="w-6 h-6" strokeWidth={1.5} />, 
                title: 'Ecological Stewardship', 
                desc: 'Pioneering closed-loop sediment transport methods that preserve local biomes and drastically reduce coastal turbidity.' 
              },
              { 
                icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />, 
                title: 'Absolute Integrity', 
                desc: 'Maintaining total transparency with port authorities, government entities, and joint-venture partners across all international operations.' 
              },
            ].map((item, index) => (
              <div 
                key={index} 
                ref={(el) => addToRefs(el, ethosRefs)} 
                className="group border-b border-slate-900/10 py-10 lg:py-16 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#FAFAFA] transition-colors duration-500 px-4 -mx-4 cursor-pointer"
              >
                <div className="flex items-center gap-8 md:w-1/2">
                  <span className="text-3xl font-serif text-slate-300 group-hover:text-[#B38356] transition-colors duration-500">0{index + 1}</span>
                  <h4 className="text-3xl md:text-4xl font-serif text-slate-900">{item.title}</h4>
                </div>
                <div className="md:w-1/2 flex items-center justify-between gap-8">
                  <p className="text-slate-500 text-sm leading-relaxed font-light max-w-md">{item.desc}</p>
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-[#B38356] group-hover:bg-[#B38356] group-hover:text-white transition-all duration-500 shrink-0">
                    <ArrowDownRight className="w-5 h-5 -rotate-90 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark HSEQ Section */}
      <section className="py-32 md:py-48 bg-[#050A15] text-white relative overflow-hidden">
        {/* Cinematic Blur Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#B38356]/10 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-800/50 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <div ref={hseqRef} className="lg:col-span-6">
              <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-6 flex items-center gap-4">
                <ShieldCheck size={16} /> Commitment to Safety
              </p>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-[1.1]">
                Health, Safety, <br/> Environment & Quality.
              </h2>
              <div className="w-20 h-px bg-[#B38356] mb-8"></div>
              <p className="text-slate-400 font-light leading-relaxed text-lg mb-12">
                At Meka Dredging, the safety of our crew and the preservation of the marine environment supersede all other operational metrics. We operate under stringent, internationally certified HSEQ frameworks. 
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {[
                  { num: '9001:2015', label: 'Quality Management' },
                  { num: '14001:2015', label: 'Environmental Systems' },
                  { num: '45001:2018', label: 'Occupational Health' },
                  { num: 'Zero', label: 'LTI Target Culture' }
                ].map((cert, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                    <p className="text-[#B38356] font-serif text-2xl mb-2">{cert.num}</p>
                    <p className="text-[10px] tracking-[0.1em] uppercase text-slate-400 font-bold">{cert.label}</p>
                  </div>
                ))}
              </div>

              <button className="bg-[#B38356] hover:bg-white hover:text-slate-900 text-white px-8 py-4 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-500">
                Download Full HSEQ Policy
              </button>
            </div>

            {/* Cinematic HSEQ Image */}
            <div className="lg:col-span-5 lg:col-start-8 relative aspect-[4/5] overflow-hidden bg-slate-900">
              <div className="absolute inset-0 h-[120%] -top-[10%] w-full">
                <img 
                  ref={(el) => addToRefs(el, parallaxImageRefs)}
                  src="https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?q=80&w=2874&auto=format&fit=crop" 
                  alt="Marine safety operations" 
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050A15]/80 via-transparent to-transparent"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050A15] text-slate-400 py-24 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-20 mb-20 gap-10">
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white max-w-2xl">
              Initiate your next <span className="text-[#B38356] italic">infrastructure</span> milestone.
             </h2>
             <button className="bg-[#B38356] hover:bg-white hover:text-slate-900 text-white px-10 py-5 text-[11px] tracking-[0.25em] uppercase font-bold transition-all duration-500 shrink-0">
              Submit RFP Inquiry
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <span className="font-serif font-bold text-3xl tracking-[0.1em] uppercase text-white block mb-6">Meka <span className="text-[#B38356]">Dredging</span></span>
              <p className="text-sm leading-relaxed max-w-sm font-light mb-8 opacity-80">
                A division of the Meka Group. Executing premium marine infrastructure, capital dredging, and coastal protection since 1980.
              </p>
            </div>
            
            <div className="md:col-span-3 md:col-start-7">
              <h4 className="text-white text-[10px] tracking-[0.25em] uppercase font-bold mb-8">Corporate</h4>
              <ul className="space-y-4 text-sm font-light opacity-80">
                <li><a href="#" className="hover:text-[#B38356] hover:opacity-100 transition-all">About The Group</a></li>
                <li><a href="#" className="hover:text-[#B38356] hover:opacity-100 transition-all">HSEQ Standards</a></li>
                <li><a href="#" className="hover:text-[#B38356] hover:opacity-100 transition-all">Fleet Specifications</a></li>
                <li><a href="#" className="hover:text-[#B38356] hover:opacity-100 transition-all">Careers</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-white text-[10px] tracking-[0.25em] uppercase font-bold mb-8">Operations</h4>
              <ul className="space-y-4 text-sm font-light opacity-80">
                <li><a href="#" className="hover:text-[#B38356] hover:opacity-100 transition-all">Capital Dredging</a></li>
                <li><a href="#" className="hover:text-[#B38356] hover:opacity-100 transition-all">Maintenance Dredging</a></li>
                <li><a href="#" className="hover:text-[#B38356] hover:opacity-100 transition-all">Reclamation Works</a></li>
                <li><a href="#" className="hover:text-[#B38356] hover:opacity-100 transition-all">Breakwater Construction</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-light opacity-60">
            <p>© {new Date().getFullYear()} Meka Dredging. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}} />
    </div>
  );
}