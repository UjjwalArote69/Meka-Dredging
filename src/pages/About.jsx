import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Globe, Anchor, Ship, Users, Target, Eye, Calendar, Heart, HelpCircle, Search, Sparkles, Award, Handshake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/layout/Navbar'; 
import Footer from '../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  // Refs for GSAP
  const heroRef = useRef(null);
  const heroTextRefs = useRef([]);
  const heroImageRef = useRef(null);
  const storyRef = useRef(null);
  const ethosRefs = useRef([]);
  const boardRef = useRef(null);
  const missionRef = useRef(null);
  const timelineRef = useRef(null);
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

      // 7. Board of Directors Cards Stagger
      if (boardRef.current) {
        gsap.fromTo(boardRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: {
              trigger: boardRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // 8. Mission & Vision Reveal
      if (missionRef.current) {
        gsap.fromTo(missionRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: missionRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // 9. Timeline Reveal
      if (timelineRef.current) {
        gsap.fromTo(timelineRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 85%",
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
                <span className="w-12 h-px bg-[#B38356]"></span> Who We Are
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-serif text-slate-900 leading-[0.95]">
              <div className="overflow-hidden"><div ref={(el) => addToRefs(el, heroTextRefs)}>Precision,</div></div>
              <div className="overflow-"><div ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] italic ">Purpose.</div></div>
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
      <section id="heritage" className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 relative">
            
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-40">
                <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-6">About Meka Dredging</p>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8 leading-[1.2]">
                  Engineering Marine <br/> Infrastructure.
                </h2>
                <div className="w-16 h-px bg-[#B38356] mb-8"></div>
                <p className="text-slate-600 font-light leading-relaxed mb-6 text-lg">
                  Meka Dredging Company, a specialized division of the Meka Group, is dedicated to delivering high-performance dredging and coastal development solutions with a strong engineering foundation and decades of industrial expertise.
                </p>
                <p className="text-slate-500 font-light leading-relaxed mb-6">
                  We support governments, developers, and infrastructure planners in transforming marine environments with precision and reliability. Our expertise spans dredging, reclamation, and coastal engineering — backed by advanced fleet, survey systems, and marine equipment.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  {['Dredging & Reclamation', 'Coastal Engineering', 'Sustainable Practices', 'Advanced Fleet'].map((tag, idx) => (
                    <span key={idx} className="text-[9px] tracking-[0.15em] uppercase font-bold px-4 py-2 border border-slate-200 text-slate-400 hover:border-[#B38356]/40 hover:text-[#B38356] transition-all duration-300 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div ref={storyRef} className="lg:col-span-7 lg:col-start-6 space-y-24 md:space-y-32 pt-12 lg:pt-0">
              
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-slate-100 max-w-xl ml-auto shadow-sm">
                <div className="absolute inset-0 h-[130%] -top-[15%] w-full">
                  <img 
                    ref={(el) => addToRefs(el, parallaxImageRefs)}
                    src="https://i.pinimg.com/1200x/58/43/7f/58437f2893f80d0fec9a798f270f407d.jpg" 
                    alt="Early dredging operations" 
                    className="w-full h-full object-cover grayscale opacity-90"
                  />
                </div>
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold">2016 / Division Founded</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
              </div>

              {/* Added thick border to create an editorial overlap effect */}
              <div className="relative md:-left-55 aspect-video overflow-hidden bg-slate-100 -ml-2 lg:-ml-24 shadow-2xl border-8 border-white">
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

      {/* Board of Directors */}
      <section id="board" className="py-32 md:py-40 bg-[#FAFAFA] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20">
            <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4 flex items-center gap-4">
              <Users size={14} /> Our Crew
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">Building Marine Infrastructure with Innovation, Safety & Sustainability</h2>
            <p className="text-slate-500 font-light text-lg max-w-2xl leading-relaxed">
              Our leadership team brings together decades of hands-on marine engineering expertise, steering Meka Dredging towards operational excellence across complex projects.
            </p>
          </div>

          <div ref={boardRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { 
                name: 'Mr. Hemanth Meka Rao', 
                role: 'Director', 
                initials: 'HM',
                image: '/hero/hmr.webp',
                bio: 'A Mechanical Engineer from Georgia Tech, USA, Mr. Hemanth Meka Rao has elevated the company\'s legacy through his innovative approach and focus on cost-effective marine solutions.',
                color: 'from-[#8b6540] to-[#B38356]'
              },
              { 
                name: 'Mr. Arindam Basu', 
                role: 'Vice President', 
                initials: 'AB',
                image: '/hero/basusir.webp',
                bio: 'Vice President and Engineering Manager with over 35 years of expertise in HDPE pipeline installation, marine infrastructure, and EPC project execution.',
                color: 'from-slate-700 to-slate-800'
              },
              { 
                name: 'Capt. M. K. Rayudu', 
                role: 'Head of Dredging', 
                initials: 'MR',
                image: '/hero/rayudusir.webp',
                bio: 'Head of Dredging at MEKA Group, bringing over 40 years of specialized experience in dredging operations and marine infrastructure.',
                color: 'from-[#5a4a3a] to-[#7a6a5a]'
              },
            ].map((director, idx) => (
              <div key={idx} className="group bg-white border border-slate-200 hover:border-[#B38356]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer overflow-hidden">
                {/* Photo / Gradient Avatar Header */}
                <div className={`relative h-64 bg-gradient-to-br ${director.color} flex items-end justify-between p-6 overflow-hidden`}>
                  {director.image && (
                    <img 
                      src={director.image} 
                      alt={director.name}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  )}
                  {!director.image && (
                    <>
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                      <span className="text-6xl font-serif text-white/20 leading-none select-none">{director.initials}</span>
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-serif text-slate-900 mb-1">{director.name}</h3>
                  <p className="text-[10px] tracking-[0.15em] uppercase font-bold text-[#B38356] mb-4">{director.role}</p>
                  <p className="text-slate-500 font-light text-sm leading-relaxed">{director.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Arsenal / Fleet Section */}
      <section id="fleet" className="py-32 bg-white border-b border-slate-200">
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

      {/* Mission & Vision */}
      <section id="mission" className="py-32 md:py-40 bg-[#050A15] text-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B38356]/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-slate-800/40 blur-[100px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="mb-20">
            <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4">Our Purpose</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Charting the Course Forward</h2>
          </div>

          <div ref={missionRef} className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <div className="group relative bg-white/[0.03] border border-white/10 p-10 md:p-12 backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#B38356] to-transparent"></div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#B38356]/10 flex items-center justify-center">
                  <Target size={20} className="text-[#B38356]" strokeWidth={1.5} />
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-400 group-hover:text-[#B38356] transition-colors duration-500">Our Mission</p>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-6 leading-[1.2]">
                Delivering Innovative Marine Solutions
              </h3>
              <p className="text-slate-400 font-light leading-relaxed text-base mb-8">
                To deliver innovative, sustainable, and precisely executed dredging and marine infrastructure solutions that support navigational safety, port development, land reclamation, and environmental protection — while building long-term value for our clients and coastal communities.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Port Development', 'Land Reclamation', 'Environmental Protection'].map((tag, idx) => (
                  <span key={idx} className="text-[9px] tracking-[0.15em] uppercase font-bold px-4 py-2 border border-white/10 text-slate-500 group-hover:border-[#B38356]/30 group-hover:text-[#B38356] transition-all duration-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-white/[0.03] border border-white/10 p-10 md:p-12 backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-white/30 to-transparent"></div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Eye size={20} className="text-white/60" strokeWidth={1.5} />
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-400 group-hover:text-white transition-colors duration-500">Our Vision</p>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-6 leading-[1.2]">
                The Trusted Name in Marine Infrastructure
              </h3>
              <p className="text-slate-400 font-light leading-relaxed text-base mb-8">
                To be recognized as the foremost marine engineering and dredging consultancy — setting the benchmark for innovation, reliability, and ecological responsibility in port development, waterway maintenance, and coastal transformation worldwide.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Innovation', 'Reliability', 'Global Reach'].map((tag, idx) => (
                  <span key={idx} className="text-[9px] tracking-[0.15em] uppercase font-bold px-4 py-2 border border-white/10 text-slate-500 group-hover:border-white/30 group-hover:text-white/80 transition-all duration-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Ethos */}
      <section id="values" className="py-32 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20">
            <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4">Our Foundation</p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">The Nine Values of Dr. Paparao</h2>
            <p className="text-slate-500 font-light text-lg max-w-3xl leading-relaxed">
              The principles laid down by our founder, Dr. Meka Vijay Paparao, form the bedrock of everything we do at the Meka Group. These nine values guide every decision, every project, and every relationship.
            </p>
          </div>

          {/* Top row — 3 featured values as large cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {[
              { 
                icon: <Heart className="w-6 h-6" strokeWidth={1.5} />,
                num: '01',
                title: 'Respect', 
                desc: 'Respect for people is a core philosophy. It is part of not just the Meka Group culture but Indian culture. It is of no matter that the person is in a position of power, or no longer in it, if they are too old or too young, if they are rich or not.' 
              },
              { 
                icon: <Users className="w-6 h-6" strokeWidth={1.5} />,
                num: '02',
                title: 'Teamwork', 
                desc: 'There is no I in Team. The Meka Group believes in creating strong teams of 3–4 members who work together. It is this teamwork that creates incredible success. Find your team and work as a family — in adversity and glory.' 
              },
              { 
                icon: <Anchor className="w-6 h-6" strokeWidth={1.5} />,
                num: '03',
                title: 'Humility', 
                desc: 'Like several great men including Abraham Lincoln, humility is the essential trait required in those that look for greatness. No matter how high you soar, your feet need to be firmly on the ground that made you.' 
              },
            ].map((item, idx) => (
              <div 
                key={idx}
                ref={(el) => addToRefs(el, ethosRefs)}
                className="group bg-[#FAFAFA] border border-slate-200 p-8 md:p-10 hover:border-[#B38356]/40 hover:bg-white hover:shadow-lg transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#B38356] opacity-70 group-hover:opacity-100 transition-opacity duration-500">{item.icon}</span>
                  <span className="text-3xl font-serif text-slate-200 group-hover:text-[#B38356] transition-colors duration-500">{item.num}</span>
                </div>
                <h4 className="text-xl md:text-2xl font-serif text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Middle row — 3 values */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {[
              { 
                icon: <HelpCircle className="w-6 h-6" strokeWidth={1.5} />,
                num: '04',
                title: 'Learn to Question', 
                desc: 'Never take an answer at face value. It is in that questioning that you will find the truth. Go ahead with those questions you felt were too stupid to ask, go into depth — then you will be enlightened with the knowledge and empowered to succeed.' 
              },
              { 
                icon: <Handshake className="w-6 h-6" strokeWidth={1.5} />,
                num: '05',
                title: 'Trust & Honesty', 
                desc: 'The fundamentals of the organisation are built on Trust and Honesty. Dr. Paparao\'s word is his bond. The word given by you should be binding and unshakeable. Give your word carefully — it is your bond and that of the Meka Group.' 
              },
              { 
                icon: <Search className="w-6 h-6" strokeWidth={1.5} />,
                num: '06',
                title: 'Attention to Detail', 
                desc: 'There can never be enough attention given to detail — that is what sets one different from the rest. Pay attention to every detail especially in safety, where that 1 in a million chance of something going wrong — see that it can never go wrong.' 
              },
            ].map((item, idx) => (
              <div 
                key={idx}
                ref={(el) => addToRefs(el, ethosRefs)}
                className="group bg-[#FAFAFA] border border-slate-200 p-8 md:p-10 hover:border-[#B38356]/40 hover:bg-white hover:shadow-lg transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#B38356] opacity-70 group-hover:opacity-100 transition-opacity duration-500">{item.icon}</span>
                  <span className="text-3xl font-serif text-slate-200 group-hover:text-[#B38356] transition-colors duration-500">{item.num}</span>
                </div>
                <h4 className="text-xl md:text-2xl font-serif text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom row — 3 values */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: <Globe className="w-6 h-6" strokeWidth={1.5} />,
                num: '07',
                title: 'Making a Difference', 
                desc: 'The Meka Group is a business — but a business which is different. Looking to add value in the lives of our clients and people, making a difference in the world, step by step, striving for perfection and bringing happiness and joy.' 
              },
              { 
                icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
                num: '08',
                title: 'Innovation', 
                desc: 'Founded by a Nuclear Scientist, innovation is in our DNA. With an innovation-led approach, we are able to deliver projects faster, better, and more economically to our clients — finding simple solutions to complex problems.' 
              },
              { 
                icon: <Award className="w-6 h-6" strokeWidth={1.5} />,
                num: '09',
                title: 'Excellence', 
                desc: 'We always strive for perfection, to excel and succeed. Engineering excellence is the benchmark for every project we undertake — from marine construction to port development — setting new standards across every endeavour.' 
              },
            ].map((item, idx) => (
              <div 
                key={idx}
                ref={(el) => addToRefs(el, ethosRefs)}
                className="group bg-[#FAFAFA] border border-slate-200 p-8 md:p-10 hover:border-[#B38356]/40 hover:bg-white hover:shadow-lg transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#B38356] opacity-70 group-hover:opacity-100 transition-opacity duration-500">{item.icon}</span>
                  <span className="text-3xl font-serif text-slate-200 group-hover:text-[#B38356] transition-colors duration-500">{item.num}</span>
                </div>
                <h4 className="text-xl md:text-2xl font-serif text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section id="timeline" className="py-32 md:py-40 bg-[#FAFAFA] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20">
            <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4 flex items-center gap-4">
              <Calendar size={14} /> What We Did So Far
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">Company Timeline</h2>
            <p className="text-slate-500 font-light text-lg max-w-3xl leading-relaxed">
              Under the umbrella of the Meka Group, Meka Dredging has steadily evolved from strategic planning to the execution of complex marine infrastructure and dredging operations.
            </p>
          </div>

          <div ref={timelineRef} className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-slate-300"></div>

            {[
              {
                year: '2016',
                title: 'Strategic Vision & Project Conceptualization',
                desc: 'This year marked the foundation of our specialized dredging and marine services division. With a clear vision to support national port expansion and coastal infrastructure needs, the concept of Meka Dredging Company was initiated under the corporate framework of Meka Group.',
                align: 'right'
              },
              {
                year: '2019',
                title: 'Operational Development & Service Expansion',
                desc: 'We moved from planning to active development, expanding our capabilities in dredging consultancy, environmental studies, numerical modelling, and equipment specification. The company began aligning for large-scale maritime projects.',
                align: 'left'
              },
              {
                year: '2023',
                title: 'Project Execution & Industry Recognition',
                desc: 'With a strong technical base and experienced marine specialists, Meka Dredging Company successfully executed multiple consultancy and supervisory roles in dredging and reclamation projects — emerging as a recognized technical partner for marine infrastructure development.',
                align: 'right'
              },
            ].map((item, idx) => (
              <div key={idx} className={`relative flex items-start mb-16 last:mb-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#B38356] border-4 border-[#FAFAFA] z-10 mt-2"></div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${idx % 2 === 0 ? 'md:pr-0 md:mr-auto' : 'md:pl-0 md:ml-auto'}`}>
                  <div className="group bg-white p-8 border border-slate-200 hover:border-[#B38356]/40 hover:shadow-lg transition-all duration-500">
                    <span className="text-[#B38356] font-serif text-3xl md:text-4xl font-light">{item.year}</span>
                    <h3 className="text-xl font-serif text-slate-900 mt-4 mb-4">{item.title}</h3>
                    <p className="text-slate-500 font-light text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark HSEQ Section */}
      <section id="hseq" className="py-32 md:py-48 bg-[#050A15] text-white relative overflow-hidden">
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