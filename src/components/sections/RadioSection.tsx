import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { RADIO_CHANNELS, type RadioChannel } from '../../data/config';

export function RadioSection() {
  const [selectedChannel, setSelectedChannel] = useState<RadioChannel>(RADIO_CHANNELS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleRadio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      setHasError(false);
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setHasError(true);
          setIsPlaying(false);
        });
    }
  };

  const switchChannel = (channel: RadioChannel) => {
    setSelectedChannel(channel);
    setIsPlaying(false);
    setHasError(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        setIsLoading(true);
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
            setHasError(true);
          });
      }
    }, 100);
  };

  return (
    <section id="radio" className="relative py-32 px-6 md:px-14 bg-[#090909] text-[#F4F1EC] border-b border-white/10">
      {/* Real HTML5 Live Audio Element */}
      <audio
        ref={audioRef}
        src={selectedChannel.streamUrl}
        preload="none"
        muted={isMuted}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
          setIsPlaying(false);
        }}
      />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 font-mono-code text-xs text-[#8D8D91]">
          <div className="space-y-1">
            <span className="text-[#F4F1EC] font-bold tracking-widest uppercase block">
              // 04. THIAGOVSC RADIO
            </span>
            <span className="text-white text-base font-display font-extrabold uppercase">
              LIVE FROM THE CULTURE.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF3434] animate-ping" />
            <span className="text-white font-bold">STREAMING DIRECTO</span>
          </div>
        </div>

        {/* Radio Console Master Box */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#111111] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.9)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Vintage Digital Display */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono-code text-[10px] text-[#8B5CF6] uppercase tracking-widest font-bold">
                CANAL ACTIVO: {selectedChannel.frequency}
              </span>
              <span className="font-mono-code text-xs text-[#8D8D91]">
                {selectedChannel.city}
              </span>
            </div>

            <h3 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              {selectedChannel.name}
            </h3>

            <p className="font-grotesk text-sm sm:text-base text-[#8D8D91] leading-relaxed">
              Programación ininterrumpida con los ritmos que marcan la pauta en la cultura urbana contemporánea. Sonido en directo sin publicidad invasiva.
            </p>

            {/* Live Audio Visualizer bars */}
            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
              <div className="flex items-end gap-1.5 h-8">
                {[4, 18, 12, 26, 8, 22, 16, 28, 10, 20, 14, 24, 6, 18, 12].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 bg-[#8B5CF6] rounded-full transition-all duration-300 ${
                      isPlaying ? 'animate-pulse' : 'opacity-30'
                    }`}
                    style={{ height: isPlaying ? `${h}px` : '4px' }}
                  />
                ))}
              </div>

              <div className="font-mono-code text-xs text-right">
                <span className="text-[#8D8D91] block text-[10px]">ESTADO DE SEÑAL</span>
                <span className={`font-bold ${isPlaying ? 'text-[#33e4b8]' : 'text-white/60'}`}>
                  {isLoading ? 'CONECTANDO...' : hasError ? 'ERROR DE SEÑAL' : isPlaying ? 'TRANSMITIENDO LIVE' : 'LISTO'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={toggleRadio}
                className="px-8 py-3.5 rounded-full bg-[#F4F1EC] hover:bg-[#8B5CF6] text-[#090909] hover:text-white transition-colors font-grotesk font-bold text-xs uppercase tracking-wider flex items-center gap-3 shadow-lg"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                <span>{isPlaying ? 'Detener Emisión' : 'Conectar en Vivo'}</span>
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                aria-label="Silenciar"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#FF3434]" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Right: Station Switcher */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono-code text-xs text-[#8D8D91] uppercase tracking-wider block">
              DIAL DE EMISORAS DISPONIBLES
            </span>
            <div className="space-y-3">
              {RADIO_CHANNELS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => switchChannel(ch)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all ${
                    selectedChannel.id === ch.id
                      ? 'bg-white/10 border-[#8B5CF6] text-white'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/5 text-[#8D8D91] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono-code text-[11px] text-[#8B5CF6] font-bold">
                      {ch.frequency}
                    </span>
                    <span className="font-mono-code text-[10px] text-[#8D8D91]">{ch.city}</span>
                  </div>
                  <div className="font-display font-bold text-xl text-white uppercase">
                    {ch.name}
                  </div>
                  <div className="font-grotesk text-xs text-[#8D8D91] mt-1">{ch.genre}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
