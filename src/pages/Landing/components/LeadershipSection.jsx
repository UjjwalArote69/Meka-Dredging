import React, { useEffect, useRef, useState, useCallback } from "react";
import { Plus, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const leadersData = [
  {
    name: "Mr. Hemanth Meka Rao",
    role: "Director",
    img: "/hero/hmr.webp",
    desc: "Leading the strategic expansion of Meka Dredging Company with an innovative approach and focus on cost-effective marine solutions.",
    bio: [
      "Mr. Hemanth Meka Rao, a Mechanical Engineer from Georgia Tech, USA, has elevated the company's legacy through his innovative approach and focus on cost-effective marine solutions.",
      "Under his leadership, Meka Dredging Company has expanded its portfolio of dredging, reclamation, and coastal engineering services across multiple continents. His engineering background combined with a sharp business acumen drives the company's strategic growth.",
      "He oversees the integration of advanced marine technologies and sustainable dredging practices into every project, ensuring that Meka Dredging remains at the forefront of the marine infrastructure industry.",
    ],
    colSpan: "md:col-span-5 md:col-start-1",
    aspect: "aspect-[3/4]",
  },
  {
    name: "Mr. Arindam Basu",
    role: "Vice President",
    img: "/hero/basusir.webp",
    desc: "Overseeing global operational logistics and engineering execution with over 35 years of industry expertise.",
    bio: [
      "Mr. Arindam Basu is the Vice President and an Engineering Manager with over 35 years of expertise in HDPE pipeline installation, marine infrastructure, and EPC project execution.",
      "His extensive experience spans the full spectrum of marine engineering — from subsea pipeline installation to large-scale port development. He brings rigorous project management discipline and a deep understanding of operational logistics to every engagement.",
      "Mr. Basu plays a critical role in ensuring that all projects are delivered on time, within budget, and to the highest standards of safety and quality compliance.",
    ],
    colSpan: "md:col-span-6 md:col-start-7",
    aspect: "aspect-[4/5]",
    marginTop: "md:mt-32",
  },
  {
    name: "Capt. M. K. Rayudu",
    role: "Dredging Head",
    img: "/hero/rayudusir.webp",
    desc: "Chief technical authority on all dredging operations with over 40 years of specialized marine experience.",
    bio: [
      "Capt. M. K. Rayudu is the Head of Dredging at Meka Group, bringing over 40 years of specialized experience in dredging operations and marine infrastructure.",
      "As the chief technical authority, he oversees all dredging operations from capital and maintenance dredging to land reclamation and coastal protection projects. His decades of hands-on experience ensure operational excellence across every project.",
      "Capt. Rayudu's deep expertise in fleet management, hydrographic surveying, and marine safety protocols makes him an invaluable asset in executing complex marine engineering projects across international waters.",
    ],
    colSpan: "md:col-span-6 md:col-start-4",
    aspect: "aspect-[16/9]",
  },
];

export default function LeadershipSection() {
  const leadershipRef = useRef(null);
  const leaderImageRefs = useRef([]);
  const [activeBio, setActiveBio] = useState(null);

  const closeBio = useCallback(() => {
    setActiveBio(null);
    document.body.style.overflow = "auto";
  }, []);

  const openBio = useCallback((leader) => {
    setActiveBio(leader);
    document.body.style.overflow = "hidden";
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && activeBio) closeBio();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeBio, closeBio]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const leaders = gsap.utils.toArray(".leader-card");
      leaders.forEach((leader, i) => {
        gsap.fromTo(
          leader,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: leader, start: "top 85%" },
          }
        );

        const img = leaderImageRefs.current[i];
        if (img) {
          gsap.fromTo(
            img,
            { y: "-10%" },
            {
              y: "10%",
              ease: "none",
              scrollTrigger: {
                trigger: leader,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    }, leadershipRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-slate-200 pb-12 gap-8">
            <div className="max-w-2xl">
              <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-[#B38356]"></span> Board of Directors
              </p>
              <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[1.1]">
                The Visionaries Behind{" "}
                <span className="text-[#B38356] italic">The Operations.</span>
              </h2>
            </div>
            <p className="text-slate-500 font-light max-w-sm pb-2 text-sm leading-relaxed">
              Our executive team brings together over a century of combined
              expertise in maritime engineering, global logistics, and corporate
              strategy.
            </p>
          </div>

          {/* Leaders Grid */}
          <div
            ref={leadershipRef}
            className="grid md:grid-cols-12 gap-x-8 gap-y-20 lg:gap-y-32"
          >
            {leadersData.map((leader, index) => (
              <div
                key={index}
                className={`leader-card group cursor-pointer ${leader.colSpan} ${leader.marginTop || ""}`}
                onClick={() => openBio(leader)}
              >
                {/* Image with parallax */}
                <div
                  className={`relative overflow-hidden bg-slate-100 mb-8 ${leader.aspect}`}
                >
                  <div className="absolute inset-0 h-[120%] -top-[10%] w-full">
                    <img
                      ref={(el) => (leaderImageRefs.current[index] = el)}
                      src={leader.img}
                      alt={leader.name}
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-out"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Read Bio <Plus size={14} />
                    </span>
                  </div>
                </div>

                {/* Name & Role */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-t border-slate-200 pt-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif text-slate-900 mb-2 group-hover:text-[#B38356] transition-colors duration-300">
                      {leader.name}
                    </h3>
                    <p className="text-[#B38356] text-[10px] font-bold tracking-[0.2em] uppercase">
                      {leader.role}
                    </p>
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

      {/* ════════ BIO MODAL ════════ */}
      {activeBio && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={closeBio}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-fadeIn" />

          {/* Modal */}
          <div
            className="relative z-10 bg-white w-[95vw] max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeBio}
              className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-[#B38356] transition-colors duration-300 bg-white/80 backdrop-blur-sm"
              aria-label="Close bio"
            >
              <X size={20} />
            </button>

            {/* Image side */}
            <div className="relative w-full md:w-2/5 h-64 md:h-auto min-h-[300px] bg-slate-100 overflow-hidden shrink-0">
              <img
                src={activeBio.img}
                alt={activeBio.name}
                className="w-full h-full object-cover"
              />
              {/* Gradient bleed */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white" />
            </div>

            {/* Content side */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto bio-scroll">
              <p className="text-[#B38356] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                {activeBio.role}
              </p>
              <h3 className="text-3xl md:text-4xl font-serif text-slate-900 mb-8 leading-tight">
                {activeBio.name}
              </h3>

              <div className="space-y-5">
                {activeBio.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-slate-600 text-sm leading-relaxed font-light"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Bottom accent */}
              <div className="mt-10 pt-6 border-t border-slate-200">
                <p className="text-slate-400 text-[10px] tracking-[0.15em] uppercase font-bold">
                  Meka Dredging Company — A Division of the Meka Group
                </p>
              </div>
            </div>
          </div>

          {/* Scoped styles for modal */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(30px) scale(0.98); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out forwards;
            }
            .animate-slideUp {
              animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .bio-scroll::-webkit-scrollbar {
              width: 4px;
            }
            .bio-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .bio-scroll::-webkit-scrollbar-thumb {
              background: #B38356;
              border-radius: 2px;
            }
          `}</style>
        </div>
      )}
    </>
  );
}