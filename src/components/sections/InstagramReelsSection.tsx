import { useState, useRef } from 'react';
import { Play, Pause, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { REEL_SLOTS, type ReelSlot } from '../../data/config';

export function InstagramReelsSection() {
  const [activeReelId, setActiveReelId] = useState<string | null>(null);
  const [fullscreenReel, setFullscreenReel] = useState<ReelSlot | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleTogglePlay = (reel: ReelSlot) => {
    const video = videoRefs.current[reel.id];
    if (!video) return;

    if (activeReelId === reel.id) {
      video.pause();
      setActiveReelId(null);
    } else {
      Object.keys(videoRefs.current).forEach((id) => {
        if (id !== reel.id && videoRefs.current[id]) {
          videoRefs.current[id]?.pause();
        }
      });
      video.play().then(() => setActiveReelId(reel.id)).catch(() => {});
    }
  };

  const handleNext = () => {
    setScrollIndex((prev) => Math.min(prev + 1, REEL_SLOTS.length - 4));
  };
  const handlePrev = () => {
    setScrollIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="reels" className="relative py-32 px-6 md:px-14 bg-[#090909] text-[#F4F1EC] border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 font-mono-code text-xs text-[#8D8D91]">
          <div className="space-y-1">
            <span className="text-[#F4F1EC] font-bold tracking-widest uppercase block">
              // 05. VISUAL DIARIES
            </span>
            <span className="text-white text-base font-display font-extrabold uppercase">
              A MOVING ARCHIVE OF MUSIC, MOMENTS AND VISUAL CULTURE.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#8D8D91] mr-2">10 SLOTS EDITORIALES</span>
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
              disabled={scrollIndex >= REEL_SLOTS.length - 4}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white transition-colors border border-white/10"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 10 Reels Editorial Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${scrollIndex * 300}px)` }}
          >
            {REEL_SLOTS.map((reel) => {
              const isPlaying = activeReelId === reel.id;
              return (
                <div
                  key={reel.id}
                  className="flex-shrink-0 w-[280px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#111111] border border-white/10 relative group flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
                >
                  {reel.videoSrc ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[reel.id] = el;
                      }}
                      src={reel.videoSrc}
                      poster={reel.posterImage}
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onClick={() => handleTogglePlay(reel)}
                    />
                  ) : (
                    <img
                      src={reel.posterImage}
                      alt={reel.altText}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

                  {/* Top Header */}
                  <div className="relative z-10 p-4 flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono-code text-[9px] uppercase tracking-wider text-[#F4F1EC]">
                      {reel.category}
                    </span>
                    <button
                      onClick={() => setFullscreenReel(reel)}
                      className="p-1.5 rounded-full bg-black/60 text-white hover:text-[#8B5CF6] transition-colors"
                      title="Ver en pantalla completa"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Center Play Overlay */}
                  <button
                    onClick={() => handleTogglePlay(reel)}
                    className={`relative z-10 my-auto mx-auto w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all ${
                      isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-90'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>

                  {/* Bottom Metadata */}
                  <div className="relative z-10 p-4 space-y-1">
                    <div className="font-mono-code text-[10px] text-[#8D8D91]">
                      {reel.creator}
                    </div>
                    <div className="font-display font-bold text-lg text-white uppercase leading-tight line-clamp-2">
                      {reel.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenReel && (
        <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreenReel(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#8B5CF6] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/20 relative shadow-2xl">
            {fullscreenReel.videoSrc ? (
              <video
                src={fullscreenReel.videoSrc}
                poster={fullscreenReel.posterImage}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={fullscreenReel.posterImage}
                alt={fullscreenReel.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
