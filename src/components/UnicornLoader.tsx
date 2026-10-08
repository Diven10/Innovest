import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}

export const UnicornLoader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize UnicornStudio
    if (!window.UnicornStudio) {
      window.UnicornStudio = { 
        isInitialized: false,
        init: () => {}
      };
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.31/dist/unicornStudio.umd.js';
      script.onload = () => {
        if (!window.UnicornStudio?.isInitialized && window.UnicornStudio) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    }

    // GSAP animations
    const tl = gsap.timeline();
    
    // Initial state
    gsap.set(textRef.current, { opacity: 0, y: 50 });
    gsap.set(containerRef.current, { opacity: 0 });

    // Animation sequence
    tl.to(containerRef.current, { opacity: 1, duration: 0.5 })
      .to(textRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.3")
      .to(textRef.current, { 
        scale: 1.05, 
        duration: 0.5, 
        yoyo: true, 
        repeat: 1, 
        ease: "power2.inOut" 
      }, "+=0.5")
      .to([containerRef.current, textRef.current], { 
        opacity: 0, 
        duration: 0.8, 
        ease: "power2.inOut",
        onComplete: () => setTimeout(onComplete, 300)
      }, "+=1");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-background z-50 flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        {/* UnicornStudio Animation */}
        <div className="flex justify-center">
          <div 
            data-us-project="QMTelkWUKlxUm8qwPeP1" 
            style={{ width: '400px', height: '400px' }}
          />
        </div>
        
        {/* Loading Text */}
        <div ref={textRef} className="space-y-4">
          <div className="text-4xl font-bold">
            <span className="text-google-blue">G</span>
            <span className="text-google-red">D</span>
            <span className="text-google-yellow">G</span>
            <span className="text-foreground"> Recruitment</span>
          </div>
          <p className="text-muted-foreground">Initializing your experience...</p>
        </div>
      </div>
    </div>
  );
};