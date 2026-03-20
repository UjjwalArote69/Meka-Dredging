/* eslint-disable react-hooks/immutability */
import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  Plus,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router";

gsap.registerPlugin(ScrollTrigger);

const leadersData = [
  {
    name: "Mr. Hemanth Meka Rao",
    role: "Director",
    img: "/hero/hmr.webp",
    desc: "Leading the strategic expansion of the Meka Group's maritime assets and international joint ventures.",
    bio: [
      "Mr. Hemanth Meka Rao serves as the Director of Meka Dredging and is the driving force behind the Meka Group's strategic expansion into international maritime infrastructure.",
      "With a deep-rooted understanding of both the commercial shipping and marine construction sectors, he has spearheaded the Group's entry into large-scale capital dredging projects across India, West Africa, and Southeast Asia.",
      "Under his leadership, Meka Dredging has grown from a regional operator to a recognized name in international hydro-infrastructure, consistently securing government and port authority contracts that demand the highest levels of technical precision and environmental stewardship.",
      "Mr. Meka Rao holds a degree in Business Administration and brings a forward-thinking approach to fleet modernization, sustainable dredging practices, and strategic joint ventures with global partners.",
    ],
    colSpan:
      "md:col-span-5 md:col-start-1",
    aspect: "aspect-[3/4]",
  },
  {
    name: "Mr. Arindam Basu",
    role: "Vice President",
    img: "/hero/basusir.webp",
    desc: "Overseeing global operational logistics, ensuring maximum efficiency across all active dredging sites.",
    bio: [
      "Mr. Arindam Basu serves as Vice President of Meka Dredging, where he oversees the full spectrum of global operational logistics and project delivery.",
      "A seasoned maritime professional with over three decades of experience, Mr. Basu has managed complex dredging campaigns across multiple continents, coordinating fleet deployment, supply chain operations, and on-site execution with meticulous precision.",
      "His expertise spans maintenance dredging, capital dredging, and land reclamation — with a particular focus on optimizing operational throughput while maintaining zero-incident safety records.",
      "Prior to joining Meka Dredging, Mr. Basu held senior operational roles at leading Indian and international maritime firms, building a reputation for delivering projects ahead of schedule and under budget.",
    ],
    colSpan:
      "md:col-span-6 md:col-start-7",
    aspect: "aspect-[4/5]",
    marginTop: "md:mt-32",
  },
  {
    name: "Capt. M. K. Rayudu",
    role: "Dredging Head",
    img: "/hero/rayudusir.webp",
    desc: "Chief technical authority on capital dredging methodologies and fleet deployment strategy.",
    bio: [
      "Captain M. K. Rayudu is the Head of Dredging Operations at Meka Dredging, serving as the chief technical authority on all capital dredging methodologies and fleet deployment strategies.",
      "A Master Mariner by qualification, Capt. Rayudu brings unparalleled hands-on expertise from decades of commanding dredging vessels in some of the world's most challenging marine environments — from rock-laden Indian coastal channels to the sediment-heavy deltas of West Africa.",
      "He is responsible for the technical planning of every dredging campaign, including cutter head selection, DGPS positioning protocols, sediment transport logistics, and environmental compliance.",
      "Capt. Rayudu's leadership on the bridge and in the operations room ensures that every project meets Meka Dredging's exacting standards for precision, safety, and ecological stewardship.",
    ],
    colSpan:
      "md:col-span-6 md:col-start-4",
    aspect: "aspect-[16/9]",
  },
];

