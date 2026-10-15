import { motion } from 'motion/react';
import { Play, Video, Music, ArrowUpRight, Flame, Globe } from 'lucide-react';
import { Piggy3DCanvas } from './Piggy3DCanvas';

export function PiggyHero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] w-full bg-[#121316] text-white flex flex-col justify-between pt-36 pb-16 px-4 sm:px-8 md:px-14 overflow-hidden border-b border-white/10 piggy-grain">
      {/* Background Cinematic Mesh Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#33e4b8]/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#E56DB1]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FFD84D]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Micro-Bar (Awwwards double-tag) */}
      <div className="z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 max-w-7xl mx-auto w-full">
        <div className="inline-flex items-center gap-3">
          <span className="highlight-green text-[10px] font-mono tracking-[0.25em] uppercase font-bold px-2 py-0.5">
            AWWWARDS NOMINEE • ARCHITECTURE 2026
          </span>
          <span className="font-mono text-xs text-white/40 hidden md:inline">
            // CRAFT BREWING × THIAGO VSC NETWORK
          </span>
        </div>

        <div className="flex items-center gap-5 text-xs font-mono text-white/70">
          <span className="flex items-center gap-2 text-[#33e4b8]">
            <span className="w-2 h-2 rounded-full bg-[#33e4b8] animate-ping" />
            DIRECT 4K EN CONTINU
          </span>
          <span className="text-white/20">•</span>
          <span className="text-[#FFD84D] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" /> 60 FPS WEBGL 3D
          </span>
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="z-10 my-auto py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-7xl mx-auto w-full">
        {/* Left Column: Monumental Syne & Bebas Neue Typography */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-7"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#33e4b8]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#33e4b8] font-bold">
              BRASSERIE LIBRE & EXPÉRIENCE DIGITALE
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="font-syne font-black text-6xl sm:text-7xl md:text-8xl lg:text-[108px] leading-[0.9] tracking-tight uppercase text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            EL RITMO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33e4b8] via-[#FFD84D] to-[#E56DB1]">
              DE TU MUNDO
            </span>
          </h1>

          <p className="font-grotesk text-base sm:text-lg md:text-xl text-white/75 max-w-xl leading-relaxed">
            L'audace visuelle et l'énergie décomplexée de <strong className="text-[#33e4b8]">The Piggy Brewing Company</strong> intégrée dans l'écosystème audiovisuel de <strong className="text-[#E56DB1]">Thiago VSC</strong> : diffusion 4K en temps réel, radar TikTok et canette 3D interactive en WebGL.
          </p>

          {/* Luxury Nested CTA Buttons */}
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <a
              href="#tv-stream"
              data-magnet
              data-cursor-text="STREAM"
              className="group inline-flex items-center gap-4 px-7 py-3.5 rounded-full bg-[#33e4b8] hover:bg-white text-[#121316] font-display text-xl uppercase tracking-wider transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(51,228,184,0.4)] active:scale-95"
            >
              <span>Regarder le Live 4K</span>
              <div className="w-8 h-8 rounded-full bg-[#121316]/10 group-hover:bg-[#121316]/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
                <Play className="w-4 h-4 fill-current" />
              </div>
            </a>

            <a
              href="#status"
              data-magnet
              data-cursor-text="METRICS"
              className="group inline-flex items-center gap-4 px-7 py-3.5 rounded-full bg-[#E56DB1] hover:bg-[#33e4b8] text-white hover:text-[#121316] font-display text-xl uppercase tracking-wider transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(229,109,177,0.4)] active:scale-95"
            >
              <span>Statut & Métriques</span>
              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#121316]/10 flex items-center justify-center transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          </div>

          {/* Social Quick Launchers */}
          <div className="flex items-center gap-3 pt-3 font-mono text-xs text-white/50">
            <span>DIFFUSION SUR :</span>
            <div className="flex items-center gap-2">
              <a href="https://youtube.com" target="_blank" rel="noreferrer" data-magnet className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#33e4b8] hover:text-[#121316] transition-colors flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" /> YouTube
              </a>
              <a href="https://twitch.tv" target="_blank" rel="noreferrer" data-magnet className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#E56DB1] hover:text-white transition-colors flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> Twitch
              </a>
              <a href="https://spotify.com" target="_blank" rel="noreferrer" data-magnet className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#FFD84D] hover:text-[#121316] transition-colors flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" /> Radio 24/7
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Double-Bezel Hardware Frame with 3D WebGL Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          {/* Double-Bezel Shell */}
          <div className="w-full max-w-[420px] p-2 rounded-[2.5rem] bg-gradient-to-b from-white/15 via-white/5 to-white/10 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
            {/* Inner Core */}
            <div className="relative aspect-[4/5] rounded-[calc(2.5rem-0.5rem)] bg-[#181a20] border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              {/* Card Header */}
              <div className="flex justify-between items-center z-10">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#33e4b8] animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#33e4b8] font-bold">
                    CAN N°01 // WEBGL 3D
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/50">INTERACTIVE ORBIT</span>
              </div>

              {/* 3D WebGL Realtime Canvas Container */}
              <div className="absolute inset-0 z-0">
                <Piggy3DCanvas />
              </div>

              {/* Card Footer Info */}
              <div className="z-10 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between font-mono text-xs">
                <div>
                  <div className="text-[#33e4b8] font-bold text-sm font-display tracking-wider">
                    RETROFUTUR IPA 5,6%
                  </div>
                  <div className="text-white/50 text-[10px]">THE PIGGY BREWING COMPANY</div>
                </div>
                <div className="text-right">
                  <span className="highlight-pink text-[10px] px-2 py-0.5">
                    ALC. 60 FPS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Infinite Marquee Ticker */}
      <div className="w-full overflow-hidden border-y border-white/10 py-3.5 my-4 bg-[#14151a]">
        <div className="animate-marquee font-display text-2xl uppercase tracking-widest text-white/90">
          <span className="mx-6 text-[#33e4b8]">★ THE PIGGY BREWING COMPANY</span>
          <span className="mx-6 text-white">• THIAGO VSC 24/7 TV</span>
          <span className="mx-6 text-[#E56DB1]">★ BRASSERIE LIBRE ET CRÉATIVE</span>
          <span className="mx-6 text-[#FFD84D]">• RADAR TIKTOK VIRAL</span>
          <span className="mx-6 text-[#33e4b8]">★ FINESSE & CRAZINESS</span>
          <span className="mx-6 text-white">• ULTRA HD 4K HDR</span>
          <span className="mx-6 text-[#E56DB1]">★ THE PIGGY BREWING COMPANY</span>
          <span className="mx-6 text-white">• THIAGO VSC 24/7 TV</span>
        </div>
      </div>
    </section>
  );
}
