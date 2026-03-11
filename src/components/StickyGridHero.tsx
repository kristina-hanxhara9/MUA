import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const images = [
  "https://images.pexels.com/photos/3912572/pexels-photo-3912572.jpeg",
  "https://images.pexels.com/photos/32427370/pexels-photo-32427370.jpeg",
  "https://images.pexels.com/photos/8686319/pexels-photo-8686319.jpeg",
  "https://images.pexels.com/photos/6648493/pexels-photo-6648493.jpeg",
  "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFrZXVwfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1611826585949-b0ccabd2c1a4?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1ha2V1cHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.pexels.com/photos/3912572/pexels-photo-3912572.jpeg",
  "https://images.pexels.com/photos/32427370/pexels-photo-32427370.jpeg",
  "https://images.pexels.com/photos/8686319/pexels-photo-8686319.jpeg",
  "https://images.pexels.com/photos/6648493/pexels-photo-6648493.jpeg",
  "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFrZXVwfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1611826585949-b0ccabd2c1a4?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1ha2V1cHxlbnwwfHwwfHx8MA%3D%3D"
];

export default function StickyGridHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Grid Reveal (0 to 0.3)
  const col1Y = useTransform(scrollYProgress, [0, 0.3], ["-100vh", "0vh"]);
  const col2Y = useTransform(scrollYProgress, [0, 0.3], ["100vh", "0vh"]);
  const col3Y = useTransform(scrollYProgress, [0, 0.3], ["-100vh", "0vh"]);

  // Grid Zoom (0.4 to 0.8)
  const gridScale = useTransform(scrollYProgress, [0.4, 0.8], [1, 2.05]);
  const col1X = useTransform(scrollYProgress, [0.4, 0.8], ["0%", "-40%"]);
  const col3X = useTransform(scrollYProgress, [0.4, 0.8], ["0%", "40%"]);
  
  // Center column items vertical spread during zoom
  const centerItemTopY = useTransform(scrollYProgress, [0.4, 0.8], ["0%", "-40%"]);
  const centerItemBottomY = useTransform(scrollYProgress, [0.4, 0.8], ["0%", "40%"]);

  // Content Toggle (0.6 to 0.9)
  // Title starts vertically centered, then moves up
  const titleY = useTransform(scrollYProgress, [0.6, 0.9], ["25vh", "0vh"]);
  const contentOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

  // Split images into 3 columns
  const col1 = images.slice(0, 4);
  const col2 = images.slice(4, 8);
  const col3 = images.slice(8, 12);

  return (
    <>
      {/* Intro Section (Hero) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={images[0]} 
            alt="Makeup Hero" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-stone-900/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif mb-6"
          >
            enxhithemuaa
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl tracking-widest uppercase font-light max-w-2xl mx-auto flex flex-col gap-2"
          >
            <span>Make-up artist</span>
            <span className="text-sm md:text-base normal-case tracking-normal">📍London Pro Makeup & Hair Artist | Bridal</span>
          </motion.div>
        </div>
      </section>

      {/* Sticky Grid Section */}
      <section ref={containerRef} className="relative h-[400vh] bg-stone-950">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
          
          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center pointer-events-none">
            <motion.div 
              className="w-full max-w-5xl px-6 flex flex-col items-center text-center"
              style={{ y: titleY, marginTop: "15vh" }}
            >
              <h2 className="text-5xl md:text-8xl font-serif text-white leading-tight tracking-tight drop-shadow-2xl">
                enxhithemuaa
              </h2>
              
              <motion.div 
                style={{ opacity: contentOpacity }}
                className="mt-8 flex flex-col items-center pointer-events-auto"
              >
                <p className="text-stone-300 text-lg md:text-xl max-w-lg uppercase tracking-widest leading-relaxed drop-shadow-lg">
                </p>
                <button className="mt-12 bg-white text-stone-900 px-8 py-4 rounded-full uppercase tracking-widest text-sm hover:bg-stone-200 transition-colors">
                  Discover More
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Grid */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <motion.div 
              className="w-[800px] max-w-[90vw] grid grid-cols-3 gap-4 md:gap-8"
              style={{ scale: gridScale }}
            >
              {/* Column 1 */}
              <motion.div className="flex flex-col gap-4 md:gap-8" style={{ y: col1Y, x: col1X }}>
                {col1.map((src, i) => (
                  <div key={i} className="w-full aspect-square rounded-xl overflow-hidden shadow-2xl">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </motion.div>

              {/* Column 2 */}
              <motion.div className="flex flex-col gap-4 md:gap-8" style={{ y: col2Y }}>
                {col2.map((src, i) => (
                  <motion.div 
                    key={i} 
                    className="w-full aspect-square rounded-xl overflow-hidden shadow-2xl"
                    style={{ y: i < 2 ? centerItemTopY : centerItemBottomY }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Column 3 */}
              <motion.div className="flex flex-col gap-4 md:gap-8" style={{ y: col3Y, x: col3X }}>
                {col3.map((src, i) => (
                  <div key={i} className="w-full aspect-square rounded-xl overflow-hidden shadow-2xl">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          {/* Dark gradient overlay to ensure text readability */}
          <div className="absolute inset-0 z-15 bg-gradient-to-b from-stone-950/80 via-transparent to-stone-950/80 pointer-events-none" />

        </div>
      </section>
    </>
  );
}
