
import React, { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };

    const handleHover = () => {
      gsap.to(cursorRef.current, { scale: 2.5, backgroundColor: 'rgba(255, 0, 110, 0.4)' });
      gsap.to(followerRef.current, { scale: 0, opacity: 0 });
    };

    const handleUnhover = () => {
      gsap.to(cursorRef.current, { scale: 1, backgroundColor: '#ff006e' });
      gsap.to(followerRef.current, { scale: 1, opacity: 1 });
    };

    window.addEventListener('mousemove', moveCursor);
    
    const interactiveElements = document.querySelectorAll('button, a, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-4 h-4 bg-[#ff006e] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-[#00f5ff] rounded-full pointer-events-none z-[9998] mix-blend-difference opacity-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CustomCursor;
