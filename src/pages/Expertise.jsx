import React, { useEffect, useRef } from 'react';
import { ArrowRight, Crosshair, Layers, ShieldCheck, Waves } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/layout/Navbar'; 
import Footer from '../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

const capabilitiesData = [
  {
    id: "01",
    title: "Capital Dredging",
    tagline: "Architecting New Navigational Horizons",
    desc: "Executing complex underwater excavation to deepen harbor channels, create new turning basins, and construct port layouts for the next generation of mega-vessels. We specialize in penetrating hard rock and compacted clay using our heavy-duty Cutter Suction Dredgers.",
    specs: ["Hard Rock Penetration", "Deep Water Extraction", "DGPS Centimeter Precision"],
    img: "https://images.unsplash.com/photo-1572093535942-0f5da48dc7ce?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Land Reclamation",
    tagline: "Engineering Terra Firma",
    desc: "Transforming open water into structurally sound, premium real estate. We transport millions of cubic meters of sediment to build artificial islands, expand existing port terminals, and support sovereign industrial growth with zero compromise to stability.",
    specs: ["Closed-Loop Transport", "Soil Consolidation", "Zero-Turbidity Operations"],
    img: "https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?q=80&w=2874&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Coastal Protection",
    tagline: "Safeguarding Shorelines",
    desc: "Designing and deploying massive physical barriers against the relentless forces of the ocean. From deep-water breakwaters to interlocking armor unit sea walls, we protect vulnerable coastal biomes and multi-billion-dollar onshore assets from extreme tidal erosion.",
    specs: ["Breakwater Construction", "Armor Stone Deployment", "Erosion Mitigation"],
    img: "https://images.unsplash.com/photo-1580983554869-775ce08c9038?q=80&w=2833&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Maintenance Dredging",
    tagline: "Sustaining Global Trade Routes",
    desc: "Providing continuous, non-disruptive sediment removal for the world's busiest commercial and naval ports. Our Trailing Suction Hopper dredgers operate 24/7 to maintain critical draft depths, ensuring unhindered global logistics.",
    specs: ["High-Traffic Port Ops", "Silt & Sand Removal", "Continuous Deployment"],
    img: "https://images.unsplash.com/photo-1605725613396-85ddce51a91e?q=80&w=2940&auto=format&fit=crop"
  }
];

