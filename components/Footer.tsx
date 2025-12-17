
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const FooterLink = ({ title, sub, img, href }: { title: string, sub: string, img: string, href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [-0.5, 0.5], ["35%", "65%"]);
  const left = useTransform(mouseXSpring, [-0.5, 0.5], ["65%", "35%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-white/10 py-10 md:py-16 transition-colors hover:border-white"
    >
      <div className="z-10">
        <h3 className="text-5xl md:text-8xl font-black text-white/30 group-hover:text-white transition-colors uppercase italic">
            {title}
        </h3>
        <p className="text-[#ff006e] font-bold tracking-widest mt-2">{sub}</p>
      </div>

      <motion.img
        style={{ top, left, translateX: "-50%", translateY: "-50%" }}
        variants={{
          initial: { scale: 0, rotate: "-15deg", opacity: 0 },
          whileHover: { scale: 1, rotate: "5deg", opacity: 1 },
        }}
        src={img}
        className="absolute z-0 w-48 md:w-80 aspect-video object-cover rounded-xl pointer-events-none"
      />

      <ArrowUpRight size={64} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.a>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] pt-40 pb-20 px-6">
      <div className="container mx-auto">
        <p className="text-xs font-bold text-gray-500 tracking-[0.4em] uppercase mb-10">Get in Touch</p>
        
        <div className="flex flex-col">
          <FooterLink 
            title="Projects" 
            sub="See what we've built" 
            img="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564" 
            href="#" 
          />
          <FooterLink 
            title="Studio" 
            sub="Our process & culture" 
            img="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669" 
            href="#" 
          />
          <FooterLink 
            title="Contact" 
            sub="Start a conversation" 
            img="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670" 
            href="#" 
          />
        </div>

        <div className="mt-40 flex flex-col md:flex-row justify-between items-end border-t border-white/5 pt-10">
          <div>
            <h4 className="text-4xl font-black text-white mb-6">MOTION<br/>SHOWCASE</h4>
            <div className="flex gap-4">
                <Twitter className="text-white/40 hover:text-[#00f5ff] cursor-pointer" />
                <Github className="text-white/40 hover:text-[#ff006e] cursor-pointer" />
                <Linkedin className="text-white/40 hover:text-white cursor-pointer" />
                <Instagram className="text-white/40 hover:text-white cursor-pointer" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">© 2024 All Rights Reserved</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">Designed for the future</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
