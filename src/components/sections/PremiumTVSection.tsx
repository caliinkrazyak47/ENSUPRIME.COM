import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Hls from 'hls.js';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Volume2,
  VolumeX,
  Tv,
  ChevronDown,
  Maximize,
  Minimize,
  RotateCcw,
  X,
  Search,
  Layers
} from 'lucide-react';
import rawChannels from '../../data/iptvChannels.json';

export interface IPTVChannel {
  id: string;
  name: string;
  group?: string;
  logo: string;
  country?: string;
  url: string;
  categories?: string[];
}

const IPTV_CHANNELS: IPTVChannel[] = rawChannels as IPTVChannel[];

// Categorías del repertorio
const IPTV_CATEGORIES = [
  'TODOS',
  'NOTICIAS',
  'ESPAÑA',
  'GENERAL',
  'PELICULAS',
  'DEPORTES',
  'ESTADOS UNIDOS',
  'PUERTO RICO',
  'PERU',
  'ARGENTINA',
  'CHILE',
  'COLOMBIA',
  '24/7',
  'ITALIA'
];

const getCategoryFlag = (name: string) => {
  if (name === 'TODOS') return '📺 ';
  if (name === 'ESPAÑA') return '🇪🇸 ';
  if (name === 'ITALIA') return '🇮🇹 ';
  if (name === 'PELICULAS') return '🎬 ';
  if (name === 'NOTICIAS') return '📰 ';
  if (name === 'GENERAL') return '📡 ';
  if (name === 'DEPORTES') return '⚽ ';
  if (name === 'ESTADOS UNIDOS') return '🇺🇸 ';
  if (name === 'PERU') return '🇵🇪 ';
  if (name === 'ARGENTINA') return '🇦🇷 ';
  if (name === 'CHILE') return '🇨🇱 ';
  if (name === 'COLOMBIA') return '🇨🇴 ';
  if (name === 'PUERTO RICO') return '🇵🇷 ';
  if (name === '24/7') return '🍿 ';
  return '';
};

// Playlist oficial de thiagovsc.es
const YOUTUBE_PLAYLIST_ID = 'PLALJOp7e_srk';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type TVMode = 'music' | 'television';

interface PremiumTVSectionProps {
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

export const PremiumTVSection: React.FC<PremiumTVSectionProps> = ({
  onFullscreenChange,
}) => {
  // Modo activo: 'music' | 'television'
  const [activeMode, setActiveMode] = useState<TVMode>('television');

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(85);

  // MODO PANTALLA COMPLETA & VISIBILIDAD DE CONTROLES
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showPlayerControls, setShowPlayerControls] = useState<boolean>(false);
  const controlsTimeoutRef = useRef<any>(null);

  // TELEVISIÓN (IPTV) STATE
  const [activeIptvCategory, setActiveIptvCategory] = useState<string>('TODOS');
  const [activeIptvChannel, setActiveIptvChannel] = useState<IPTVChannel>(IPTV_CHANNELS[0]);
  const [isIptvLoading, setIsIptvLoading] = useState<boolean>(false);
  const [iptvError, setIptvError] = useState<boolean>(false);
  const [iptvReloadKey, setIptvReloadKey] = useState<number>(0);

  // Menú desplegable flotante de canales en la tarjeta
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState<boolean>(false);
  const [channelSearchQuery, setChannelSearchQuery] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Canales filtrados para el dropdown
  const dropdownChannels = useMemo(() => {
    if (!channelSearchQuery.trim()) return IPTV_CHANNELS;
    const q = channelSearchQuery.toLowerCase();
    return IPTV_CHANNELS.filter(ch =>
      ch.name.toLowerCase().includes(q) ||
      (ch.country && ch.country.toLowerCase().includes(q)) ||
      (ch.group && ch.group.toLowerCase().includes(q))
    );
  }, [channelSearchQuery]);

  // Pantalla completa nativa del elemento reproductor (ocupa 100% de la pantalla física del monitor)
  const enterFullscreen = useCallback(async () => {
    setIsFullscreen(true);
    setIsDrawerOpen(false);
    try {
      const targetEl = playerContainerRef.current || document.documentElement;
      if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
        if (targetEl.requestFullscreen) {
          await targetEl.requestFullscreen();
        } else if ((targetEl as any).webkitRequestFullscreen) {
          await (targetEl as any).webkitRequestFullscreen();
        } else if ((targetEl as any).msRequestFullscreen) {
          await (targetEl as any).msRequestFullscreen();
        }
      }
    } catch (err) {
      console.warn('Native requestFullscreen error:', err);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    setIsFullscreen(false);
    setIsDrawerOpen(false);
    try {
      if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Native exitFullscreen error:', err);
    }
  }, []);

