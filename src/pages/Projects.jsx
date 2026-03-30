import React, { useEffect, useRef } from 'react';
import { Globe, ArrowRight, ArrowDownRight, Anchor } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/layout/Navbar'; 
import Footer from '../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "Port & Harbor Deepening",
    category: "Capital Dredging",
    location: "Mumbai, India",
    client: "Indian Port Authority",
    volume: "4.2M CBM",
    desc: "Large-scale capital dredging operations to deepen navigational channels and turning basins, enabling accommodation of new-generation vessels. Executed with advanced cutter suction dredgers through hard rock and compacted marine clay, following strict QHSE protocols.",
    img: "https://mekadredging.com/wp-content/uploads/2025/10/image-46.webp",
    aspect: "aspect-[4/5]"
  },
  {
    title: "Coastal Breakwater Construction",
    category: "Coastal Protection",
    location: "Gujarat, India",
    client: "State Maritime Board",
    volume: "850K Tonnes Rock",
    desc: "Construction of resilient breakwater systems designed to mitigate extreme tidal erosion and safeguard local marine ecosystems and onshore industrial infrastructure. Environmental impact assessments conducted at every stage to ensure ecological responsibility.",
    img: "https://mekadredging.com/wp-content/uploads/2025/10/f8d3ca71-cab1-4438-9ce6-d3e8cb992ba3.png",
    aspect: "aspect-[16/9]"
  },
  {
    title: "Strategic Land Reclamation",
    category: "Land Reclamation",
    location: "West Africa",
    client: "International Joint Venture",
    volume: "12M CBM",
    desc: "Precision land reclamation creating new, structurally sound real estate for commercial port facilities and coastal development. Utilizing closed-loop sediment transport and sustainable dredging practices to achieve minimal environmental disruption.",
    img: "https://mekadredging.com/wp-content/uploads/2025/10/image-56.webp",
    aspect: "aspect-[3/4]"
  },
  {
    title: "Navigational Channel Maintenance",
    category: "Maintenance Dredging",
    location: "Maharashtra, India",
    client: "Port Trust / Naval Authority",
    volume: "1.5M CBM Annually",
    desc: "Ongoing precision maintenance dredging of critical naval and commercial berths. Continuous operations executed without disrupting high-density vessel traffic, supported by advanced survey systems and real-time monitoring for optimal channel depth compliance.",
    img: "https://mekadredging.com/wp-content/uploads/2025/10/image-61.webp",
    aspect: "aspect-[4/5]"
  },
  {
    title: "HDPE Pipeline Installation",
    category: "Marine Infrastructure",
    location: "Pan-India",
    client: "Industrial & Government Clients",
    volume: "Multiple Installations",
    desc: "Specialized HDPE pipeline installation for marine and coastal infrastructure, leveraging over 35 years of EPC project execution expertise. End-to-end project delivery from feasibility studies and planning through to contract supervision and performance auditing.",
    img: "https://mekadredging.com/wp-content/uploads/2025/10/Screenshot-2025-10-16-115430.png",
    aspect: "aspect-[16/9]"
  },
  {
    title: "Waterway Engineering & Development",
    category: "Waterway Development",
    location: "Across 10+ Countries",
    client: "Government & Port Authorities",
    volume: "50+ Projects Delivered",
    desc: "Comprehensive waterway engineering services encompassing numerical and physical modelling, environmental impact assessment, and budget-optimized execution. Delivering navigational safety and long-term marine infrastructure performance across three continents.",
    img: "https://mekadredging.com/wp-content/uploads/2025/10/image-62.webp",
    aspect: "aspect-[3/4]"
  }
];

