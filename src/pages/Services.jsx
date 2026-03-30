import React, { useRef, useState } from 'react';
import {
  ClipboardCheck, FileText, Compass, Waves, Leaf, ScrollText,
  Wrench, IndianRupee, BarChart3, HardHat, Activity, Scale, Handshake,
  ArrowDownRight, Target
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router'; 
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'feasibility', num: '01', icon: ClipboardCheck, phase: 'pre',
    title: 'Feasibility Studies',
    short: 'Strategic clarity before commitment.',
    desc: 'We deliver detailed feasibility studies to help clients make informed, strategic decisions before project commencement. Our assessments combine technical expertise, environmental analysis, and cost evaluation to ensure every project begins with clarity and measurable viability.',
    tags: ['Risk Analysis', 'Site Assessment', 'Cost-Benefit'],
  },
  {
    id: 'licence', num: '02', icon: FileText, phase: 'pre',
    title: 'Licence Applications',
    short: 'Navigating complex regulatory frameworks.',
    desc: 'Before the commencement of any marine operation, securing the correct licensing is critical. We manage the entire end-to-end application process, liaising directly with maritime authorities, environmental agencies, and local government bodies.',
    tags: ['Compliance', 'Regulatory Approvals', 'Documentation'],
  },
  {
    id: 'planning', num: '03', icon: Compass, phase: 'pre',
    title: 'Planning and Design',
    short: 'Architecting sustainable marine infrastructure.',
    desc: 'Our engineering teams utilize advanced CAD and hydrographic software to design comprehensive project blueprints. From breakwater architecture to optimal dredging channel layouts, we engineer for maximum efficiency and long-term structural resilience.',
    tags: ['CAD Modeling', 'Blueprint Generation', 'Structural Engineering'],
  },
  {
    id: 'modelling', num: '04', icon: Waves, phase: 'pre',
    title: 'Numerical & Physical Modelling',
    short: 'Predictive analytics for aquatic environments.',
    desc: 'We simulate tidal currents, wave impacts, and sediment transport using state-of-the-art numerical models. This predictive data allows us to optimize our dredging strategies and physical designs to withstand extreme marine conditions.',
    tags: ['Wave Simulation', 'Sediment Transport', 'Tidal Analysis'],
  },
  {
    id: 'assessment', num: '05', icon: Leaf, phase: 'pre',
    title: 'Environmental Impact',
    short: 'Protecting fragile coastal biomes.',
    desc: 'Meka Dredging is committed to sustainable operations. We conduct rigorous Environmental Impact Assessments (EIA) to identify potential ecological disruptions, proposing and implementing strict mitigation strategies to protect marine life and water quality.',
    tags: ['Ecological Surveys', 'Water Quality Monitoring', 'Mitigation'],
  },
  {
    id: 'documentation', num: '06', icon: ScrollText, phase: 'pre',
    title: 'Contract Documentation',
    short: 'Airtight operational agreements.',
    desc: 'We draft and review comprehensive technical specifications and contract documents. Ensuring all operational parameters, safety protocols, and deliverable milestones are explicitly defined to protect all stakeholders involved.',
    tags: ['Legal Review', 'Technical Specs', 'Milestone Planning'],
  },
  {
    id: 'specifications', num: '07', icon: Wrench, phase: 'pre',
    title: 'Plant & Equipment Specs',
    short: 'Optimizing asset deployment.',
    desc: 'Not every dredger fits every job. We analyze project requirements to specify the exact plant and equipment needed—whether it’s a Cutter Suction Dredger for hard rock or a Trailing Suction Hopper Dredger for large-scale sand retrieval.',
    tags: ['Vessel Selection', 'Asset Optimization', 'Capacity Planning'],
  },
  {
    id: 'pricing', num: '08', icon: IndianRupee, phase: 'pre',
    title: 'Budget Pricing',
    short: 'Transparent financial modeling.',
    desc: 'Delivering highly accurate budget estimates based on current market rates, fuel costs, equipment mobilization, and estimated operational timelines. We provide transparent financial modeling to prevent budget overruns.',
    tags: ['Cost Estimation', 'Financial Modeling', 'Resource Allocation'],
  },
  {
    id: 'evaluation', num: '09', icon: BarChart3, phase: 'exe',
    title: 'Project Evaluation',
    short: 'Real-time performance metrics.',
    desc: 'During execution, we continuously evaluate operational data against the initial baseline. This involves daily volume tracking, fuel efficiency analysis, and timeline adherence to ensure the project remains strictly on course.',
    tags: ['Performance Tracking', 'Efficiency Analysis', 'Baseline Comparison'],
  },
  {
    id: 'supervision', num: '10', icon: HardHat, phase: 'exe',
    title: 'Contract Supervision',
    short: 'On-site leadership and safety enforcement.',
    desc: 'Our senior project managers provide rigorous on-site supervision. We enforce strict adherence to engineering designs, safety protocols, and environmental mitigation plans, serving as the direct point of contact for client updates.',
    tags: ['Site Management', 'Safety Enforcement', 'Quality Control'],
  },
  {
    id: 'monitoring', num: '11', icon: Activity, phase: 'exe',
    title: 'Project Monitoring',
    short: 'Continuous hydrographic surveying.',
    desc: 'Utilizing advanced multibeam echo sounders and RTK GPS, we conduct continuous monitoring of the dredged seabed. This ensures we are hitting exact depth tolerances and immediately identifying any deviations from the design profile.',
    tags: ['Hydrographic Surveys', 'RTK GPS', 'Depth Tolerance'],
  },
  {
    id: 'experts', num: '12', icon: Scale, phase: 'post',
    title: 'Expert Witness',
    short: 'Authoritative maritime testimony.',
    desc: 'In the event of maritime disputes, our senior engineers and dredging masters serve as authoritative expert witnesses. We provide objective, data-backed analysis and testimony regarding dredging practices, contract adherence, and technical execution.',
    tags: ['Legal Testimony', 'Technical Analysis', 'Dispute Resolution'],
  },
  {
    id: 'resolution', num: '13', icon: Handshake, phase: 'post',
    title: 'Dispute Resolution',
    short: 'Fair and technical arbitration.',
    desc: 'We assist in mediating and resolving complex maritime engineering disputes. By leveraging our deep technical understanding of the dredging industry, we help parties reach equitable resolutions outside of prolonged litigation.',
    tags: ['Mediation', 'Arbitration', 'Technical Consultation'],
  },
];

