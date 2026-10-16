import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const PremiumPreloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const brandName = "ENSUPRIME";

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('ensuprime_visited');
    const targetDuration = hasVisited ? 1100 : 2200; // Si ya visitó, versión acelerada

    let currentVal = 0;
    const intervalTime = 30;
    const stepIncrement = 100 / (targetDuration / intervalTime);

    const timer = setInterval(() => {
      currentVal += stepIncrement;
      if (currentVal >= 100) {
        currentVal = 100;
        clearInterval(timer);
        setProgress(100);
        triggerExitSequence();
      } else {
        setProgress(Math.floor(currentVal));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const triggerExitSequence = () => {
    sessionStorage.setItem('ensuprime_visited', 'true');
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
          onComplete();
        }
      });

      // 1. Separación tipográfica (tracking expand & stagger out)
      tl.to(lettersRef.current, {
        y: -40,
        opacity: 0,
        filter: 'blur(8px)',
        stagger: 0.03,
        duration: 0.6,
        ease: 'power3.inOut'
      }, "+=0.1");

      // 2. Línea roja y contador fade out
      tl.to([progressBarRef.current, counterRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      }, "<");

      // 3. Apertura de cortina doble vertical
      tl.to(leftCurtainRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: 'power4.inOut'
      }, "-=0.2");

      tl.to(rightCurtainRef.current, {
        yPercent: 100,
        duration: 0.85,
        ease: 'power4.inOut'
      }, "<");
    }, containerRef);

    return () => ctx.revert();
  };

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center overflow-hidden"
    >
      {/* Cortina Izquierda */}
      <div
        ref={leftCurtainRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#0A0A0A]"
      />
      {/* Cortina Derecha */}
      <div
        ref={rightCurtainRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#0A0A0A]"
      />

      {/* Ruido texturizado analógico */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#EDE8DF_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Contenido Central */}
      <div className="relative z-10 flex flex-col items-center select-none w-full max-w-4xl px-8">
        {/* Metadatos superiores */}
        <div className="w-full flex justify-between items-center text-[10px] tracking-[0.25em] font-mono-code text-[#6B6B6B] uppercase mb-12">
          <span>// BROADCAST FREQ: 98.4 MHZ</span>
          <span className="flex items-center gap-1.5 text-[#6E1FE8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6E1FE8]" />
            SYNCHRONIZING AUDIO FEED
          </span>
          <span>MADRID — 40°25'N</span>
        </div>

        {/* Monograma ENSUPRIME con máscara de corte */}
        <div className="overflow-hidden flex items-center justify-center py-2">
          <div className="flex tracking-[-0.04em]">
            {brandName.split("").map((letter, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  if (el) lettersRef.current[idx] = el;
                }}
                className="inline-block font-display text-5xl md:text-8xl lg:text-9xl font-bold text-[#EDE8DF] transition-transform duration-300"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Subtítulo técnico */}
        <p className="mt-4 text-xs md:text-sm tracking-[0.3em] font-mono-code text-[#6B6B6B] uppercase">
          URBAN CULTURE & AUDIO ARCHIVE · 24/7
        </p>

        {/* Barra de carga fina morada (#6E1FE8) */}
        <div className="w-full max-w-md h-[2px] bg-[#1C1C1C] mt-10 relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-[#6E1FE8] transition-all duration-75 ease-out shadow-[0_0_14px_rgba(110,31,232,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Contador numérico de 3 dígitos (000 → 100) */}
        <div className="w-full max-w-md flex justify-between items-center mt-3 text-xs font-mono-code text-[#6B6B6B]">
          <span ref={counterRef} className="text-[#EDE8DF] font-medium text-sm">
            {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : '100'}%
          </span>
          <span className="tracking-widest uppercase text-[10px]">
            {progress === 100 ? 'READY TO BROADCAST' : 'BUFFERING SYSTEM ASSETS'}
          </span>
        </div>
      </div>
    </div>
  );
};
