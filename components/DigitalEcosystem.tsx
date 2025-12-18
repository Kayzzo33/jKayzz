
import React from "react";
import { motion } from "framer-motion";

const cn = (...classes: (string | undefined | boolean)[]) => classes.filter(Boolean).join(" ");

const images = [
  "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
  "https://assets.aceternity.com/animated-modal.png",
  "https://assets.aceternity.com/animated-testimonials.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
  "https://assets.aceternity.com/github-globe.png",
  "https://assets.aceternity.com/glare-card.png",
  "https://assets.aceternity.com/layout-grid.png",
  "https://assets.aceternity.com/flip-text.png",
  "https://assets.aceternity.com/hero-highlight.png",
  "https://assets.aceternity.com/carousel.webp",
  "https://assets.aceternity.com/placeholders-and-vanish-input.png",
  "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
  "https://assets.aceternity.com/signup-form.png",
  "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
  "https://assets.aceternity.com/spotlight-new.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
  "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
  "https://assets.aceternity.com/tabs.png",
  "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
  "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
  "https://assets.aceternity.com/glowing-effect.webp",
  "https://assets.aceternity.com/hover-border-gradient.png",
  "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
  "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
  "https://assets.aceternity.com/macbook-scroll.png",
  "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
  "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
  "https://assets.aceternity.com/multi-step-loader.png",
  "https://assets.aceternity.com/vortex.png",
  "https://assets.aceternity.com/wobble-card.png",
  "https://assets.aceternity.com/world-map.webp",
];

const GridLineHorizontal = ({ className, offset }: { className?: string; offset?: string }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(255, 255, 255, 0.15)",
        "--height": "1px",
        "--width": "4px",
        "--fade-stop": "85%",
        "--offset": offset || "200px",
        maskComposite: "exclude",
      } as React.CSSProperties}
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "z-30 opacity-50",
        className
      )}
    ></div>
  );
};

const GridLineVertical = ({ className, offset }: { className?: string; offset?: string }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(255, 255, 255, 0.15)",
        "--height": "4px",
        "--width": "1px",
        "--fade-stop": "85%",
        "--offset": offset || "150px",
        maskComposite: "exclude",
      } as React.CSSProperties}
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "z-30 opacity-50",
        className
      )}
    ></div>
  );
};

export const DigitalEcosystem: React.FC = () => {
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <section className="relative min-h-[90vh] bg-[#0a0a0a] overflow-hidden py-32 flex flex-col justify-center">
      {/* Asymmetric Side Header */}
      <div className="absolute left-10 md:left-20 top-20 z-40 max-w-sm pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase italic">
          VISUAL <br /> <span className="text-[#ff006e]">ARCHIVE</span>
        </h2>
        <div className="w-20 h-1 bg-[#00f5ff] mt-6" />
        <p className="mt-8 text-xs font-bold text-gray-500 uppercase tracking-[0.3em] leading-relaxed">
          A living ecosystem of modular components designed for maximum impact and fluid performance.
        </p>
      </div>

      {/* Main Isometric Grid Area */}
      <div className="relative w-full h-[600px] flex items-center justify-center">
        <div className="relative size-[1600px] shrink-0 scale-50 md:scale-75 lg:scale-100 flex items-center justify-center translate-x-[15%] md:translate-x-[10%]">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative grid grid-cols-4 gap-12 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 80 : -80 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 18 : 24,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                key={colIndex + "col"}
                className="flex flex-col items-start gap-12"
              >
                <GridLineVertical className="-left-6" offset="100px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-6" offset="30px" />
                    <motion.div
                      whileHover={{
                        z: 50,
                        scale: 1.08,
                      }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                      className="relative z-10 group cursor-none"
                    >
                      <img
                        src={image}
                        alt={`Tech ${imageIndex + 1}`}
                        className="aspect-[970/700] w-[300px] md:w-[400px] rounded-xl object-cover ring-1 ring-white/10 group-hover:ring-[#ff006e]/50 shadow-2xl transition-all"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#ff006e]/0 to-transparent group-hover:from-[#ff006e]/20 transition-all rounded-xl" />
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Background Detail */}
      <div className="absolute right-0 bottom-0 w-1/3 h-1/2 bg-gradient-to-tl from-[#00f5ff]/5 to-transparent pointer-events-none blur-3xl" />
    </section>
  );
};
