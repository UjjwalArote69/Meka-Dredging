import React, { useEffect, useRef } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar'; 

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  // Refs for GSAP
  const heroRef = useRef(null);
  const heroTextRefs = useRef([]);
  const heroImageRef = useRef(null);
  const missionRef = useRef(null);
  const metricsRef = useRef([]);
  const legacyRefs = useRef([]);
  const leadershipRef = useRef(null);
  const leaderImageRefs = useRef([]);

  useEffect(() => {
    // --- GSAP ANIMATIONS ---
    const ctx = gsap.context(() => {
      // 1. Hero Entrance
      const heroTl = gsap.timeline();
      
      heroTl.fromTo(heroImageRef.current, 
        { scale: 1.15, clipPath: 'inset(15% 0% 15% 0%)', filter: 'brightness(0.8) contrast(1.2)' },
        { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', filter: 'brightness(1) contrast(1)', duration: 2.2, ease: 'power3.inOut' }
      );

      heroTl.fromTo(heroTextRefs.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out' },
        "-=1.2"
      );

      // 2. Mission Statement Reveal
      gsap.fromTo(missionRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 85%",
          }
        }
      );

      // 3. Metrics Reveal
      metricsRef.current.forEach((el) => {
        gsap.fromTo(el, 
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            }
          }
        );
      });

      // 4. Legacy Timeline Reveal
      legacyRefs.current.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, delay: index * 0.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });

      // 5. Advanced Leadership Reveal & Parallax
      const leaders = gsap.utils.toArray('.leader-card');
      
      leaders.forEach((leader, i) => {
        // Container fade up
        gsap.fromTo(leader,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: leader,
              start: "top 85%",
            }
          }
        );

        // Image Parallax Effect inside container
        const img = leaderImageRefs.current[i];
        if (img) {
          gsap.fromTo(img,
            { y: '-10%' },
            {
              y: '10%',
              ease: 'none',
              scrollTrigger: {
                trigger: leader,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }
      });
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
      
      <Navbar/>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 z-10">
              <div className="overflow-hidden mb-8">
                <p ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] font-semibold tracking-[0.2em] text-xs uppercase flex items-center gap-4">
                  <span className="w-12 h-px bg-[#B38356]"></span> Defining Coastal Infrastructure
                </p>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif text-slate-900 leading-[1] mb-8">
                <div className="overflow-hidden"><div ref={(el) => addToRefs(el, heroTextRefs)}>Precision</div></div>
                <div className="overflow-hidden"><div ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] italic">Marine</div></div>
                <div className="overflow-hidden"><div ref={(el) => addToRefs(el, heroTextRefs)}>Engineering.</div></div>
              </h1>
              
              <div className="overflow-hidden mb-12">
                <p ref={(el) => addToRefs(el, heroTextRefs)} className="text-slate-600 text-lg md:text-xl leading-relaxed font-light max-w-lg">
                  Specialized capital dredging, land reclamation, and marine construction services executing the world's most complex hydro-engineering challenges.
                </p>
              </div>

              <div className="overflow-hidden">
                <div ref={(el) => addToRefs(el, heroTextRefs)} className="flex flex-col sm:flex-row gap-5">
                  <button className="bg-slate-900 hover:bg-[#B38356] text-white px-8 py-4.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 flex items-center justify-center gap-3">
                    View Capabilities <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-6 relative h-[550px] lg:h-[750px] w-full">
              <div className="absolute inset-0 overflow-hidden bg-slate-200">
                <img 
                  ref={heroImageRef}
                  src="/hero/meka-dredging-hero-2.jpg" 
                  alt="Meka Dredging operations vessel at sea" 
                  className="w-full h-full object-cover object-center origin-center"
                />
              </div>
              <div className="absolute top-10 -left-10 w-20 h-px bg-slate-900/20"></div>
              <div className="absolute bottom-10 -right-10 w-20 h-px bg-slate-900/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-20 bg-slate-900 text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-white/10">
            {[
              { value: '40+', label: 'Years of Heritage' },
              { value: '150+', label: 'Projects Executed' },
              { value: '25+', label: 'Specialized Vessels' },
              { value: '10M+', label: 'CBM Dredged Annually' }
            ].map((metric, index) => (
              <div key={index} ref={(el) => addToRefs(el, metricsRef)} className="pl-8 first:pl-0 flex flex-col justify-center">
                <h3 className="text-4xl md:text-5xl font-serif text-[#B38356] mb-2">{metric.value}</h3>
                <p className="text-[10px] tracking-[0.2em] uppercase font-light text-slate-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Philosophy */}
      <section ref={missionRef} className="py-40 bg-white relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-12">Our Philosophy</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.3] font-light text-slate-900">
            "Executing <span className="text-[#B38356] italic">sustainable hydro-infrastructure</span> that balances sovereign economic progress with the strict preservation of coastal biomes."
          </h2>
        </div>
      </section>

      {/* Operations / Capabilities Timeline Section */}
      <section className="py-32 bg-[#FAFAFA] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4">Core Competencies</p>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900">Strategic Marine Execution</h2>
            </div>
            <p className="text-slate-500 font-light max-w-sm">Deploying advanced maritime assets for international port authorities and government infrastructure sectors.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {[
              { num: '01', title: 'Capital Dredging', desc: 'Deepening navigational channels, turning basins, and harbor layouts for modern mega-vessels using advanced Cutter Suction technology.' },
              { num: '02', title: 'Land Reclamation', desc: 'Creating structurally sound artificial landmasses for industrial, commercial, and port infrastructure expansions.' },
              { num: '03', title: 'Coastal Protection', desc: 'Engineering robust breakwaters, groynes, and sea walls to defend shorelines against severe tidal erosion and climatic shifts.' },
            ].map((item, index) => (
              <div key={index} ref={(el) => addToRefs(el, legacyRefs)} className="group relative border-t border-slate-300 pt-8 hover:border-[#B38356] transition-colors duration-500">
                <span className="absolute -top-4 right-0 text-7xl font-serif text-slate-100 group-hover:text-[#B38356]/10 transition-colors duration-500 pointer-events-none">
                  {item.num}
                </span>
                <h4 className="text-2xl font-serif text-slate-900 mb-4 pr-10">{item.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Leadership Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-slate-200 pb-12 gap-8">
            <div className="max-w-2xl">
              <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4">Board of Directors</p>
              <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[1.1]">The Visionaries Behind The Operations</h2>
            </div>
            <p className="text-slate-500 font-light max-w-sm pb-2">
              Our executive team brings together over a century of combined expertise in maritime engineering, global logistics, and corporate strategy.
            </p>
          </div>

          <div ref={leadershipRef} className="grid md:grid-cols-12 gap-x-8 gap-y-20 lg:gap-y-32">
            {[
              { 
                name: 'Mr. Hemanth Meka Rao', 
                role: 'Director', 
                img: '/hero/hmr.webp',
                desc: 'Leading the strategic expansion of the Meka Group\'s maritime assets and international joint ventures.',
                colSpan: 'md:col-span-5 md:col-start-1',
                aspect: 'aspect-[3/4]'
              },
              { 
                name: 'Mr. Arindam Basu', 
                role: 'Vice President', 
                img: '/hero/basusir.webp',
                desc: 'Overseeing global operational logistics, ensuring maximum efficiency across all active dredging sites.',
                colSpan: 'md:col-span-6 md:col-start-7',
                aspect: 'aspect-[4/5]',
                marginTop: 'md:mt-32' // Creates the staggered asymmetric look
              },
              { 
                name: 'Capt. M. K. Rayudu', 
                role: 'Dredging Head', 
                img: '/hero/rayudusir.webp',
                desc: 'Chief technical authority on capital dredging methodologies and fleet deployment strategy.',
                colSpan: 'md:col-span-6 md:col-start-4',
                aspect: 'aspect-[16/9]' // Wider format for variety
              }
            ].map((leader, index) => (
              <div 
                key={index} 
                className={`leader-card group cursor-pointer ${leader.colSpan} ${leader.marginTop || ''}`}
              >
                <div className={`relative overflow-hidden bg-slate-100 mb-8 ${leader.aspect}`}>
                  {/* Parallax Image Wrapper */}
                  <div className="absolute inset-0 h-[120%] -top-[10%] w-full"> 
                    <img 
                      ref={(el) => {
                        if (el && !leaderImageRefs.current.includes(el)) {
                          leaderImageRefs.current[index] = el;
                        }
                      }}
                      src={leader.img} 
                      alt={leader.name} 
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-out"
                    />
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Read Bio <Plus size={14} />
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-t border-slate-200 pt-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif text-slate-900 mb-2 group-hover:text-[#B38356] transition-colors duration-300">{leader.name}</h3>
                    <p className="text-[#B38356] text-[10px] font-bold tracking-[0.2em] uppercase">{leader.role}</p>
                  </div>
                  <p className="text-slate-500 text-sm font-light max-w-xs leading-relaxed hidden lg:block">
                    {leader.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050A15] text-slate-400 py-24">
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
    </div>
  );
}