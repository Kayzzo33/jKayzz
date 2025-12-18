
import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import OpeningSection from './components/OpeningSection';
import TextZoomSection from './components/TextZoomSection';
import HorizontalShowcase from './components/HorizontalShowcase';
import { MacbookShowcase } from './components/MacbookShowcase';
import { DigitalEcosystem } from './components/DigitalEcosystem';
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

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    return () => {
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="app-container bg-[#0a0a0a] selection:bg-[#ff006e] selection:text-white">
      <CustomCursor />
      
      {/* Fixed Header Label */}
      <nav className="fixed top-10 left-1/2 -translate-x-1/2 flex items-center space-x-8 z-[100] mix-blend-difference pointer-events-none">
        <span className="text-white text-[10px] font-black tracking-[0.3em] uppercase opacity-40">Interactive Portfolio</span>
        <div className="w-12 h-[1px] bg-white opacity-20" />
        <span className="text-white text-[10px] font-black tracking-[0.3em] uppercase opacity-40">Volume 01</span>
      </nav>

      <OpeningSection />
      
      <TextZoomSection />
      
      <HorizontalShowcase />
      
      <MacbookShowcase />
      
      <DigitalEcosystem />
      
      <StackedCards />
      
      <Footer />
    </div>
  );
};

export default App;