const phases = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'pre', label: 'Pre-Project / Planning' },
  { id: 'exe', label: 'Execution / Supervision' },
  { id: 'post', label: 'Post-Project / Legal' },
];

export default function Services() {
  const [activePhase, setActivePhase] = useState('all');
  const containerRef = useRef(null);
  const cardsWrapperRef = useRef(null);

  const filteredServices = services.filter(s => activePhase === 'all' || s.phase === activePhase);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to('.grid-line-h', { scaleX: 1, duration: 1.5, ease: 'expo.inOut', stagger: 0.1 })
      .to('.grid-line-v', { scaleY: 1, duration: 1.5, ease: 'expo.inOut', stagger: 0.1 }, "-=1.2")
      .fromTo('.reveal-hero', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' },
        "-=1"
      );
  }, { scope: containerRef });

  useGSAP(() => {
    gsap.fromTo('.service-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out' }
    );
  }, { dependencies: [activePhase], scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-[#B38356] selection:text-white">
      <Navbar />

      {/* ── TYPOGRAPHIC BLUEPRINT HERO ── */}
      <section className="relative pt-48 pb-32 lg:pt-64 lg:pb-40 overflow-hidden bg-[#FAFAFA]">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="grid-line-h absolute top-[25%] left-0 w-full h-px bg-slate-200 origin-left" style={{ transform: 'scaleX(0)' }} />
          <div className="grid-line-h absolute top-[50%] left-0 w-full h-px bg-slate-200 origin-right" style={{ transform: 'scaleX(0)' }} />
          <div className="grid-line-h absolute top-[75%] left-0 w-full h-px bg-slate-200 origin-left" style={{ transform: 'scaleX(0)' }} />
          <div className="grid-line-v absolute left-[15%] top-0 w-px h-full bg-slate-200 origin-top" style={{ transform: 'scaleY(0)' }} />
          <div className="grid-line-v absolute left-[85%] top-0 w-px h-full bg-slate-200 origin-bottom" style={{ transform: 'scaleY(0)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-4xl">
            <div className="overflow-hidden mb-8">
              <p className="reveal-hero text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase flex items-center gap-4">
                <Target size={14} className="text-[#B38356]" />
                Operational Modules
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif text-slate-900 leading-[0.95] tracking-tight mb-10">
              <div className="overflow-hidden pb-2"><span className="reveal-hero block">Strategic</span></div>
              <div className="overflow-hidden pb-2">
                <span className="reveal-hero flex items-center gap-6">
                  Maritime <span className="text-[#B38356] italic font-light">Execution.</span>
                </span>
              </div>
            </h1>

            <div className="overflow-hidden">
              <p className="reveal-hero text-slate-500 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
                From preliminary feasibility studies to final environmental handover, we provide end-to-end engineering authority across the entire lifecycle of coastal infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY INDEX LAYOUT ── */}
      <section className="py-20 lg:py-32 relative border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* LEFT COLUMN: Sticky Filters */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="text-3xl font-serif text-slate-900 mb-8">Service Modules</h2>
              
              <div className="flex flex-col gap-2 relative">
                <div className="absolute left-[11px] top-4 bottom-4 w-px bg-slate-200 -z-10" />
                
                {phases.map((phase) => (
                  <button
                    key={phase.id}
                    onClick={() => setActivePhase(phase.id)}
                    className={`text-left py-3 px-6 rounded-full text-[10px] tracking-[0.15em] uppercase font-bold transition-all duration-300 relative ${
                      activePhase === phase.id
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                        : 'bg-white/50 text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-200'
                    }`}
                  >
                    {phase.label}
                  </button>
                ))}
              </div>

              <div className="mt-16 hidden lg:block">
                <p className="text-slate-400 font-light text-sm leading-relaxed">
                  Select a phase to filter our specialized operational capabilities. Our modular approach ensures precision at every stage of development.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Scrolling Cards */}
            <div className="lg:col-span-8" ref={cardsWrapperRef}>
              <div className="flex flex-col gap-8">
                {filteredServices.map((service) => (
                  <div 
                    key={service.id} 
                    id={service.id}
                    // 👇 CRITICAL FIX: scroll-mt-32 ensures 128px gap above card when navigating directly via hash
                    className="service-card scroll-mt-32 group bg-[#FAFAFA] border border-slate-200 p-8 md:p-10 hover:border-[#B38356] transition-colors duration-500 relative overflow-hidden"
                  >
                    <span className="absolute -top-6 -right-4 text-[120px] font-serif text-slate-200/50 group-hover:text-[#B38356]/10 transition-colors duration-500 pointer-events-none select-none">
                      {service.num}
                    </span>

                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-200 group-hover:bg-[#B38356]/10 group-hover:border-[#B38356]/30 transition-colors duration-500 shadow-sm">
                          <service.icon className="w-5 h-5 text-slate-500 group-hover:text-[#B38356] transition-colors duration-500" />
                        </div>
                        <div>
                          <p className="text-[#B38356] text-[9px] tracking-[0.2em] uppercase font-bold mb-1">
                            Phase: {phases.find(p => p.id === service.phase)?.label.split(' / ')[0]}
                          </p>
                          <h3 className="text-2xl font-serif text-slate-900">{service.title}</h3>
                        </div>
                      </div>

                      <p className="text-slate-900 font-medium text-sm mb-4">
                        {service.short}
                      </p>
                      
                      <p className="text-slate-500 font-light text-sm leading-relaxed mb-8 max-w-2xl">
                        {service.desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="text-[9px] tracking-[0.15em] uppercase font-mono px-3 py-1.5 bg-white border border-slate-200 text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
             
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Initiate Your Project</h2>
          <p className="text-slate-400 font-light text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Whether it's a feasibility study, full-scale dredging operation, or expert consultation — our engineering team is ready to deliver.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <button className="bg-[#B38356] hover:bg-white hover:text-slate-900 text-white px-10 py-5 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-md hover:shadow-[#B38356]/20 flex items-center gap-3">
                Engage With Us
                <ArrowDownRight className="w-4 h-4 -rotate-90" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}