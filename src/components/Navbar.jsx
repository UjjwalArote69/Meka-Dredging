/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  // Set the current path when the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Handle floating pill styling on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Centralized navigation links data
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Expertise', href: '/expertise' }
  ];

  return (
    <>
      {/* Cinematic Full-Screen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-100 bg-[#050A15] text-white transition-transform duration-[0.8s] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
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

        <div className="flex flex-col justify-center h-[calc(100vh-200px)] px-8 gap-8">
          {navLinks.map((item, index) => {
            const isActive = currentPath === item.href;
            return (
              <div key={index} className="overflow-hidden">
                <a 
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`inline-block text-4xl md:text-6xl font-serif font-light transition-colors ${
                    isActive ? 'text-[#B38356]' : 'text-white hover:text-[#B38356]'
                  }`}
                  style={{
                    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(100%)',
                    transition: `transform 0.8s cubic-bezier(0.76,0,0.24,1) ${index * 0.1 + 0.3}s, color 0.3s ease`
                  }}
                >
                  {item.label}
                </a>
              </div>
            );
          })}

          <div 
            className="mt-12 pt-10 border-t border-white/10"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: `opacity 0.8s ease 0.8s`
            }}
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-6 font-bold">Initiate a Project</p>
            <Link to="/contact">
              <button className="bg-[#B38356] hover:bg-white hover:text-slate-900 text-white w-full py-5 text-[11px] tracking-[0.25em] uppercase font-bold transition-colors duration-300">
              Engage With Us
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Pill Navigation */}
      <div className="fixed w-full top-0 z-50 flex justify-center px-4 pt-6 pointer-events-none">
        <nav 
          className={`pointer-events-auto transition-all duration-700 w-full max-w-5xl rounded-full px-6 lg:px-8 py-4 ${
            scrolled 
              ? 'bg-white/80 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200/50' 
              : 'bg-white/0 border border-transparent'
          }`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer group">
              <span className="font-serif font-bold text-xl tracking-widest uppercase text-slate-900">
                Meka<span className="text-[#B38356]">Dredging</span>
              </span>
            </div>

            <div className="hidden md:flex space-x-8 items-center text-[10px] tracking-[0.2em] uppercase font-bold">
              {navLinks.map((link) => {
                const isActive = currentPath === link.href;
                return (
                  <a 
                    key={link.label}
                    href={link.href} 
                    className={
                      isActive 
                        ? "text-[#B38356] relative after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-[#B38356]"
                        : "text-slate-500 hover:text-slate-900 transition-colors duration-300"
                    }
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <Link to="/contact">
                <button className="bg-slate-900 hover:bg-[#B38356] text-white px-6 py-2.5 rounded-full text-[10px] tracking-[0.15em] uppercase font-bold transition-all duration-300">
                  Engage
                </button>
                </Link>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden text-slate-900 p-1 hover:text-[#B38356] transition-colors"
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