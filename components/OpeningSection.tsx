
import React, { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsap';

const OpeningSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text simulation for performance
      const chars = titleRef.current?.innerText.split('') || [];
      if (titleRef.current) {
        titleRef.current.innerHTML = chars.map(c => `<span class="inline-block translate-y-full opacity-0">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
      }

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.to(bgRef.current, {
        scale: 1,
        opacity: 0.15,
        duration: 2.5,
      })
      .to(titleRef.current?.querySelectorAll('span') || [], {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1.5,
      }, '-=1.8')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, '-=1');

      // Subtle parallax on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(bgRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Ambient Element */}
      <div 
        ref={bgRef}
        className="absolute w-[120vw] h-[120vh] bg-gradient-to-tr from-[#ff006e]/20 via-transparent to-[#00f5ff]/20 blur-[120px] opacity-0 scale-125 pointer-events-none"
      />

      <div className="z-10 text-center px-6">
        <h1 
          ref={titleRef}
          className="text-[12vw] md:text-[10vw] font-black text-white leading-[0.85] tracking-tighter uppercase mb-8"
        >
          MASTERY
        </h1>
        
        <div 
          ref={subtitleRef}
          className="opacity-0 translate-y-10 flex items-center justify-center space-x-4"
        >
          <div className="w-12 h-px bg-[#ff006e]" />
          <p className="text-[#00f5ff] text-xs md:text-sm font-black tracking-[0.5em] uppercase">
            Digital Craftsmanship
          </p>
          <div className="w-12 h-px bg-[#ff006e]" />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">Scroll to Explore</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent opacity-20" />
      </div>
    </section>
  );
};

export default OpeningSection;
