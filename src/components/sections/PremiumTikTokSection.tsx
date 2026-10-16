import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Eye,
  Maximize2,
  X,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Music
} from 'lucide-react';

export interface TikTokItem {
  id: string;
  creator: string;
  handle: string;
  avatar: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  music: string;
  title: string;
  cover: string;
  videoUrl: string;
  tiktokUrl: string;
  bgColor: string;
  tags: { label: string; bg: string; color: string }[];
}

export const TIKTOK_DATA: TikTokItem[] = [
  {
    id: "01",
    creator: "MELISSA 💋",
    handle: "@xmmelii",
    avatar: "https://files.catbox.moe/1y7p9y.jpg",
    views: "17.5K",
    likes: "4.5K",
    comments: "14",
    shares: "660",
    music: "luckybrown.official - sonido original",
    title: "Diario de una princesa 👑 // sonido original",
    cover: "https://files.catbox.moe/txjxs7.jpg",
    videoUrl: "https://files.catbox.moe/vzp8ea.mp4",
    tiktokUrl: "https://www.tiktok.com/@xmmelii/video/7696660365064555796",
    bgColor: "#787B91",
    tags: [
      { label: "VIRAL", bg: "#00ECEF", color: "#000" },
      { label: "TIKTOK", bg: "#FF0050", color: "#FFF" },
    ],
  },
  {
    id: "02",
    creator: "Julia_Grace",
    handle: "@julia_grace_b",
    avatar: "https://files.catbox.moe/jzb0wp.jpg",
    views: "5.1K",
    likes: "1.2K",
    comments: "15",
    shares: "110",
    music: "original sound - quinn",
    title: "Might spam a lil 🤭#hi #seattle",
    cover: "https://files.catbox.moe/1zvzrn.jpg",
    videoUrl: "https://files.catbox.moe/9wztrv.mp4",
    tiktokUrl: "https://www.tiktok.com/@julia_grace_b/video/7696441318423235871",
    bgColor: "#C0D43E",
    tags: [
      { label: "STREET LIFE", bg: "#FF3EBA", color: "#FFF" },
      { label: "VIRAL", bg: "#141414", color: "#FFF" },
    ],
  },
  {
    id: "03",
    creator: "eli maciel",
    handle: "@elimaaciel",
    avatar: "https://files.catbox.moe/583ttb.jpg",
    views: "442.9K",
    likes: "66.3K",
    comments: "166",
    shares: "9.0K",
    music: "Fuera del Planeta - Eloy & Randy",
    title: "No puedo hacerme la linda y que el pelo quede DURO EN LA POSE",
    cover: "https://files.catbox.moe/icx9n6.jpg",
    videoUrl: "https://files.catbox.moe/49uafr.mp4",
    tiktokUrl: "https://www.tiktok.com/@elimaaciel/video/7677773486105873684",
    bgColor: "#284334",
    tags: [
      { label: "DANCEHALL", bg: "#FFF302", color: "#000" },
      { label: "TOP 1", bg: "#6E1FE8", color: "#FFF" },
    ],
  },
  {
    id: "04",
    creator: "Тгк: эй полина",
    handle: "@ey.polinaa",
    avatar: "https://files.catbox.moe/egrsc7.jpg",
    views: "98.2K",
    likes: "22.7K",
    comments: "353",
    shares: "3.2K",
    music: "Good Looking - Suki Waterhouse",
    title: "Good Looking // Тгк: эй полина",
    cover: "https://files.catbox.moe/aswf9g.jpg",
    videoUrl: "https://files.catbox.moe/62llvf.mp4",
    tiktokUrl: "https://www.tiktok.com/@ey.polinaa/video/7695654661415554337",
    bgColor: "#FFF302",
    tags: [
      { label: "DIRECTO", bg: "#00ECEF", color: "#000" },
      { label: "SESSION", bg: "#141414", color: "#FFF" },
    ],
  },
  {
    id: "05",
    creator: "mattiagallettini",
    handle: "@mattiagallettini",
    avatar: "https://files.catbox.moe/wqvd99.jpg",
    views: "1.3M",
    likes: "301.9K",
    comments: "1.4K",
    shares: "41.9K",
    music: "original sound - Greylo",
    title: "mattiagallettini // original sound",
    cover: "https://files.catbox.moe/mtrkwb.jpg",
    videoUrl: "https://files.catbox.moe/ncp618.mp4",
    tiktokUrl: "https://www.tiktok.com/@mattiagallettini/video/7693198774075706657",
    bgColor: "#1EB6E2",
    tags: [
      { label: "HIT 2026", bg: "#FF9D00", color: "#000" },
      { label: "COMMUNITY", bg: "#141414", color: "#FFF" },
    ],
  },
  {
    id: "06",
    creator: "Luca.tarantino",
    handle: "@luca.tarantino03",
    avatar: "https://files.catbox.moe/s6r2nt.jpg",
    views: "3.5M",
    likes: "937.4K",
    comments: "5.5K",
    shares: "174.4K",
    music: "Earned it ￴ ￴￴ - The Weeknd",
    title: "For u // Luca.tarantino",
    cover: "https://files.catbox.moe/hg43r7.jpg",
    videoUrl: "https://files.catbox.moe/6781f9.mp4",
    tiktokUrl: "https://www.tiktok.com/@luca.tarantino03/video/7649861067262151958",
    bgColor: "#6E1FE8",
    tags: [
      { label: "ARTE", bg: "#CEFF00", color: "#000" },
      { label: "SOUNDSYSTEM", bg: "#FFFFFF", color: "#000" },
    ],
  },
  {
    id: "07",
    creator: "daaniisndvv",
    handle: "@daaniisndvv",
    avatar: "https://files.catbox.moe/ivthxb.jpg",
    views: "28.5K",
    likes: "2.0K",
    comments: "16",
    shares: "66",
    music: "الصوت الأصلي - آلمـصـمـم /دآيـــنــــر🔥💎",
    title: "0 kcal // daaniisndvv",
    cover: "https://files.catbox.moe/8vgh31.jpg",
    videoUrl: "https://files.catbox.moe/5f7vyx.mp4",
    tiktokUrl: "https://www.tiktok.com/@daaniisndvv/video/7696242500268199191",
    bgColor: "#E53935",
    tags: [
      { label: "TREND", bg: "#00ECEF", color: "#000" },
      { label: "TIKTOK", bg: "#141414", color: "#FFF" },
    ],
  },
];

