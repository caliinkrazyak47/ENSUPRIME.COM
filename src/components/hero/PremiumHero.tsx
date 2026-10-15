import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX, ArrowUpRight, Disc3, Radio as RadioIcon } from 'lucide-react';

interface HeroProps {
  onWatchLive: () => void;
  isRadioPlaying: boolean;
  onToggleRadio: () => void;
}

export const PremiumHero: React.FC<HeroProps> = ({
  onWatchLive,
  isRadioPlaying,
  onToggleRadio,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineWord1Ref = useRef<HTMLHeadingElement>(null);
  const headlineWord2Ref = useRef<HTMLHeadingElement>(null);
  const subCardRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Entrada rotada e impactante como la tipografía de la foto
      tl.from(headlineWord1Ref.current, {
        y: 100,
        opacity: 0,
        duration: 1.1,
        ease: 'power4.out',
      });

      tl.from(headlineWord2Ref.current, {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      }, "-=0.8");

      tl.from(subCardRef.current, {
        scale: 0.92,
        opacity: 0,
        y: 30,
        duration: 1.0,
        ease: 'power3.out',
      }, "-=0.7");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let osc: OscillatorNode | null = null;
    let gain: GainNode | null = null;

    if (isRadioPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }

        osc = audioContextRef.current.createOscillator();
        gain = audioContextRef.current.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(60, audioContextRef.current.currentTime);
        gain.gain.setValueAtTime(isMuted ? 0 : 0.04 * (volume / 100), audioContextRef.current.currentTime);

        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);
        osc.start();
      } catch (e) {
        console.error("Audio API error:", e);
      }
    }

    return () => {
      if (osc) {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      }
      if (gain) gain.disconnect();
    };
  }, [isRadioPlaying, isMuted, volume]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] pt-32 pb-16 px-6 md:px-12 flex flex-col justify-between overflow-hidden bg-[#F2F0EB] text-[#110B1C]"
    >
      {/* FONDO WATERMARK VIVO & MARIPOSAS FLOTANTES PURPLE GLOW */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Marca de agua de posters y grid translúcido como la foto */}
        <div className="absolute -top-10 -left-10 text-[18vw] font-impact leading-none text-[#110B1C]/[0.035] uppercase whitespace-nowrap">
          URBAN ARCHIVE // BROADCAST 24/7
        </div>
        <div className="absolute top-1/2 -right-20 text-[22vw] font-impact leading-none text-[#6E1FE8]/[0.03] uppercase whitespace-nowrap">
          ENSUPRIME
        </div>

        {/* Mariposas púrpuras flotantes con sombra y movimiento orgánico */}
        <div className="absolute top-36 right-[18%] animate-bounce [animation-duration:4s]">
          <span className="text-3xl md:text-5xl filter drop-shadow-[0_8px_16px_rgba(110,31,232,0.4)]">🦋</span>
        </div>
        <div className="absolute top-[60%] left-[8%] animate-bounce [animation-duration:5s] [animation-delay:1s]">
          <span className="text-2xl md:text-4xl filter drop-shadow-[0_8px_16px_rgba(110,31,232,0.4)]">🦋</span>
        </div>
        <div className="absolute bottom-24 right-[28%] animate-bounce [animation-duration:3.5s] [animation-delay:0.5s]">
          <span className="text-xl md:text-3xl filter drop-shadow-[0_8px_16px_rgba(110,31,232,0.4)]">🦋</span>
        </div>

        {/* Flechas y anotaciones estilo graffiti / social media de la foto */}
        <svg className="absolute top-28 left-[15%] w-32 h-32 text-[#110B1C]/25 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M 10 30 Q 30 10, 70 30 T 90 70" strokeDasharray="4 4" />
          <path d="M 85 60 L 90 70 L 80 72" fill="currentColor" />
        </svg>

        <svg className="absolute top-[48%] right-[10%] w-40 h-40 text-[#6E1FE8]/30 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M 90 20 Q 50 60, 20 50" />
          <path d="M 25 40 L 20 50 L 30 55" fill="currentColor" />
        </svg>
      </div>

      {/* TOP META ROW */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-4 font-mono-code text-xs text-[#5C5566] border-b border-[#110B1C]/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="bg-[#6E1FE8] text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_4px_12px_rgba(110,31,232,0.35)]">
            SAVE THIS BROADCAST
          </span>
          <span className="font-semibold text-[#110B1C] hidden sm:inline">@ensuprime.es // MADRID 40°25'N</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline">EMISIÓN ININTERRUMPIDA 24/7</span>
          <div className="flex items-center gap-2 text-[#6E1FE8] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6E1FE8] animate-ping" />
            <span>EN DIRECTO AHORA</span>
          </div>
        </div>
      </div>

      {/* TITULAR MASIVO CONDENSADO E INCLINADO EXACTAMENTE COMO LA FOTO */}
      <div className="relative z-10 my-auto py-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* LÍNEA 1: "EL RITMO" EN NEGRO TINTA PROFUNDO CON LEVE INCLINACIÓN */}
          <div className="overflow-visible w-full">
            <h1
              ref={headlineWord1Ref}
              className="font-impact text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] leading-[0.82] tracking-[-0.03em] uppercase text-[#110B1C] transform -rotate-[2deg] drop-shadow-[0_15px_30px_rgba(17,11,28,0.12)] select-none hover:scale-[1.01] transition-transform duration-300"
            >
              EL RITMO
            </h1>
          </div>

          {/* LÍNEA 2: "DE TU MUNDO" EN VIBRANTE VIOLETA PURPLE (#6E1FE8) */}
          <div className="overflow-visible w-full -mt-2 sm:-mt-6 md:-mt-10">
            <h1
              ref={headlineWord2Ref}
              className="font-impact text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] leading-[0.82] tracking-[-0.03em] uppercase text-[#6E1FE8] transform -rotate-[1.5deg] drop-shadow-[0_20px_40px_rgba(110,31,232,0.28)] select-none hover:scale-[1.01] transition-transform duration-300"
            >
              DE TU MUNDO
            </h1>
          </div>

          {/* SUBTÍTULO Y TAGLINE ESTILO SOCIAL MEDIA */}
          <div className="mt-8 md:mt-12 max-w-2xl px-4">
            <p className="font-body text-base md:text-xl font-bold text-[#110B1C] tracking-tight">
              Plataforma oficial de música urbana, radio en vivo, creadores de contenido y cultura digital.
            </p>
            <p className="font-mono-code text-xs md:text-sm text-[#5C5566] mt-2 uppercase tracking-widest font-semibold">
              Desliza para explorar la experiencia completa // Arrasta para o lado ➔
            </p>
          </div>

          {/* BOTONES INTERACTIVOS ESTILO CÁPSULA PÚRPURA */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {/* Botón Púrpura "Arrasta para o lado" / Sintonizar */}
            <button
              onClick={onWatchLive}
              data-cursor="VER"
              className="group flex items-center gap-3 px-8 py-4 bg-[#6E1FE8] text-white font-body font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-[#8B3BFF] shadow-[0_10px_25px_rgba(110,31,232,0.4)] active:scale-[0.98] transition-all duration-300"
            >
              <span>SINTONIZAR TV EN VIVO</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Botón Radio Player Blanco con Borde Púrpura */}
            <button
              onClick={onToggleRadio}
              data-cursor="AUDIO"
              className={`flex items-center gap-3 px-8 py-4 bg-white text-[#110B1C] font-body font-bold text-sm tracking-wider uppercase rounded-xl border-2 transition-all duration-300 active:scale-[0.98] shadow-sm hover:shadow-md ${
                isRadioPlaying
                  ? 'border-[#6E1FE8] text-[#6E1FE8] shadow-[0_0_20px_rgba(110,31,232,0.25)]'
                  : 'border-[#110B1C]/15 hover:border-[#6E1FE8]'
              }`}
            >
              <Disc3 className={`w-5 h-5 text-[#6E1FE8] ${isRadioPlaying ? 'animate-spin' : ''}`} />
              <span>{isRadioPlaying ? 'PAUSAR RADIO' : 'RADIO 98.4 FM'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM RADIO MONITOR CARD (CON ASPECTO DE TARJETA SOCIAL MEDIA) */}
      <div
        ref={subCardRef}
        className="relative z-10 max-w-4xl mx-auto w-full bg-white rounded-2xl p-6 border border-[#110B1C]/10 shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#6E1FE8]/10 text-[#6E1FE8] flex items-center justify-center font-bold">
            <RadioIcon className="w-6 h-6 text-[#6E1FE8]" />
          </div>
          <div>
            <span className="font-mono-code text-[11px] font-bold text-[#6E1FE8] uppercase tracking-wider block">
              ● ON AIR // 98.4 MHZ MADRID
            </span>
            <h4 className="font-body font-extrabold text-lg text-[#110B1C] tracking-tight">
              VANGUARDIA MADRID MIX #42
            </h4>
            <p className="font-body text-xs text-[#5C5566]">
              ENSUPRIME SOUNDSYSTEM · DIRECTO 24/7
            </p>
          </div>
        </div>

        {/* BARRAS DE AUDIO EN COLOR PÚRPURA */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
          <div className="h-8 flex items-end gap-1 px-3 py-1 bg-[#F2F0EB] rounded-lg">
            {[35, 75, 45, 95, 60, 80, 40, 90, 70, 85, 50, 100, 65].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-full transition-all duration-150"
                style={{
                  height: isRadioPlaying ? `${Math.min(100, Math.max(20, h * (Math.sin(i * 1.5 + Date.now()/250) + 1.2)))}%` : '20%',
                  backgroundColor: isRadioPlaying ? '#6E1FE8' : '#A39BA8',
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-[#5C5566] hover:text-[#6E1FE8] transition-colors p-1"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#6E1FE8]" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-20 h-1.5 bg-[#E8E5DD] accent-[#6E1FE8] cursor-pointer rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
