import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ExternalLink, Music2 } from 'lucide-react';
import { MUSIC_CATALOG, type MusicRelease } from '../../data/config';

export function FeaturedMusicSection() {
  const [activeTrack, setActiveTrack] = useState<MusicRelease>(MUSIC_CATALOG[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const selectTrack = (track: MusicRelease) => {
    setActiveTrack(track);
    setIsPlaying(false);
    setProgress(0);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 100);
  };

  return (
    <section id="music" className="relative py-32 px-6 md:px-14 bg-[#090909] text-[#F4F1EC] border-b border-white/10">
      {/* Hidden real HTML5 Audio element */}
      <audio
        ref={audioRef}
        src={activeTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        muted={isMuted}
      />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 font-mono-code text-xs text-[#8D8D91]">
          <div className="space-y-1">
            <span className="text-[#F4F1EC] font-bold tracking-widest uppercase block">
              // 02. AUDIO CULTURE & CATÁLOGO
            </span>
            <span>PRODUCCIONES ORIGINALES, SESIONES Y REMIXES</span>
          </div>
          <div>FORMATO: MASTER HIGH-RES</div>
        </div>

        {/* Main Editorial Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Featured Cover with subtle scale on hover */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#111111] border border-white/10 group shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <img
                src={activeTrack.coverImage}
                alt={activeTrack.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-5 left-5">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono-code text-[10px] text-[#D8D8DB] uppercase tracking-wider">
                  {activeTrack.genre}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end font-mono-code text-xs text-[#8D8D91]">
                <span>LANZAMIENTO: {activeTrack.releaseDate}</span>
                <span className="text-white font-bold">{activeTrack.duration}</span>
              </div>
            </div>
          </div>

          {/* Right: Player Controls & Secondary List */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="font-mono-code text-xs text-[#8B5CF6] uppercase tracking-widest font-bold">
                EN REPRODUCCIÓN AHORA
              </span>
              <h3 className="font-display font-extrabold text-4xl sm:text-6xl text-white uppercase tracking-tight">
                {activeTrack.title}
              </h3>
              <p className="font-grotesk text-lg text-[#8D8D91]">
                {activeTrack.artist}
              </p>
            </div>

            {/* Audio Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#8B5CF6] transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between font-mono-code text-[11px] text-[#8D8D91]">
                <span>{isPlaying ? 'EN TRANSMISIÓN' : 'PAUSADO'}</span>
                <span>{activeTrack.duration}</span>
              </div>
            </div>

            {/* Interactive Player Controls */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-[#F4F1EC] hover:bg-[#8B5CF6] text-[#090909] hover:text-white flex items-center justify-center transition-colors shadow-lg"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                aria-label="Silenciar"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-[#FF3434]" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <a
                href={activeTrack.platformUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#111111] hover:bg-white/10 border border-white/15 text-xs font-grotesk font-bold text-white uppercase tracking-wider transition-colors ml-auto"
              >
                <span>ESCUCHAR EN PLATAFORMAS</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8D8D91]" />
              </a>
            </div>

            {/* Secondary Release Selection List */}
            <div className="pt-6 border-t border-white/10 space-y-3 font-grotesk">
              <span className="font-mono-code text-[11px] text-[#8D8D91] uppercase tracking-wider block">
                OTROS LANZAMIENTOS RECIENTES
              </span>
              <div className="space-y-2">
                {MUSIC_CATALOG.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => selectTrack(track)}
                    className={`w-full p-3.5 rounded-xl text-left flex items-center justify-between border transition-all ${
                      activeTrack.id === track.id
                        ? 'bg-white/10 border-[#8B5CF6] text-white'
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-[#8D8D91] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Music2 className="w-4 h-4 text-[#8B5CF6]" />
                      <div>
                        <div className="font-bold text-sm text-white">{track.title}</div>
                        <div className="text-xs text-[#8D8D91]">{track.artist}</div>
                      </div>
                    </div>
                    <span className="font-mono-code text-xs">{track.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
