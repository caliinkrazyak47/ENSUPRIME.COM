import { useState } from 'react';
import { Volume2, VolumeX, Tv, Radio, Maximize2 } from 'lucide-react';

export function PiggyTVStreamSection() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="tv-stream" className="relative py-32 px-4 sm:px-8 md:px-14 bg-[#14151a] text-white border-b border-white/10 piggy-grain">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header with High Hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#33e4b8]/10 border border-[#33e4b8]/20 text-[#33e4b8] font-mono text-[11px] uppercase tracking-widest font-bold">
              <Tv className="w-3.5 h-3.5" />
              <span>(01) MODULE TELEVISION LIVE // THIAGO VSC</span>
            </div>
            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
              TV ONLINE <span className="text-[#33e4b8]">4K ULTRA HD</span>
            </h2>
          </div>

          {/* Indicator Visual En Vivo / Offline */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#E56DB1]/15 border border-[#E56DB1]/40 text-white font-mono text-xs font-bold uppercase tracking-widest">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E56DB1] animate-ping" />
            <span className="text-[#E56DB1]">EN VIVO // LIVE 24/7</span>
          </div>
        </div>

        {/* Double-Bezel Television Container (Awwwards hardware feel) */}
        <div className="p-2.5 rounded-[2.5rem] bg-gradient-to-b from-white/15 via-white/5 to-white/10 border border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)]">
          <div className="rounded-[calc(2.5rem-0.625rem)] bg-[#181a20] p-4 md:p-6 border border-white/10 space-y-5">
            {/* Main 16:9 Screen */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/15 shadow-inner">
              <iframe
                src={`https://www.youtube.com/embed/kPa7bsKwL-c?autoplay=1&mute=${isMuted ? '1' : '0'}&enablejsapi=1&playsinline=1&rel=0&modestbranding=1&hd=1`}
                title="Thiago VSC TV Live"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              />

              {/* Floating Unmute Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                data-magnet
                data-cursor-text="AUDIO"
                className="absolute bottom-6 left-6 z-20 flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#33e4b8] hover:bg-white text-[#121316] font-display text-lg uppercase tracking-wider transition-all shadow-[0_10px_20px_rgba(51,228,184,0.3)] active:scale-95"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isMuted ? 'Activer le Son Direct' : 'Son en Direct Actif'}</span>
              </button>

              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#FFD84D] font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>QUALITÉ 4K HDR // 60 FPS</span>
              </div>
            </div>

            {/* Lower Control Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-black/40 border border-white/10 font-grotesk text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 font-mono text-white/80">
                  <Radio className="w-4 h-4 text-[#33e4b8] animate-pulse" />
                  <span className="font-bold">FLUX SATELLITE BROADCAST</span>
                </div>
                <span className="hidden sm:inline text-white/30">|</span>
                <span className="hidden sm:inline text-[#FFD84D] font-mono">18,420 AUDITEURS EN SIMULTANÉ</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-white/50 font-mono text-[11px]">DÉBIT 24 MBPS</span>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  data-magnet
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#E56DB1] hover:text-white transition-colors font-mono font-bold"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>PLEIN ÉCRAN</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
