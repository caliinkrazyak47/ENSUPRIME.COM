import React, { useEffect, useRef, useState } from 'react';
import { Radio } from 'lucide-react';
import { VideoText } from '../ui/VideoText';

interface HeroProps {
  onWatchLive: () => void;
  isRadioPlaying: boolean;
  onToggleRadio: () => void;
}

const TOTAL_FRAMES = 48;

export const InteractiveCharacterHero: React.FC<HeroProps> = ({
  onWatchLive,
  isRadioPlaying,
  onToggleRadio,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(24);
  const targetFrameRef = useRef<number>(24);
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

  // Pre-carga ultra-rápida de los frames de la secuencia transparente
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/sequence/frame_${paddedIndex}.webp`;
      img.onload = () => {
        if (i === 24 && canvasRef.current) {
          renderFrame(24);
        }
      };
      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;
  }, []);

  // Render en Canvas con soporte Retina y escalado responsivo
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

    // Renderizado 4K Ultra-Crisp con interpolación de máxima fidelidad
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    // Escalar al 85% para máxima densidad de píxeles y apreciación nítida de texturas
    const baseScale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const scale = baseScale * 0.84;
    drawWidth = img.naturalWidth * scale;
    drawHeight = img.naturalHeight * scale;

    offsetX = (width - drawWidth) / 2;
    // Alineación en la parte inferior para que la base quede limpia y el rostro/joyas en el punto focal dorado
    offsetY = height - drawHeight;

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  // Loop de interpolación suave (Lerp) para física fluida
  useEffect(() => {
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.02) {
        currentFrameRef.current += diff * 0.15;
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
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const ratioX = Math.max(0, Math.min(1, mouseX / rect.width));

    // Personaje: Frame 0 mira a la derecha, Frame 47 mira a la izquierda
    const target = (1 - ratioX) * (TOTAL_FRAMES - 1);
    targetFrameRef.current = target;
  };

  const handleMouseLeave = () => {
    targetFrameRef.current = 24;
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-video min-h-[580px] max-h-[1080px] bg-[#EDE8E3] text-[#110B1C] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* ============================================================== */}
      {/* 1. NAVBAR INTEGRADO FULL-WIDTH EN GRADIENTE TRANSLÚCIDO       */}
      {/* ============================================================== */}
      <header className="relative z-30 w-full px-6 sm:px-10 md:px-16 py-6 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
        <nav className="hidden lg:flex items-center gap-8 font-body font-bold text-xs uppercase tracking-wider text-white">
          <a href="#tv" className="hover:text-[#A855F7] transition-colors">TV Online</a>
          <a href="#tiktok" className="hover:text-[#A855F7] transition-colors">TikTok Feed</a>
          <a href="#talento" className="hover:text-[#A855F7] transition-colors">Talento</a>
          <a href="#eventos" className="hover:text-[#A855F7] transition-colors">Eventos</a>
        </nav>

        {/* LOGO CENTRAL */}
        <a href="#" className="font-impact text-3xl md:text-4xl tracking-tight text-white flex items-center gap-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          ENSUPRIME <span className="text-[#A855F7] text-2xl">✦</span>
        </a>

        {/* CONTROLES DERECHA */}
        <div className="flex items-center gap-3">
          {/* RELOJ DE LUJO MADRID (BESPOKE TIMEPIECE) */}
          <div className="hidden sm:flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#A855F7]/40 px-3.5 py-1.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all group">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A855F7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A855F7] shadow-[0_0_8px_#A855F7]"></span>
              </span>
              <span className="text-[9px] font-mono-code font-bold tracking-[0.2em] text-white/50 group-hover:text-white/80 transition-colors uppercase">
                MADRID // 40°N
              </span>
            </div>

            <div className="h-3 w-px bg-white/10" />

            <div className="flex items-baseline font-mono-code tracking-wider">
              <span className="text-xs font-bold text-white tabular-nums">
                {timeData.hours}
                <span className="text-[#A855F7] animate-pulse mx-0.5">:</span>
                {timeData.minutes}
              </span>
              <span className="text-[10px] text-[#A855F7] font-semibold tabular-nums ml-0.5">
                .{timeData.seconds}
              </span>
              <span className="text-[8px] font-bold text-white/40 ml-1.5 tracking-widest">
                {timeData.cet}
              </span>
            </div>
          </div>

          <button
            onClick={onToggleRadio}
            className={`px-3.5 py-1.5 rounded-full font-body font-bold text-xs flex items-center gap-2 transition-all shadow-sm ${
              isRadioPlaying
                ? 'bg-[#6E1FE8] text-white shadow-purple-500/25'
                : 'bg-white hover:bg-black hover:text-white text-black border border-black/5'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isRadioPlaying ? 'animate-spin' : ''}`} />
            <span>{isRadioPlaying ? 'EN VIVO' : 'RADIO'}</span>
          </button>

          <button
            onClick={onWatchLive}
            className="hidden md:flex px-4 py-1.5 rounded-full bg-[#110B1C] text-white font-body font-bold text-xs hover:bg-[#6E1FE8] transition-colors"
          >
            VER DIRECTO
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 0. VIDEO BACKGROUND 16:9 DETRÁS DE LAS LETRAS (NUEVO CLOUDINARY) */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.08] saturate-[1.1]"
        >
          <source
            src="https://res.cloudinary.com/v47hsuhi/video/upload/v1791976976/Animate_locker_and_paper_movement_20261014132221.mp4"
            type="video/mp4"
          />
        </video>
        {/* Sutil viñeta para dar profundidad cinemática */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* 2. TIPOGRAFÍA GIGANTE DETRÁS DEL PERSONAJE: ENSUPRIME LIMPIA   */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none select-none overflow-hidden">
        <div className="w-fit flex flex-col items-center">
          {/* TÍTULO ENSUPRIME CON EFECTO CANVAS (VIDEO DE LÍQUIDO SIN FONDO BLANCO) */}
          <VideoText
            src="https://res.cloudinary.com/v47hsuhi/video/upload/v1791999461/Animar_liquido_medida_16_9_20261014193629.mp4"
            text="ENSUPRIME"
            className="filter drop-shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
          />

          {/* CRÉDITOS CINEMATOGRÁFICOS ESTILO POSTER NETFLIX: ALINEADOS DEBAJO DE 'IME' SIN FORMA DE BOTÓN */}
          <div className="w-full flex justify-end items-center px-[2vw] mt-2 select-none">
            <span
              className="font-mono-code text-[11px] sm:text-xs md:text-sm lg:text-base font-extrabold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white whitespace-nowrap"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)',
              }}
            >
              <span className="text-white">HD VISION</span>
              <span className="mx-2 text-white/50">/</span>
              <span className="text-white/70 font-semibold">BY</span>
              <span className="ml-1.5 text-white">THIAGOVSC</span>
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. PERSONAJE CENTRADO INTERACTIVO: 100% LIMPIO SIN FILTROS    */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none flex items-end justify-center">
        {/* Canvas reactivo al movimiento horizontal del mouse: 100% nítido y sin capas de filtro */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};
