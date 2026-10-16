import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import {
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  Share2
} from 'lucide-react';
import { RADIO_STATIONS, type RadioStation } from '../../data/radioStations';

interface FlaixBottomPlayerProps {
  onStationChange?: (station: RadioStation) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  isHidden?: boolean;
}

export const FlaixBottomPlayer: React.FC<FlaixBottomPlayerProps> = ({
  onStationChange,
  onPlayStateChange,
  isHidden = false,
}) => {
  const [currentStationIndex, setCurrentStationIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const volumeRef = useRef<HTMLDivElement | null>(null);

  // Cerrar control de volumen al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target as Node)) {
        setIsVolumeOpen(false);
      }
    };
    if (isVolumeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVolumeOpen]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const currentStation = RADIO_STATIONS[currentStationIndex] || RADIO_STATIONS[0];

  // Desbloqueo y reproducción automática de la radio con la primera interacción del usuario si el navegador restringe audio
  useEffect(() => {
    const unlockAndPlay = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(() => {});
      }
      window.removeEventListener('click', unlockAndPlay);
      window.removeEventListener('keydown', unlockAndPlay);
      window.removeEventListener('touchstart', unlockAndPlay);
    };

    window.addEventListener('click', unlockAndPlay, { once: true });
    window.addEventListener('keydown', unlockAndPlay, { once: true });
    window.addEventListener('touchstart', unlockAndPlay, { once: true });

    return () => {
      window.removeEventListener('click', unlockAndPlay);
      window.removeEventListener('keydown', unlockAndPlay);
      window.removeEventListener('touchstart', unlockAndPlay);
    };
  }, [isPlaying]);

  // Manejo de transmisión de audio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume / 100;

    const cleanupHls = () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };

    if (isPlaying) {
      cleanupHls();
      const streamUrl = currentStation.streamUrl;

      if (streamUrl.includes('.m3u8')) {
        if (Hls.isSupported()) {
          const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
          hls.loadSource(streamUrl);
          hls.attachMedia(audio);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            audio.play().catch(() => {});
          });
          hlsRef.current = hls;
        } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
          audio.src = streamUrl;
          audio.play().catch(() => {});
        }
      } else {
        audio.src = streamUrl;
        audio.play().catch(() => {});
      }
    } else {
      audio.pause();
    }

    if (onStationChange) onStationChange(currentStation);
    if (onPlayStateChange) onPlayStateChange(isPlaying);

    return () => {
      cleanupHls();
    };
  }, [currentStationIndex, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const handleNextStation = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentStationIndex((prev) => (prev + 1) % RADIO_STATIONS.length);
    setIsPlaying(true);
  };

  const handlePrevStation = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentStationIndex((prev) => (prev - 1 + RADIO_STATIONS.length) % RADIO_STATIONS.length);
    setIsPlaying(true);
  };

  const handleShareStation = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <>
      {/* ============================================================== */}
      {/* 1. REPRODUCTOR A PANTALLA COMPLETA EXACTO A FLAIX FM */}
      {/* FONDO MORADO #6E1FE8, PORTADA, ENSUPRIME.ES, CONTROLES LIMPIOS */}
      {/* ============================================================== */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-500 ease-out flex flex-col justify-between bg-[#6E1FE8] text-white select-none ${
          isExpanded
            ? 'translate-y-0 opacity-100 visible'
            : 'translate-y-full opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Cabecera superior: Flecha chevron hacia abajo a la derecha */}
        <div className="w-full px-6 md:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-wide text-white/90">
              ENSUPRIME.COM
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(false)}
            className="p-2 text-white/80 hover:text-white transition-transform hover:scale-110 cursor-pointer"
            title="Minimizar reproductor"
          >
            <ChevronDown className="w-8 h-8 stroke-[2.5]" />
          </button>
        </div>

        {/* Centro: Carátula cuadrada limpia, título de estación y controles */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 max-w-lg mx-auto w-full text-center">
          {/* Carátula cuadrada */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-8 border border-white/20">
            <img
              src={currentStation.cover}
              alt={currentStation.name}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>

          {/* Nombre de canción / estación limpio */}
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              {currentStation.name}
            </h2>
          </div>

          {/* Subtítulo: ENSUPRIME.COM */}
          <p className="text-xs sm:text-sm font-medium text-white/80 tracking-wider uppercase mb-8">
            ENSUPRIME.COM · {currentStation.city}
          </p>

          {/* Barra de Controles: Volumen, Anterior, Play/Pause Blanco, Siguiente, Compartir */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6">
            {/* Volumen */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-white/80 transition-transform hover:scale-110 cursor-pointer p-1"
              title={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-6 h-6 stroke-[2]" />
              ) : (
                <Volume2 className="w-6 h-6 stroke-[2]" />
              )}
            </button>

            {/* Anterior (SkipBack) */}
            <button
              onClick={handlePrevStation}
              className="text-white hover:text-white/80 transition-transform hover:scale-110 cursor-pointer p-1"
              title="Emisora anterior"
            >
              <SkipBack className="w-7 h-7 fill-current" />
            </button>

            {/* Play / Pause Blanco Circular Grande */}
            <button
              onClick={handleTogglePlay}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white text-[#110B1C] flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer"
              title={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
              ) : (
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
              )}
            </button>

            {/* Siguiente (SkipForward) */}
            <button
              onClick={handleNextStation}
              className="text-white hover:text-white/80 transition-transform hover:scale-110 cursor-pointer p-1"
              title="Siguiente emisora"
            >
              <SkipForward className="w-7 h-7 fill-current" />
            </button>

            {/* Compartir */}
            <button
              onClick={handleShareStation}
              className="text-white hover:text-white/80 transition-transform hover:scale-110 cursor-pointer p-1"
              title="Compartir"
            >
              <Share2 className="w-6 h-6 stroke-[2]" />
            </button>
          </div>

          {/* Mensaje de enlace copiado */}
          {copiedLink && (
            <span className="text-xs font-mono-code text-white bg-white/20 px-3 py-1 rounded-full">
              ¡Enlace copiado al portapapeles!
            </span>
          )}
        </div>

        {/* Margen inferior */}
        <div className="py-4" />
      </div>

      {/* ============================================================== */}
      {/* 2. BARRA FIJA INFERIOR EXACTA A LA IMAGEN ADJUNTADA */}
      {/* FONDO MORADO #6E1FE8, PORTADA PEQUEÑA A LA IZQUIERDA, */}
      {/* PASTILLA '... En directe' + 'Café con ron' / NOMBRE, */}
      {/* ENSUPRIME.ES ABAJO, VOLUMEN, ANTERIOR, PLAY BLANCO, SIGUIENTE, COMPARTIR, */}
      {/* Y CHEVRON SIMPLE A LA DERECHA */}
      {/* ============================================================== */}
      <aside
        role="region"
        aria-label="Reproductor de audio en directe"
        className={`fixed bottom-0 left-0 right-0 z-40 bg-[#6E1FE8] text-white select-none shadow-[0_-4px_20px_rgba(0,0,0,0.3)] h-18 sm:h-20 transition-transform duration-300 ${
          isHidden ? 'translate-y-full pointer-events-none opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="w-full h-full flex items-center justify-between px-2.5 sm:px-6 md:px-8">
          {/* LADO IZQUIERDO: PORTADA + TEXTOS EXACTOS */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 max-w-[42%] sm:max-w-[40%]">
            {/* Portada cuadrada pequeña a ras */}
            <div
              onClick={() => setIsExpanded(true)}
              className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 overflow-hidden shadow-md cursor-pointer rounded-lg sm:rounded-none"
            >
              <img
                src={currentStation.cover}
                alt={currentStation.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Textos: Nombre de la emisora en la línea superior, ENSUPRIME.COM en la inferior */}
            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                {/* Nombre de la canción / emisora */}
                <span
                  onClick={() => setIsExpanded(true)}
                  className="text-xs sm:text-sm md:text-base font-semibold text-white truncate cursor-pointer hover:underline leading-tight"
                >
                  {currentStation.name}
                </span>
              </div>

              {/* Subtítulo inferior: ENSUPRIME.COM en mayúsculas */}
              <span className="text-[9px] sm:text-[11px] font-bold text-white/90 uppercase tracking-wider mt-0.5 sm:mt-1 truncate">
                ENSUPRIME.COM
              </span>
            </div>
          </div>

          {/* CENTRO: CONTROLES EXACTOS (BOCINA CON DESPLEGABLE DIGITAL, ANTERIOR, PLAY BLANCO, SIGUIENTE, COMPARTIR) */}
          <div className="flex items-center gap-1.5 sm:gap-4 md:gap-6 shrink-0">
            {/* Control de bocina con desplegable digital al presionar */}
            <div ref={volumeRef} className="relative flex items-center">
              <button
                type="button"
                onClick={() => setIsVolumeOpen(!isVolumeOpen)}
                className={`text-white hover:text-white/80 transition-all hover:scale-110 cursor-pointer p-1 rounded-full ${
                  isVolumeOpen ? 'bg-white/20 text-[#C0D43E]' : ''
                }`}
                title="Ajustar volumen"
                aria-label="Ajustar volumen"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                )}
              </button>

              {/* Barra digital emergente al presionar la bocina (desaparece al interactuar fuera) */}
              {isVolumeOpen && (
                <div
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-[#5B17C4]/95 backdrop-blur-xl px-3 py-2.5 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-white/20 flex items-center gap-2.5 z-50 animate-in fade-in zoom-in-95 duration-200"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const nextMute = !isMuted;
                      setIsMuted(nextMute);
                      if (audioRef.current) {
                        audioRef.current.volume = nextMute ? 0 : volume / 100;
                      }
                    }}
                    className="text-white hover:text-[#C0D43E] transition-colors p-0.5"
                    title={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-3.5 h-3.5 stroke-[2]" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 stroke-[2]" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setVolume(val);
                      if (isMuted) setIsMuted(false);
                      if (audioRef.current) {
                        audioRef.current.volume = val / 100;
                      }
                    }}
                    className="w-20 sm:w-24 h-1.5 bg-white/25 accent-[#C0D43E] cursor-pointer rounded-full"
                  />
                  <span className="text-[11px] font-mono-code font-bold text-white w-7 text-right select-none">
                    {isMuted ? '0%' : `${volume}%`}
                  </span>
                </div>
              )}
            </div>

            {/* Botón Anterior (SkipBack) */}
            <button
              onClick={handlePrevStation}
              className="text-white hover:text-white/80 transition-transform hover:scale-110 cursor-pointer p-1"
              title="Emisora anterior"
            >
              <SkipBack className="w-4 h-4 sm:w-6 sm:h-6 fill-current" />
            </button>

            {/* Botón Play / Pause Circular Blanco Central idéntico a la imagen */}
            <button
              onClick={handleTogglePlay}
              className="w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white text-[#110B1C] flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer shrink-0"
              title={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-6 sm:h-6 fill-current" />
              ) : (
                <Play className="w-4 h-4 sm:w-6 sm:h-6 fill-current ml-0.5" />
              )}
            </button>

            {/* Botón Siguiente (SkipForward) */}
            <button
              onClick={handleNextStation}
              className="text-white hover:text-white/80 transition-transform hover:scale-110 cursor-pointer p-1"
              title="Siguiente emisora"
            >
              <SkipForward className="w-4 h-4 sm:w-6 sm:h-6 fill-current" />
            </button>

            {/* Botón Compartir (Share2) */}
            <button
              onClick={handleShareStation}
              className="hidden xs:flex text-white hover:text-white/80 transition-transform hover:scale-110 cursor-pointer p-1 relative items-center justify-center"
              title="Compartir"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
              {copiedLink && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-mono-code bg-white text-[#110B1C] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                  ¡Copiado!
                </span>
              )}
            </button>
          </div>

          {/* LADO DERECHO: SIMPLE CHEVRON HACIA ARRIBA EXACTO AL SCREENSHOT */}
          <div className="shrink-0 pl-2">
            <button
              onClick={() => setIsExpanded(true)}
              className="text-white hover:text-white/80 transition-transform hover:scale-110 cursor-pointer p-2 flex items-center justify-center"
              title="Ampliar reproductor"
            >
              <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
