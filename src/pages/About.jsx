import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Globe, Anchor, ArrowDownRight, Ship } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

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
        { scale: 1.15, filter: 'brightness(0.6) contrast(1.1)' },
        { scale: 1, filter: 'brightness(1) contrast(1)', duration: 2.2, ease: 'power3.inOut' }
      );

      heroTl.fromTo(heroTextRefs.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' },
        "-=1.2"
      );

      // 2. Story Section Stagger
      if (storyRef.current) {
        gsap.fromTo(storyRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
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
            { y: '-10%' },
            {
              y: '10%',
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
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: fleetRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // 5. Ethos Rows Reveal
      ethosRefs.current.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.8, delay: index * 0.1, ease: 'power3.out',
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
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: hseqRef.current,
              start: "top 80%",
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
      <section ref={heroRef} className="relative pt-40 lg:pt-52 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row justify-between lg:items-end gap-12">
          
          <div className="max-w-4xl md:h-72">
            <div className="overflow-hidden mb-6">
              <p ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356]  font-semibold tracking-[0.2em] text-[12px] uppercase flex items-center gap-4">
                <span className="w-12 h-px bg-[#B38356]"></span> Corporate Heritage
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-serif text-slate-900 leading-[0.95]">
              <div className="overflow-hidden"><div ref={(el) => addToRefs(el, heroTextRefs)}>Decades of</div></div>
              <div className="overflow-"><div ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] italic ">Mastery.</div></div>
            </h1>
          </div>

          {/* Animated Scroll Indicator */}
          <div className="overflow-hidden hidden lg:block pb-4">
            <div ref={(el) => addToRefs(el, heroTextRefs)} className="flex items-center gap-2 text-slate-400">
              <span className="text-[12px] relative left-2 tracking-[0.2em] uppercase font-bold rotate-90 transform origin-left w-12 ">Scroll</span>
              <div className="w-px h-30 bg-slate-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-[#B38356] animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image - Edge to Edge - Fixed Heights */}
        <div className="relative h-[460px] md:h-[600px] w-full mt-16 lg:mt-24">
          <div className="absolute inset-0 overflow-hidden bg-slate-20">
            <img 
              ref={heroImageRef}
              src="/hero/meka-dredging-hero.jpg" 
              alt="Meka Dredging historical fleet" 
              className="w-full h-full object-cover object-center origin-center"
            />
          </div>
          {/* Subtle gradient to blend into the next section */}
          {/* <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent opacity-80"></div> */}
        </div>
      </section>

      {/* The Genesis / Editorial Spread */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 relative">
            
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

            <div ref={storyRef} className="lg:col-span-7 lg:col-start-6 space-y-24 md:space-y-32 pt-12 lg:pt-0">
              
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-slate-100 max-w-xl ml-auto shadow-sm">
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
              </div>

              {/* Added thick border to create an editorial overlap effect */}
              <div className="relative -left-55 aspect-video overflow-hidden bg-slate-100 -ml-2 lg:-ml-24 shadow-2xl border-8 border-white">
                <div className="absolute inset-0 h-[130%] -top-[15%] w-full">
                  <img 
                    ref={(el) => addToRefs(el, parallaxImageRefs)}
                    src="/hero/meka-dredging-hero-2.jpg" 
                    alt="Modern dredging fleet" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold drop-shadow-md">Present / Global Fleet</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* The Arsenal / Fleet Section */}
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
              // Upgraded interaction: Hover lifts card, warms background, and scales icon
              <div key={idx} className="group bg-white p-8 border border-slate-200 hover:border-[#B38356]/50 hover:bg-[#fffdfa] hover:-translate-y-2 hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full">
                <Ship className="w-8 h-8 text-[#B38356] mb-8 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 transform origin-left" strokeWidth={1.5} />
                <h3 className="text-xl font-serif text-slate-900 mb-3">{vessel.title}</h3>
                <p className="text-slate-500 font-light text-sm mb-8 flex-grow">{vessel.desc}</p>
                <div className="pt-5 border-t border-slate-100 group-hover:border-[#B38356]/20 transition-colors duration-500">
                  <p className="text-[10px] tracking-widest text-slate-400 group-hover:text-[#B38356] font-bold uppercase transition-colors duration-500">{vessel.specs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Ethos */}
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
                className="group border-b border-slate-900/10 py-10 lg:py-16 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#FAFAFA] transition-colors duration-500 px-4 md:px-8 -mx-4 md:-mx-8 cursor-pointer rounded-xl"
              >
                <div className="flex items-center gap-6 md:gap-8 md:w-1/2">
                  <span className="text-3xl font-serif text-slate-300 group-hover:text-[#B38356] transition-colors duration-500">0{index + 1}</span>
                  <h4 className="text-2xl md:text-4xl font-serif text-slate-900">{item.title}</h4>
                </div>
                <div className="md:w-1/2 flex items-center justify-between gap-8">
                  <p className="text-slate-500 text-sm leading-relaxed font-light max-w-md">{item.desc}</p>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 flex items-center justify-center text-[#B38356] group-hover:bg-[#B38356] group-hover:text-white group-hover:border-[#B38356] transition-all duration-500 shrink-0 shadow-sm">
                    <ArrowDownRight className="w-4 h-4 md:w-5 md:h-5 -rotate-90 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark HSEQ Section */}
      <section className="py-32 md:py-48 bg-[#050A15] text-white relative overflow-hidden">
        {/* Fixed Background Blob Sizes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B38356]/10 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-800/50 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

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
              
              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-12">
                {[
                  { num: '9001:2015', label: 'Quality Management' },
                  { num: '14001:2015', label: 'Environmental Systems' },
                  { num: '45001:2018', label: 'Occupational Health' },
                  { num: 'Zero', label: 'LTI Target Culture' }
                ].map((cert, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-5 md:p-6 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                    <p className="text-[#B38356] font-serif text-xl md:text-2xl mb-2">{cert.num}</p>
                    <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-slate-400 font-bold">{cert.label}</p>
                  </div>
                ))}
              </div>

              
            </div>

            <div className="lg:col-span-5 lg:col-start-8 relative aspect-[4/5] overflow-hidden bg-slate-900 shadow-2xl rounded-sm">
              <div className="absolute inset-0 h-[120%] -top-[10%] w-full">
                <img 
                  ref={(el) => addToRefs(el, parallaxImageRefs)}
                  src="https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?q=80&w=2874&auto=format&fit=crop" 
                  alt="Marine safety operations" 
                  className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050A15]/90 via-transparent to-transparent"></div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

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