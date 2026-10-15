import { useState } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';
import { TV_PROGRAMMING, type TVBroadcast } from '../../data/config';

export function TVOnlineSection() {
  const [selectedBroadcast, setSelectedBroadcast] = useState<TVBroadcast>(TV_PROGRAMMING[0]);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="tv" className="relative py-32 px-6 md:px-14 bg-[#111111] text-[#F4F1EC] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 font-mono-code text-xs text-[#8D8D91]">
          <div className="space-y-1">
            <span className="text-[#F4F1EC] font-bold tracking-widest uppercase block">
              // 06. NOW TRANSMITTING
            </span>
            <span className="text-white text-base font-display font-extrabold uppercase">
              TV ONLINE • STREAMING & VÍDEOS EN ALTA DEFINICIÓN
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF3434] animate-ping" />
            <span className="text-[#FF3434] font-bold">LIVE ON-AIR</span>
          </div>
        </div>

        {/* Master Video Broadcast Player */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main 16:9 Player */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              <iframe
                src={`${selectedBroadcast.videoUrl}&mute=${isMuted ? '1' : '0'}`}
                title={selectedBroadcast.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              />

              {/* Floating Unmute Control */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-5 left-5 z-20 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#090909]/80 hover:bg-[#8B5CF6] text-white backdrop-blur-md border border-white/10 font-grotesk font-bold text-xs uppercase tracking-wider transition-all"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#FF3434]" /> : <Volume2 className="w-4 h-4" />}
                <span>{isMuted ? 'Activar Audio' : 'Audio en Directo'}</span>
              </button>

              <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono-code text-white">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>FORMATO 16:9 • DIRECTO</span>
              </div>
            </div>

            {/* Video Synopsis & Details */}
            <div className="p-6 rounded-2xl bg-[#090909] border border-white/10 space-y-2">
              <div className="flex items-center justify-between font-mono-code text-xs text-[#8D8D91]">
                <span className="text-[#8B5CF6] font-bold">{selectedBroadcast.category}</span>
                <span>{selectedBroadcast.duration}</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white uppercase">
                {selectedBroadcast.title}
              </h3>
              <p className="font-grotesk text-sm text-[#8D8D91] leading-relaxed">
                {selectedBroadcast.synopsis}
              </p>
            </div>
          </div>

          {/* Right Playlist List */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono-code text-xs text-[#8D8D91] uppercase tracking-wider block">
              CONTENIDOS SELECCIONADOS
            </span>
            <div className="space-y-3">
              {TV_PROGRAMMING.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedBroadcast(item)}
                  className={`w-full p-3.5 rounded-2xl text-left border flex gap-4 transition-all ${
                    selectedBroadcast.id === item.id
                      ? 'bg-white/10 border-[#8B5CF6] text-white'
                      : 'bg-[#090909] border-white/10 hover:bg-white/5 text-[#8D8D91] hover:text-white'
                  }`}
                >
                  <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-black flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 fill-white text-white opacity-80" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono-code text-[10px] text-[#8B5CF6] uppercase block">
                      {item.category}
                    </span>
                    <h4 className="font-display font-bold text-sm text-white uppercase leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                    <span className="font-mono-code text-[10px] text-[#8D8D91] block">
                      {item.duration}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
