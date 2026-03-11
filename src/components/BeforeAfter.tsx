import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const lineLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-stone-900">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 md:px-12">
        
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">The Transformation</h2>
          <p className="text-stone-400 tracking-widest uppercase text-sm">Scroll to reveal</p>
        </div>

        <div className="relative w-full max-w-6xl aspect-[4/5] md:aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl">
          {/* Before Image (Grayscale/Muted) */}
          <img
            src="https://images.unsplash.com/photo-1611826585949-b0ccabd2c1a4?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1ha2V1cHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-75 brightness-110"
          />
          
          {/* After Image (Color) */}
          <motion.img
            style={{ clipPath }}
            src="https://images.unsplash.com/photo-1611826585949-b0ccabd2c1a4?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1ha2V1cHxlbnwwfHwwfHx8MA%3D%3D"
            alt="After"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Slider Line */}
          <motion.div 
            className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            style={{ 
              left: lineLeft,
              x: "-50%"
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl">
              <div className="flex gap-1 text-stone-900">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m15 18-6-6 6-6"/></svg>
              </div>
            </div>
          </motion.div>

          {/* Labels */}
          <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs tracking-widest uppercase z-0">
            Before
          </div>
          <motion.div 
            className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-stone-900 px-4 py-2 rounded-full text-xs tracking-widest uppercase z-20"
            style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1]) }}
          >
            After
          </motion.div>
        </div>
      </div>
    </div>
  );
}
