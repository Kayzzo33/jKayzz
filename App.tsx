
import React, { useLayoutEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import OpeningSection from './components/OpeningSection';
import TextZoomSection from './components/TextZoomSection';
import HorizontalShowcase from './components/HorizontalShowcase';
import { MacbookShowcase } from './components/MacbookShowcase';
import ParallaxSection from './components/ParallaxSection';
import StackedCards from './components/StackedCards';
import Footer from './components/Footer';
import { gsap, ScrollTrigger } from './utils/gsap';

const App: React.FC = () => {
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }

    gsap.config({
      nullTargetWarn: false,
    });

    const refreshInterval = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshInterval);
    };
  }, []);

  return (
    <div className="app-container bg-[#0a0a0a]">
      <CustomCursor />
      
      {/* Fixed Navigation Overlay */}
      <nav className="fixed top-10 left-1/2 -translate-x-1/2 flex items-center space-x-8 z-[100] mix-blend-difference pointer-events-none">
        <span className="text-white text-[10px] font-black tracking-[0.3em] uppercase opacity-40">Interactive Portfolio</span>
        <div className="w-12 h-[1px] bg-white opacity-20" />
        <span className="text-white text-[10px] font-black tracking-[0.3em] uppercase opacity-40">Volume 01</span>
      </nav>

      <OpeningSection />
      <TextZoomSection />
      <HorizontalShowcase />
      <MacbookShowcase />
      <ParallaxSection />
      <StackedCards />
      <Footer />
    </div>
  );
};

export default App;
