import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const cn = (...classes: (string | undefined | boolean)[]) => classes.filter(Boolean).join(" ");

interface MacbookScrollProps {
  src?: string;
  showGradient?: boolean;
  title?: string;
}

export const MacbookShowcase = () => {
  return (
    <section className="w-full bg-[#0a0a0a] overflow-hidden">
      <MacbookScroll
        title="Unmatched Performance. Engineered for Sensation."
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
      />
    </section>
  );
};

export const MacbookScroll: React.FC<MacbookScrollProps> = ({
  src,
  showGradient = true,
  title,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scaleX = useTransform(scrollYProgress, [0.1, 0.4], [1.2, isMobile ? 1 : 1.5]);
  const scaleY = useTransform(scrollYProgress, [0.1, 0.4], [0.6, isMobile ? 1 : 1.5]);
  const translate = useTransform(scrollYProgress, [0.4, 0.8], [0, 800]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.4], [-90, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div
      ref={ref}
      className="flex min-h-[160vh] flex-col items-center justify-start py-40 md:py-80 [perspective:1200px]"
    >
      <motion.h2
        style={{ opacity: textOpacity }}
        className="mb-32 text-center text-4xl md:text-6xl font-black text-white tracking-tighter px-4"
      >
        {title}
      </motion.h2>

      <div className="relative scale-50 sm:scale-75 md:scale-100 lg:scale-110 xl:scale-125">
        <Lid
          src={src}
          scaleX={scaleX}
          scaleY={scaleY}
          rotate={rotate}
          translate={translate}
        />
        
        <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-[#272729] shadow-2xl ring-1 ring-white/10">
          <div className="relative h-10 w-full">
            <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505] rounded-b-xl" />
          </div>
          <div className="relative flex">
            <div className="mx-auto h-full w-[10%] overflow-hidden">
              <SpeakerGrid />
            </div>
            <div className="mx-auto h-full w-[80%]">
              <Keypad />
            </div>
            <div className="mx-auto h-full w-[10%] overflow-hidden">
              <SpeakerGrid />
            </div>
          </div>
          <Trackpad />
          {showGradient && (
            <div className="absolute inset-x-0 bottom-0 z-50 h-32 w-full bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
}: {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  src?: string;
}) => {
  return (
    <div className="relative [perspective:1200px]">
      <div
        style={{
          transform: "perspective(1200px) rotateX(-25deg)",
          transformOrigin: "bottom",
        }}
        className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101] ring-1 ring-white/5" />
      </div>

      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformOrigin: "top",
        }}
        className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2 z-20 shadow-2xl"
      >
        <div className="absolute inset-0 rounded-lg bg-[#171717] ring-1 ring-white/10" />
        <img
          src={src}
          alt="screen"
          className="absolute inset-0 h-full w-full rounded-lg object-cover"
        />
      </motion.div>
    </div>
  );
};

export const Trackpad = () => (
  <div className="mx-auto my-2 h-32 w-[45%] rounded-2xl bg-black/20 ring-1 ring-white/5 shadow-inner" />
);

export const KBtn: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("h-5 w-5 rounded-[4px] bg-[#0A090D] ring-1 ring-white/10 shadow-sm", className)} />
);

export const Keypad = () => {
  const rows = [1, 2, 3, 4, 5];
  return (
    <div className="mx-1 h-full rounded-md bg-[#050505] p-2 flex flex-col gap-1">
      {rows.map((row) => (
        <div key={`mac-row-${row}`} className="flex w-full gap-1">
          {Array.from({ length: row === 1 ? 14 : row === 5 ? 12 : 13 }).map((_, i) => (
            <KBtn 
              key={`mac-key-${row}-${i}`} 
              className={cn(row === 1 && i === 0 && "w-10", (row === 2 && i === 13) && "w-10")} 
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const SpeakerGrid = () => (
  <div className="mt-4 flex h-40 w-full opacity-20" style={{ backgroundImage: "radial-gradient(circle, #fff 0.5px, transparent 0.5px)", backgroundSize: "4px 4px" }} />
);

export default MacbookShowcase;