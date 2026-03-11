import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const images = [
  "https://images.pexels.com/photos/3912572/pexels-photo-3912572.jpeg",
  "https://images.pexels.com/photos/32427370/pexels-photo-32427370.jpeg",
  "https://images.pexels.com/photos/8686319/pexels-photo-8686319.jpeg",
  "https://images.pexels.com/photos/6648493/pexels-photo-6648493.jpeg",
  "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFrZXVwfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1611826585949-b0ccabd2c1a4?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1ha2V1cHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.pexels.com/photos/7290089/pexels-photo-7290089.jpeg",
  "https://images.unsplash.com/photo-1744095407400-aa337918bbb1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1ha2V1cCUyMHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D"
];

// 1. Grid Formation (with clear spaces)
const gridPositions = [
  { x: "-30vw", y: "-25vh" },
  { x: "-10vw", y: "-25vh" },
  { x: "10vw", y: "-25vh" },
  { x: "30vw", y: "-25vh" },
  { x: "-30vw", y: "25vh" },
  { x: "-10vw", y: "25vh" },
  { x: "10vw", y: "25vh" },
  { x: "30vw", y: "25vh" },
];

// 2. Scattered Formation
const scatteredPositions = [
  { x: "-35vw", y: "-30vh", r: -15 },
  { x: "20vw", y: "-35vh", r: 20 },
  { x: "-25vw", y: "25vh", r: 10 },
  { x: "35vw", y: "20vh", r: -25 },
  { x: "-5vw", y: "-40vh", r: 5 },
  { x: "5vw", y: "35vh", r: -10 },
  { x: "-40vw", y: "0vh", r: 30 },
  { x: "40vw", y: "-5vh", r: -15 },
];

// 3. Circle Formation
const circleRadiusX = 30; // vw
const circleRadiusY = 35; // vh
const circlePositions = images.map((_, i) => {
  const angle = (i * 45 * Math.PI) / 180;
  return {
    x: `${Math.cos(angle) * circleRadiusX}vw`,
    y: `${Math.sin(angle) * circleRadiusY}vh`,
    r: i * 45 + 90
  };
});

// 4. Stack Formation
const stackPositions = images.map((_, i) => ({
  x: `${(i - 3.5) * 2}vw`,
  y: `${(i - 3.5) * 2}vh`,
  r: (i - 3.5) * 4
}));

function FormationImage({ src, index, scrollYProgress }: { src: string, index: number, scrollYProgress: any }) {
  const x = useTransform(
    scrollYProgress,
    [0, 0.14, 0.29, 0.43, 0.57, 0.71, 0.86, 1],
    [
      gridPositions[index].x, gridPositions[index].x,
      scatteredPositions[index].x, scatteredPositions[index].x,
      circlePositions[index].x, circlePositions[index].x,
      stackPositions[index].x, stackPositions[index].x
    ]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.14, 0.29, 0.43, 0.57, 0.71, 0.86, 1],
    [
      gridPositions[index].y, gridPositions[index].y,
      scatteredPositions[index].y, scatteredPositions[index].y,
      circlePositions[index].y, circlePositions[index].y,
      stackPositions[index].y, stackPositions[index].y
    ]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.14, 0.29, 0.43, 0.57, 0.71, 0.86, 1],
    [
      0, 0,
      scatteredPositions[index].r, scatteredPositions[index].r,
      circlePositions[index].r, circlePositions[index].r,
      stackPositions[index].r, stackPositions[index].r
    ]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.14, 0.29, 0.43, 0.57, 0.71, 0.86, 1],
    [
      1, 1,
      1.2, 1.2,
      0.9, 0.9,
      1.4, 1.4
    ]
  );

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-[20vw] md:w-[15vw] max-w-[200px] aspect-[3/4] -ml-[10vw] md:-ml-[7.5vw] -mt-[13.3vw] md:-mt-[10vw] rounded-xl overflow-hidden shadow-2xl"
      style={{ x, y, rotate, scale }}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
    </motion.div>
  );
}

export default function LayoutFormations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative bg-stone-950 text-stone-200">
      {/* Sticky Images Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0">
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((src, i) => (
            <FormationImage key={i} src={src} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>

      {/* Scrolling Text Sections with clear divisions */}
      <div className="relative z-10 -mt-[100vh]">
        <section className="h-screen flex flex-col items-center justify-center px-6 text-center bg-stone-950/70 backdrop-blur-md border-y border-white/5">
          <h2 className="text-5xl md:text-8xl font-serif mb-6 drop-shadow-2xl">The Collection</h2>
          <p className="max-w-md text-stone-300 tracking-widest uppercase text-sm drop-shadow-md">
            A curated selection of our finest work, showcasing versatility and precision.
          </p>
        </section>
        <div className="h-screen pointer-events-none" />
        
        <section className="h-screen flex flex-col items-center justify-center px-6 text-center bg-stone-950/70 backdrop-blur-md border-y border-white/5">
          <h2 className="text-5xl md:text-8xl font-serif mb-6 drop-shadow-2xl">Artistry</h2>
          <p className="max-w-md text-stone-300 tracking-widest uppercase text-sm drop-shadow-md">
            Every face is a unique canvas. We bring out the natural beauty in everyone.
          </p>
        </section>
        <div className="h-screen pointer-events-none" />
        
        <section className="h-screen flex flex-col items-center justify-center px-6 text-center bg-stone-950/70 backdrop-blur-md border-y border-white/5">
          <h2 className="text-5xl md:text-8xl font-serif mb-6 drop-shadow-2xl">Perfection</h2>
          <p className="max-w-md text-stone-300 tracking-widest uppercase text-sm drop-shadow-md">
            Flawless execution from every angle, ensuring you look stunning in any light.
          </p>
        </section>
        <div className="h-screen pointer-events-none" />
        
        <section className="h-screen flex flex-col items-center justify-center px-6 text-center bg-stone-950/70 backdrop-blur-md border-y border-white/5">
          <h2 className="text-5xl md:text-8xl font-serif mb-6 drop-shadow-2xl">Transform</h2>
          <p className="max-w-md text-stone-300 tracking-widest uppercase text-sm drop-shadow-md">
            Step into a new version of yourself with our signature transformations.
          </p>
        </section>
      </div>
    </section>
  );
}