export default function Projects() {
  const heroRef = useRef(null);
  const heroTextRefs = useRef([]);
  const heroDecoRef = useRef(null);
  const heroLineRef = useRef(null);
  const projectRefs = useRef([]);
  const projectImgRefs = useRef([]);
  const projectOverlayRefs = useRef([]);
  const projectNumberRefs = useRef([]);
  const statsRef = useRef(null);
  const statItemRefs = useRef([]);
  const servicesRef = useRef(null);
  const serviceCardRefs = useRef([]);
  const ctaRef = useRef(null);
  const ctaGlobeRef = useRef(null);
  const ctaGlowRef = useRef(null);
  const ctaTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ─── 1. HERO PARALLAX ───
      gsap.fromTo(heroTextRefs.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
      );

      // Hero content drifts up slower than scroll
      if (heroRef.current) {
        const heroContent = heroRef.current.querySelector('.hero-content');
        if (heroContent) {
          gsap.to(heroContent, {
            y: -80,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            }
          });
        }
      }

      // Decorative circle drifts down + rotates
      if (heroDecoRef.current) {
        gsap.to(heroDecoRef.current, {
          y: 160,
          rotate: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // Horizontal line stretches
      if (heroLineRef.current) {
        gsap.fromTo(heroLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }

      // ─── 2. STATS PARALLAX ───
      if (statsRef.current) {
        gsap.fromTo(statsRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%' }
          }
        );

        statItemRefs.current.forEach((item, i) => {
          if (item) {
            gsap.fromTo(item,
              { y: 30 + i * 10, opacity: 0 },
              {
                y: 0, opacity: 1, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: statsRef.current, start: 'top 80%' }
              }
            );
          }
        });
      }

      // ─── 3. PROJECT IMAGE PARALLAX (ENHANCED) ───
      projectRefs.current.forEach((project, i) => {
        if (!project) return;

        // Text elements fade + slide
        const textElements = project.querySelectorAll('.project-text');
        gsap.fromTo(textElements,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: project, start: 'top 75%' }
          }
        );

        // Deep image parallax — 40% travel + scale shift
        const img = projectImgRefs.current[i];
        if (img) {
          gsap.fromTo(img,
            { y: '-20%', scale: 1.15 },
            {
              y: '20%',
              scale: 1.0,
              ease: 'none',
              scrollTrigger: {
                trigger: project,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              }
            }
          );
        }

        // Light-sweep overlay
        const overlay = projectOverlayRefs.current[i];
        if (overlay) {
          gsap.fromTo(overlay,
            { opacity: 0.15 },
            {
              opacity: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: project,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }

        // Project number drifts at its own speed
        const number = projectNumberRefs.current[i];
        if (number) {
          gsap.fromTo(number,
            { y: 40 },
            {
              y: -30,
              ease: 'none',
              scrollTrigger: {
                trigger: project,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }

        // Clip-path reveal on image container
        const imgContainer = project.querySelector('.img-container');
        if (imgContainer) {
          gsap.fromTo(imgContainer,
            { clipPath: 'inset(8% 0% 8% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'power2.out',
              scrollTrigger: {
                trigger: project,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 0.8,
              }
            }
          );
        }
      });

      // ─── 4. SERVICES STAGGER ───
      if (serviceCardRefs.current.length) {
        serviceCardRefs.current.forEach((card, i) => {
          if (!card) return;
          gsap.fromTo(card,
            { y: 40 + (i % 4) * 15, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
              scrollTrigger: {
                trigger: servicesRef.current,
                start: 'top 75%',
              },
              delay: i * 0.05,
            }
          );
        });
      }

      // ─── 5. CTA MULTI-LAYER PARALLAX ───
      if (ctaRef.current) {
        if (ctaGlobeRef.current) {
          gsap.fromTo(ctaGlobeRef.current,
            { y: 60, opacity: 0, rotate: -10 },
            {
              y: -40, opacity: 0.8, rotate: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: ctaRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }

        if (ctaGlowRef.current) {
          gsap.fromTo(ctaGlowRef.current,
            { x: '30%', y: '-30%', scale: 0.8 },
            {
              x: '-10%', y: '10%', scale: 1.3,
              ease: 'none',
              scrollTrigger: {
                trigger: ctaRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }

        if (ctaTextRef.current) {
          gsap.fromTo(ctaTextRef.current,
            { y: 80 },
            {
              y: -40,
              ease: 'none',
              scrollTrigger: {
                trigger: ctaRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }
      }

    });

    return () => ctx.revert();
  }, []);

  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  const addIndexedRef = (el, refArray, index) => {
    if (el) {
      refArray.current[index] = el;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden">
      
      <Navbar />

      {/* ════════ HERO — Parallax Layers ════════ */}
      <section ref={heroRef} className="relative pt-48 pb-20 lg:pt-56 lg:pb-32 bg-[#FAFAFA] overflow-hidden">
        
        {/* Floating decorative circle — own parallax speed */}
        <div
          ref={heroDecoRef}
          className="absolute -right-20 top-20 w-64 h-64 border border-[#B38356]/10 rounded-full pointer-events-none"
          style={{ willChange: 'transform' }}
        />
        
        {/* Stretching horizontal accent */}
        <div
          ref={heroLineRef}
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B38356]/30 to-transparent origin-left"
          style={{ willChange: 'transform' }}
        />

        <div className="hero-content max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row justify-between items-end gap-12" style={{ willChange: 'transform' }}>
          
          <div className="relative -left-10 max-w-4xl">
            <div className="overflow-hidden mb-6">
              <p ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] font-semibold tracking-[0.2em] text-[14px] uppercase flex items-center gap-4">
                <span className="w-12 h-px bg-[#B38356]"></span> Completed Projects
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-serif text-slate-900 leading-[0.95]">
              <div className="overflow-hidden"><div ref={(el) => addToRefs(el, heroTextRefs)}>Engineering</div></div>
              <div className="overflow-hidden"><div ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] italic">Marine Excellence.</div></div>
            </h1>
          </div>

          <div className="overflow-hidden pb-4 hidden md:block max-w-xs">
             <p ref={(el) => addToRefs(el, heroTextRefs)} className="text-slate-500 font-light leading-relaxed">
              Precision-driven dredging, reclamation, and coastal engineering projects delivered with environmental responsibility across 10+ countries since 2016.
            </p>
          </div>

        </div>
      </section>

      {/* ════════ STATS BAR — Staggered Entry ════════ */}
      <section ref={statsRef} className="bg-white border-b border-slate-100" style={{ willChange: 'transform, opacity' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-slate-100">
            {[
              { value: "40+", label: "Years of Marine Engineering Expertise" },
              { value: "50+", label: "Dredging & Reclamation Projects Worldwide" },
              { value: "300+", label: "Engineers, Marine Specialists & Experts" },
              { value: "10+", label: "Countries Served Globally" },
            ].map((stat, i) => (
              <div
                key={i}
                ref={(el) => addIndexedRef(el, statItemRefs, i)}
                className="py-10 px-6 text-center"
                style={{ willChange: 'transform, opacity' }}
              >
                <p className="text-3xl md:text-4xl font-serif text-[#B38356] mb-2">{stat.value}</p>
                <p className="text-[10px] tracking-[0.15em] uppercase text-slate-400 font-bold leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PROJECTS — Deep Parallax + Clip Reveal ════════ */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col gap-32 md:gap-48">
            {projectsData.map((project, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  ref={(el) => addToRefs(el, projectRefs)}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group`}
                >
                  
                  {/* Image — clip reveal + deep parallax inside */}
                  <div
                    className={`img-container w-full lg:w-3/5 relative overflow-hidden bg-slate-100 ${project.aspect}`}
                    style={{ willChange: 'clip-path' }}
                  >
                    {/* 140% height for 40% parallax travel room */}
                    <div className="absolute inset-0 h-[140%] -top-[20%] w-full" style={{ willChange: 'transform' }}>
                      <img 
                        ref={(el) => addIndexedRef(el, projectImgRefs, index)}
                        src={project.img} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-out"
                        style={{ willChange: 'transform' }}
                      />
                    </div>
                    {/* Light-sweep gradient overlay */}
                    <div
                      ref={(el) => addIndexedRef(el, projectOverlayRefs, index)}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(179,131,86,0.12) 0%, transparent 50%, rgba(5,10,21,0.08) 100%)',
                        willChange: 'opacity',
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  <div className="w-full lg:w-2/5 flex flex-col justify-center">
                    
                    {/* Number — own depth layer */}
                    <div className="flex items-center gap-4 mb-8 project-text">
                      <span
                        ref={(el) => addIndexedRef(el, projectNumberRefs, index)}
                        className="text-[#B38356] font-serif text-3xl inline-block"
                        style={{ willChange: 'transform' }}
                      >
                        0{index + 1}
                      </span>
                      <div className="w-12 h-px bg-slate-300"></div>
                      <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-500">{project.category}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8 leading-[1.1] project-text group-hover:text-[#B38356] transition-colors duration-500">
                      {project.title}
                    </h2>

                    <div className="grid grid-cols-2 gap-8 mb-8 border-y border-slate-100 py-6 project-text">
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-slate-400 mb-2 font-bold">Location</p>
                        <p className="text-sm font-medium text-slate-900">{project.location}</p>
                      </div>
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-slate-400 mb-2 font-bold">Extraction Vol.</p>
                        <p className="text-sm font-medium text-slate-900">{project.volume}</p>
                      </div>
                      <div className="col-span-2 border-t border-slate-100 pt-6">
                        <p className="text-[9px] tracking-[0.2em] uppercase text-slate-400 mb-2 font-bold">Client</p>
                        <p className="text-sm font-medium text-slate-900">{project.client}</p>
                      </div>
                    </div>

                    <p className="text-slate-500 font-light leading-relaxed mb-10 project-text">
                      {project.desc}
                    </p>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ════════ SERVICES — Waterfall Stagger ════════ */}
      <section ref={servicesRef} className="py-20 bg-[#FAFAFA] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-12 h-px bg-[#B38356]"></span>
            <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[12px] uppercase">Our Expertise</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Feasibility Studies",
              "Licence Applications",
              "Planning & Design",
              "Numerical & Physical Modelling",
              "Environmental Impact Assessment",
              "Contract Documentation",
              "Plant & Equipment Specifications",
              "Budget Pricing",
              "Project Evaluation",
              "Contract Supervision",
              "Project Monitoring & Auditing",
              "Expert Witness & Dispute Resolution",
            ].map((service, i) => (
              <div
                key={i}
                ref={(el) => addIndexedRef(el, serviceCardRefs, i)}
                className="group/svc py-5 px-5 border border-slate-200 bg-white hover:border-[#B38356] transition-colors duration-300 cursor-default"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[11px] tracking-[0.1em] uppercase font-bold text-slate-700 group-hover/svc:text-[#B38356] transition-colors duration-300 leading-relaxed">{service}</p>
                  <ArrowDownRight className="w-3.5 h-3.5 text-slate-300 group-hover/svc:text-[#B38356] transition-colors duration-300 shrink-0 mt-0.5" strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA — Multi-Layer Depth ════════ */}
      <section ref={ctaRef} className="py-32 bg-[#050A15] text-white relative overflow-hidden">
        {/* Glow — drifts + scales on scroll */}
        <div
          ref={ctaGlowRef}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B38356]/10 blur-[120px] rounded-full pointer-events-none"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#B38356]/5 blur-[100px] rounded-full pointer-events-none" />

        <div ref={ctaTextRef} className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center" style={{ willChange: 'transform' }}>
          <div ref={ctaGlobeRef} className="inline-block" style={{ willChange: 'transform, opacity' }}>
            <Globe className="w-12 h-12 text-[#B38356] mx-auto mb-10 opacity-80" strokeWidth={1} />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif mb-8 max-w-3xl mx-auto leading-[1.1]">
            Deploying marine engineering excellence across three continents.
          </h2>
          <p className="text-slate-400 font-light max-w-2xl mx-auto mb-12">
            A proud division of the Meka Group, our fleet and specialists are actively engaged in reshaping marine infrastructure globally. Partner with us to execute your next major coastal or port development project.
          </p>
          <a href="https://mekadredging.com/contact/" className="inline-block bg-[#B38356] hover:bg-white hover:text-slate-900 text-white px-10 py-5 text-[11px] tracking-[0.25em] uppercase font-bold transition-all duration-500">
            Get In Touch
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}