export default function Expertise() {
  const heroRef = useRef(null);
  const heroTextRefs = useRef([]);
  const introRef = useRef(null);
  const capabilitiesRef = useRef([]);
  const processRefs = useRef([]);

  // --- GSAP ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal
      gsap.fromTo(heroTextRefs.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
      );

      // 2. Intro Text Reveal
      if (introRef.current) {
        gsap.fromTo(introRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // 3. Capabilities Parallax & Reveal
      capabilitiesRef.current.forEach((el) => {
        const textContent = el.querySelector('.cap-text');
        const imageContent = el.querySelector('.cap-image');

        gsap.fromTo(textContent,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
            }
          }
        );

        if (imageContent) {
          gsap.fromTo(imageContent,
            { y: '-15%', scale: 1.1 },
            {
              y: '15%', scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }
      });

      // 4. Process Stagger Reveal
      processRefs.current.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, delay: index * 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });
    });

    return () => ctx.revert(); 
  }, []);

  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden">
      
      <Navbar />

      {/* Bright Cinematic Hero Section */}
      <section ref={heroRef} className="relative pt-48 pb-20 lg:pt-64 lg:pb-32 bg-[#FAFAFA] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-start gap-12">
          <div className=" max-w-5xl">
            <div className= "relative left-10 overflow-hidden mb-6">
              <p ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] font-semibold tracking-[0.2em] text-[14px] uppercase flex items-center gap-4">
                <span className=" w-12 h-px bg-[#B38356]"></span> Core Competencies
              </p>
            </div>
            
            <h1 className="relative left-16 text-5xl md:text-7xl lg:text-[7.5rem] font-serif text-slate-900 leading-[0.95]">
              <div className="overflow-"><div ref={(el) => addToRefs(el, heroTextRefs)}>Operational</div></div>
              <div className="overflow-"><div ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] italic">Superiority.</div></div>
            </h1>
          </div>
        </div>
      </section>

      {/* Intro Statement */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={introRef} className="max-w-3xl ml-auto border-l border-slate-200 pl-8 md:pl-12">
            <p className="text-3xl md:text-4xl font-serif leading-[1.3] text-slate-900 mb-8">
              Meka Dredging deploys advanced maritime assets and proprietary engineering methodologies to solve the world's most demanding coastal infrastructure challenges.
            </p>
            <button className="flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase font-bold text-slate-900 hover:text-[#B38356] transition-colors duration-300">
              Explore Our Fleet <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* The Core Capabilities */}
      <section className="bg-[#FAFAFA] relative z-10 border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {capabilitiesData.map((cap, index) => (
            <div 
              key={index} 
              ref={(el) => addToRefs(el, capabilitiesRef)}
              className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 min-h-[90vh] py-24 border-b border-slate-200 last:border-0"
            >
              
              <div className="w-full lg:w-1/2 flex flex-col justify-center cap-text">
                <span className="text-[12rem] lg:text-[16rem] font-serif text-slate-100 leading-none absolute -ml-12 lg:-ml-24 select-none pointer-events-none">
                  {cap.id}
                </span>
                
                <div className="relative z-10">
                  <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4">
                    {cap.tagline}
                  </p>
                  <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-8 leading-[1.1]">
                    {cap.title}
                  </h2>
                  <div className="w-16 h-px bg-slate-300 mb-8"></div>
                  
                  <p className="text-slate-500 font-light leading-relaxed text-lg mb-10 max-w-lg">
                    {cap.desc}
                  </p>

                  <ul className="space-y-4">
                    {cap.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-4 text-xs tracking-widest uppercase font-bold text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B38356]"></div>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-125 lg:h-175 relative overflow-hidden bg-slate-200">
                <div className="absolute inset-0 h-[130%] -top-[15%] w-full">
                  <img 
                    src={cap.img} 
                    alt={cap.title} 
                    className="cap-image w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#FAFAFA]/50 to-transparent pointer-events-none"></div>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* Operational Methodology / Process */}
      <section className="py-32 md:py-48 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4">Methodology</p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900">The Execution Protocol</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
            {[
              { 
                step: '01', 
                icon: <Crosshair className="w-10 h-10 text-[#B38356]" strokeWidth={1} />, 
                title: 'Hydrographic Survey', 
                desc: 'Deploying multi-beam echo sounders and sub-bottom profilers to map the seabed topology with absolute precision before dredging commences.' 
              },
              { 
                step: '02', 
                icon: <Layers className="w-10 h-10 text-[#B38356]" strokeWidth={1} />, 
                title: 'Strategic Extraction', 
                desc: 'Utilizing automated cutter systems and hopper dredgers tailored specifically to the geotechnical properties of the sediment and rock.' 
              },
              { 
                step: '03', 
                icon: <Waves className="w-10 h-10 text-[#B38356]" strokeWidth={1} />, 
                title: 'Sediment Placement', 
                desc: 'Transferring materials via floating pipelines or bottom-door dumping to create stable reclamation areas or safe offshore disposal zones.' 
              },
            ].map((item, index) => (
              <div key={index} ref={(el) => addToRefs(el, processRefs)} className="relative group">
                <span className="absolute -top-10 -left-6 text-8xl font-serif text-slate-100 pointer-events-none transition-colors duration-500 group-hover:text-[#B38356]/10">
                  {item.step}
                </span>
                <div className="relative z-10">
                  <div className="mb-8">{item.icon}</div>
                  <h3 className="text-2xl font-serif text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-500 font-light leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <section className="py-32 bg-[#B38356] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20 pointer-events-none grayscale"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <ShieldCheck className="w-12 h-12 mx-auto mb-8 text-white" strokeWidth={1} />
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-[1.1]">
            Ready to engineer your next maritime gateway?
          </h2>
          <p className="font-light text-lg mb-12 opacity-90 max-w-2xl mx-auto">
            Partner with the Meka Group to ensure your coastal infrastructure is executed with uncompromised precision and safety.
          </p>
          <button className="bg-white hover:bg-[#050A15] text-slate-900 hover:text-white px-10 py-5 text-[11px] tracking-[0.25em] uppercase font-bold transition-all duration-500 shadow-xl">
            Consult With Our Engineers
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}