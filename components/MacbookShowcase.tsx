
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Monitor, Smartphone, Cpu, ShieldCheck } from 'lucide-react';

export const MacbookShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0.1, 0.4], [-90, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1.2]);
  const translateY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  return (
    <section ref={containerRef} className="min-h-[150vh] bg-[#0a0a0a] flex flex-col items-center justify-start py-40 overflow-hidden">
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]) }}
        className="text-center mb-20 px-6"
      >
        <h2 className="text-5xl md:text-7xl font-black text-white mb-6">UNMATCHED POWER</h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto uppercase tracking-widest">Performance meets aesthetics in every line of code.</p>
      </motion.div>

      <div className="relative [perspective:1000px] w-full flex justify-center">
        <motion.div
          style={{ 
            rotateX,
            scale,
            y: translateY,
            transformStyle: "preserve-3d"
          }}
          className="relative w-[300px] md:w-[600px] aspect-video bg-[#272729] rounded-t-xl border-4 border-[#171717] overflow-hidden"
        >
          {/* Mock Screen Content */}
          <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center relative">
             <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover" />
             <div className="relative z-10 text-center">
                <Cpu size={48} className="text-[#ff006e] mx-auto mb-4 animate-pulse" />
                <h4 className="text-white font-bold">SYSTEM ACTIVE</h4>
                <div className="flex gap-2 mt-4 justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-50" />
                </div>
             </div>
          </div>
        </motion.div>

        {/* Laptop Base (static) */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] md:w-[680px] h-4 bg-[#171717] rounded-b-xl border-b-4 border-gray-800 shadow-2xl" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-60 max-w-6xl w-full px-6">
          {[
            { icon: Monitor, label: "4K Rendering" },
            { icon: Smartphone, label: "Responsive" },
            { icon: Cpu, label: "60 FPS" },
            { icon: ShieldCheck, label: "Secure" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center p-8 bg-white/5 rounded-3xl border border-white/10"
            >
              <item.icon size={32} className="text-[#00f5ff] mb-4" />
              <span className="text-white font-bold uppercase text-xs tracking-tighter">{item.label}</span>
            </motion.div>
          ))}
      </div>
    </section>
  );
};
