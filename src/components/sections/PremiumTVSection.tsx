import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const PremiumTVSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(85);

  const videoId = "r5nB9FsK1wY";

  return (
    <section id="tv" className="relative w-full py-20 px-4 sm:px-8 md:px-12 bg-[#6E1FE8] text-white overflow-hidden">
      {/* ESTRELLAS Y ELEMENTOS FLOTANTES EN EL FONDO COMO LA IMAGEN */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="absolute top-10 left-[10%] text-6xl text-white/20 select-none">✦</span>
        <span className="absolute top-1/2 right-[8%] text-8xl text-white/15 select-none">✦</span>
        <span className="absolute bottom-16 left-[20%] text-5xl text-white/20 select-none">✦</span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        {/* CABECERA VIBRANTE */}
        <div className="text-center mb-12">
          <h2 className="font-impact text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-white mt-2">
            TV <span className="bg-white text-[#6E1FE8] px-4 py-1 rounded-2xl inline-block transform -rotate-1 shadow-lg">ONLINE</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-white/90 max-w-xl mx-auto mt-4 font-semibold">
            Emisión ininterrumpida con los mejores directos, sesiones de estudio y videoclips urbanos.
          </p>
        </div>

        {/* TARJETA NEGRA FLOATING CARD CON MARCO CURVADO COMO LA IMAGEN (DOUBLE BEZEL AWWWARDS ARCHITECTURE) */}
        <div className="w-full max-w-4xl p-1.5 sm:p-2 rounded-[3.2rem] bg-white/10 ring-1 ring-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
          <div className="w-full bg-[#110B1C] rounded-[3rem] p-4 sm:p-6 md:p-8 border border-white/10 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            {/* Estrella decorativa en la esquina */}
            <span className="absolute top-5 right-6 text-2xl text-[#A855F7]">✦</span>

            {/* REPRODUCTOR DE VÍDEO 16:9 EN BLANCO Y NEGRO CONTRASTADO */}
            <div className="relative aspect-video rounded-2xl bg-black overflow-hidden shadow-inner ring-1 ring-white/10">
              {isPlaying ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0`}
                  title="ENSUPRIME TV LIVE"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  onClick={() => setIsPlaying(true)}
                  data-cursor="PLAY"
                  className="relative w-full h-full cursor-pointer group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop"
                    alt="ENSUPRIME Broadcast Cover"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* BOTÓN PLAY CENTRAL PÚRPURA / BLANCO CON ANILLO HÁPTICO */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white text-[#6E1FE8] flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.4)] group-hover:scale-110 group-hover:bg-[#6E1FE8] group-hover:text-white transition-all duration-300 ring-4 ring-white/20">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="bg-[#6E1FE8] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        ● EMISIÓN EN DIRECTO
                      </span>
                      <h3 className="font-impact text-2xl sm:text-4xl text-white mt-2 uppercase tracking-tight">
                        SESIÓN ESPECIAL URBANA // 2026 EDITION
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* BARRA DE CONTROLES INFERIOR CON FÍSICA HÁPTICA */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 font-body text-xs text-white/80">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="btn-magnetic flex items-center gap-2 px-5 py-2.5 bg-[#6E1FE8] hover:bg-[#8B3BFF] text-white font-bold rounded-xl transition-all shadow-md cursor-pointer border border-white/10"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? 'PAUSAR' : 'REPRODUCIR SEÑAL'}</span>
                </button>
                <span className="font-mono-code font-bold text-white/90 text-[11px] tracking-wider">
                  MADRID FEED // SERVIDOR FIBRA ✦
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer p-1"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-[#A855F7]" /> : <Volume2 className="w-4 h-4" />}
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
                  className="w-24 h-1.5 bg-white/20 accent-[#C0D43E] cursor-pointer rounded-full"
                />
                <span className="font-mono-code font-bold text-xs">{isMuted ? '0%' : `${volume}%`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
