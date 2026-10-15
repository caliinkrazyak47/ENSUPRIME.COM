import React, { useRef, useState } from 'react';
import { ArrowRight, Play, Pause, Volume2, VolumeX, Eye } from 'lucide-react';

interface TikTokItem {
  id: string;
  creator: string;
  handle: string;
  views: string;
  title: string;
  cover: string;
  videoUrl?: string;
  bgColor: string;
  tags: { label: string; bg: string; color: string }[];
}

const TIKTOK_DATA: TikTokItem[] = [
  {
    id: "01",
    creator: "KAYDY CAIN",
    handle: "@kaydycain",
    views: "1.4M",
    title: "Nueva sesión exclusiva de estudio // preview inédito de la mixtape",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/v47hsuhi/video/upload/v1791976976/Animate_locker_and_paper_movement_20261014132221.mp4",
    bgColor: "#787B91",
    tags: [
      { label: "EXCLUSIVO", bg: "#00ECEF", color: "#000" },
      { label: "TRAP ES", bg: "#FF9D00", color: "#000" },
    ],
  },
  {
    id: "02",
    creator: "MORAD",
    handle: "@elmoraddd",
    views: "3.2M",
    title: "Grabando el próximo videoclip en las calles de Hospitalet // Raw Cut",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/v47hsuhi/video/upload/v1791976976/Animate_locker_and_paper_movement_20261014132221.mp4",
    bgColor: "#C0D43E",
    tags: [
      { label: "STREET LIFE", bg: "#FF3EBA", color: "#FFF" },
      { label: "VIRAL", bg: "#141414", color: "#FFF" },
    ],
  },
  {
    id: "03",
    creator: "BAD GYAL",
    handle: "@akabadgyal",
    views: "4.8M",
    title: "Ensayos de coreografía tour 2026 // Backstage antes de romper el show",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/v47hsuhi/video/upload/v1791976976/Animate_locker_and_paper_movement_20261014132221.mp4",
    bgColor: "#284334",
    tags: [
      { label: "DANCEHALL", bg: "#FFF302", color: "#000" },
      { label: "TOP 1", bg: "#6E1FE8", color: "#FFF" },
    ],
  },
  {
    id: "04",
    creator: "SAIKO",
    handle: "@saikobeats",
    views: "2.1M",
    title: "Sesión acústica improvisada entre bastidores con la banda",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/v47hsuhi/video/upload/v1791976976/Animate_locker_and_paper_movement_20261014132221.mp4",
    bgColor: "#FFF302",
    tags: [
      { label: "DIRECTO", bg: "#00ECEF", color: "#000" },
      { label: "SESSION", bg: "#141414", color: "#FFF" },
    ],
  },
  {
    id: "05",
    creator: "QUEVEDO",
    handle: "@quevedoyouknow",
    views: "5.6M",
    title: "Directo de medianoche charlando con los oyentes y preview de drop",
    cover: "https://images.unsplash.com/photo-1445985543470-41fdd5c31447?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/v47hsuhi/video/upload/v1791976976/Animate_locker_and_paper_movement_20261014132221.mp4",
    bgColor: "#1EB6E2",
    tags: [
      { label: "HIT 2026", bg: "#FF9D00", color: "#000" },
      { label: "COMMUNITY", bg: "#141414", color: "#FFF" },
    ],
  },
  {
    id: "06",
    creator: "DELLAFUENTE",
    handle: "@dellafuente",
    views: "1.9M",
    title: "Proceso de diseño de la nueva colección textil y sound design",
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/v47hsuhi/video/upload/v1791976976/Animate_locker_and_paper_movement_20261014132221.mp4",
    bgColor: "#6E1FE8",
    tags: [
      { label: "ARTE", bg: "#CEFF00", color: "#000" },
      { label: "SOUNDSYSTEM", bg: "#FFFFFF", color: "#000" },
    ],
  },
];

