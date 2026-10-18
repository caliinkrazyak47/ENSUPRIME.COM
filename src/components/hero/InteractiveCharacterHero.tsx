import React, { useEffect, useRef, useState } from 'react';
import { SchemeNavbar } from '../layout/SchemeNavbar';

interface HeroProps {
  onWatchLive: () => void;
  isRadioPlaying?: boolean;
  onToggleRadio?: () => void;
}

const TOTAL_FRAMES = 49;
const CENTER_FRAME = 24;

export const InteractiveCharacterHero: React.FC<HeroProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(CENTER_FRAME);
  const targetFrameRef = useRef<number>(CENTER_FRAME);
  const rafIdRef = useRef<number | null>(null);

  const [timeData, setTimeData] = useState({
    hours: '21',
    minutes: '00',
    seconds: '00',
    cet: 'CET',
  });

  // Reloj de Madrid de alta precisión
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('es-ES', {
        timeZone: 'Europe/Madrid',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const parts = formatter.formatToParts(now);
      const h = parts.find((p) => p.type === 'hour')?.value || '21';
      const m = parts.find((p) => p.type === 'minute')?.value || '00';
      const s = parts.find((p) => p.type === 'second')?.value || '00';

      setTimeData({
        hours: h,
        minutes: m,
        seconds: s,
        cet: 'CET',
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pre-carga ultra-rápida de los 49 fotogramas del personaje con fondo transparente perfecto
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/character_sequence/char_${paddedIndex}.webp`;
      img.onload = () => {
        if (i === CENTER_FRAME && canvasRef.current) {
          renderFrame(CENTER_FRAME);
        }
      };
      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;
  }, []);

  // Render en Canvas con soporte Retina y centrado perfecto
  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    // Proporción armónica para la sección Hero 16:9
    // 68% de altura para dar máxima visibilidad y presencia a la tipografía monumental detrás
    const targetHeight = height * 0.68;
    const scale = targetHeight / img.naturalHeight;
    drawWidth = img.naturalWidth * scale;
    drawHeight = targetHeight;

    // Centrado horizontal milimétrico en la escena
    offsetX = (width - drawWidth) / 2;
    // Anclado en la base de la sección hero
    offsetY = height - drawHeight;

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  // Loop de interpolación suave (Lerp) para física fluida
  useEffect(() => {
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.02) {
        currentFrameRef.current += diff * 0.16;
        const frameToRender = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentFrameRef.current))
        );
        renderFrame(frameToRender);
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Manejo del ratón: Frame scrubbing horizontal
  // Si el ratón se mueve a la izquierda -> mira a la izquierda (Frame 0)
  // Si el ratón está al centro -> mira al frente (Frame 24)
  // Si el ratón se mueve a la derecha -> mira a la derecha (Frame 48)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const ratioX = Math.max(0, Math.min(1, mouseX / rect.width));

    const target = ratioX * (TOTAL_FRAMES - 1);
    targetFrameRef.current = target;
  };

  const handleMouseLeave = () => {
    targetFrameRef.current = CENTER_FRAME;
  };

  // Manejo táctil (móviles y tablets): Frame scrubbing con el dedo
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const ratioX = Math.max(0, Math.min(1, touchX / rect.width));

    const target = ratioX * (TOTAL_FRAMES - 1);
    targetFrameRef.current = target;
  };

  const handleTouchEnd = () => {
    targetFrameRef.current = CENTER_FRAME;
  };

  // Crossfade buffer continuo para loop 100% sin parpadeos ni pausas
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const [activeVideo, setActiveVideo] = useState<'A' | 'B'>('A');

  const handleTimeUpdateA = () => {
    const vA = videoARef.current;
    const vB = videoBRef.current;
    if (!vA || !vB || !vA.duration) return;

    // 0.6 segundos antes del final, preparar y arrancar el vídeo B en segundo plano
    if (vA.duration - vA.currentTime <= 0.6 && activeVideo === 'A') {
      vB.currentTime = 0;
      vB.play().then(() => {
        setActiveVideo('B');
      }).catch(() => {});
    }
  };

  const handleTimeUpdateB = () => {
    const vA = videoARef.current;
    const vB = videoBRef.current;
    if (!vA || !vB || !vB.duration) return;

    // 0.6 segundos antes del final, preparar y arrancar el vídeo A
    if (vB.duration - vB.currentTime <= 0.6 && activeVideo === 'B') {
      vA.currentTime = 0;
      vA.play().then(() => {
        setActiveVideo('A');
      }).catch(() => {});
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="relative w-full aspect-video min-h-[580px] max-h-[1080px] bg-[#0d0717] text-[#110B1C] flex flex-col justify-between overflow-hidden select-none touch-pan-y"
    >
      {/* ============================================================== */}
      {/* 1. NAVBAR ESTILO SCHEME ENGINE (SCHEMEENGINE.COM) CON ENSUPRIME */}
      {/* ============================================================== */}
      <SchemeNavbar madridTime={timeData} />

      {/* ============================================================== */}
      {/* 0. VIDEO BACKGROUND SEAMLESS CROSSFADE BUFFER (CERO PARPADEO) */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none overflow-hidden bg-[#0d0717]">
        {/* Capa A */}
        <video
          ref={videoARef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdateA}
          className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.08] saturate-[1.1] transition-opacity duration-500 ease-linear ${
            activeVideo === 'A' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source
            src="https://res.cloudinary.com/v47hsuhi/video/upload/v1792336432/Animate_static_American_style_image_20261018171323.mp4"
            type="video/mp4"
          />
        </video>

        {/* Capa B (buffer para solapamiento continuo) */}
        <video
          ref={videoBRef}
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdateB}
          className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.08] saturate-[1.1] transition-opacity duration-500 ease-linear ${
            activeVideo === 'B' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source
            src="https://res.cloudinary.com/v47hsuhi/video/upload/v1792336432/Animate_static_American_style_image_20261018171323.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* ============================================================== */}
      {/* 2. PÓSTER EDITORIAL POSTER STYLE: TÍTULO Y PRESENTACIÓN (z-10) */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-[14vh] sm:pt-[15vh] md:pt-[16vh] pointer-events-none select-none overflow-hidden px-4">
        {/* PRE-TÍTULO / EYEBROW EDITORIAL CON TRACKING ANCHO */}
        <p className="font-mono-code text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.35em] uppercase text-white/80 mb-1.5 sm:mb-2.5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          ORIGINAL BROADCAST // EN VIVO
        </p>

        {/* TÍTULO PRINCIPAL: ENSUPRIME.COM A LA ALTURA DE LA LUNA */}
        <h1 className="w-full text-center font-impact text-[13vw] sm:text-[12vw] md:text-[10.5vw] lg:text-[9.5vw] leading-[0.85] tracking-tight uppercase text-white select-none whitespace-nowrap">
          ENSU<span className="text-[#5518D3]">PRIME</span><span className="text-[#9FB32F]">.COM</span>
        </h1>

        {/* SUBTÍTULO INFERIOR TIPO PÓSTER EDITORIAL */}
        <div className="flex items-center gap-3 mt-2.5 sm:mt-3">
          <span className="h-[1px] w-6 sm:w-12 bg-white/40" />
          <p className="font-sans text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            EL EPICENTRO DEL TALENTO URBANO
          </p>
          <span className="h-[1px] w-6 sm:w-12 bg-white/40" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. PERSONAJE CENTRADO INTERACTIVO: EN FRENTE DEL TÍTULO (z-20) */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-20 w-full h-full pointer-events-none flex items-end justify-center">
        {/* Canvas reactivo al movimiento horizontal del mouse: 100% nítido y sin capas de filtro */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ============================================================== */}
      {/* 4. BILLING BLOCK CINEMATOGRÁFICO LIMPIO SIN LOGOS NI LÍNEAS   */}
      {/* ============================================================== */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none select-none pb-4 sm:pb-6 px-6 sm:px-12 bg-gradient-to-t from-black/80 via-black/30 to-transparent pt-12">
        <div className="w-full max-w-[1920px] mx-auto flex flex-col items-center">
          {/* CRÉDITOS CINEMATOGRÁFICOS DE FICHA TÉCNICA */}
          <div className="w-full max-w-4xl text-center text-white/50 text-[8px] sm:text-[9.5px] font-mono-code tracking-[0.22em] uppercase leading-relaxed hidden sm:block">
            <span>ENSUPRIME STUDIOS PRESENTS IN ASSOCIATION WITH THIAGOVSC ENTERTAINMENT</span>
            <br />
            <span>MUSIC BY URBAN TALENT LAB · SOUND DESIGN BY FLAIX FM · PRODUCTION BY MADRID BROADCAST</span>
          </div>
        </div>
      </div>
    </section>
  );
};
