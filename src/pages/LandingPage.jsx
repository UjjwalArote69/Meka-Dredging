/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Anchor, Settings, Ship, ArrowRight, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Refs for GSAP
  const heroRef = useRef(null);
  const heroTextRefs = useRef([]);
  const heroImageRef = useRef(null);
  const missionRef = useRef(null);
  const legacyRefs = useRef([]);
  const leadershipRef = useRef(null);

  useEffect(() => {
    // Nav shadow on scroll
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // --- GSAP ANIMATIONS ---
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Animation
      const heroTl = gsap.timeline();
      
      // Dramatic Image Reveal (Unmasking effect)
      heroTl.fromTo(heroImageRef.current, 
        { scale: 1.1, clipPath: 'inset(20% 0% 20% 0%)', filter: 'grayscale(50%)' },
        { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', filter: 'grayscale(0%)', duration: 2, ease: 'power3.out' }
      );

      // Staggered text reveal (Masked slide-up)
      heroTl.fromTo(heroTextRefs.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out' },
        "-=1.5"
      );

      // 2. Mission Statement Scroll Reveal
      gsap.fromTo(missionRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 80%",
          }
        }
      );

      // 3. Legacy Timeline Scroll Reveal
      legacyRefs.current.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, delay: index * 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });

      // 4. Leadership Parallax & Fade
      gsap.fromTo(leadershipRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: leadershipRef.current,
            start: "top 75%",
          }
        }
      );
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert(); 
    };
  }, []);

  const addToHeroRefs = (el) => {
    if (el && !heroTextRefs.current.includes(el)) {
      heroTextRefs.current.push(el);
    }
  };

  const addToLegacyRefs = (el) => {
    if (el && !legacyRefs.current.includes(el)) {
      legacyRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-amber-900 selection:text-white overflow-hidden">
      
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <span className="font-serif font-bold text-2xl tracking-wide uppercase text-slate-900">Meka</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-12 items-center text-xs tracking-[0.15em] uppercase font-medium">
              <a href="#" className="text-slate-900 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-px after:bg-amber-700">Home</a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors duration-500">About</a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors duration-500">Expertise</a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors duration-500">Projects</a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <button className="border border-slate-200 hover:border-amber-700 hover:bg-amber-700 hover:text-white text-slate-900 px-8 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-500">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 z-10">
              <div className="overflow-hidden mb-6">
                <p ref={addToHeroRefs} className="text-amber-700 font-medium tracking-[0.2em] text-xs uppercase flex items-center gap-4">
                  <span className="w-12 h-px bg-amber-700"></span> Est. 1980
                </p>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif text-slate-900 leading-[1.05] mb-8">
                <div className="overflow-hidden"><div ref={addToHeroRefs}>Engineering</div></div>
                <div className="overflow-hidden"><div ref={addToHeroRefs} className="text-amber-700 italic">Fluid</div></div>
                <div className="overflow-hidden"><div ref={addToHeroRefs}>Horizons.</div></div>
              </h1>
              
              <div className="overflow-hidden mb-12">
                <p ref={addToHeroRefs} className="text-slate-500 text-lg md:text-xl leading-relaxed font-light max-w-lg">
                  Decades of maritime heritage merged with cutting-edge environmental engineering to redefine the world's waterways.
                </p>
              </div>

              <div className="overflow-hidden">
                <div ref={addToHeroRefs} className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-xs tracking-[0.15em] uppercase transition-colors">
                    Explore Our Work
                  </button>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="lg:col-span-6 relative h-[500px] lg:h-[700px] w-full">
              <div className="absolute inset-0 overflow-hidden bg-slate-200">
                <img 
                  ref={heroImageRef}
                  src="https://images.unsplash.com/photo-1572093535942-0f5da48dc7ce?q=80&w=2940&auto=format&fit=crop" 
                  alt="Dredging operations at sunset" 
                  className="w-full h-full object-cover object-right origin-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section ref={missionRef} className="py-40 bg-white relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <Ship className="w-10 h-10 mx-auto text-amber-700 mb-10 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-serif leading-[1.3] font-light text-slate-900">
            "Bridging the gap between <span className="text-amber-700 italic">human progress</span> and environmental preservation through technical excellence."
          </h2>
        </div>
      </section>

      {/* Legacy / Timeline Section */}
      <section className="py-32 bg-[#FAFAFA] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-24">
            <p className="text-amber-700 font-medium tracking-[0.2em] text-xs uppercase mb-4">Our Legacy</p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900">Four Decades of Mastery</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { year: '1980', title: 'The Inception', desc: 'Founded as a small maritime firm in Lagos, establishing the baseline for coastal maintenance.' },
              { year: '1995', title: 'Fleet Expansion', desc: 'Acquisition of our first custom-built cutter suction dredgers, doubling capacity.' },
              { year: '2012', title: 'Going Green', desc: 'Pioneered eco-friendly dredging protocols and state-of-the-art sediment management systems.' },
              { year: 'Present', title: 'Global Leader', desc: 'Operating a modern fleet of 25+ vessels across three continents with unmatched precision.' },
            ].map((item, index) => (
              <div key={index} ref={addToLegacyRefs} className="group relative border-t border-slate-200 pt-8 hover:border-amber-700 transition-colors duration-500">
                <h3 className="text-5xl font-serif text-slate-100 group-hover:text-amber-50 transition-colors duration-500 absolute top-4 right-0 -z-10">
                  {item.year}
                </h3>
                <p className="text-amber-700 font-medium mb-3">{item.year}</p>
                <h4 className="text-xl font-medium text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20 flex justify-between items-end">
            <div>
              <p className="text-amber-700 font-medium tracking-[0.2em] text-xs uppercase mb-4">Leadership</p>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900">The Visionaries</h2>
            </div>
            <button className="hidden md:flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-slate-900 hover:text-amber-700 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div ref={leadershipRef} className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { name: 'Dr. Marcus Vance', role: 'Chief Executive Officer', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop' },
              { name: 'Sarah Chen', role: 'Chief Operations Officer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop' },
              { name: 'Engr. David Okoro', role: 'Director of Engineering', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop' }
            ].map((leader, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 mb-6">
                  <img 
                    src={leader.img} 
                    alt={leader.name} 
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <h3 className="text-2xl font-serif text-slate-900 mb-2">{leader.name}</h3>
                <p className="text-slate-500 text-xs tracking-[0.15em] uppercase">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1120] text-slate-400 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-16 mb-16">
             <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 md:mb-0">Ready to break water?</h2>
             <button className="bg-amber-700 hover:bg-amber-600 text-white px-10 py-5 text-xs tracking-[0.2em] uppercase font-bold transition-all duration-500">
              Start a Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <span className="font-serif font-medium text-2xl tracking-[0.15em] uppercase text-white block mb-6">Meka</span>
              <p className="text-sm leading-relaxed max-w-sm font-light mb-8">
                Precision maritime engineering and dredging services. Preserving coastlines with excellence since 1980.
              </p>
            </div>
            
            <div className="md:col-span-3 md:col-start-7">
              <h4 className="text-white text-[10px] tracking-[0.2em] uppercase font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><a href="#" className="hover:text-amber-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Safety Standards</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-white text-[10px] tracking-[0.2em] uppercase font-bold mb-6">Expertise</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><a href="#" className="hover:text-amber-500 transition-colors">Land Reclamation</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Maintenance Dredging</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Port Expansion</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}