import React, { useRef, useState } from 'react';
import { 
  ArrowDownRight, MapPin, Clock, Briefcase, 
  ArrowUpRight, Anchor, ShieldCheck, Globe2, Ship 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router'; 
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════
// CAREERS DATA
// ═══════════════════════════════════════════════
const benefits = [
  { icon: Globe2, title: 'Global Deployments', desc: 'Work on international capital dredging projects across diverse coastal environments.' },
  { icon: Ship, title: 'Advanced Fleet', desc: 'Operate state-of-the-art Trailing Suction Hopper and Cutter Suction dredgers.' },
  { icon: ShieldCheck, title: 'Uncompromising Safety', desc: 'Rigorous HSE protocols ensuring the physical and mental well-being of our crew.' }
];

const jobListings = [
  {
    id: '01',
    title: 'Senior Hydrographic Surveyor',
    department: 'Engineering & Survey',
    location: 'Offshore / Global',
    type: 'Full-Time Rotation',
    desc: 'Lead multibeam bathymetric surveys and ensure precise depth tolerances for complex port expansion projects. Proficiency with QINSy and RTK GPS required.'
  },
  {
    id: '02',
    title: 'TSHD Dredge Master',
    department: 'Fleet Operations',
    location: 'Offshore',
    type: 'Full-Time Rotation',
    desc: 'Command our flagship Trailing Suction Hopper Dredgers. Responsible for maximizing payload efficiency, navigational safety, and crew leadership.'
  },
  {
    id: '03',
    title: 'Marine Civil Engineer',
    department: 'Project Management',
    location: 'Mumbai, HQ',
    type: 'Full-Time',
    desc: 'Design and oversee breakwater constructions and land reclamation logistics. Must have extensive experience in coastal morphodynamics.'
  },
  {
    id: '04',
    title: 'HSE Superintendent',
    department: 'Health & Safety',
    location: 'Various Project Sites',
    type: 'Contract / Rotation',
    desc: 'Enforce strict environmental mitigation and safety protocols on active dredging sites. Conduct daily audits and coordinate with local port authorities.'
  }
];

export default function Careers() {
  const containerRef = useRef(null);
  const [hoveredJob, setHoveredJob] = useState(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Hero Entrance (Grid lines + Typography)
    tl.to('.grid-line-h', { scaleX: 1, duration: 1.5, ease: 'expo.inOut', stagger: 0.1 })
      .to('.grid-line-v', { scaleY: 1, duration: 1.5, ease: 'expo.inOut', stagger: 0.1 }, "-=1.2")
      .fromTo('.reveal-hero', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' },
        "-=1"
      );

    // 2. Benefits Reveal on Scroll
    gsap.fromTo('.benefit-card', 
      { y: 40, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '.benefits-section', start: 'top 80%' }
      }
    );

    // 3. Job List Reveal on Scroll
    gsap.fromTo('.job-row', 
      { opacity: 0, x: -20 },
      { 
        opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.jobs-section', start: 'top 80%' }
      }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-[#B38356] selection:text-white">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-48 pb-24 lg:pt-64 lg:pb-32 overflow-hidden bg-[#FAFAFA]">
        {/* Animated Architectural Grid Lines */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="grid-line-h absolute top-[30%] left-0 w-full h-px bg-slate-200 origin-left" style={{ transform: 'scaleX(0)' }} />
          <div className="grid-line-h absolute top-[60%] left-0 w-full h-px bg-slate-200 origin-right" style={{ transform: 'scaleX(0)' }} />
          <div className="grid-line-v absolute left-[10%] lg:left-[15%] top-0 w-px h-full bg-slate-200 origin-top" style={{ transform: 'scaleY(0)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-4xl">
            <div className="overflow-hidden mb-8">
              <p className="reveal-hero text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase flex items-center gap-4">
                <Anchor size={14} className="text-[#B38356]" />
                Join The Vanguard
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif text-slate-900 leading-[0.95] tracking-tight mb-10">
              <div className="overflow-hidden pb-2"><span className="reveal-hero block">Engineer The</span></div>
              <div className="overflow-hidden pb-2">
                <span className="reveal-hero flex items-center gap-6">
                  Ocean <span className="text-[#B38356] italic font-light">Floor.</span>
                </span>
              </div>
            </h1>

            <div className="overflow-hidden">
              <p className="reveal-hero text-slate-500 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
                We are actively seeking elite maritime engineers, dredge masters, and project strategists to execute the world's most demanding coastal infrastructure projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CULTURE / BENEFITS SECTION ── */}
      <section className="benefits-section py-20 lg:py-32 bg-white border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl lg:text-5xl font-serif text-slate-900 mb-6">Operational Excellence</h2>
            <p className="text-slate-500 font-light max-w-xl leading-relaxed">
              At Meka Dredging, you aren't just filling a role—you are taking command of multi-million dollar maritime assets that shape sovereign coastlines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="benefit-card group">
                <div className="w-14 h-14 mb-8 rounded-full border border-slate-200 flex items-center justify-center bg-[#FAFAFA] group-hover:bg-[#B38356] group-hover:border-[#B38356] transition-colors duration-500">
                  <benefit.icon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif text-slate-900 mb-4">{benefit.title}</h3>
                <p className="text-slate-500 font-light text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOB LISTINGS SECTION ── */}
      <section className="jobs-section py-24 lg:py-40 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-slate-200 pb-10">
            <div>
              <p className="text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase mb-4">Active Deployments</p>
              <h2 className="text-4xl lg:text-5xl font-serif text-slate-900">Open Positions</h2>
            </div>
            <p className="text-slate-500 font-light text-sm max-w-xs md:text-right">
              Currently accepting applications for Q3 / Q4 operational mandates.
            </p>
          </div>

          <div className="flex flex-col">
            {jobListings.map((job) => (
              <div 
                key={job.id} 
                className="job-row group relative border-b border-slate-200 py-10 transition-colors duration-500 hover:border-[#B38356]"
                onMouseEnter={() => setHoveredJob(job.id)}
                onMouseLeave={() => setHoveredJob(null)}
              >
                {/* Background Hover State */}
                <div className={`absolute inset-0 bg-white transition-opacity duration-500 pointer-events-none -z-10 ${hoveredJob === job.id ? 'opacity-100' : 'opacity-0'}`} />

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
                  
                  {/* Job Title & ID */}
                  <div className="lg:col-span-5">
                    <p className="text-slate-300 font-serif text-4xl mb-4 group-hover:text-[#B38356]/20 transition-colors duration-500">{job.id}</p>
                    <h3 className="text-2xl md:text-3xl font-serif text-slate-900 mb-4 group-hover:text-[#B38356] transition-colors duration-300">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-[0.15em] uppercase font-mono text-slate-500">
                      <span className="flex items-center gap-2"><MapPin size={12} /> {job.location}</span>
                      <span className="flex items-center gap-2"><Clock size={12} /> {job.type}</span>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="lg:col-span-5 flex items-center h-full">
                    <p className="text-slate-500 font-light text-sm leading-relaxed">
                      {job.desc}
                    </p>
                  </div>

                  {/* Apply Button Area */}
                  <div className="lg:col-span-2 flex items-center lg:justify-end h-full mt-4 lg:mt-0">
                    <button className="flex items-center justify-center w-14 h-14 rounded-full border border-slate-300 text-slate-400 group-hover:bg-[#B38356] group-hover:border-[#B38356] group-hover:text-white transition-all duration-500 shadow-sm">
                      <ArrowUpRight size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-500" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-slate-500 font-light text-sm mb-6">Don't see a role that fits your expertise?</p>
            <a href="mailto:careers@mekadredging.com" className="inline-block border-b border-slate-900 pb-1 text-[11px] tracking-[0.2em] uppercase font-bold text-slate-900 hover:text-[#B38356] hover:border-[#B38356] transition-colors duration-300">
              Submit Open Application
            </a>
          </div>

        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
             
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Ready to Command?</h2>
          <p className="text-slate-400 font-light text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Submit your CV and technical certifications to our recruitment board for immediate consideration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:careers@mekadredging.com">
              <button className="bg-[#B38356] hover:bg-white hover:text-slate-900 text-white px-10 py-5 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-md hover:shadow-[#B38356]/20 flex items-center gap-3">
                Apply Now
                <ArrowDownRight className="w-4 h-4 -rotate-90" />
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}