interface PremiumTikTokSectionProps {
  onModalOpen?: (isOpen: boolean) => void;
}

export const PremiumTikTokSection: React.FC<PremiumTikTokSectionProps> = ({
  onModalOpen,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFullscreenItem, setActiveFullscreenItem] = useState<TikTokItem | null>(null);
  const [isFullscreenPlaying, setIsFullscreenPlaying] = useState<boolean>(true);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);

  // Refs de física de scroll para no causar re-renders innecesarios
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isAutoScrollPausedRef = useRef(false);
  const hasDraggedRef = useRef(false);

  // Sincronizar ref con estado
  useEffect(() => {
    isAutoScrollPausedRef.current = isAutoScrollPaused;
  }, [isAutoScrollPaused]);

  // Duplicamos los elementos 4 veces para crear un carrusel verdaderamente infinito y sin saltos
  const displayItems = [...TIKTOK_DATA, ...TIKTOK_DATA, ...TIKTOK_DATA, ...TIKTOK_DATA];

  // Bucle de animación continuo usando requestAnimationFrame sobre scrollLeft
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Centrar inicialmente el carrusel en el segundo set para que se pueda deslizar en ambas direcciones
    const initScroll = () => {
      if (container.scrollWidth > container.clientWidth) {
        const singleSetWidth = container.scrollWidth / 4;
        if (container.scrollLeft === 0) {
          container.scrollLeft = singleSetWidth;
        }
      }
    };
    initScroll();

    let animationFrameId: number;
    let lastTimestamp = performance.now();
    const speedPixelsPerSecond = 55; // Velocidad suave idéntica al marquee

    const loop = (currentTimestamp: number) => {
      const deltaMs = currentTimestamp - lastTimestamp;
      lastTimestamp = currentTimestamp;

      if (container) {
        const singleSetWidth = container.scrollWidth / 4;

        // Loop envolvente infinito bidireccional suave
        if (singleSetWidth > 0) {
          if (container.scrollLeft >= singleSetWidth * 2.5) {
            container.scrollLeft -= singleSetWidth;
          } else if (container.scrollLeft <= singleSetWidth * 0.5) {
            container.scrollLeft += singleSetWidth;
          }
        }

        // Si no está arrastrando ni pausado (por play o hover), avanzar continuamente
        if (!isDownRef.current && !isAutoScrollPausedRef.current) {
          const deltaScroll = (speedPixelsPerSecond * deltaMs) / 1000;
          container.scrollLeft += deltaScroll;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Controladores de arrastre con Ratón (PC)
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDownRef.current = true;
    hasDraggedRef.current = false;
    setIsDragging(true);
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
    lastXRef.current = e.pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current);
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    container.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDownRef.current) {
      isDownRef.current = false;
      setIsDragging(false);
      // Timeout para permitir clicks limpios si no hubo arrastre real
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    }
  };

  // Controladores de arrastre táctil (Móviles / Tablets)
  const handleTouchStart = (e: React.TouchEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDownRef.current = true;
    hasDraggedRef.current = false;
    setIsDragging(true);
    startXRef.current = e.touches[0].pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDownRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startXRef.current);
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    container.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleTouchEnd = () => {
    isDownRef.current = false;
    setIsDragging(false);
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 50);
  };

  const handleTogglePlay = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasDraggedRef.current) return; // Si fue un deslizamiento, ignorar click

    const video = videoRefs.current[key];
    if (!video) return;

    if (playingVideoId === key) {
      video.pause();
      setPlayingVideoId(null);
      setIsAutoScrollPaused(false);
    } else {
      // Pausar cualquier otro video activo en el carrusel
      Object.keys(videoRefs.current).forEach((k) => {
        if (k !== key && videoRefs.current[k]) {
          videoRefs.current[k]?.pause();
        }
      });
      video.muted = isMuted;
      video.play().then(() => {
        setPlayingVideoId(key);
        setIsAutoScrollPaused(true);
      }).catch((err) => {
        console.warn('Video play error:', err);
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => {
          setPlayingVideoId(key);
          setIsAutoScrollPaused(true);
        }).catch(() => {});
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    Object.values(videoRefs.current).forEach((v) => {
      if (v) v.muted = nextMuted;
    });
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.muted = nextMuted;
    }
  };

  const openFullscreen = (e: React.MouseEvent, item: TikTokItem) => {
    e.stopPropagation();
    if (hasDraggedRef.current) return;
    // Pausar cualquier video activo en el carrusel
    Object.values(videoRefs.current).forEach((v) => v?.pause());
    setPlayingVideoId(null);
    setIsAutoScrollPaused(true);
    // Abrir con audio activo al hacer clic para pantalla completa
    setIsMuted(false);
    setActiveFullscreenItem(item);
    setIsFullscreenPlaying(true);
  };

  const toggleFullscreenPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!fullscreenVideoRef.current) return;
    if (fullscreenVideoRef.current.paused) {
      fullscreenVideoRef.current.play().then(() => setIsFullscreenPlaying(true)).catch(() => {});
    } else {
      fullscreenVideoRef.current.pause();
      setIsFullscreenPlaying(false);
    }
  };

  // Notificar al componente padre para ocultar la radio durante la reproducción modal
  useEffect(() => {
    onModalOpen?.(Boolean(activeFullscreenItem));
  }, [activeFullscreenItem, onModalOpen]);

  // Bloquear el scroll de fondo cuando el modal 9:16 está abierto
  useEffect(() => {
    if (activeFullscreenItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeFullscreenItem]);

  // Autoplay y sincronización de sonido al abrir el modal
  useEffect(() => {
    if (activeFullscreenItem && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.muted = isMuted;
      fullscreenVideoRef.current.currentTime = 0;
      fullscreenVideoRef.current.play().then(() => {
        setIsFullscreenPlaying(true);
      }).catch(() => {
        // Fallback muted
        if (fullscreenVideoRef.current) {
          fullscreenVideoRef.current.muted = true;
          setIsMuted(true);
          fullscreenVideoRef.current.play().then(() => setIsFullscreenPlaying(true)).catch(() => {});
        }
      });
    }
  }, [activeFullscreenItem, isMuted]);

  return (
    <section id="tiktok" className="relative w-full py-20 sm:py-24 px-3 sm:px-8 md:px-12 bg-white text-[#3B0764] overflow-hidden select-none">
      {/* Estrellas decorativas de fondo sobre fondo blanco */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="absolute top-12 right-[10%] text-6xl text-[#6E1FE8]/15 select-none">✦</span>
        <span className="absolute bottom-10 left-[6%] text-5xl text-[#6E1FE8]/10 select-none">✦</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* CABECERA VIBRANTE */}
        <div className="text-center mb-10 sm:mb-16 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black shadow-md border border-white/10 shrink-0 relative overflow-hidden">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                {/* Capa cian / cyan de TikTok */}
                <path
                  d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                  fill="#00F2FE"
                  transform="translate(-0.5, -0.5)"
                />
                {/* Capa magenta / rojo de TikTok */}
                <path
                  d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                  fill="#FE2C55"
                  transform="translate(0.5, 0.5)"
                />
                {/* Capa blanca central */}
                <path
                  d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                  fill="#FFFFFF"
                />
              </svg>
            </span>
            <span className="bg-[#6E1FE8] text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              VIRAL // TRENDS & DROPS
            </span>
          </div>

          <h2 className="font-impact text-4xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[#6E1FE8] flex items-center justify-center flex-wrap gap-2 sm:gap-3 text-center">
            TIKTOK <span className="bg-[#6E1FE8] text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-2xl inline-block transform -rotate-1 shadow-[0_12px_30px_rgba(110,31,232,0.35)]">FEED</span>
          </h2>
        </div>

        {/* ============================================================== */}
        {/* CARRUSEL DE TARJETAS FLUIDO: AUTO-SCROLL + ARRASTRE TOTAL PC/MÓVIL */}
        {/* ============================================================== */}
        <div
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => {
            if (!isDragging) setIsAutoScrollPaused(true);
          }}
          onMouseLeave={() => {
            if (!playingVideoId && !activeFullscreenItem) setIsAutoScrollPaused(false);
          }}
        >
          {/* Sombras laterales de desvanecimiento suave */}
          <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          {/* CONTENEDOR CON SCROLL NATIVO OCULTO + RAF CONTINUO + DRAG PC & TOUCH */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`w-full overflow-x-auto overflow-y-hidden no-scrollbar select-none cursor-grab active:cursor-grabbing ${
              isDragging ? 'scroll-auto' : ''
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div
              ref={trackRef}
              className="flex gap-4 sm:gap-6 md:gap-8 items-stretch w-max py-2 px-4"
            >
              {displayItems.map((item, idx) => {
                const uniqueKey = `${item.id}-${idx}`;
                const isPlaying = playingVideoId === uniqueKey;

                return (
                  <article
                    key={uniqueKey}
                    data-cursor="PLAY"
                    className="w-[280px] sm:w-[320px] md:w-[350px] flex-shrink-0 flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-2 select-none [perspective:1000px]"
                  >
                    {/* TARJETA CON COLORES Y ELEMENTOS VIBRANTES (DOBLE BISEL TIPO HARDWARE AWWWARDS) */}
                    <div
                      className="relative rounded-[2rem] sm:rounded-[2.4rem] p-4 sm:p-5 flex flex-col justify-between h-full transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:shadow-[0_30px_70px_rgba(110,31,232,0.28),inset_0_1px_1px_rgba(255,255,255,0.35)] border border-black/10"
                      style={{ backgroundColor: item.bgColor }}
                    >
                      {/* RECIPIENTE MULTIMEDIA 9:13 */}
                      <div
                        onClick={(e) => handleTogglePlay(uniqueKey, e)}
                        className="relative aspect-[9/13] w-full rounded-2xl sm:rounded-[1.4rem] overflow-hidden bg-black shadow-inner ring-1 ring-white/10 cursor-pointer [transform:translateZ(0)]"
                      >
                        {/* VÍDEO NATIVO OPTIMIZADO: PRELOAD CONDICIONAL PARA EVITAR LAG Y SATURACIÓN */}
                        <video
                          ref={(el) => {
                            videoRefs.current[uniqueKey] = el;
                          }}
                          src={item.videoUrl}
                          poster={item.cover}
                          loop
                          muted={isMuted}
                          playsInline
                          preload={isPlaying ? "auto" : "none"}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none [transform:translateZ(0)] will-change-transform"
                        />

                        {/* Sombra de viñeta para lectura clara */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

                        {/* BADGE SUPERIOR DE VISTAS */}
                        <div className="absolute top-3.5 right-3.5 flex items-center justify-end font-mono-code text-xs z-10 pointer-events-none">
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 text-white font-bold text-[11px] shadow-md backdrop-blur-sm border border-white/10">
                            <Eye className="w-3.5 h-3.5 text-[#00ECEF]" />
                            {item.views}
                          </span>
                        </div>

                        {/* BOTÓN REPRODUCTOR PLAY / PAUSE CENTRAL (CLICK INTERACTIVO) */}
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                          <div
                            className={`w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-white/95 text-black flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.35)] transform transition-all duration-300 ${
                              isPlaying
                                ? 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
                                : 'opacity-100 scale-100'
                            }`}
                          >
                            {isPlaying ? (
                              <Pause className="w-6 h-6 fill-current text-[#6E1FE8]" />
                            ) : (
                              <Play className="w-6 h-6 fill-current ml-0.5 text-[#6E1FE8]" />
                            )}
                          </div>
                        </div>

                        {/* CONTROL DE AUDIO MUTE EN ESQUINA INFERIOR IZQUIERDA */}
                        {isPlaying && (
                          <button
                            type="button"
                            onClick={toggleMute}
                            className="absolute bottom-3 left-3 p-2 rounded-full bg-black/75 hover:bg-black text-white transition-colors z-20 cursor-pointer shadow-lg backdrop-blur-md"
                            title={isMuted ? 'Activar sonido' : 'Silenciar'}
                          >
                            {isMuted ? (
                              <VolumeX className="w-4 h-4 text-red-400" />
                            ) : (
                              <Volume2 className="w-4 h-4 text-[#00ECEF]" />
                            )}
                          </button>
                        )}

                        {/* BOTÓN FLOTANTE PANTALLA COMPLETA ESTÉTICO (SIN TEXTO) */}
                        <button
                          type="button"
                          onClick={(e) => openFullscreen(e, item)}
                          className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-[#6E1FE8] text-white hover:text-[#00ECEF] backdrop-blur-md transition-all flex items-center justify-center shadow-xl border border-white/15 hover:scale-110 active:scale-95 cursor-pointer group/btn"
                          title="Pantalla completa"
                          aria-label="Ver en pantalla completa"
                        >
                          <Maximize2 className="w-4 h-4 text-white group-hover/btn:text-[#00ECEF] transition-colors" />
                        </button>
                      </div>

                      {/* CONTENIDO DE TEXTO, TAGS Y DETALLES DEL CREADOR (CON AVATAR REAL) */}
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

                        {/* Creador con Foto de Perfil Oficial y Handle */}
                        <div className="flex items-start gap-3 my-1">
                          <div className="relative p-[1.5px] rounded-full bg-white/40 shrink-0 mt-0.5 shadow-md">
                            <img
                              src={item.avatar}
                              alt={item.creator}
                              className="w-10 h-10 rounded-full object-cover border border-black/20 bg-neutral-900"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = item.cover;
                              }}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-mono-code text-[11px] font-bold text-white/80 uppercase tracking-wider truncate">
                              {item.handle}
                            </p>
                            <h3 className="font-impact text-xl sm:text-2xl uppercase tracking-tight text-white leading-tight truncate">
                              {item.creator}
                            </h3>
                            <p className="font-body text-xs text-white/90 font-medium line-clamp-2 mt-0.5 leading-snug">
                              {item.title}
                            </p>
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
      </div>

      {/* ============================================================== */}
      {/* MODAL A PANTALLA COMPLETA 9:16 TIKTOK (PORTAL A BODY CON Z-INDEX MÁXIMO) */}
      {/* ============================================================== */}
      {activeFullscreenItem && typeof document !== 'undefined' && createPortal(
        <div
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          onWheel={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200 select-none"
          onClick={() => setActiveFullscreenItem(null)}
        >
          {/* Botón flotante para cerrar */}
          <button
            type="button"
            onClick={() => setActiveFullscreenItem(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-[#6E1FE8] text-white flex items-center justify-center transition-colors shadow-2xl backdrop-blur-md cursor-pointer"
            aria-label="Cerrar video"
          >
            <X className="w-6 h-6" />
          </button>

          {/* CONTENEDOR EN MEDIDA 9:16 VERTICAL MAS GRANDE Y COMPLETO */}
          <div
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            onWheel={(e) => e.stopPropagation()}
            className="relative w-full max-w-[480px] sm:max-w-[500px] md:max-w-[520px] h-[96vh] max-h-[920px] bg-black rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] border border-white/20 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera modal del autor con estética TikTok */}
            <div className="p-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent z-20 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative p-[1.5px] rounded-full bg-gradient-to-tr from-[#00F2FE] via-white to-[#FE2C55] shrink-0">
                  <img
                    src={activeFullscreenItem.avatar || activeFullscreenItem.cover}
                    alt={activeFullscreenItem.creator}
                    className="w-9 h-9 rounded-full object-cover border border-black bg-neutral-800"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = activeFullscreenItem.cover;
                    }}
                  />
                </div>
                <div className="truncate">
                  <p className="text-white font-bold text-xs leading-none truncate flex items-center gap-1.5">
                    <span>{activeFullscreenItem.creator}</span>
                    <svg className="w-3 h-3 text-[#00F2FE] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </p>
                  <p className="text-white/60 font-mono-code text-[10px] mt-0.5 truncate">
                    {activeFullscreenItem.handle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleMute}
                className="px-3 py-1 rounded-full bg-white/20 hover:bg-[#6E1FE8] text-white font-mono-code text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#00ECEF]" />}
                <span>{isMuted ? 'MUTE' : 'AUDIO ON'}</span>
              </button>
            </div>

            {/* Video nativo 9:16 con click para Play / Pausa */}
            <div
              onClick={toggleFullscreenPlay}
              className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
            >
              <video
                ref={fullscreenVideoRef}
                src={activeFullscreenItem.videoUrl}
                poster={activeFullscreenItem.cover}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                onPlay={() => setIsFullscreenPlaying(true)}
                onPause={() => setIsFullscreenPlaying(false)}
              />

              {/* Botón central Play que aparece al pausar */}
              {!isFullscreenPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-20 pointer-events-none transition-all duration-200">
                  <div className="w-20 h-20 rounded-full bg-white/95 text-black flex items-center justify-center shadow-2xl">
                    <Play className="w-8 h-8 fill-current ml-1 text-[#6E1FE8]" />
                  </div>
                </div>
              )}
            </div>

            {/* Botones de interacción laterales en overlay (Estilo nativo TikTok) */}
            <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
              {/* Me gusta */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 hover:bg-[#FE2C55] transition-all cursor-pointer">
                  <Heart className="w-5 h-5 text-white fill-white/20 hover:fill-white" />
                </div>
                <span className="font-mono-code text-[10px] font-bold text-white shadow-sm">
                  {activeFullscreenItem.likes || '4.5K'}
                </span>
              </div>

              {/* Comentarios */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 hover:bg-white hover:text-black transition-all cursor-pointer">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <span className="font-mono-code text-[10px] font-bold text-white shadow-sm">
                  {activeFullscreenItem.comments || '14'}
                </span>
              </div>

              {/* Compartir */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 hover:bg-[#00F2FE] hover:text-black transition-all cursor-pointer">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="font-mono-code text-[10px] font-bold text-white shadow-sm">
                  {activeFullscreenItem.shares || '660'}
                </span>
              </div>

              {/* Guardar */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 hover:bg-[#FFF302] hover:text-black transition-all cursor-pointer">
                  <Bookmark className="w-5 h-5" />
                </div>
                <span className="font-mono-code text-[10px] font-bold text-white shadow-sm">
                  Guardar
                </span>
              </div>
            </div>

            {/* Pie de video TikTok: Autor, descripción, audio y botón Ver en TikTok */}
            <div className="p-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-20 pr-16 pointer-events-none">
              <p className="text-white font-bold text-sm mb-1.5 flex items-center gap-2">
                <span>{activeFullscreenItem.handle}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FE2C55]/30 text-[#FE2C55] border border-[#FE2C55]/40 font-mono-code">
                  TIKTOK
                </span>
              </p>
              <p className="text-white/95 text-xs leading-relaxed mb-2 line-clamp-2">
                {activeFullscreenItem.title}
              </p>

              {/* Sonido de fondo TikTok */}
              <div className="flex items-center gap-2 text-white/80 font-mono-code text-[11px] mb-3">
                <Music className="w-3.5 h-3.5 text-[#00F2FE] animate-pulse shrink-0" />
                <span className="truncate">{activeFullscreenItem.music || "sonido original - TikTok"}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-white/70 font-mono-code text-[11px] pointer-events-auto">
                <span className="flex items-center gap-1.5 text-white/80">
                  <Eye className="w-3.5 h-3.5 text-[#00ECEF]" />
                  <span>{activeFullscreenItem.views} reproducciones</span>
                </span>
                {activeFullscreenItem.tiktokUrl && (
                  <a
                    href={activeFullscreenItem.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00F2FE] hover:text-white font-bold hover:underline"
                  >
                    VER EN TIKTOK
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Utilidad CSS para ocultar scrollbars nativos en navegadores antiguos */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
