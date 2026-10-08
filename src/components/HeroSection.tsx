import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, useAspect } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

const TEXTUREMAP = { src: "https://i.postimg.cc/XYwvXN8D/img-4.png" };
const DEPTHMAP = { src: "https://i.postimg.cc/2SHKQh2q/raw-4.webp" };

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
  const meshRef = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) {
      setVisible(true);
    }
  }, [rawMap, depthMap]);

  const material = useMemo(() => {
    // Custom shader material with red scanning effect
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: rawMap },
        uDepthMap: { value: depthMap },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uOpacity: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform sampler2D uDepthMap;
        uniform vec2 uPointer;
        uniform float uProgress;
        uniform float uTime;
        uniform float uOpacity;
        varying vec2 vUv;

        // Cell noise function
        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        void main() {
          // Parallax effect with depth map
          float depth = texture2D(uDepthMap, vUv).r;
          vec2 parallaxOffset = uPointer * depth * 0.01;
          vec2 distortedUV = vUv + parallaxOffset;

          vec4 texColor = texture2D(uTexture, distortedUV);

          // Dot grid effect
          float aspect = ${WIDTH.toFixed(1)} / ${HEIGHT.toFixed(1)};
          vec2 tiledUv = vec2(vUv.x * aspect, vUv.y) * 120.0;
          vec2 cellUv = fract(tiledUv) * 2.0 - 1.0;
          float brightness = noise(floor(tiledUv) * 0.5);
          float dist = length(cellUv);
          float dotPattern = smoothstep(0.5, 0.49, dist) * brightness;

          // Scanning line effect
          float scanLine = abs(vUv.y - uProgress);
          float scanWidth = 0.05;
          float scanIntensity = smoothstep(scanWidth, 0.0, scanLine);

          // Red overlay with scanning effect
          vec3 redOverlay = vec3(1.0, 0.0, 0.0) * scanIntensity * 0.4;

          // Depth-based flow effect
          float flowMask = smoothstep(0.02, 0.0, abs(depth - uProgress));
          vec3 flowColor = vec3(10.0, 0.0, 0.0) * dotPattern * flowMask;

          // Combine all effects
          vec3 finalColor = texColor.rgb + redOverlay + flowColor * 0.1;

          gl_FragColor = vec4(finalColor, texColor.a * uOpacity);
        }
      `,
      transparent: true,
    });
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock, pointer }) => {
    if (meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;

      // Animate scanning progress
      mat.uniforms.uProgress.value = (Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
      mat.uniforms.uTime.value = clock.getElapsedTime();
      mat.uniforms.uPointer.value.set(pointer.x, pointer.y);

      // Smooth fade in
      mat.uniforms.uOpacity.value = THREE.MathUtils.lerp(
        mat.uniforms.uOpacity.value,
        visible ? 1 : 0,
        0.07
      );
    }
  });

  const scaleFactor = 0.40;
  return (
    <mesh
      ref={meshRef}
      scale={[w * scaleFactor, h * scaleFactor, 1]}
      material={material}
    >
      <planeGeometry />
    </mesh>
  );
};

export const HeroSection = () => {
  const titleWords = "Innovate With GDG VITM".split(" ");
  const subtitle = "Empowering developers, building the future together.";
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);

  useEffect(() => {
    setDelays(titleWords.map(() => Math.random() * 0.07));
    setSubtitleDelay(Math.random() * 0.1);
  }, [titleWords.length]);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  return (
    <div className="h-screen relative overflow-hidden bg-background">
      <div className="h-screen uppercase items-center w-full absolute z-10 pointer-events-none px-10 flex justify-center flex-col mt-72">
        <div className="google-heading-1 text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold">
          <div className="flex space-x-2 lg:space-x-6 overflow-hidden text-foreground">
            {titleWords.map((word, index) => (
              <div
                key={index}
                className={index < visibleWords ? "fade-in" : ""}
                style={{
                  animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                  opacity: index < visibleWords ? undefined : 0,
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
        <div className="google-heading-3 text-xs md:text-xl xl:text-2xl 2xl:text-3xl mt-2 overflow-hidden text-foreground font-bold">
          <div
            className={subtitleVisible ? "fade-in-subtitle" : ""}
            style={{
              animationDelay: `${
                titleWords.length * 0.13 + 0.2 + subtitleDelay
              }s`,
              opacity: subtitleVisible ? undefined : 0,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>

      <Canvas className="absolute inset-0 -translate-y-16">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Scene />
      </Canvas>
    </div>
  );
};
