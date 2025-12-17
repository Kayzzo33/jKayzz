
import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';
import { TechCard } from '../types';

const techCards: TechCard[] = [
  { id: '1', title: 'GSAP', description: 'The standard for high-performance web animation.', color: '#88ce02', image: 'https://picsum.photos/800/600?random=1' },
  { id: '2', title: 'THREE.JS', description: 'Create stunning 3D experiences in the browser.', color: '#ffffff', image: 'https://picsum.photos/800/600?random=2' },
  { id: '3', title: 'WEBGL', description: 'Direct access to GPU for maximum rendering speed.', color: '#990000', image: 'https://picsum.photos/800/600?random=3' },
  { id: '4', title: 'PIXI.JS', description: 'The HTML5 Creation Engine: fast, 2D WebGL renderer.', color: '#e91e63', image: 'https://picsum.photos/800/600?random=4' },
];

const HorizontalShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollWidth = scrollRef.current?.offsetWidth || 0;
    const windowWidth = window.innerWidth;

    gsap.to(scrollRef.current, {
      x: () => -(scrollWidth - windowWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section ref={containerRef} className="h-screen bg-[#1a1a2e] overflow-hidden flex items-center">
      <div 
        ref={scrollRef} 
        className="flex items-center space-x-20 px-20 min-w-max"
      >
        <div className="w-[400px] md:w-[600px] pr-20">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Tech Stack</h2>
            <p className="text-xl text-gray-400">Scroll to explore the cutting-edge libraries we use to bring interfaces to life.</p>
        </div>

        {techCards.map((card) => (
          <div 
            key={card.id} 
            className="w-[80vw] h-[70vh] rounded-3xl overflow-hidden relative group interactive"
          >
            <img 
              src={card.image} 
              alt={card.title} 
              className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-12">
              <span className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: card.color }}>Module {card.id}</span>
              <h3 className="text-6xl font-black text-white mb-4">{card.title}</h3>
              <p className="text-lg text-gray-300 max-w-md">{card.description}</p>
            </div>
          </div>
        ))}

        <div className="w-[400px] flex items-center justify-center">
            <button className="px-10 py-4 border border-[#00f5ff] text-[#00f5ff] rounded-full text-xl font-bold hover:bg-[#00f5ff] hover:text-[#0a0a0a] transition-all">
                Learn More
            </button>
        </div>
      </div>
    </section>
  );
};

export default HorizontalShowcase;
