/* eslint-disable react-hooks/set-state-in-effect */
import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import gsap from "gsap";

// Helper: handle hash-based scroll for SPA navigation
function useHashScroll() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, href) => {
    e.preventDefault();

    // Parse the href to separate pathname and hash
    const [pathname, hash] = href.split('#');
    const targetPath = pathname || location.pathname;

    if (location.pathname === targetPath && hash) {
      // Already on the same page — just scroll to the hash
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to a different page (with or without hash)
      navigate(href);
    }
  };

  return handleNavClick;
}

// ═══════════════════════════════════════════════
// 1. DESKTOP NAV ITEM (Handles Hover & Dropdown)
// ═══════════════════════════════════════════════
function DesktopNavItem({
  link,
  currentPath,
  onNavClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const isActive =
    currentPath === link.href ||
    currentPath.startsWith(link.href + "/");
  const hasChildren = link.children && link.children.length > 0;
  
  // Check if this menu should be rendered as a wide mega-menu
  const isMega = link.columns && link.columns > 1;

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // 200ms delay ensures mouse can travel the gap without closing the menu
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  useEffect(() => {
    if (!dropdownRef.current) return;

    if (isOpen) {
      gsap.killTweensOf(dropdownRef.current);
      gsap.to(dropdownRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        display: "block",
      });
    } else {
      gsap.killTweensOf(dropdownRef.current);
      gsap.to(dropdownRef.current, {
        autoAlpha: 0,
        y: 8,
        duration: 0.25,
        ease: "power2.in",
        display: "none",
      });
    }
  }, [isOpen]);

  return (
    <div
      className="relative flex items-center h-full py-2 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={link.href}
        onClick={(e) => onNavClick(e, link.href)}
        className={`flex items-center gap-1 transition-colors duration-300 ${
          isActive
            ? "text-[#B38356] relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[2px] after:bg-[#B38356]"
            : "text-slate-500 hover:text-slate-900"
        }`}
      >
        {link.label}
        {hasChildren && (
          <ChevronDown
            size={12}
            strokeWidth={2.5}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-[#B38356]" : "text-slate-400 group-hover:text-slate-900"}`}
          />
        )}
      </a>

      {hasChildren && (
        <div
          ref={dropdownRef}
          // Dynamically adjust width based on whether it's a mega menu
          className={`absolute top-[100%] left-1/2 -translate-x-1/2 pt-6 hidden opacity-0 translate-y-2 z-50 ${isMega ? 'w-[640px]' : 'min-w-[240px]'}`}
        >
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/70 p-4 shadow-[0_30px_60px_rgba(5,10,21,0.08)] rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-gradient-to-r from-[#8b6540] to-[#B38356] rounded-b-full" />

            {/* Dynamic Grid Layout for Mega Menus */}
            <div className={isMega ? "grid grid-cols-2 gap-x-6 gap-y-1" : "flex flex-col gap-1"}>
              {link.children.map((child, idx) => (
                <a
                  key={idx}
                  href={child.href}
                  onClick={(e) => {
                    onNavClick(e, child.href);
                    setIsOpen(false);
                  }}
                  className="group/link flex items-center justify-between px-4 py-3 transition-all duration-300 hover:bg-slate-100 rounded-xl"
                >
                  <span className="text-[10px] tracking-[0.15em] font-sans font-bold text-slate-500 group-hover/link:text-[#B38356] transition-colors duration-300 uppercase truncate">
                    {child.label}
                  </span>
                  <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 text-[#B38356] shrink-0">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// 2. MAIN NAVBAR COMPONENT
// ═══════════════════════════════════════════════
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const handleNavClick = useHashScroll();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ═══════════════════════════════════════════════
  // NAVIGATION DATA
  // ═══════════════════════════════════════════════
  const leftLinks = [
    { label: "Home", href: "/" },
    {
      label: "About",
      href: "/about",
      children: [
        { label: "Our Heritage", href: "/about#heritage" },
        { label: "Board of Directors", href: "/about#board" },
        { label: "Mission & Vision", href: "/about#mission" },
      ],
    },
    {
      label: "Projects",
      href: "/projects",
    },
  ];

  const rightLinks = [
    {
      label: "Services",
      href: "/services",
      columns: 2, // <--- TRIGGERS THE WIDE 2-COLUMN MEGA MENU
      children: [
        { label: "Feasibility Studies", href: "/services#feasibility" },
        { label: "Licence Applications", href: "/services#licence" },
        { label: "Planning and Design", href: "/services#planning" },
        { label: "Numerical and Physical Modelling", href: "/services#modelling" },
        { label: "Environmental Impact Assessment", href: "/services#assessment" },
        { label: "Contract Documentation", href: "/services#documentation" },
        { label: "Plant and Equipment Specifications", href: "/services#specifications" },
        { label: "Budget Pricing", href: "/services#pricing" },
        { label: "Project Evaluation", href: "/services#evaluation" },
        { label: "Contract Supervision", href: "/services#supervision" },
        { label: "Project Monitoring and Auditing", href: "/services#monitoring" },
        { label: "Expert Witness", href: "/services#experts" },
        { label: "Dispute Resolution", href: "/services#resolution" },
      ],
    },
    {
      label: "Careers",
      href: "/careers",
    },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <>
      {/* ── CINEMATIC MOBILE MENU ── */}
      <div
        className={`fixed inset-0 z-[100] bg-[#050A15] text-white transition-transform duration-[0.8s] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 pt-10 pb-6 border-b border-white/5">
          <span className="font-serif font-bold text-xl tracking-widest uppercase text-white">
            Meka<span className="text-[#B38356]">Dredging</span>
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white hover:text-[#B38356] transition-colors p-2"
          >
            <X size={32} strokeWidth={1} />
          </button>
        </div>

        <div className="flex flex-col justify-center h-[calc(100vh-200px)] px-8 gap-6 overflow-y-auto">
          {allLinks.map((item, index) => {
            const isActive =
              currentPath === item.href ||
              currentPath.startsWith(item.href + "/");
            return (
              <div key={index} className="overflow-hidden">
                <a
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`inline-block text-3xl md:text-5xl font-serif font-light transition-colors ${
                    isActive ? "text-[#B38356]" : "text-white hover:text-[#B38356]"
                  }`}
                  style={{
                    transform: isMobileMenuOpen ? "translateY(0)" : "translateY(100%)",
                    transition: `transform 0.8s cubic-bezier(0.76,0,0.24,1) ${index * 0.08 + 0.2}s, color 0.3s ease`,
                  }}
                >
                  {item.label}
                </a>
              </div>
            );
          })}

          <div
            className="mt-8 pt-8 border-t border-white/10"
            style={{ opacity: isMobileMenuOpen ? 1 : 0, transition: `opacity 0.8s ease 0.8s` }}
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-6 font-bold">
              Initiate a Project
            </p>
            <Link to="/contact">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#B38356] hover:bg-white hover:text-slate-900 text-white w-full py-5 text-[11px] tracking-[0.25em] uppercase font-bold transition-colors duration-300"
              >
                Engage With Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── FLOATING PILL NAVIGATION ── */}
      <div className="fixed w-full top-0 z-50 flex justify-center px-4 pt-6 pointer-events-none">
        <nav
          className={`pointer-events-auto transition-all duration-700 w-full max-w-[1400px] rounded-full px-6 lg:px-10 py-3.5 ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(5,10,21,0.06)] border border-slate-200/50"
              : "bg-white/0 border border-transparent"
          }`}
        >
          <div className="flex justify-between items-center relative w-full h-full">
            {/* LEFT LINKS */}
            <div className="hidden lg:flex items-center justify-start space-x-7 xl:space-x-10 text-[10px] tracking-[0.2em] uppercase font-bold z-10">
              {leftLinks.map((link) => (
                <DesktopNavItem key={link.label} link={link} currentPath={currentPath} onNavClick={handleNavClick} />
              ))}
            </div>

            {/* ABSOLUTE CENTER LOGO */}
            <div className="flex items-center justify-start lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 pointer-events-auto">
              <Link to="/">
                <span className="font-serif font-bold text-xl xl:text-2xl tracking-widest uppercase text-slate-900 cursor-pointer">
                  Meka<span className="text-[#B38356]">Dredging</span>
                </span>
              </Link>
            </div>

            {/* RIGHT LINKS & ENGAGE BUTTON */}
            <div className="hidden lg:flex items-center justify-end space-x-7 xl:space-x-10 text-[10px] tracking-[0.2em] uppercase font-bold z-10">
              {rightLinks.map((link) => (
                <DesktopNavItem key={link.label} link={link} currentPath={currentPath} onNavClick={handleNavClick} />
              ))}

              <Link to="/contact" className="ml-4">
                <button className="bg-slate-900 hover:bg-[#B38356] text-white px-7 py-3 rounded-full text-[10px] tracking-[0.15em] uppercase font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#B38356]">
                  Engage
                </button>
              </Link>
            </div>

            {/* MOBILE HAMBURGER ICON */}
            <div className="flex lg:hidden items-center justify-end z-20">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-slate-900 p-2 hover:text-[#B38356] transition-colors"
              >
                <Menu size={28} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}