import React, { Suspense, lazy } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

// Load Hero normally since it's above the fold (prevents initial layout shifts)
import HeroSection from "./components/HeroSection";

// Lazy load everything below the fold
const MetricsSection = lazy(() => import("./components/MetricsSection"));
const PhilosophySection = lazy(() => import("./components/PhilosophySection"));
const CapabilitiesSection = lazy(() => import("./components/CapabilitiesSection"));
const LeadershipSection = lazy(() => import("./components/LeadershipSection"));

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden">
      <Navbar />
      
      <HeroSection />

      {/* The Suspense boundary handles the fallback state while chunks are downloading */}
      <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center bg-[#FAFAFA]" />}>
        <MetricsSection />
        <PhilosophySection />
        <CapabilitiesSection />
        <LeadershipSection />
      </Suspense>

      <Footer />
    </div>
  );
}