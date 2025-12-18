
import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';

const TextZoomSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomTextRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const phrase1Ref = useRef<HTMLDivElement>(null);
  const phrase2Ref = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
        }
      });

      // 1. Initial State: Stars and background
      gsap.set(starsRef.current, { opacity: 0.5 });
      gsap.set([phrase1Ref.current, phrase2Ref.current, zoomTextRef.current], { opacity: 0, y: 50 });

      // 2. Animate First Phrase (Top Left)
      tl.to(phrase1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      })
      // 3. Animate Second Phrase (Bottom Right)
      .to(phrase2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.5')
      // 4. Reveal Central Zoom Text
      .to(zoomTextRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: 'back.out(1.7)'
      })
      // 5. Zoom In (Traverse through the text)
      .to(zoomTextRef.current, {
        scale: 120,
        duration: 4,
        ease: 'power4.in'
      }, '+=0.5')
      // 6. Transition Background
      .to(bgRef.current, {
        backgroundColor: '#0a0a0a',
        duration: 1,
      }, '-=1.5')
      // 7. Reveal final content with high visibility
      .to('.zoom-reveal', {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.5');

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        gsap.to(starsRef.current, { x, y, duration: 1, ease: 'power2.out' });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      <section 
        ref={bgRef}
        className="h-screen w-full flex items-center justify-center bg-[#0a0a0a] transition-colors duration-1000 relative"
      >
        <div 
          ref={starsRef}
          className="absolute inset-0 z-0 pointer-events-none opacity-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(circle, black, transparent 80%)'
          }}
        />

        <div 
          ref={phrase1Ref}
          className="absolute top-[20%] left-[10%] z-10 text-white mix-blend-difference opacity-0"
        >
          <h4 className="text-3xl md:text-5xl font-black uppercase leading-none tracking-tighter">
            SO WE BUILT <br />
            <span className="text-[#ff006e]">DIGITAL MOTION</span>
          </h4>
        </div>

        <div 
          ref={phrase2Ref}
          className="absolute bottom-[20%] right-[10%] z-10 text-white mix-blend-difference text-right opacity-0"
        >
          <h4 className="text-3xl md:text-5xl font-black uppercase leading-none tracking-tighter">
            AS IT <br />
            <span className="text-[#00f5ff]">SHOULD BE</span>
          </h4>
        </div>

        <h2 
          ref={zoomTextRef}
          className="text-7xl md:text-[15rem] font-black pointer-events-none mix-blend-difference text-white z-20 scale-50 opacity-0"
        >
          BEYOND
        </h2>

        <div className="zoom-reveal absolute inset-0 flex flex-col items-center justify-center opacity-0 translate-y-20 pointer-events-none z-30">
          <div className="w-24 h-1 bg-[#ff006e] mb-12" />
          <h3 className="text-4xl md:text-8xl font-black text-white opacity-100 uppercase mb-8 tracking-tighter italic drop-shadow-lg">
            DEEP EXPERIENCE
          </h3>
          <p className="text-lg md:text-2xl text-gray-300 max-w-2xl text-center px-6 font-medium leading-relaxed drop-shadow-md">
            We don't just animate; we engineer sensation. 
            Blurring the lines between the interface and the user.
          </p>
          <div className="mt-12 flex space-x-4">
             <div className="w-3 h-3 rounded-full bg-[#ff006e] animate-ping" />
             <span className="text-[10px] font-black tracking-[0.4em] text-gray-100 uppercase">Interactive Layer 01</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TextZoomSection;