export const PremiumTikTokSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  // Duplicamos los elementos para que el scroll continuo fluya sin saltos
  const displayItems = [...TIKTOK_DATA, ...TIKTOK_DATA, ...TIKTOK_DATA];



  const handleTogglePlay = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingVideoId === id) {
      setPlayingVideoId(null);
    } else {
      setPlayingVideoId(id);
      setIsAutoScrollPaused(true);
    }
  };

  return (
    <section id="tiktok" className="relative w-full py-24 px-4 sm:px-8 md:px-12 bg-white text-[#110B1C] overflow-hidden select-none">
      {/* Estrellas decorativas de fondo sobre fondo blanco */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="absolute top-12 right-[10%] text-6xl text-[#6E1FE8]/15 select-none">✦</span>
        <span className="absolute bottom-10 left-[6%] text-5xl text-[#6E1FE8]/10 select-none">✦</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* CABECERA VIBRANTE */}
        <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white shadow-sm">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </span>
            <span className="bg-[#6E1FE8] text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              VIRAL // TRENDS & DROPS
            </span>
          </div>

          <h2 className="font-impact text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[#6E1FE8] flex items-center justify-center flex-wrap gap-3">
            TIKTOK <span className="bg-[#6E1FE8] text-white px-4 py-1 rounded-2xl inline-block transform -rotate-1 shadow-lg">FEED</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-gray-600 max-w-xl mx-auto mt-4 font-semibold">
            Descubre los clips virales y fragmentos de estudio más destacados de la escena urbana.
          </p>
        </div>



        {/* ============================================================== */}
        {/* CARRUSEL DE TARJETAS EN MOVIMIENTO LINEAL CONTINUO (DG-CINEMA) */}
        {/* ============================================================== */}
        <div
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setIsAutoScrollPaused(true)}
          onMouseLeave={() => {
            if (!playingVideoId) setIsAutoScrollPaused(false);
          }}
        >
          {/* Sombras laterales de desvanecimiento suave */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          {/* CONTENEDOR CON MOVIMIENTO LINEAL CONTINUO */}
          <div
            ref={scrollRef}
            className={`flex gap-6 sm:gap-8 items-stretch w-max ${
              isAutoScrollPaused ? '' : 'animate-dg-cinema'
            }`}
          >
            {displayItems.map((item, idx) => {
              const uniqueKey = `${item.id}-${idx}`;
              const isPlaying = playingVideoId === uniqueKey || playingVideoId === item.id;

              return (
                <article
                  key={uniqueKey}
                  onClick={(e) => handleTogglePlay(uniqueKey, e)}
                  className="w-[300px] sm:w-[340px] max-w-[360px] flex-shrink-0 flex flex-col group cursor-pointer transition-transform duration-500 hover:-translate-y-2 select-none"
                >
                  {/* DISEÑO ORIGINAL EXACTO DE LA TARJETA (AARDVARK / ENSUPRIME COMPLETO) */}
                  <div
                    className="relative rounded-[2rem] sm:rounded-[2.4rem] p-4 sm:p-5 flex flex-col justify-between h-full transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.1)] group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.18)] border border-black/5"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    {/* RECIPIENTE MULTIMEDIA 9:13 */}
                    <div className="relative aspect-[9/13] w-full rounded-2xl sm:rounded-[1.4rem] overflow-hidden bg-black shadow-inner">
                      {/* VIDEO ACTIVO / PORTADA INTERACTIVA */}
                      {isPlaying && item.videoUrl ? (
                        <video
                          src={item.videoUrl}
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={item.cover}
                          alt={item.creator}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}

                      {/* Sombra de viñeta para lectura clara */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

                      {/* BADGE SUPERIOR DE SLOT ID & VISTAS */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between font-mono-code text-xs z-10">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 text-black font-bold text-[11px] shadow-md backdrop-blur-sm">
                          #{item.id}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 text-white font-bold text-[11px] shadow-md backdrop-blur-sm border border-white/10">
                          <Eye className="w-3.5 h-3.5 text-[#00ECEF]" />
                          {item.views}
                        </span>
                      </div>

                      {/* BOTÓN REPRODUCTOR PLAY / PAUSE CENTRAL (CLICK INTERACTIVO) */}
                      <div
                        onClick={(e) => handleTogglePlay(uniqueKey, e)}
                        className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/95 text-black flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.35)] hover:scale-110 hover:bg-[#6E1FE8] hover:text-white transition-all duration-300">
                          {isPlaying ? (
                            <Pause className="w-6 h-6 fill-current" />
                          ) : (
                            <Play className="w-6 h-6 fill-current ml-0.5" />
                          )}
                        </div>
                      </div>

                      {/* CONTROL DE AUDIO MUTE EN ESQUINA INFERIOR */}
                      {isPlaying && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMuted(!isMuted);
                          }}
                          className="absolute bottom-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors z-20"
                          title={isMuted ? 'Activar sonido' : 'Silenciar'}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-green-400" />}
                        </button>
                      )}
                    </div>

                    {/* CONTENIDO DE TEXTO, TAGS Y DETALLES DEL CREADOR */}
                    <div className="mt-4 flex flex-col justify-between text-white flex-grow">
                      {/* Tags / Pills de género */}
                      <div className="flex flex-wrap gap-2 mb-2.5">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-full font-mono-code font-bold text-[10px] tracking-wider uppercase shadow-sm"
                            style={{
                              backgroundColor: tag.bg,
                              color: tag.color,
                            }}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>

                      {/* Creador y Handle oficial */}
                      <div>
                        <p className="font-mono-code text-xs font-bold text-white/80 uppercase tracking-wider mb-0.5">
                          {item.handle}
                        </p>
                        <h3 className="font-impact text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
                          {item.creator}
                        </h3>
                        <p className="font-body text-xs text-white/90 font-medium line-clamp-2 mt-1 leading-snug">
                          {item.title}
                        </p>
                      </div>

                      {/* BOTÓN INFERIOR INTERACTIVO */}
                      <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                        <span className="font-mono-code text-[11px] font-bold tracking-wider uppercase text-white/90">
                          {isPlaying ? "EN REPRODUCCIÓN" : "REPRODUCIR CLIP"}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-[#110B1C] group-hover:text-white transition-all shadow-sm">
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* ANIMACIÓN LINEAL CONTINUA ESTILO DG-CINEMA */}
      <style>{`
        @keyframes dgCinemaScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333333%, 0, 0);
          }
        }
        .animate-dg-cinema {
          animation: dgCinemaScroll 38s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};
