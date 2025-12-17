
import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';

const TextZoomSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomTextRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: true,
        pin: true,
      }
    });

    tl.to(zoomTextRef.current, {
      scale: 150,
      duration: 2,
      ease: 'power2.inOut'
    })
    .to(bgRef.current, {
        backgroundColor: '#f8f9fa',
        duration: 0.5,
    }, '-=0.5');

    // Reveal next content when zoomed
    tl.to('.zoom-reveal', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
    }, '-=0.5');

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      <section 
        ref={bgRef}
        className="h-screen w-full flex items-center justify-center bg-[#0a0a0a] transition-colors duration-700"
      >
        <h2 
          ref={zoomTextRef}
          className="text-9xl md:text-[20rem] font-black pointer-events-none mix-blend-difference text-white"
        >
          MOTION
        </h2>

        <div className="zoom-reveal absolute inset-0 flex flex-col items-center justify-center opacity-0 translate-y-20 pointer-events-none">
            <h3 className="text-4xl md:text-6xl font-black text-[#0a0a0a] uppercase mb-4">Deep Experience</h3>
            <p className="text-xl text-gray-600 max-w-lg text-center px-4">
                We push the boundaries of what's possible in the browser. 
                Seamlessly blending high-performance code with artistic vision.
            </p>
        </div>
      </section>
    </div>
  );
};

export default TextZoomSection;
