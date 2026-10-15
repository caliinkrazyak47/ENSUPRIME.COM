import { motion } from 'motion/react';
import { Play, ArrowDown, Volume2 } from 'lucide-react';
import { HeroScene } from './HeroScene';

export function HeroSection({ onWatchLive }: { onWatchLive: () => void }) {
  return (
    <section id="hero" className="relative min-h-[100dvh] w-full bg-[#090909] text-[#F4F1EC] flex flex-col justify-between pt-32 pb-12 px-6 md:px-14 border-b border-white/10 overflow-hidden">
      {/* Controlled Subtle Ambient Light (no excessive gradients) */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Metadata Strip */}
      <div className="z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 font-mono-code text-xs text-[#8D8D91]">
          <span className="w-2 h-2 rounded-full bg-[#FF3434] animate-ping" />
          <span className="text-white font-bold">EMISIÓN CONTINUA 24/7</span>
          <span className="text-white/20">•</span>
          <span>MADRID BROADCAST STUDIO</span>
        </div>

        <div className="flex items-center gap-4 font-mono-code text-xs text-[#8D8D91]">
          <span className="text-[#D8D8DB]">AUDIO HIGH-FIDELITY</span>
          <span className="text-white/20">•</span>
          <span className="text-[#8B5CF6]">VOL. 2026</span>
        </div>
      </div>

      {/* Central Split Layout */}
      <div className="z-10 my-auto py-8 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-7xl mx-auto w-full">
        {/* Left Column: Bold Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-7"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            <span className="font-mono-code text-[10px] tracking-[0.25em] text-[#D8D8DB] uppercase">
              DIGITAL CULTURE • MUSIC • MOTION
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[104px] leading-[0.9] tracking-tight uppercase text-[#F4F1EC]">
            EL RITMO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D8D8DB] to-[#8D8D91]">
              DE TU MUNDO.
            </span>
          </h1>

          <p className="font-grotesk text-base sm:text-lg text-[#8D8D91] max-w-xl leading-relaxed font-normal">
            Plataforma audiovisual y red editorial dedicada a la música urbana, directos 4K, sesiones exclusivas, cultura digital en TikTok y conexiones de lifestyle contemporáneo.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onWatchLive}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#F4F1EC] hover:bg-[#8B5CF6] text-[#090909] hover:text-white transition-all duration-300 font-grotesk font-bold text-xs uppercase tracking-wider"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Ver TV en Directo</span>
            </button>

            <a
              href="#music"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#111111] hover:bg-white/10 border border-white/15 text-white transition-colors font-grotesk font-bold text-xs uppercase tracking-wider"
            >
              <span>Explorar Sesiones</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#8D8D91]" />
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10 max-w-lg font-mono-code">
            <div>
              <div className="font-display font-extrabold text-2xl text-white">1.8M+</div>
              <div className="text-[10px] text-[#8D8D91] uppercase mt-0.5">Audiencia</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl text-white">24/7</div>
              <div className="text-[10px] text-[#8D8D91] uppercase mt-0.5">Emisión Live</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl text-[#8B5CF6]">4K HDR</div>
              <div className="text-[10px] text-[#8D8D91] uppercase mt-0.5">Calidad Video</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Vinyl Experience */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-[#111111] border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)]">
            {/* Header info */}
            <div className="flex justify-between items-center z-10 font-mono-code text-[11px] text-[#8D8D91]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF3434] animate-ping" />
                <span>VINYL LAB 3D</span>
              </span>
              <span>INTERACTIVE ORBIT</span>
            </div>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
              <HeroScene />
            </div>

            {/* Bottom track title */}
            <div className="z-10 bg-[#090909]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center justify-between font-mono-code text-xs">
              <div>
                <div className="text-white font-bold text-sm">THIAGO VSC // VOL. 01</div>
                <div className="text-[#8D8D91] text-[10px]">ORIGINAL STUDIO MASTER</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Volume2 className="w-4 h-4 text-[#8B5CF6]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Stripline */}
      <div className="z-10 flex items-center justify-between border-t border-white/10 pt-4 font-mono-code text-[11px] text-[#8D8D91]">
        <span>ESTUDIO EDITORIAL & PLATAFORMA DIGITAL</span>
        <a href="#manifesto" className="flex items-center gap-2 hover:text-white transition-colors">
          <span>DESCUBRE EL MANIFIESTO</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
