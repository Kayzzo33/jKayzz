
import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';
import { StackedCardData } from '../types';

const cards: StackedCardData[] = [
  { id: 1, title: 'Bespoke Design', content: 'Crafted with precision, every pixel matters to us. We don\'t do generic.', color: '#0a0a0a' },
  { id: 2, title: 'Infinite Performance', content: 'Smooth 60fps animations that never stutter. Built for the modern web.', color: '#1a1a2e' },
  { id: 3, title: 'Strategic Motion', content: 'Animation with purpose. We guide users through experiences meaningfully.', color: '#ff006e' },
  { id: 4, title: 'Global Connectivity', content: 'Accessible and responsive across all devices, from mobile to 4K displays.', color: '#00f5ff' },
];

const StackedCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElements = gsap.utils.toArray<HTMLElement>('.stacked-card');
    
    cardElements.forEach((card, i) => {
        if (i === cardElements.length - 1) return;

        ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            pin: true,
            pinSpacing: false,
            endTrigger: containerRef.current,
            end: 'bottom bottom',
            onUpdate: (self) => {
                const scale = 1 - (self.progress * 0.05);
                gsap.set(card, { scale: scale, opacity: 1 - self.progress * 0.5 });
            }
        });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section ref={containerRef} className="bg-[#0a0a0a] min-h-screen">
      <div className="container mx-auto px-6 pt-32 pb-10">
        <h2 className="text-5xl md:text-7xl font-black uppercase text-white mb-20 text-center">Core Pillars</h2>
      </div>
      
      <div className="flex flex-col items-center">
        {cards.map((card) => (
          <div 
            key={card.id} 
            className="stacked-card w-[90vw] md:w-[70vw] h-[60vh] rounded-[3rem] p-12 mb-10 sticky top-[10vh] border border-white/10 flex flex-col justify-between"
            style={{ backgroundColor: card.color, color: card.id === 4 ? '#0a0a0a' : 'white' }}
          >
            <div>
                <span className="text-xl font-bold opacity-40">0{card.id}</span>
                <h3 className="text-5xl md:text-7xl font-bold mt-4">{card.title}</h3>
            </div>
            <p className="text-xl md:text-3xl max-w-2xl font-light opacity-80 leading-relaxed">
                {card.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StackedCards;
