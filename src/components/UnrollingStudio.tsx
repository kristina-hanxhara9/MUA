import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll } from 'motion/react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
uniform float progress;
uniform float angle;
varying vec2 vUv;
varying float vFrontShadow;

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}
vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

void main() {
  vUv = uv;
  float pi = 3.14159265359;
  float finalAngle = angle;

  vec3 newposition = position;
  float rad = 0.1;
  float rolls = 8.;

  // rot
  newposition = rotate(newposition - vec3(-.5,.5,0.), vec3(0.,0.,1.),-finalAngle) + vec3(-.5,.5,0.);

  float offs = (newposition.x + 0.5)/(sin(finalAngle) + cos(finalAngle)) ; // -0.5..0.5 -> 0..1
  float tProgress = clamp( (progress - offs*0.99)/0.01 , 0.,1.);

  // shadows
  vFrontShadow = clamp((progress - offs*0.95)/0.05,0.7,1.);

  newposition.z =  rad + rad*(1. - offs/2.)*sin(-offs*rolls*pi - 0.5*pi);
  newposition.x =  - 0.5 + rad*(1. - offs/2.)*cos(-offs*rolls*pi + 0.5*pi);
  
  // rot back
  newposition = rotate(newposition - vec3(-.5,.5,0.), vec3(0.,0.,1.),finalAngle) + vec3(-.5,.5,0.);
  
  // unroll
  newposition = rotate(newposition - vec3(-.5,0.5,rad), vec3(sin(finalAngle),cos(finalAngle),0.), -pi*progress*rolls);
  newposition +=  vec3(
    -.5 + progress*cos(finalAngle)*(sin(finalAngle) + cos(finalAngle)), 
    0.5 - progress*sin(finalAngle)*(sin(finalAngle) + cos(finalAngle)),
    rad*(1.-progress/2.)
  );

  // animation
  vec3 finalposition = mix(newposition,position,tProgress);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalposition, 1.0 );
}
`;

const fragmentShader = `
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;

varying vec2 vUv;
varying float vFrontShadow;

void main() {
	vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
	gl_FragColor = texture2D(texture1, newUV);
    gl_FragColor.rgb *= vFrontShadow;
    gl_FragColor.a = clamp(progress*5., 0., 1.);
}
`;

function UnrollingImage({ url, scrollProgress, start, end, position, scaleMultiplier = 1 }: any) {
  const texture = useTexture(url);
  const { viewport } = useThree();
  
  const imageAspect = texture.image.height / texture.image.width;
  
  // Base dimensions
  const baseWidth = viewport.width * 0.4 * scaleMultiplier;
  const baseHeight = viewport.height * 0.6 * scaleMultiplier;
  
  let a1, a2;
  if (baseHeight / baseWidth > imageAspect) {
    a1 = (baseWidth / baseHeight) * imageAspect;
    a2 = 1;
  } else {
    a1 = 1;
    a2 = baseHeight / baseWidth / imageAspect;
  }

  const uniforms = useMemo(() => ({
    progress: { value: 0 },
    angle: { value: 0.3 },
    texture1: { value: texture },
    resolution: { value: new THREE.Vector4(baseWidth, baseHeight, a1, a2) }
  }), [texture, baseWidth, baseHeight, a1, a2]);

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(() => {
    if (materialRef.current) {
      let p = (scrollProgress.get() - start) / (end - start);
      p = Math.max(0, Math.min(1, p));
      materialRef.current.uniforms.progress.value = p;
    }
  });

  return (
    <group position={position}>
      <mesh scale={[baseWidth, baseHeight, baseWidth / 2]}>
        <planeGeometry args={[1, 1, 80, 80]} />
        <shaderMaterial 
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

const images = [
  {
    url: "https://images.unsplash.com/photo-1744095407400-aa337918bbb1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1ha2V1cCUyMHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Elegant Atmosphere",
    desc: "A relaxing environment for your transformation."
  },
  {
    url: "https://images.pexels.com/photos/7290089/pexels-photo-7290089.jpeg",
    title: "Professional Setup",
    desc: "Everything needed for a flawless look."
  }
];

function SceneContent({ scrollYProgress }: any) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  const pos1 = isMobile ? [0, viewport.height * 0.25, 0] : [-viewport.width * 0.25, 0, 0];
  const pos2 = isMobile ? [0, -viewport.height * 0.05, 0] : [viewport.width * 0.25, -viewport.height * 0.1, 0];

  const scale1 = isMobile ? 1.8 : 1.2;
  const scale2 = isMobile ? 1.8 : 1.0;

  return (
    <Suspense fallback={null}>
      <UnrollingImage 
        url={images[0].url} 
        scrollProgress={scrollYProgress} 
        start={0.1} 
        end={0.4} 
        position={pos1} 
        scaleMultiplier={scale1}
      />
      <UnrollingImage 
        url={images[1].url} 
        scrollProgress={scrollYProgress} 
        start={0.3} 
        end={0.6} 
        position={pos2} 
        scaleMultiplier={scale2}
      />
    </Suspense>
  );
}

export default function UnrollingStudio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-stone-100 w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} frameloop="always">
            <SceneContent scrollYProgress={scrollYProgress} />
          </Canvas>
        </div>

        <div className="relative z-10 pointer-events-none w-full max-w-7xl mx-auto px-6 flex flex-col justify-end md:justify-center h-full pb-12 md:pb-0">
          <div className="bg-white/80 backdrop-blur-md p-6 md:p-12 rounded-3xl max-w-md shadow-2xl pointer-events-auto mx-auto md:mx-0 md:ml-auto">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-stone-900">Our Studio</h2>
            <p className="text-stone-500 tracking-widest uppercase text-sm mb-8 leading-relaxed">
              A relaxing environment for your transformation. Step into a space designed for beauty and comfort.
            </p>
            <div className="space-y-6">
              {images.map((img, idx) => (
                <div key={idx} className="border-l-2 border-stone-200 pl-4">
                  <h3 className="text-lg font-serif text-stone-900">{img.title}</h3>
                  <p className="text-sm text-stone-500">{img.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
