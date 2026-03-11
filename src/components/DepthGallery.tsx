import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const images = [
  {
    src: "https://images.pexels.com/photos/3912572/pexels-photo-3912572.jpeg",
    x: "0%", y: "0%", z: 0,
    title: "Ethereal Glow"
  },
  {
    src: "https://images.pexels.com/photos/32427370/pexels-photo-32427370.jpeg",
    x: "15%", y: "-10%", z: -1500,
    title: "Bridal Radiance"
  },
  {
    src: "https://images.pexels.com/photos/8686319/pexels-photo-8686319.jpeg",
    x: "-15%", y: "10%", z: -3000,
    title: "Editorial Bold"
  },
  {
    src: "https://images.pexels.com/photos/6648493/pexels-photo-6648493.jpeg",
    x: "10%", y: "15%", z: -4500,
    title: "Evening Glamour"
  },
  {
    src: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFrZXVwfGVufDB8fDB8fHww",
    x: "-10%", y: "-15%", z: -6000,
    title: "Natural Beauty"
  }
];

export default function DepthGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // The camera moves forward in Z space from 0 to 7500
  const cameraZ = useTransform(scrollYProgress, [0, 1], [0, 7500]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-stone-950">
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center" 
        style={{ perspective: '1000px' }}
      >
        {/* Background color transition based on scroll */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            background: useTransform(
              scrollYProgress,
              [0, 0.25, 0.5, 0.75, 1],
              [
                "radial-gradient(circle at 50% 50%, #292524 0%, #0c0a09 100%)",
                "radial-gradient(circle at 50% 50%, #451a03 0%, #0c0a09 100%)",
                "radial-gradient(circle at 50% 50%, #172554 0%, #0c0a09 100%)",
                "radial-gradient(circle at 50% 50%, #3f2723 0%, #0c0a09 100%)",
                "radial-gradient(circle at 50% 50%, #292524 0%, #0c0a09 100%)"
              ]
            )
          }}
        />

        <motion.div 
          className="relative w-full h-full z-10 flex items-center justify-center"
          style={{ 
            transformStyle: 'preserve-3d',
            z: cameraZ
          }}
        >
          {images.map((img, i) => {
            // Calculate distance relative to the camera
            const distance = useTransform(cameraZ, z => z + img.z);
            
            // Opacity logic:
            // Fades in from far away (-3000 to -1500)
            // Fully visible (-1500 to 0)
            // Fades out as it passes the camera (0 to 800)
            const opacity = useTransform(
              distance,
              [-3000, -1500, 0, 800],
              [0, 1, 1, 0]
            );

            // Add a slight parallax effect to the images based on mouse movement
            // For simplicity in this DOM version, we rely on the scroll depth
            
            return (
              <motion.div
                key={i}
                className="absolute w-[80vw] md:w-[35vw] max-w-xl aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                style={{
                  x: img.x,
                  y: img.y,
                  z: img.z,
                  opacity,
                  transformStyle: 'preserve-3d'
                }}
              >
                <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl md:text-5xl font-serif">{img.title}</h3>
                  <p className="text-sm tracking-widest uppercase mt-2 opacity-80">Look 0{i + 1}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Overlay text */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 tracking-widest uppercase text-xs z-20 pointer-events-none flex flex-col items-center gap-2">
          <span>Keep Scrolling</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-[1px] h-8 bg-white/50"
          />
        </div>
      </div>
    </div>
  );
}
