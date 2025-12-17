
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2620",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=2534",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670",
];

const Column = ({ images, y, offset }: { images: string[], y: any, offset: string }) => {
  return (
    <motion.div
      style={{ y }}
      className={`relative flex flex-col gap-[2vw] w-1/4 min-w-[200px] ${offset}`}
    >
      {images.map((src, i) => (
        <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 interactive">
          <img src={src} alt="tech" className="w-full h-full object-cover" />
        </div>
      ))}
    </motion.div>
  );
};

const ParallaxSection: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={container} className="relative h-[150vh] bg-white overflow-hidden py-20 px-[2vw]">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
          <h2 className="text-8xl md:text-[12rem] font-black text-[#0a0a0a] opacity-5 uppercase select-none">Gallery</h2>
      </div>

      <div className="flex gap-[2vw] h-full">
        <Column images={[images[0], images[1]]} y={y1} offset="top-[-10%]" />
        <Column images={[images[2], images[3]]} y={y2} offset="top-[-30%]" />
        <Column images={[images[4], images[5]]} y={y3} offset="top-[-15%]" />
        <Column images={[images[6], images[7]]} y={y4} offset="top-[-40%]" />
      </div>
    </section>
  );
};

export default ParallaxSection;