  // Sincronizar salida de pantalla completa nativa cuando el usuario presiona ESC
  useEffect(() => {
    const handleFsChange = () => {
      const isNativeFs = Boolean(document.fullscreenElement || (document as any).webkitFullscreenElement);
      if (!isNativeFs && isFullscreen) {
        setIsFullscreen(false);
        setIsDrawerOpen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, [isFullscreen]);

  // Bloquear el scroll de la página de fondo cuando está en pantalla completa
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Metadatos dinámicos del videoclip actual en YouTube
  const [currentVideoInfo, setCurrentVideoInfo] = useState<{
    title: string;
    artist: string;
  }>({
    title: 'REGGAETÓN & TRAP URBANO // TOP ESPAÑA',
    artist: 'THIAGOVSC PLAYLIST HD',
  });

  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const iptvVideoRef = useRef<HTMLVideoElement | null>(null);
  const iptvHlsRef = useRef<Hls | null>(null);
  const skipDebounceRef = useRef<boolean>(false);

  // Notificar al componente padre (App.tsx) si está en fullscreen evitando bucle de renderizado
  const onFullscreenChangeRef = useRef(onFullscreenChange);
  const prevFullscreenRef = useRef<boolean | null>(null);

  useEffect(() => {
    onFullscreenChangeRef.current = onFullscreenChange;
  }, [onFullscreenChange]);

  useEffect(() => {
    if (prevFullscreenRef.current !== isFullscreen) {
      prevFullscreenRef.current = isFullscreen;
      onFullscreenChangeRef.current?.(isFullscreen);
    }
  }, [isFullscreen]);

  // Cerrar el dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsChannelDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Forzar máxima resolución posible (4K Ultra HD / 2160p -> 1440p -> 1080p -> highres)
  const forceMaximumQuality = useCallback((player: any) => {
    if (!player) return;
    try {
      player.unloadModule?.('captions');
      player.unloadModule?.('cc');
      const available = player.getAvailableQualityLevels?.() || [];
      
      const targetQuality = available.includes('highres')
        ? 'highres'
        : available.includes('hd2160')
        ? 'hd2160'
        : available.includes('hd1440')
        ? 'hd1440'
        : available.includes('hd1080')
        ? 'hd1080'
        : (available[0] || 'highres');

      player.setPlaybackQuality?.(targetQuality);
      player.setPlaybackQualityRange?.(targetQuality, targetQuality);
    } catch {}

    try {
      if (iframeRef.current?.contentWindow) {
        ['highres', 'hd2160', 'hd1440', 'hd1080'].forEach((quality) => {
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'setPlaybackQuality', args: [quality] }),
            '*'
          );
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'setPlaybackQualityRange', args: [quality, quality] }),
            '*'
          );
        });
      }
    } catch {}
  }, []);

  // Actualizar metadatos del vídeo en tiempo real
  const updateVideoData = useCallback((player: any) => {
    if (!player) return;
    try {
      const data = player.getVideoData?.();
      if (data && data.title) {
        const nextTitle = data.title.toUpperCase();
        const nextArtist = (data.author || 'ÉXITOS URBANOS // ESPAÑA').toUpperCase();
        setCurrentVideoInfo(prev => {
          if (prev.title === nextTitle && prev.artist === nextArtist) return prev;
          return { title: nextTitle, artist: nextArtist };
        });
      }
    } catch {}
  }, []);

  // Desmutear con el primer gesto de usuario en la página para no bloquear el autoplay inicial
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (playerRef.current && isMuted) {
        try {
          playerRef.current.unMute?.();
          playerRef.current.setVolume?.(volume);
          setIsMuted(false);
        } catch {}
      }
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, [isMuted, volume]);

  // Inicializar YouTube IFrame API para reproducir la playlist urbana en aleatorio (shuffle) y 4K
  useEffect(() => {
    if (activeMode !== 'music') return;

    let isMounted = true;
    let qualityInterval: any = null;

    const initPlayer = () => {
      const iframeEl = document.getElementById('youtube-tv-player') as HTMLIFrameElement | null;
      if (window.YT && window.YT.Player && iframeEl) {
        try {
          if (playerRef.current) {
            try {
              playerRef.current.destroy?.();
            } catch {}
          }

          playerRef.current = new window.YT.Player('youtube-tv-player', {
            events: {
              onReady: (event: any) => {
                if (!isMounted) return;
                try {
                  event.target.setShuffle?.(true);
                  event.target.setLoop?.(true);

                  // Activar modo aleatorio real seleccionando un vídeo aleatorio de la lista
                  const playlist = event.target.getPlaylist?.() || [];
                  if (playlist.length > 1) {
                    const randomIdx = Math.floor(Math.random() * playlist.length);
                    event.target.playVideoAt?.(randomIdx);
                  } else {
                    event.target.setShuffle?.(true);
                  }

                  forceMaximumQuality(event.target);

                  // Activar sonido con el volumen predeterminado
                  try {
                    event.target.unMute?.();
                    event.target.setVolume?.(volume);
                    setIsMuted(false);
                  } catch {}

                  // Reproducir vídeo
                  const playPromise = event.target.playVideo?.();
                  if (playPromise && typeof playPromise.catch === 'function') {
                    playPromise.catch(() => {
                      event.target.playVideo?.();
                    });
                  }
                  setIsPlaying(true);
                  updateVideoData(event.target);
                } catch {
                  try {
                    event.target.playVideo?.();
                  } catch {}
                }
              },
              onStateChange: (event: any) => {
                if (!isMounted) return;
                if (event.data === 1) { // PLAYING (Vídeo corriendo en pantalla)
                  setIsPlaying(true);
                  try {
                    event.target.unMute?.();
                    event.target.setVolume?.(volume);
                    setIsMuted(false);
                  } catch {}
                  forceMaximumQuality(event.target);
                  updateVideoData(event.target);

                  let attempts = 0;
                  if (qualityInterval) clearInterval(qualityInterval);
                  qualityInterval = setInterval(() => {
                    attempts++;
                    forceMaximumQuality(event.target);
                    if (attempts > 5) {
                      clearInterval(qualityInterval);
                    }
                  }, 800);
                } else if (event.data === 2) { // PAUSED
                  setIsPlaying(false);
                } else if (event.data === 0) { // ENDED
                  event.target.nextVideo?.();
                } else if (event.data === -1) { // UNSTARTED
                  // Si está sin iniciar tras cargar, forzar play
                  setTimeout(() => {
                    if (isMounted) {
                      try {
                        event.target.playVideo?.();
                      } catch {}
                    }
                  }, 400);
                }
              },
              onError: () => {
                try {
                  playerRef.current?.nextVideo?.();
                } catch {}
              },
            },
          });
        } catch {}
      }
    };

    if (!window.YT || !window.YT.Player) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      isMounted = false;
      if (qualityInterval) clearInterval(qualityInterval);
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
        } catch {}
      }
    };
  }, [activeMode, forceMaximumQuality, updateVideoData]);

  // Manejador del reproductor HLS para modo TELEVISIÓN (IPTV)
  useEffect(() => {
    if (activeMode !== 'television') {
      if (iptvHlsRef.current) {
        iptvHlsRef.current.destroy();
        iptvHlsRef.current = null;
      }
      return;
    }

    const video = iptvVideoRef.current;
    if (!video || !activeIptvChannel) return;

    setIsIptvLoading(true);
    setIptvError(false);

    video.volume = isMuted ? 0 : volume / 100;

    let targetUrl = activeIptvChannel.url;
    // Si la URL es directa de stream, se reproduce directo sin gastar los gigas del servidor
    // hls.js maneja la resolución relativa y CORS automáticamente

    if (Hls.isSupported()) {
      if (iptvHlsRef.current) {
        iptvHlsRef.current.destroy();
      }
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 60,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        liveSyncDurationCount: 3,
        capLevelToPlayerSize: false
      });

      iptvHlsRef.current = hls;
      hls.loadSource(targetUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (_ev, data) => {
        setIsIptvLoading(false);
        setIptvError(false);
        if (data?.levels && data.levels.length > 0) {
          hls.currentLevel = -1; // Auto level
        }
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            // Si el navegador bloquea el autoplay con sonido, silenciar y reproducir
            video.muted = true;
            setIsMuted(true);
            video.play().catch(() => {});
          });
        }
      });

      hls.on(Hls.Events.ERROR, (_ev, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              setIptvError(true);
              setIsIptvLoading(false);
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = targetUrl;
      video.addEventListener('loadedmetadata', () => {
        setIsIptvLoading(false);
        video.play().catch(() => {});
      });
      video.addEventListener('error', () => {
        setIptvError(true);
        setIsIptvLoading(false);
      });
    }

    return () => {
      if (iptvHlsRef.current) {
        iptvHlsRef.current.destroy();
        iptvHlsRef.current = null;
      }
    };
  }, [activeMode, activeIptvChannel, iptvReloadKey]);

  // Actualizar volumen en IPTV
  useEffect(() => {
    const video = iptvVideoRef.current;
    if (video) {
      video.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Autocierre o atenuación de controles de la TV (solo aparecen al tocar con el dedo o mover ratón y desaparecen solos para no tapar la emisión)
  const handleUserActivity = useCallback(() => {
    setShowPlayerControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (!isDrawerOpen && !isChannelDropdownOpen) {
        setShowPlayerControls(false);
      }
    }, 3000);
  }, [isDrawerOpen, isChannelDropdownOpen]);

  // Al abrir el menú o panel de canales, mantener visibles los controles; al cerrarlos, iniciar temporizador
  useEffect(() => {
    if (isDrawerOpen || isChannelDropdownOpen) {
      setShowPlayerControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    } else {
      handleUserActivity();
    }
  }, [isDrawerOpen, isChannelDropdownOpen, handleUserActivity]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Filtrado de canales IPTV según categoría
  const filteredIptvChannels = useMemo(() => {
    let list = IPTV_CHANNELS;
    if (activeIptvCategory !== 'TODOS') {
      list = list.filter((c) => {
        if (c.name.toLowerCase().includes('espn') || c.id.toLowerCase().includes('espn')) {
          return activeIptvCategory === 'DEPORTES';
        }
        return (
          c.categories?.includes(activeIptvCategory) ||
          c.group?.toUpperCase() === activeIptvCategory ||
          c.country?.toUpperCase() === activeIptvCategory
        );
      });
    }
    return list;
  }, [activeIptvCategory]);

  // Controles
  const handleTogglePlay = () => {
    if (activeMode === 'music') {
      if (playerRef.current) {
        try {
          if (isPlaying) {
            playerRef.current.pauseVideo?.();
            setIsPlaying(false);
          } else {
            playerRef.current.playVideo?.();
            setIsPlaying(true);
          }
        } catch {}
      }
    } else if (activeMode === 'television') {
      const video = iptvVideoRef.current;
      if (video) {
        if (isPlaying) {
          video.pause();
          setIsPlaying(false);
        } else {
          video.play();
          setIsPlaying(true);
        }
      }
    }
  };

  const handleNextVideo = useCallback(() => {
    if (activeMode !== 'music') return;
    if (skipDebounceRef.current) return;
    skipDebounceRef.current = true;
    setTimeout(() => {
      skipDebounceRef.current = false;
    }, 600);

    if (playerRef.current) {
      try {
        playerRef.current.nextVideo?.();
        forceMaximumQuality(playerRef.current);
      } catch {}
    }
  }, [activeMode, forceMaximumQuality]);

  const handlePrevVideo = useCallback(() => {
    if (activeMode !== 'music') return;
    if (skipDebounceRef.current) return;
    skipDebounceRef.current = true;
    setTimeout(() => {
      skipDebounceRef.current = false;
    }, 600);

    if (playerRef.current) {
      try {
        playerRef.current.previousVideo?.();
        forceMaximumQuality(playerRef.current);
      } catch {}
    }
  }, [activeMode, forceMaximumQuality]);

  const handleShuffleVideo = useCallback(() => {
    if (activeMode !== 'music') return;
    if (playerRef.current) {
      try {
        const playlist = playerRef.current.getPlaylist?.() || [];
        if (playlist.length > 0) {
          const rand = Math.floor(Math.random() * playlist.length);
          playerRef.current.playVideoAt?.(rand);
          forceMaximumQuality(playerRef.current);
        }
      } catch {}
    }
  }, [activeMode, forceMaximumQuality]);

  const initialPlaylistIframeUrl = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `https://www.youtube.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}&autoplay=1&playsinline=1&controls=1&enablejsapi=1&rel=0&iv_load_policy=3&cc_load_policy=0&loop=1&vq=hd2160&hd=1&highres=1&origin=${encodeURIComponent(
      origin
    )}`;
  }, []);

  return (
    <section id="tv" className="relative w-full py-20 px-4 sm:px-8 md:px-12 bg-[#6E1FE8] text-white overflow-hidden">
      {/* ESTRELLAS Y ELEMENTOS FLOTANTES EN EL FONDO */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="absolute top-10 left-[10%] text-6xl text-white/20 select-none">✦</span>
        <span className="absolute top-1/2 right-[8%] text-8xl text-white/15 select-none">✦</span>
        <span className="absolute bottom-16 left-[20%] text-5xl text-white/20 select-none">✦</span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        {/* CABECERA: TÍTULO TV ONLINE */}
        <div className="text-center mb-8 flex flex-col items-center">
          <h2 className="font-impact text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-white mt-1">
            TV <span className="bg-white text-[#6E1FE8] px-4 py-1 rounded-2xl inline-block transform -rotate-1 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">ONLINE</span>
          </h2>
        </div>

        {/* SELECTOR DE MODOS PRINCIPAL (DISEÑO AWWWARDS / VIKTOR ODDY & EMIL KOWALSKI: DOCK DE CRISTAL LÍQUIDO CON FEEDBACK HÁPTICO) */}
        <div className="w-full max-w-3xl md:max-w-4xl mb-6 flex items-center justify-center">
          <div className="inline-flex items-center p-2 rounded-full bg-black/50 backdrop-blur-3xl border border-white/20 shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.25)] gap-2.5">
            
            {/* BOTÓN 1: MÚSICA // URBAN STREAM */}
            <button
              onClick={() => setActiveMode('music')}
              className={`group/btn relative px-6 sm:px-7 py-3 rounded-full font-mono-code font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-3.5 active:scale-[0.96] ${
                activeMode === 'music'
                  ? 'bg-white text-[#110B1C] shadow-[0_12px_32px_rgba(255,255,255,0.35),inset_0_1px_0_rgba(255,255,255,0.8)]'
                  : 'text-white/70 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {/* Micro-icono Awwwards con ecualizador animado */}
              <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                activeMode === 'music'
                  ? 'bg-[#6E1FE8] text-[#C0D43E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]'
                  : 'bg-white/10 text-white group-hover/btn:bg-white/20'
              }`}>
                {activeMode === 'music' ? (
                  <span className="flex items-end gap-[2.5px] h-4">
                    <span className="w-[2.5px] h-2 bg-current rounded-full animate-pulse" />
                    <span className="w-[2.5px] h-4 bg-current rounded-full animate-pulse [animation-delay:150ms]" />
                    <span className="w-[2.5px] h-2.5 bg-current rounded-full animate-pulse [animation-delay:300ms]" />
                  </span>
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                )}
              </span>

              <div className="flex flex-col text-left leading-none">
                <span className="font-extrabold tracking-tight text-sm">Música</span>
                <span className={`text-[9.5px] font-mono-code uppercase tracking-widest mt-0.5 ${
                  activeMode === 'music' ? 'text-[#6E1FE8] font-black' : 'text-white/40'
                }`}>
                  {activeMode === 'music' ? '● En Directo' : 'Urban Clips'}
                </span>
              </div>
            </button>

            {/* BOTÓN 2: TELEVISIÓN // BROADCAST HD */}
            <button
              onClick={() => setActiveMode('television')}
              className={`group/btn relative px-6 sm:px-7 py-3 rounded-full font-mono-code font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-3.5 active:scale-[0.96] ${
                activeMode === 'television'
                  ? 'bg-[#C0D43E] text-[#110B1C] shadow-[0_12px_36px_rgba(192,212,62,0.45),inset_0_1px_0_rgba(255,255,255,0.8)]'
                  : 'text-white/70 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {/* Micro-icono Awwwards de señal de transmisión / antena de TV */}
              <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                activeMode === 'television'
                  ? 'bg-[#110B1C] text-[#C0D43E] shadow-sm'
                  : 'bg-white/10 text-white group-hover/btn:bg-white/20'
              }`}>
                {activeMode === 'television' ? (
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C0D43E] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C0D43E]" />
                  </span>
                ) : (
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M17 2l-5 5-5-5" />
                  </svg>
                )}
              </span>

              <div className="flex flex-col text-left leading-none">
                <span className="font-extrabold tracking-tight text-sm">Televisión</span>
                <span className={`text-[9.5px] font-mono-code uppercase tracking-widest mt-0.5 ${
                  activeMode === 'television' ? 'text-[#3B0764] font-black' : 'text-white/40'
                }`}>
                  {activeMode === 'television' ? '● Canales 24/7' : 'Señales TV'}
                </span>
              </div>
            </button>

          </div>
        </div>

        {/* TARJETA NEGRA FLOATING CARD CON MARCO CURVADO (MÁS COMPACTA Y ULTRA OPTIMIZADA CON GPU) */}
        <div className="relative w-full max-w-2xl md:max-w-3xl p-1.5 sm:p-2 rounded-[2.2rem] bg-white/10 ring-1 ring-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.45)] group/card will-change-transform transform-gpu">
          <div className="absolute -inset-1 rounded-[2.4rem] bg-gradient-to-r from-[#8B3BFF]/25 via-[#6E1FE8]/20 to-[#C0D43E]/15 opacity-70 group-hover/card:opacity-95 transition-opacity duration-500 pointer-events-none -z-10" />

          <div className="w-full bg-[#110B1C] rounded-[2rem] p-3 sm:p-4 border border-white/10 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <span className="absolute top-5 right-6 text-2xl text-[#A855F7]">✦</span>

            {/* REPRODUCTOR DE VÍDEO (ACELERACIÓN POR HARDWARE AISLADA PARA MÁXIMA FLUIDEZ 60FPS) */}
            <div
              ref={playerContainerRef}
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              onMouseMove={handleUserActivity}
              onTouchStart={handleUserActivity}
              onClick={handleUserActivity}
              className={`transform-gpu will-change-transform contain-layout select-none ${
                isFullscreen
                  ? 'fixed inset-0 z-[999999] w-screen h-screen bg-black flex items-center justify-center overflow-hidden'
                  : 'relative aspect-video rounded-2xl bg-black overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] ring-1 ring-white/10 group/tvcard'
              }`}
            >
              {/* CASO 1: MODO TELEVISIÓN (REPRODUCTOR TDTCHANNELS PRO ESTILO GLASS LUXURY) */}
              {activeMode === 'television' && (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <video
                    ref={iptvVideoRef}
                    playsInline
                    autoPlay
                    muted={isMuted}
                    className="w-full h-full object-contain"
                  />

                  {/* 1. TOP-LEFT EPG PILL (ESTILO EXACTO CAPTURA: "ESTAS VIENDO • ENTRETENIMIENTO", HORARIO Y TITULO CON BARRA AZUL/LIMA) */}
                  <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 z-20 transition-all duration-300 ${
                    showPlayerControls ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'
                  }`}>
                    <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-2.5 sm:p-3 max-w-[240px] xs:max-w-[290px] shadow-2xl">
                      <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono-code font-bold uppercase tracking-wider text-white/70">
                        <span className="text-white">ESTAS VIENDO</span>
                        <span>•</span>
                        <span className="text-[#C0D43E]">{activeIptvChannel.group || 'EN DIRECTO'}</span>
                      </div>
                      <div className="mt-1 flex items-baseline gap-1.5 text-xs sm:text-sm font-bold text-white truncate">
                        <span className="text-white/50 text-[10px] sm:text-[11px] font-mono-code">24/7</span>
                        <span className="truncate">{activeIptvChannel.name}</span>
                      </div>
                      {/* Mini progress bar continua */}
                      <div className="w-full h-1 bg-white/15 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-[#C0D43E] rounded-full w-[65%]" />
                      </div>
                    </div>
                  </div>

                  {/* 2. TOP-RIGHT CONTROLS: BOTÓN GUÍA PEQUEÑO Y PANTALLA COMPLETA */}
                  <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 z-30 flex items-center gap-2 transition-all duration-300 ${
                    showPlayerControls || isChannelDropdownOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'
                  }`}>
                    {/* Botón Guía pequeño como en el reproductor anterior */}
                    <div ref={dropdownRef} className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChannelDropdownOpen(!isChannelDropdownOpen);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border text-xs font-mono-code font-bold transition-all shadow-lg cursor-pointer ${
                          isChannelDropdownOpen
                            ? 'border-[#C0D43E] text-[#C0D43E]'
                            : 'border-white/15 text-white hover:text-[#C0D43E] hover:border-[#C0D43E]'
                        }`}
                        title="Guía de canales"
                      >
                        <Layers className="w-3.5 h-3.5 text-[#C0D43E]" />
                        <span className="uppercase text-[11px]">Guía</span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isChannelDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown de Canales desplegable */}
                      {isChannelDropdownOpen && (
                        <div
                          data-lenis-prevent
                          data-lenis-prevent-wheel
                          data-lenis-prevent-touch
                          onClick={(e) => e.stopPropagation()}
                          onWheel={(e) => e.stopPropagation()}
                          className="absolute right-0 mt-2 w-72 sm:w-80 max-h-80 overflow-y-auto overscroll-contain mediaset-glass-scrollbar bg-black/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-2 space-y-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                        >
                          {/* Buscador integrado */}
                          <div className="p-1 mb-1 border-b border-white/10 sticky top-0 bg-black/90 backdrop-blur-xl z-10">
                            <div className="relative">
                              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-white/50" />
                              <input
                                type="text"
                                value={channelSearchQuery}
                                onChange={(e) => setChannelSearchQuery(e.target.value)}
                                placeholder="Buscar canal..."
                                className="w-full bg-white/10 text-white text-xs pl-8 pr-7 py-1.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#C0D43E] font-mono-code placeholder:text-white/40"
                              />
                              {channelSearchQuery && (
                                <button
                                  type="button"
                                  onClick={() => setChannelSearchQuery('')}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <div className="px-1 pt-1.5 pb-0.5 text-[10px] font-mono-code text-white/40 flex justify-between uppercase">
                              <span>Canales ({dropdownChannels.length})</span>
                              <span>Toca para sintonizar</span>
                            </div>
                          </div>

                          {dropdownChannels.length === 0 ? (
                            <div className="py-6 text-center text-xs font-mono-code text-white/40">
                              No se encontraron canales
                            </div>
                          ) : (
                            dropdownChannels.map((ch) => {
                              const isSelected = activeIptvChannel.id === ch.id;
                              return (
                                <button
                                  key={ch.id}
                                  onClick={() => {
                                    setActiveIptvChannel(ch);
                                    setIsChannelDropdownOpen(false);
                                    setIsPlaying(true);
                                  }}
                                  className={`w-full px-3 py-2 rounded-xl text-left font-mono-code text-xs transition-all flex items-center justify-between cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#C0D43E] text-black font-black'
                                      : 'text-white/90 hover:bg-white/15'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C0D43E] shrink-0" />
                                    <span className="truncate uppercase">{ch.name}</span>
                                  </div>
                                  <span className="text-[10px] opacity-60 ml-2 shrink-0">{ch.country || ch.group || 'DIRECTO'}</span>
                                </button>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>

                    {/* Botón Pantalla Completa en la esquina del reproductor */}
                    {!isFullscreen && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          enterFullscreen();
                        }}
                        className="p-1.5 rounded-full bg-black/70 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/15 transition-all shadow-lg cursor-pointer"
                        title="Ver en Pantalla Completa"
                      >
                        <Maximize className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Loading indicator */}
                  {isIptvLoading && !iptvError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 backdrop-blur-sm">
                      <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-[#C0D43E] animate-spin mb-3" />
                      <span className="font-mono-code text-xs text-white uppercase tracking-widest font-black">
                        Sintonizando {activeIptvChannel.name}...
                      </span>
                    </div>
                  )}

                  {/* Error state with retry */}
                  {iptvError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 p-4 text-center">
                      <p className="font-mono-code text-xs text-red-400 mb-3">
                        Canal temporalmente no disponible
                      </p>
                      <button
                        onClick={() => setIptvReloadKey((k) => k + 1)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-mono-code text-xs font-bold hover:bg-[#C0D43E] cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reintentar emisión</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* CASO 2: MODO PLAYLIST MUSICA VIDEOS */}
              {activeMode === 'music' && (
                <iframe
                  id="youtube-tv-player"
                  ref={iframeRef}
                  className="w-full h-full border-0 pointer-events-auto transform-gpu will-change-transform"
                  style={{ transform: 'translateZ(0)' }}
                  src={initialPlaylistIframeUrl}
                  title="THIAGOVSC URBAN PLAYLIST 1080P"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )}

              {/* BARRA DE CONTROLES INFERIOR ESTILO EXACTO CAPTURA (TRANSPARENTE / GLASS, BOTONES BLANCO Y LIMA-LIMÓN) */}
              {/* Oculta por defecto para no tapar la emisión; solo aparece al tocar la pantalla o mover el ratón y se oculta sola */}
              <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-5 z-40 flex items-center justify-center transition-all duration-300 pointer-events-none ${
                  showPlayerControls
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-3'
                }`}
              >
                <div className="w-full max-w-4xl bg-black/75 backdrop-blur-md border border-white/15 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-3.5 shadow-2xl pointer-events-auto">
                  {/* LADO IZQUIERDO: PLAY / PAUSA */}
                  <button
                    onClick={handleTogglePlay}
                    className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-white hover:text-[#C0D43E] transition-colors cursor-pointer group shrink-0"
                    title={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-[#C0D43E]" />
                    ) : (
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-white group-hover:text-[#C0D43E]" />
                    )}
                    <span className="font-mono-code text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                      {isPlaying ? 'Pausa' : 'Reproducir'}
                    </span>
                  </button>

                  {/* VOLUMEN CON SLIDER */}
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <button
                      onClick={() => {
                        const nextMute = !isMuted;
                        setIsMuted(nextMute);
                        if (iptvVideoRef.current) iptvVideoRef.current.muted = nextMute;
                        if (playerRef.current) {
                          if (nextMute) playerRef.current.mute?.();
                          else playerRef.current.unMute?.();
                        }
                      }}
                      className="text-white hover:text-[#C0D43E] transition-colors cursor-pointer"
                      title={isMuted ? 'Activar sonido' : 'Silenciar'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
                        if (iptvVideoRef.current) iptvVideoRef.current.volume = val / 100;
                        if (playerRef.current) {
                          playerRef.current.unMute?.();
                          playerRef.current.setVolume?.(val);
                        }
                      }}
                      className="w-14 sm:w-20 h-1 bg-white/20 accent-[#C0D43E] cursor-pointer rounded-full"
                    />
                  </div>

                  {/* BARRA DE PROGRESO / TIMELINE DIRECTO (COMO EN LA CAPTURA) */}
                  <div className="hidden md:flex items-center gap-2 flex-1 min-w-0 px-2">
                    <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 bg-[#C0D43E] rounded-full w-[88%]" />
                    </div>
                    <span className="font-mono-code text-[10px] text-white/60 shrink-0">
                      LIVE
                    </span>
                  </div>

                  {/* BADGE DIRECTO (PUNTO ROJO / LIMA) */}
                  <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] sm:text-[11px] font-mono-code font-bold text-white shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="tracking-wider">DIRECTO</span>
                  </div>

                  {/* BADGE CALIDAD */}
                  <span className="hidden sm:inline font-mono-code text-[10px] text-white/70 px-1.5 py-0.5 rounded border border-white/15 shrink-0">
                    1080p
                  </span>

                  {/* BOTÓN GUÍA RÁPIDO */}
                  {activeMode === 'television' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isFullscreen) {
                          setIsDrawerOpen(!isDrawerOpen);
                        } else {
                          setIsChannelDropdownOpen(!isChannelDropdownOpen);
                        }
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-[#C0D43E] text-white hover:text-black font-mono-code text-[10px] sm:text-[11px] font-bold uppercase transition-all cursor-pointer shrink-0"
                      title="Canales y Guía"
                    >
                      <Layers className="w-3 h-3 text-[#C0D43E] group-hover:text-black" />
                      <span>Guía</span>
                    </button>
                  )}

                  {/* BOTÓN PANTALLA COMPLETA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isFullscreen) {
                        exitFullscreen();
                      } else {
                        enterFullscreen();
                      }
                    }}
                    className="p-1 sm:p-1.5 text-white hover:text-[#C0D43E] transition-colors cursor-pointer shrink-0"
                    title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
                  >
                    {isFullscreen ? (
                      <Minimize className="w-4 h-4" />
                    ) : (
                      <Maximize className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* PANEL LATERAL GLASS EN PANTALLA COMPLETA */}
              {isFullscreen && activeMode === 'television' && isDrawerOpen && (
                <aside
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-0 right-0 bottom-0 w-full sm:w-[380px] z-50 flex flex-col bg-black/85 backdrop-blur-2xl border-l border-white/15 shadow-2xl animate-in slide-in-from-right duration-200"
                >
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tv className="w-4 h-4 text-[#C0D43E]" />
                      <h3 className="font-mono-code font-bold text-xs uppercase text-white tracking-wider">
                        Guía de Canales
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Selector de Categoría */}
                  <div className="p-3 border-b border-white/10">
                    <select
                      value={activeIptvCategory}
                      onChange={(e) => setActiveIptvCategory(e.target.value)}
                      className="w-full h-8 bg-black/60 border border-white/20 rounded-lg px-2 text-xs font-mono-code text-white appearance-none focus:outline-none focus:border-[#C0D43E]"
                    >
                      {IPTV_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#110B1C] text-white">
                          {getCategoryFlag(cat)} {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Lista de canales */}
                  <div
                    data-lenis-prevent
                    data-lenis-prevent-wheel
                    data-lenis-prevent-touch
                    onWheel={(e) => e.stopPropagation()}
                    className="flex-1 overflow-y-auto overscroll-contain mediaset-glass-scrollbar p-2 space-y-1.5"
                  >
                    {filteredIptvChannels.map((channel) => {
                      const isSelected = activeIptvChannel.id === channel.id;
                      return (
                        <button
                          key={channel.id}
                          onClick={() => {
                            setActiveIptvChannel(channel);
                            setIsPlaying(true);
                          }}
                          className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[#C0D43E] text-black font-bold border-[#C0D43E]'
                              : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            <span className="truncate font-mono-code text-xs uppercase">{channel.name}</span>
                          </div>
                          <span className="text-[10px] opacity-70 shrink-0 uppercase">{channel.country || 'DIRECTO'}</span>
                        </button>
                      );
                    })}
                  </div>
                </aside>
              )}
            </div>

            {/* BARRA DE CONTROLES INFERIOR: REDISEÑO EDITORIAL Y RESPONSIVE (MÓVIL Y DESKTOP) */}
            <div className="mt-3 sm:mt-5 pt-3 border-t border-white/10 flex flex-col gap-2.5 sm:gap-3 font-body">
              {/* FILA 1: TÍTULO Y ESTADO LIVE */}
              <div className="flex items-center justify-between gap-2 sm:gap-3 min-w-0">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="w-2 h-2 rounded-full bg-[#C0D43E] shrink-0 animate-pulse" />
                  <span className="font-mono-code font-bold text-white text-[11px] sm:text-sm tracking-wide truncate">
                    {activeMode === 'music'
                      ? currentVideoInfo.title
                      : `📡 ${activeIptvChannel.name.toUpperCase()}`}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {activeMode === 'television' && (
                    <span className="inline-flex items-center gap-1 bg-[#6E1FE8] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase border border-white/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C0D43E] animate-ping" />
                      EN DIRECTO
                    </span>
                  )}
                </div>
              </div>

              {/* FILA 2: CONTROLES DE REPRODUCCIÓN + VOLUMEN + PANTALLA COMPLETA */}
              <div className="flex items-center justify-between gap-2 w-full">
                {/* GRUPO DE BOTONES DE PLAYBACK */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {/* Botón Anterior (solo playlist) */}
                  {activeMode === 'music' && (
                    <button
                      type="button"
                      onClick={handlePrevVideo}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#110B1C] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm border border-white/15 active:scale-95 shrink-0 group/ctrl"
                      title="Anterior"
                      aria-label="Anterior"
                    >
                      <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current transition-transform duration-200 group-hover/ctrl:-translate-x-0.5" />
                    </button>
                  )}

                  {/* Botón Play / Pausa estilo Awwwards: concentric pill with inner light reflection */}
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#C0D43E] text-[#110B1C] flex items-center justify-center transition-all duration-300 shadow-[0_8px_24px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)] cursor-pointer border border-white/80 active:scale-90 shrink-0"
                    title={isPlaying ? 'Pausar' : 'Reproducir'}
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                    )}
                  </button>

                  {/* Botón Siguiente (solo playlist) */}
                  {activeMode === 'music' && (
                    <button
                      type="button"
                      onClick={handleNextVideo}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#110B1C] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm border border-white/15 active:scale-95 shrink-0 group/ctrl"
                      title="Siguiente"
                      aria-label="Siguiente"
                    >
                      <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current transition-transform duration-200 group-hover/ctrl:translate-x-0.5" />
                    </button>
                  )}

                  {/* Botón Aleatorio (solo playlist) */}
                  {activeMode === 'music' && (
                    <button
                      type="button"
                      onClick={handleShuffleVideo}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-[#C0D43E] text-white hover:text-[#110B1C] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm border border-white/15 active:scale-95 shrink-0 group/ctrl"
                      title="Aleatorio"
                      aria-label="Aleatorio"
                    >
                      <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover/ctrl:rotate-12" />
                    </button>
                  )}
                </div>

                {/* GRUPO DE VOLUMEN Y PANTALLA COMPLETA */}
                <div className="flex items-center gap-1.5 sm:gap-3 ml-auto shrink-0">
                  {/* Control de Volumen */}
                  <div className="flex items-center gap-1 sm:gap-1.5 bg-white/5 border border-white/10 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full">
                    <button
                      type="button"
                      onClick={() => {
                        const nextMute = !isMuted;
                        setIsMuted(nextMute);
                        const video = iptvVideoRef.current;
                        if (video) video.muted = nextMute;
                        if (playerRef.current) {
                          if (nextMute) playerRef.current.mute?.();
                          else playerRef.current.unMute?.();
                        }
                      }}
                      className="text-white/80 hover:text-white transition-colors cursor-pointer p-0.5"
                      title={isMuted ? 'Activar sonido' : 'Silenciar'}
                      aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A855F7]" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
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
                        const video = iptvVideoRef.current;
                        if (video) video.volume = val / 100;
                        if (playerRef.current) {
                          playerRef.current.unMute?.();
                          playerRef.current.setVolume?.(val);
                        }
                      }}
                      className="w-12 xs:w-16 sm:w-20 h-1 bg-white/20 accent-[#C0D43E] cursor-pointer rounded-full"
                    />
                    <span className="font-mono-code font-bold text-[10px] sm:text-[11px] text-white/70 w-6 sm:w-8 text-right">
                      {isMuted ? '0%' : `${volume}%`}
                    </span>
                  </div>

                  {/* BOTÓN PANTALLA COMPLETA UNIVERSAL */}
                  <button
                    type="button"
                    onClick={enterFullscreen}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-[#C0D43E] text-white hover:text-[#3B0764] border border-white/20 flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer active:scale-95 shrink-0"
                    title="Pantalla completa"
                    aria-label="Pantalla completa"
                  >
                    <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOGOS OFICIALES ORIGINALES ESTÁTICOS AL PIE DE LA SECCIÓN JUNTO A LA DIVISIÓN */}
        <div className="w-full mt-14 sm:mt-20 pt-10 border-t border-white/10 flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 md:gap-20 max-w-6xl px-4 py-4">

            {/* EA Sports (Enlace a web oficial EA) */}
            <a
              href="https://www.ea.com/es-es"
              target="_blank"
              rel="noopener noreferrer"
              title="Visitar EA Sports oficial"
              className="group flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <img
                src="/logo-easports.svg"
                alt="EA Sports"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
              />
            </a>

            {/* Ticketmaster (Enlace a web oficial Ticketmaster) */}
            <a
              href="https://www.ticketmaster.es/"
              target="_blank"
              rel="noopener noreferrer"
              title="Visitar Ticketmaster oficial"
              className="group flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <img
                src="/logo-ticketmaster.svg"
                alt="Ticketmaster"
                className="h-7 sm:h-8 md:h-9 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
              />
            </a>

            {/* LaLiga (Enlace a web oficial LaLiga) */}
            <a
              href="https://www.laliga.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Visitar LaLiga oficial"
              className="group flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <img
                src="/logo-laliga.svg"
                alt="LaLiga"
                className="h-8 sm:h-9 md:h-11 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
              />
            </a>

            {/* Adidas (Enlace a web oficial Adidas) */}
            <a
              href="https://www.adidas.es/"
              target="_blank"
              rel="noopener noreferrer"
              title="Visitar Adidas oficial"
              className="group flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <img
                src="/logo-adidas.svg"
                alt="Adidas"
                className="h-9 sm:h-11 md:h-12 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