export default function LandingPage() {
  const heroRef = useRef(null);
  const heroTextRefs = useRef([]);
  const heroImageRef = useRef(null);
  const missionRef = useRef(null);
  const metricsRef = useRef([]);
  const legacyRefs = useRef([]);
  const leadershipRef = useRef(null);
  const leaderImageRefs = useRef([]);

  const [activeBio, setActiveBio] =
    useState(null);

  const openBio = (leader) => {
    setActiveBio(leader);
    document.body.style.overflow =
      "hidden";
  };

  const closeBio = () => {
    setActiveBio(null);
    document.body.style.overflow =
      "auto";
  };

  useEffect(() => {
    const fn = (e) => {
      if (
        e.key === "Escape" &&
        activeBio
      )
        closeBio();
    };
    window.addEventListener(
      "keydown",
      fn,
    );
    return () =>
      window.removeEventListener(
        "keydown",
        fn,
      );
  }, [activeBio]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline();
      heroTl.fromTo(
        heroImageRef.current,
        {
          scale: 1.15,
          clipPath:
            "inset(15% 0% 15% 0%)",
          filter:
            "brightness(0.8) contrast(1.2)",
        },
        {
          scale: 1,
          clipPath:
            "inset(0% 0% 0% 0%)",
          filter:
            "brightness(1) contrast(1)",
          duration: 2.2,
          ease: "power3.inOut",
        },
      );
      heroTl.fromTo(
        heroTextRefs.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
        },
        "-=1.2",
      );
      gsap.fromTo(
        missionRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 85%",
          },
        },
      );
      metricsRef.current.forEach(
        (el) => {
          gsap.fromTo(
            el,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
              },
            },
          );
        },
      );
      legacyRefs.current.forEach(
        (el, index) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            },
          );
        },
      );
      const leaders =
        gsap.utils.toArray(
          ".leader-card",
        );
      leaders.forEach((leader, i) => {
        gsap.fromTo(
          leader,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leader,
              start: "top 85%",
            },
          },
        );
        const img =
          leaderImageRefs.current[i];
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
            },
          );
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const addToRefs = (el, refArray) => {
    if (
      el &&
      !refArray.current.includes(el)
    )
      refArray.current.push(el);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden">
      <Navbar />

      {/* ═══════ HORIZONTAL BIO MODAL ═══════ */}
      {activeBio && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[200] bg-[#050A15]/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease]"
            onClick={closeBio}
          />

          {/* Centering shell */}
          <div
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8"
            onClick={closeBio}
          >
            {/* Card — horizontal on md+, stacks on mobile */}
            <div
              className="relative w-full max-w-[1100px] h-[85vh] md:h-[75vh] bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden animate-[modalIn_0.35s_ease]"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              {/* LEFT: Photo */}
              <div className="w-full md:w-[38%] h-[350px] md:h-[220px] md:h-full bg-slate-200 shrink-0 relative overflow-hidden">
                <img
                  src={activeBio.img}
                  alt={activeBio.name}
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle bottom gradient on mobile only to blend into content */}
                {/* <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent md:hidden" /> */}
              </div>

              {/* RIGHT: Bio — only this panel scrolls */}
              <div className="w-full md:w-[62%] overflow-y-auto overscroll-contain bio-scroll-panel">
                <div className="px-6 md:px-10 lg:px-12 py-6 md:py-10 pr-14 md:pr-12">
                  {/* Role chip */}
                  <span className="inline-block bg-[#B38356]/10 text-[#B38356] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 mb-4">
                    {activeBio.role}
                  </span>

                  {/* Name */}
                  <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-serif text-slate-900 leading-[1.15] mb-2">
                    {activeBio.name}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-slate-400 text-xs tracking-wide mb-6">
                    Meka Dredging — A
                    Division of the Meka
                    Group
                  </p>

                  {/* Gold line */}
                  <div className="w-10 h-px bg-[#B38356] mb-6" />

                  {/* Bio paragraphs */}
                  <div className="space-y-4">
                    {activeBio.bio.map(
                      (
                        paragraph,
                        i,
                      ) => (
                        <p
                          key={i}
                          className="text-slate-600 font-light leading-[1.75] text-[13px] md:text-sm"
                        >
                          {paragraph}
                        </p>
                      ),
                    )}
                  </div>

                  {/* Footer area */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                    <p className="text-slate-400 text-[10px] tracking-[0.15em] uppercase font-semibold hidden sm:block">
                      {activeBio.role} —
                      Meka Dredging
                    </p>
                    <button
                      onClick={closeBio}
                      className="bg-slate-900 hover:bg-[#B38356] text-white px-5 py-2.5 text-[10px] tracking-[0.15em] uppercase font-bold transition-all duration-400 flex items-center gap-2 shrink-0"
                    >
                      Close{" "}
                      <X size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal keyframes + scrollbar styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.96) translateY(12px) } to { opacity: 1; transform: scale(1) translateY(0) } }

        .bio-scroll-panel::-webkit-scrollbar { width: 4px; }
        .bio-scroll-panel::-webkit-scrollbar-track { background: transparent; }
        .bio-scroll-panel::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }
        .bio-scroll-panel::-webkit-scrollbar-thumb:hover { background: #B38356; }
        .bio-scroll-panel { scrollbar-width: thin; scrollbar-color: #CBD5E1 transparent; }
      `,
        }}
      />

      {/* ═══════ HERO ═══════ */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FAFAFA]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 z-10">
              <div className="overflow-hidden mb-8">
                <p
                  ref={(el) =>
                    addToRefs(
                      el,
                      heroTextRefs,
                    )
                  }
                  className="text-[#B38356] font-semibold tracking-[0.2em] text-xs uppercase flex items-center gap-4"
                >
                  <span className="w-12 h-px bg-[#B38356]"></span>{" "}
                  Defining Coastal
                  Infrastructure
                </p>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif text-slate-900 leading-none mb-8">
                <div className="overflow-">
                  <div
                    ref={(el) =>
                      addToRefs(
                        el,
                        heroTextRefs,
                      )
                    }
                  >
                    Precision
                  </div>
                </div>
                <div className="overflow-">
                  <div
                    ref={(el) =>
                      addToRefs(
                        el,
                        heroTextRefs,
                      )
                    }
                    className="text-[#B38356] italic"
                  >
                    Marine
                  </div>
                </div>
                <div className="overflow-">
                  <div
                    ref={(el) =>
                      addToRefs(
                        el,
                        heroTextRefs,
                      )
                    }
                  >
                    Engineering.
                  </div>
                </div>
              </h1>
              <div className="overflow-hidden mb-12">
                <p
                  ref={(el) =>
                    addToRefs(
                      el,
                      heroTextRefs,
                    )
                  }
                  className="text-slate-600 text-lg md:text-xl leading-relaxed font-light max-w-lg"
                >
                  Specialized capital
                  dredging, land
                  reclamation, and
                  marine construction
                  services executing the
                  world's most complex
                  hydro-engineering
                  challenges.
                </p>
              </div>
              <div className="overflow-hidden">
                <div
                  ref={(el) =>
                    addToRefs(
                      el,
                      heroTextRefs,
                    )
                  }
                  className="flex flex-col sm:flex-row gap-5"
                >
                  <Link to="/projects">
                  <button className="bg-slate-900 hover:bg-[#B38356] text-white px-8 py-4.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 flex items-center justify-center gap-3">
                    View Capabilities{" "}
                    <ArrowRight
                      size={16}
                    />
                  </button>
                  </Link>
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

      {/* ═══════ METRICS ═══════ */}
      <section className="py-16 md:py-20 bg-slate-900 text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-0">
            {[
              {
                value: "40+",
                label:
                  "Years of Heritage",
              },
              {
                value: "150+",
                label:
                  "Projects Executed",
              },
              {
                value: "25+",
                label:
                  "Specialized Vessels",
              },
              {
                value: "10M+",
                label:
                  "CBM Dredged Annually",
              },
            ].map((metric, index) => (
              <div
                key={index}
                ref={(el) =>
                  addToRefs(
                    el,
                    metricsRef,
                  )
                }
                className={`flex flex-col justify-center px-6 md:px-8
            ${index % 2 !== 0 ? "border-l border-white/10" : ""}
            md:border-l md:border-white/10 md:first:border-l-0
          `}
              >
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#B38356] mb-1 md:mb-2">
                  {metric.value}
                </h3>
                <p className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light text-slate-400">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PHILOSOPHY ═══════ */}
      <section
        ref={missionRef}
        className="py-40 bg-white relative"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-12">
            Our Philosophy
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.3] font-light text-slate-900">
            "Executing{" "}
            <span className="text-[#B38356] italic">
              sustainable
              hydro-infrastructure
            </span>{" "}
            that balances sovereign
            economic progress with the
            strict preservation of
            coastal biomes."
          </h2>
        </div>
      </section>

      {/* ═══════ CAPABILITIES ═══════ */}
      <section className="py-32 bg-[#FAFAFA] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4">
                Core Competencies
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
                Strategic Marine
                Execution
              </h2>
            </div>
            <p className="text-slate-500 font-light max-w-sm">
              Deploying advanced
              maritime assets for
              international port
              authorities and government
              infrastructure sectors.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {[
              {
                num: "01",
                title:
                  "Capital Dredging",
                desc: "Deepening navigational channels, turning basins, and harbor layouts for modern mega-vessels using advanced Cutter Suction technology.",
              },
              {
                num: "02",
                title:
                  "Land Reclamation",
                desc: "Creating structurally sound artificial landmasses for industrial, commercial, and port infrastructure expansions.",
              },
              {
                num: "03",
                title:
                  "Coastal Protection",
                desc: "Engineering robust breakwaters, groynes, and sea walls to defend shorelines against severe tidal erosion and climatic shifts.",
              },
            ].map((item, index) => (
              <div
                key={index}
                ref={(el) =>
                  addToRefs(
                    el,
                    legacyRefs,
                  )
                }
                className="group relative border-t border-slate-300 pt-8 hover:border-[#B38356] transition-colors duration-500"
              >
                <span className="absolute -top-12 right-0 text-9xl font-serif text-slate-100 group-hover:text-[#B38356]/10 transition-colors duration-500 pointer-events-none">
                  {item.num}
                </span>
                <h4 className="text-2xl font-serif text-slate-900 mb-4 pr-10">
                  {item.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ LEADERSHIP ═══════ */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-slate-200 pb-12 gap-8">
            <div className="max-w-2xl">
              <p className="text-[#B38356] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4">
                Board of Directors
              </p>
              <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[1.1]">
                The Visionaries Behind
                The Operations
              </h2>
            </div>
            <p className="text-slate-500 font-light max-w-sm pb-2">
              Our executive team brings
              together over a century of
              combined expertise in
              maritime engineering,
              global logistics, and
              corporate strategy.
            </p>
          </div>

          <div
            ref={leadershipRef}
            className="grid md:grid-cols-12 gap-x-8 gap-y-20 lg:gap-y-32"
          >
            {leadersData.map(
              (leader, index) => (
                <div
                  key={index}
                  className={`leader-card group cursor-pointer ${leader.colSpan} ${leader.marginTop || ""}`}
                  onClick={() =>
                    openBio(leader)
                  }
                >
                  <div
                    className={`relative overflow-hidden bg-slate-100 mb-8 ${leader.aspect}`}
                  >
                    <div className="absolute inset-0 h-[120%] -top-[10%] w-full">
                      <img
                        ref={(el) => {
                          if (
                            el &&
                            !leaderImageRefs.current.includes(
                              el,
                            )
                          )
                            leaderImageRefs.current[
                              index
                            ] = el;
                        }}
                        src={leader.img}
                        alt={
                          leader.name
                        }
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-out"
                      />
                    </div>
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Read Bio{" "}
                        <Plus
                          size={14}
                        />
                      </span>
                    </div>
                  </div>
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
              ),
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
