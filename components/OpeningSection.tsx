
import React from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

const SECTION_HEIGHT = 1500;

const OpeningSection: React.FC = () => {
  const { scrollY } = useScroll();

  // Clip Path animation based on scroll
  const clip1 = useTransform(scrollY, [0, 800], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 800], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(scrollY, [0, 1200], ["150%", "100%"]);
  const opacity = useTransform(scrollY, [1200, 1500], [1, 0]);

  return (
    <div style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }} className="relative w-full bg-[#0a0a0a]">
      {/* Sticky Background Image with Clip Path */}
      <motion.div
        className="sticky top-0 h-screen w-full z-0"
        style={{
          clipPath,
          backgroundSize,
          opacity,
          backgroundImage: "url(https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Floating Content */}
      <div className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none z-10">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-9xl font-black text-white mix-blend-difference uppercase tracking-tighter"
        >
          EVOLUTION
        </motion.h1>
        <p className="text-[#00f5ff] font-bold tracking-[0.5em] mt-4 uppercase opacity-60">The Future is Motion</p>
      </div>

      {/* Gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
    </div>
  );
};

export default OpeningSection;
