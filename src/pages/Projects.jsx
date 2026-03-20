import React, { useEffect, useRef } from 'react';
import { Globe, ArrowRight, ArrowDownRight, Anchor } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "Tuticorin Deep Water Expansion",
    category: "Capital Dredging",
    location: "Tamil Nadu, India",
    client: "Port Trust Authority",
    volume: "4.2M CBM",
    desc: "A massive undertaking to deepen the main navigational channel and turning circle to accommodate new-generation Panamax vessels. Executed using our flagship cutter suction dredgers through hard rock and compacted clay.",
    img: "https://images.unsplash.com/photo-1572093535942-0f5da48dc7ce?q=80&w=2940&auto=format&fit=crop",
    aspect: "aspect-[4/5]"
  },
  {
    title: "Gujarat Coastal Defense",
    category: "Coastal Protection",
    location: "Gujarat, India",
    client: "State Government",
    volume: "850K Tonnes Rock",
    desc: "Construction of a 5km resilient breakwater system designed to mitigate extreme tidal erosion and safeguard local marine biomes and onshore industrial infrastructure.",
    img: "https://images.unsplash.com/photo-1580983554869-775ce08c9038?q=80&w=2833&auto=format&fit=crop",
    aspect: "aspect-[16/9]"
  },
  {
    title: "Lagos Hub Reclamation",
    category: "Land Reclamation",
    location: "Lagos, Nigeria",
    client: "International Joint Venture",
    volume: "12M CBM",
    desc: "Strategic land reclamation creating 250 hectares of new, structurally sound real estate for commercial port facilities, utilizing closed-loop sediment transport to achieve zero-turbidity.",
    img: "https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?q=80&w=2874&auto=format&fit=crop",
    aspect: "aspect-[3/4]"
  },
  {
    title: "Mumbai Harbor Maintenance",
    category: "Maintenance Dredging",
    location: "Maharashtra, India",
    client: "Indian Navy / Port Authority",
    volume: "1.5M CBM Annually",
    desc: "Ongoing, precision maintenance dredging of critical naval and commercial berths. Operating continuously without disrupting high-density vessel traffic in one of the world's busiest ports.",
    img: "https://images.unsplash.com/photo-1605725613396-85ddce51a91e?q=80&w=2940&auto=format&fit=crop",
    aspect: "aspect-[4/5]"
  }
];

export default function Projects() {
  const heroRef = useRef(null);
  const heroTextRefs = useRef([]);
  const projectRefs = useRef([]);
  const projectImgRefs = useRef([]);

  // --- GSAP ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal
      gsap.fromTo(heroTextRefs.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
      );

      // 2. Project List Reveal & Parallax
      projectRefs.current.forEach((project, i) => {
        const textElements = project.querySelectorAll('.project-text');
        gsap.fromTo(textElements,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: project,
              start: "top 75%",
            }
          }
        );

        const img = projectImgRefs.current[i];
        if (img) {
          gsap.fromTo(img,
            { y: '-15%' },
            {
              y: '15%',
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

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-48 pb-20 lg:pt-56 lg:pb-32 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
          
          <div className="relative -left-10 max-w-4xl">
            <div className="overflow-hidden mb-6">
              <p ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] font-semibold tracking-[0.2em] text-[14px] uppercase flex items-center gap-4">
                <span className="w-12 h-px bg-[#B38356]"></span> Featured Portfolio
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-serif text-slate-900 leading-[0.95]">
              <div className="overflow-"><div ref={(el) => addToRefs(el, heroTextRefs)}>Engineering</div></div>
              <div className="overflow-"><div ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] italic">The Impossible.</div></div>
            </h1>
          </div>

          <div className="overflow-hidden pb-4 hidden md:block max-w-xs">
             <p ref={(el) => addToRefs(el, heroTextRefs)} className="text-slate-500 font-light leading-relaxed">
              A curated selection of our most complex global operations, demonstrating technical superiority in marine infrastructure since 1980.
            </p>
          </div>

        </div>
      </section>

      {/* Projects Feed */}
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
                  
                  <div className={`w-full lg:w-3/5 relative overflow-hidden bg-slate-100 ${project.aspect}`}>
                    <div className="absolute inset-0 h-[130%] -top-[15%] w-full">
                      <img 
                        ref={(el) => {
                          if (el && !projectImgRefs.current.includes(el)) {
                            projectImgRefs.current[index] = el;
                          }
                        }}
                        src={project.img} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-out"
                      />
                    </div>
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  <div className="w-full lg:w-2/5 flex flex-col justify-center">
                    
                    <div className="flex items-center gap-4 mb-8 project-text">
                      <span className="text-[#B38356] font-serif text-3xl">0{index + 1}</span>
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

      {/* Global Impact Map CTA */}
      {/* <section className="py-32 bg-[#050A15] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-150 h-150 bg-[#B38356]/10 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <Globe className="w-12 h-12 text-[#B38356] mx-auto mb-10 opacity-80" strokeWidth={1} />
          <h2 className="text-4xl md:text-6xl font-serif mb-8 max-w-3xl mx-auto leading-[1.1]">
            Deploying operational excellence across three continents.
          </h2>
          <p className="text-slate-400 font-light max-w-2xl mx-auto mb-12">
            Our fleet is actively engaged in reshaping marine infrastructure globally. Partner with us to execute your region's next major economic gateway.
          </p>
          <button className="bg-[#B38356] hover:bg-white hover:text-slate-900 text-white px-10 py-5 text-[11px] tracking-[0.25em] uppercase font-bold transition-all duration-500">
            View Active Deployment Map
          </button>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}