import React, { useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/layout/Navbar'; 
import Footer from '../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

const officeLocations = [
  {
    city: "Mumbai",
    type: "Global Headquarters",
    address: "Meka Group Tower, Nariman Point, Mumbai, Maharashtra 400021, India",
    phone: "+91 22 2202 0000",
    email: "hq@mekadredging.com"
  },
  {
    city: "Lagos",
    type: "African Regional Hub",
    address: "Maritime House, Victoria Island, Lagos, Nigeria",
    phone: "+234 1 270 0000",
    email: "africa@mekadredging.com"
  },
  {
    city: "Singapore",
    type: "Asia-Pacific Operations",
    address: "Marina Bay Financial Centre, Tower 3, Singapore 018982",
    phone: "+65 6800 0000",
    email: "apac@mekadredging.com"
  }
];

export default function Contact() {
  const heroRef = useRef(null);
  const heroTextRefs = useRef([]);
  const formRef = useRef(null);
  const locationRefs = useRef([]);
  const imageRef = useRef(null);


  // --- GSAP ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal
      gsap.fromTo(heroTextRefs.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
      );

      // 2. Form Stagger Reveal
      if (formRef.current) {
        gsap.fromTo(formRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // 3. Locations Stagger Reveal
      locationRefs.current.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 1, delay: index * 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });

      // 4. Image Parallax
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { y: '-15%' },
          {
            y: '15%',
            ease: 'none',
            scrollTrigger: {
              trigger: imageRef.current.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }
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
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row justify-between md:items-end gap-12">
          
          <div className="max-w-4xl">
            <div className="overflow-hidden mb-6">
              <p ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase flex items-center gap-4">
                <span className="w-12 h-px bg-[#B38356]"></span> Global Operations
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-serif text-slate-900 leading-[0.95]">
              <div className="overflow-hidden"><div ref={(el) => addToRefs(el, heroTextRefs)}>Initiate A</div></div>
              <div className="overflow-hidden"><div ref={(el) => addToRefs(el, heroTextRefs)} className="text-[#B38356] italic">Dialogue.</div></div>
            </h1>
          </div>

          <div className="overflow-hidden pb-4 max-w-sm">
            <p ref={(el) => addToRefs(el, heroTextRefs)} className="text-slate-500 font-light leading-relaxed">
              Our engineering and operations teams are ready to consult on complex capital dredging, coastal protection, and maritime infrastructure projects worldwide.
            </p>
          </div>

        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">Direct Inquiry</h2>
                <p className="text-slate-500 font-light">Submit your project parameters and our executive team will respond within 24 hours.</p>
              </div>

              <form ref={formRef} className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="name"
                      className="w-full bg-transparent border-b border-slate-200 py-4 text-slate-900 font-light focus:outline-none focus:border-[#B38356] transition-colors peer rounded-none"
                      placeholder=" "
                      required
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute left-0 top-4 text-slate-400 font-light text-sm transition-all duration-300 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#B38356] peer-focus:tracking-wider peer-focus:uppercase peer-valid:-top-3 peer-valid:text-[10px] peer-valid:tracking-wider peer-valid:uppercase"
                    >
                      Full Name
                    </label>
                  </div>
                  
                  <div className="relative group">
                    <input 
                      type="email" 
                      id="email"
                      className="w-full bg-transparent border-b border-slate-200 py-4 text-slate-900 font-light focus:outline-none focus:border-[#B38356] transition-colors peer rounded-none"
                      placeholder=" "
                      required
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-0 top-4 text-slate-400 font-light text-sm transition-all duration-300 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#B38356] peer-focus:tracking-wider peer-focus:uppercase peer-valid:-top-3 peer-valid:text-[10px] peer-valid:tracking-wider peer-valid:uppercase"
                    >
                      Corporate Email
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="company"
                      className="w-full bg-transparent border-b border-slate-200 py-4 text-slate-900 font-light focus:outline-none focus:border-[#B38356] transition-colors peer rounded-none"
                      placeholder=" "
                      required
                    />
                    <label 
                      htmlFor="company" 
                      className="absolute left-0 top-4 text-slate-400 font-light text-sm transition-all duration-300 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#B38356] peer-focus:tracking-wider peer-focus:uppercase peer-valid:-top-3 peer-valid:text-[10px] peer-valid:tracking-wider peer-valid:uppercase"
                    >
                      Company / Organization
                    </label>
                  </div>
                  
                  <div className="relative group">
                    <select 
                      id="inquiry"
                      className="w-full bg-transparent border-b border-slate-200 py-4 text-slate-900 font-light focus:outline-none focus:border-[#B38356] transition-colors appearance-none cursor-pointer rounded-none"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled hidden>Select Inquiry Type</option>
                      <option value="capital">Capital Dredging</option>
                      <option value="maintenance">Maintenance Dredging</option>
                      <option value="reclamation">Land Reclamation</option>
                      <option value="coastal">Coastal Protection</option>
                      <option value="other">Other / General</option>
                    </select>
                    <label 
                      htmlFor="inquiry" 
                      className="absolute left-0 -top-3 text-[10px] text-slate-400 tracking-wider uppercase font-light"
                    >
                      Inquiry Type
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <textarea 
                    id="message"
                    rows="4"
                    className="w-full bg-transparent border-b border-slate-200 py-4 text-slate-900 font-light focus:outline-none focus:border-[#B38356] transition-colors peer resize-none rounded-none"
                    placeholder=" "
                    required
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-0 top-4 text-slate-400 font-light text-sm transition-all duration-300 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#B38356] peer-focus:tracking-wider peer-focus:uppercase peer-valid:-top-3 peer-valid:text-[10px] peer-valid:tracking-wider peer-valid:uppercase"
                  >
                    Project Details / Message
                  </label>
                </div>

                <button 
                  type="submit"
                  className="bg-slate-900 hover:bg-[#B38356] text-white px-10 py-5 text-[11px] tracking-[0.25em] uppercase font-bold transition-all duration-500 flex items-center justify-center gap-4 w-full md:w-auto"
                >
                  Submit Inquiry <ArrowRight size={16} />
                </button>

              </form>
            </div>

            {/* Right Column: Global Offices */}
            <div className="lg:col-span-5 lg:pl-10">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">Global Offices</h2>
                <p className="text-slate-500 font-light">Connect with our regional headquarters.</p>
              </div>

              <div className="space-y-10">
                {officeLocations.map((office, idx) => (
                  <div key={idx} ref={(el) => addToRefs(el, locationRefs)} className="group border-l-2 border-slate-100 pl-6 hover:border-[#B38356] transition-colors duration-500">
                    <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[9px] uppercase mb-2">{office.type}</p>
                    <h3 className="text-2xl font-serif text-slate-900 mb-4">{office.city}</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-slate-500 font-light text-sm">
                        <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
                        <p className="leading-relaxed max-w-xs">{office.address}</p>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 font-light text-sm">
                        <Phone size={16} className="shrink-0 text-slate-400" />
                        <a href={`tel:${office.phone}`} className="hover:text-[#B38356] transition-colors">{office.phone}</a>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 font-light text-sm">
                        <Mail size={16} className="shrink-0 text-slate-400" />
                        <a href={`mailto:${office.email}`} className="hover:text-[#B38356] transition-colors">{office.email}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Cinematic Parallax Break */}
      <section className="bg-[#FAFAFA] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative h-100 md:h-150 w-full overflow-hidden bg-slate-200">
            <div className="absolute inset-0 h-[130%] -top-[15%] w-full">
              <img 
                ref={imageRef}
                src="/hero/meka-dredging-hero-2.jpg"
                alt="Meka Dredging Global Operations" 
                className="w-full h-full object-cover grayscale opacity-90"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md px-10 py-8 text-center border border-white">
                <p className="text-[#B38356] font-serif text-4xl mb-2">108+</p>
                <p className="text-[10px] tracking-[0.2em] text-slate-900 font-bold uppercase">Successful Projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}