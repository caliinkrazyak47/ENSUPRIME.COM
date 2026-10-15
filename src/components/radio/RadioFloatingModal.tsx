import React, { useEffect, useRef, useState, useMemo } from 'react';
import Hls from 'hls.js';
import {
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Radio as RadioIcon,
  Sparkles,
  Signal,
  Flame,
  Globe2,
  ListMusic,
} from 'lucide-react';
import { RADIO_STATIONS, type RadioStation } from '../../data/radioStations';

interface RadioFloatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RadioFloatingModal: React.FC<RadioFloatingModalProps> = ({ isOpen, onClose }) => {
  // Current station selection
  const [currentStationIndex, setCurrentStationIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('TODAS');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const currentStation: RadioStation = RADIO_STATIONS[currentStationIndex] || RADIO_STATIONS[0];

  // Distinct countries/categories for filter pills like La Mega
  const categories = useMemo(() => {
    const list = ['TODAS', 'COLOMBIA', 'ESPAÑA', 'ESTADOS UNIDOS', 'PUERTO RICO', 'PERÚ'];
    return list;
  }, []);

  const filteredStations = useMemo(() => {
    if (selectedFilter === 'TODAS') return RADIO_STATIONS;
    return RADIO_STATIONS.filter((s) => s.country.toUpperCase() === selectedFilter.toUpperCase());
  }, [selectedFilter]);

  // Audio Playback Engine (Supports HLS .m3u8 & direct MP3 / AAC streams)
  useEffect(() => {
    if (!isOpen) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    setErrorMsg(null);
    setIsLoading(true);

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const streamUrl = currentStation.streamUrl;
    const isHls = streamUrl.includes('.m3u8');

    if (isHls && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(audio);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        if (isPlaying) {
          audio.play().catch(() => setIsPlaying(false));
        }
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          console.warn('HLS stream fatal error:', data);
          setErrorMsg('Reconectando señal en vivo...');
          hls.destroy();
        }
      });
    } else {
      audio.src = streamUrl;
      audio.load();
      if (isPlaying) {
        audio.play().catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
        });
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [currentStationIndex, isOpen]);

  // Handle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  // Next / Prev station
  const handleNext = () => {
    setCurrentStationIndex((prev) => (prev + 1) % RADIO_STATIONS.length);
  };

  const handlePrev = () => {
    setCurrentStationIndex((prev) => (prev - 1 + RADIO_STATIONS.length) % RADIO_STATIONS.length);
  };

  // Volume control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.85;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  // Audio element event listeners
  const handleWaiting = () => setIsLoading(true);
  const handlePlaying = () => {
    setIsLoading(false);
    setIsPlaying(true);
    setErrorMsg(null);
  };
  const handleAudioError = () => {
    setIsLoading(false);
    setErrorMsg('Stream no disponible temporalmente. Cambia de emisora.');
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
    >
      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onError={handleAudioError}
        playsInline
      />

      {/* Main Player Card Inspired by La Mega Player + Ensuprime Brand System */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-[#110B1C] border border-[#6E1FE8]/40 shadow-[0_25px_80px_rgba(110,31,232,0.45)] text-white flex flex-col font-body">
        
        {/* TOP BAR / HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#170E26]/90 backdrop-blur-md">
          {/* Brand & Live status badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#6E1FE8] to-[#9D4EDD] text-white shadow-[0_0_20px_rgba(110,31,232,0.6)]">
              <RadioIcon className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-black tracking-wider uppercase text-white">
                  RADIO EN VIVO
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C0D43E] text-[#110B1C] shadow-[0_0_12px_rgba(192,212,62,0.6)] animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#110B1C]"></span>
                  EN DIRECTO
                </span>
              </div>
              <p className="text-[11px] text-[#A8A29E] tracking-wider uppercase">
                PLAYER OFICIAL ENSUPRIME & RED URBANA
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Cerrar reproductor"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all transform hover:rotate-90 duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PLAYER MAIN BODY */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* HERO PLAYING SECTION (La Mega Style: Central Banner + Waveform + Direct Controls) */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C1230] via-[#150D24] to-[#0D0716] border border-[#6E1FE8]/30 p-6 sm:p-8">
            {/* Ambient background glow */}
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] opacity-35 pointer-events-none"
              style={{ backgroundColor: currentStation.accentColor || '#6E1FE8' }}
            />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#6E1FE8] blur-[110px] opacity-25 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              
              {/* Station Artwork / Logo with Equalizer Overlay */}
              <div className="relative group shrink-0">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-black/60 border-2 border-[#6E1FE8]/50 shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex items-center justify-center p-3">
                  {currentStation.cover ? (
                    <img
                      src={currentStation.cover}
                      alt={currentStation.name}
                      className="w-full h-full object-contain filter drop-shadow transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback avatar icon if image not available
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  {/* Fallback stylized badge if cover breaks */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#6E1FE8] to-[#110B1C] text-white p-4 -z-10 text-center">
                    <RadioIcon className="w-12 h-12 mb-2 text-[#C0D43E]" />
                    <span className="font-heading font-black text-sm uppercase">{currentStation.name}</span>
                  </div>
                </div>

                {/* Animated Audio Equalizer Bars when playing (La Mega Signature) */}
                <div className="absolute bottom-3 right-3 bg-[#110B1C]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1 shadow-lg">
                  <span className={`w-1 rounded-full bg-[#C0D43E] transition-all duration-300 ${isPlaying ? 'h-4 animate-[bounce_0.8s_ease-in-out_infinite]' : 'h-1.5'}`} />
                  <span className={`w-1 rounded-full bg-[#C0D43E] transition-all duration-300 ${isPlaying ? 'h-6 animate-[bounce_0.6s_ease-in-out_infinite_0.2s]' : 'h-2'}`} />
                  <span className={`w-1 rounded-full bg-[#C0D43E] transition-all duration-300 ${isPlaying ? 'h-3 animate-[bounce_0.9s_ease-in-out_infinite_0.1s]' : 'h-1'}`} />
                  <span className={`w-1 rounded-full bg-[#C0D43E] transition-all duration-300 ${isPlaying ? 'h-5 animate-[bounce_0.7s_ease-in-out_infinite_0.3s]' : 'h-2'}`} />
                </div>
              </div>

              {/* Station Details & Big Control Row */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#6E1FE8]/25 text-[#D8B4FE] border border-[#6E1FE8]/40">
                    {currentStation.flag} {currentStation.city}, {currentStation.country}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-white/5 text-[#C0D43E] border border-white/10 flex items-center gap-1">
                    <Signal className="w-3 h-3 text-[#C0D43E]" />
                    {currentStation.frequency}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-2xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-sm">
                    {currentStation.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-300 uppercase mt-1 flex items-center justify-center md:justify-start gap-2">
                    <Flame className="w-4 h-4 text-[#F97316]" />
                    {currentStation.genre}
                  </p>
                </div>

                {/* Error status notice if any */}
                {errorMsg && (
                  <p className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-lg inline-block">
                    {errorMsg}
                  </p>
                )}

                {/* CONTROLS ROW */}
                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                  {/* Prev Station */}
                  <button
                    onClick={handlePrev}
                    aria-label="Emisora anterior"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/90 hover:text-white border border-white/10 transition-transform active:scale-95 cursor-pointer"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  {/* Big Play/Pause Button in Brand Purple & Lime */}
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pausar transmisión' : 'Reproducir transmisión'}
                    className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#6E1FE8] hover:bg-[#7D29FF] text-white shadow-[0_0_30px_rgba(110,31,232,0.8)] border-2 border-[#C0D43E] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isPlaying ? (
                      <Pause className="w-7 h-7 fill-white" />
                    ) : (
                      <Play className="w-7 h-7 fill-white ml-1" />
                    )}
                  </button>

                  {/* Next Station */}
                  <button
                    onClick={handleNext}
                    aria-label="Siguiente emisora"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/90 hover:text-white border border-white/10 transition-transform active:scale-95 cursor-pointer"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>

                  {/* Volume Slider & Mute Toggle */}
                  <div className="flex items-center gap-2 pl-2 sm:pl-4">
                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                      className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-5 h-5 text-red-400" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-[#C0D43E]" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      aria-label="Volumen"
                      className="w-20 sm:w-28 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C0D43E]"
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* REGION / CATEGORY FILTER PILLS (Bogotá, Medellín, España, etc.) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#A8A29E] flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#6E1FE8]" />
                SELECCIONA POR PAÍS / CIUDAD
              </span>
              <span className="text-[11px] font-semibold text-[#C0D43E]">
                {filteredStations.length} Emisoras disponibles
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-black tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#6E1FE8] text-white shadow-[0_0_15px_rgba(110,31,232,0.6)] border border-[#C0D43E]'
                        : 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* GRID OF EMISORAS / STATIONS (Direct click to tune in) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#A8A29E] flex items-center gap-2">
                <ListMusic className="w-4 h-4 text-[#C0D43E]" />
                DIAL & ESTACIONES EN VIVO
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredStations.map((station) => {
                const isSelected = station.id === currentStation.id;
                const actualIndex = RADIO_STATIONS.findIndex((s) => s.id === station.id);

                return (
                  <button
                    key={station.id}
                    onClick={() => {
                      setCurrentStationIndex(actualIndex);
                      setIsPlaying(true);
                    }}
                    className={`group relative text-left p-3 rounded-2xl transition-all duration-200 flex items-center gap-3.5 border cursor-pointer ${
                      isSelected
                        ? 'bg-[#6E1FE8]/20 border-[#C0D43E] shadow-[0_0_20px_rgba(110,31,232,0.35)]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#6E1FE8]/50'
                    }`}
                  >
                    {/* Station thumb */}
                    <div className="relative w-12 h-12 rounded-xl bg-black/40 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                      {station.cover ? (
                        <img
                          src={station.cover}
                          alt={station.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : null}
                      <span className="text-base select-none">{station.flag}</span>
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-heading font-black text-sm uppercase text-white truncate group-hover:text-[#C0D43E] transition-colors">
                          {station.name}
                        </h4>
                        {isSelected && isPlaying && (
                          <span className="w-2 h-2 rounded-full bg-[#C0D43E] animate-ping shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate">
                        {station.city} • {station.frequency.split('•')[0] || station.frequency}
                      </p>
                    </div>

                    {/* Play icon indicator */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isSelected
                          ? 'bg-[#C0D43E] text-[#110B1C]'
                          : 'bg-white/10 text-white/70 group-hover:bg-[#6E1FE8] group-hover:text-white'
                      }`}
                    >
                      {isSelected && isPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* BOTTOM FOOTER / BRANDING */}
        <div className="px-6 py-3.5 bg-[#170E26] border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C0D43E]" />
            <span>Transmisión Digital de Alta Definición (HLS / AAC 320 kbps)</span>
          </div>
          <div className="font-bold text-white/80">
            ENSUPRIME LIVE RADIO • 2026
          </div>
        </div>

      </div>
    </div>
  );
};
