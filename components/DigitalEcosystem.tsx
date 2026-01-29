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

const GridLineHorizontal = ({ className, offset }: { className?: string; offset?: string }) => (
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
  />
);

const GridLineVertical = ({ className, offset }: { className?: string; offset?: string }) => (
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
  />
);

export const DigitalEcosystem: React.FC = () => {
  // 1. Massive vertical duplication to ensure top/bottom coverage during rotation
  const extendedImages = [...images, ...images, ...images, ...images, ...images, ...images];
  
  // 2. Increase to 7 COLUMNS.
  // The outer columns (1, 2, 6, 7) act as "fillers" for the corners of the screen.
  // The middle columns (3, 4, 5) are the visual center.
  const numCols = 7;
  const chunkSize = Math.ceil(extendedImages.length / numCols);
  const chunks = Array.from({ length: numCols }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return extendedImages.slice(start, start + chunkSize);
  });

  return (
    // Changed h-[140vh] to h-screen to fit exactly one viewport as requested
    <section className="relative h-screen bg-[#0a0a0a] overflow-hidden flex flex-col justify-center items-center">
      {/* Side Header */}
      <div className="absolute left-6 md:left-20 top-32 z-50 max-w-md pointer-events-none mix-blend-difference text-white">
        <h2 className="text-5xl md:text-8xl font-black leading-none tracking-tighter uppercase italic drop-shadow-2xl">
          VISUAL <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00f5ff]">ARCHIVE</span>
        </h2>
        <div className="w-32 h-2 bg-[#ff006e] mt-8 skew-x-12" />
        <p className="mt-8 text-sm md:text-base font-bold text-gray-200 uppercase tracking-[0.3em] leading-relaxed drop-shadow-md bg-black/50 backdrop-blur-sm inline-block p-2 rounded">
          A modular ecosystem of immersive interfaces.
        </p>
      </div>

      {/* Main Isometric Grid Area */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* 
            Container Strategy for "Corner Filling" + "Big Cards":
            1. w-[3400px]: We massively increase width to accommodate 7 columns.
               This ensures that even though we added columns, the individual cards stay BIG.
            2. h-[2500px]: Sufficient height for the diagonal.
            3. scale-[0.6] md:scale-[0.8]: Adjust scale slightly to fit the new massive width nicely.
        */}
        <div className="relative w-[3400px] h-[2500px] shrink-0 scale-[0.5] md:scale-[0.8] flex items-center justify-center transform-3d">
          <div
            style={{
              transform: "rotateX(50deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative grid grid-cols-7 gap-8 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 80 : -80 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 30 : 40, // Slower, smoother float
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                key={colIndex}
                className="flex flex-col items-center gap-8"
              >
                <GridLineVertical className="-left-4" offset="120px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={imageIndex}>
                    <GridLineHorizontal className="-top-4" offset="40px" />
                    <motion.div
                      whileHover={{ z: 20, scale: 1.05 }}
                      className="relative z-10 group rounded-xl overflow-hidden bg-[#111]"
                    >
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-20" />
                      <img
                        src={image}
                        alt="archive-item"
                        className="aspect-[16/10] w-[400px] object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 saturate-0 group-hover:saturate-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 ring-1 ring-white/10 group-hover:ring-[#ff006e] transition-all duration-500 z-30 pointer-events-none" />
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Heavy Vignette to seamlessly blend the edges if they do appear */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_30%,#0a0a0a_95%)]" />
    </section>
  );
};