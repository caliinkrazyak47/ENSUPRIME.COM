import { useState, useRef } from 'react';
import { Play, Pause, Maximize2, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { TIKTOK_SLOTS, type TikTokSlot } from '../../data/config';

export function TikTokSection() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [fullscreenVideo, setFullscreenVideo] = useState<TikTokSlot | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleTogglePlay = (slot: TikTokSlot) => {
    const video = videoRefs.current[slot.id];
    if (!video) return;

    if (activeVideoId === slot.id) {
      video.pause();
      setActiveVideoId(null);
    } else {
      // Pausar todos los demás
      Object.keys(videoRefs.current).forEach((id) => {
        if (id !== slot.id && videoRefs.current[id]) {
          videoRefs.current[id]?.pause();
        }
      });
      video.play().then(() => setActiveVideoId(slot.id)).catch(() => {});
    }
  };

  const handleNext = () => {
    setScrollIndex((prev) => Math.min(prev + 1, TIKTOK_SLOTS.length - 4));
  };
  const handlePrev = () => {
    setScrollIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="tiktok" className="relative py-32 px-6 md:px-14 bg-[#111111] text-[#F4F1EC] border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 font-mono-code text-xs text-[#8D8D91]">
          <div className="space-y-1">
            <span className="text-[#F4F1EC] font-bold tracking-widest uppercase block">
              // 03. IN THE LOOP
            </span>
            <span className="text-white text-base font-display font-extrabold uppercase">
              THE CULTURE. UNFILTERED.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#8D8D91] mr-2">10 SLOTS CONFIGURABLES</span>
            <button
              onClick={handlePrev}
              disabled={scrollIndex === 0}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white transition-colors border border-white/10"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={scrollIndex >= TIKTOK_SLOTS.length - 4}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white transition-colors border border-white/10"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 10 TikTok Horizontal Cards Grid */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${scrollIndex * 290}px)` }}
          >
            {TIKTOK_SLOTS.map((slot) => {
              const isCurrentPlaying = activeVideoId === slot.id;
              return (
                <div
                  key={slot.id}
                  className="flex-shrink-0 w-[270px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#090909] border border-white/10 relative group flex flex-col justify-between shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                >
                  {/* Poster / Native Video Layer */}
                  {slot.videoSrc ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[slot.id] = el;
                      }}
                      src={slot.videoSrc}
                      poster={slot.posterImage}
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover"
                      onClick={() => handleTogglePlay(slot)}
                    />
                  ) : (
                    <img
                      src={slot.posterImage}
                      alt={slot.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

                  {/* Top Bar on Card */}
                  <div className="relative z-10 p-4 flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono-code text-[9px] uppercase tracking-wider text-[#D8D8DB]">
                      {slot.category}
                    </span>
                    <button
                      onClick={() => setFullscreenVideo(slot)}
                      className="p-1.5 rounded-full bg-black/60 text-white hover:text-[#8B5CF6] transition-colors"
                      title="Pantalla completa"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Center Play Button Overlay */}
                  <button
                    onClick={() => handleTogglePlay(slot)}
                    className={`relative z-10 my-auto mx-auto w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all ${
                      isCurrentPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-90'
                    }`}
                  >
                    {isCurrentPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </button>

                  {/* Bottom Creator & Title */}
                  <div className="relative z-10 p-4 space-y-1.5">
                    <div className="font-mono-code text-[11px] text-[#8B5CF6] font-bold">
                      {slot.creator}
                    </div>
                    <div className="font-grotesk text-xs text-white font-medium line-clamp-2">
                      {slot.title}
                    </div>
                    {slot.externalUrl && (
                      <a
                        href={slot.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono-code text-[10px] text-[#8D8D91] hover:text-white transition-colors pt-1"
                      >
                        <span>ABRIR EN TIKTOK</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {fullscreenVideo && (
        <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreenVideo(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#8B5CF6] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/20 relative shadow-2xl">
            {fullscreenVideo.videoSrc ? (
              <video
                src={fullscreenVideo.videoSrc}
                poster={fullscreenVideo.posterImage}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={fullscreenVideo.posterImage}
                alt={fullscreenVideo.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
