import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Play, Pause, Volume2, VolumeX, X, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

export interface ReelCardData {
  id: string;
  creator: string;
  handle: string;
  avatar: string;
  reelUrl: string;       // Enlace al reel original en Instagram
  videoUrl: string;      // Enlace directo al archivo .mp4 descargado
  posterFrame: string;   // Frame del video original
  caption: string;
  likes: string;
  comments: string;
}

// Icono oficial de Instagram
const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// Icono oficial de Instagram Reels
const ReelsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" opacity="0.15" />
    <path fillRule="evenodd" clipRule="evenodd" d="M4.5 4h15A2.5 2.5 0 0 1 22 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 17.5v-11A2.5 2.5 0 0 1 4.5 4zm3.87 2H4.5A.5.5 0 0 0 4 6.5v.77l4.37-1.27zm2.08-.6l-4.5 1.31v2.16l4.5-1.31V5.4zm2 0v2.16l4.5-1.31V5.4l-4.5 1.31zm6.5 1.87V6.5a.5.5 0 0 0-.5-.5h-3.92l4.42 1.27zM4 9.38v8.12a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V9.38L4 9.38zm6.5 2.12a.75.75 0 0 1 1.13-.65l4 2.5a.75.75 0 0 1 0 1.3l-4 2.5A.75.75 0 0 1 10.5 16v-4.5z" />
  </svg>
);

export const INSTA_REELS_DATA: ReelCardData[] = [
  {
    id: "reel-1",
    creator: "A N T R Y ✨",
    handle: "@iamantry",
    avatar: "https://scontent.cdninstagram.com/v/t51.82787-19/669714736_18583033942012680_7269851986264441677_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=103&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=QBOe_4YqQ5YQ7kNvwF8MlP3&_nc_oc=Adrt4d76wVkOWs3Ydc-UHiPuDpYjpLXXFtaPKxAVBOkMl_-ySBNvXX2velFQmg-QCbw&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=NsDjBF6tZjQitvla0azujA&_nc_ss=7f689&oh=00_AQO6NcZJXC4ilkxEoPkv_xpyXwjZsPpxelJ0yX4k71BFPQ&oe=6AD5D612",
    reelUrl: "https://www.instagram.com/p/DcPRwsXu6Oa/",
    videoUrl: "https://files.catbox.moe/yzvxaz.mp4",
    posterFrame: "https://scontent.cdninstagram.com/v/t51.82787-15/778936627_18623106913012680_3051834808532794925_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=102&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=05wcj4z0isgQ7kNvwGPp_nT&_nc_oc=AdrTCT_UsspErJXg1KNb_vdpi3MdLiuppCYs4PPfu5RksF-J8L1a89gvdkqHVbUiRUg&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=8W3NsTHyRH9hm6ixSFuHKQ&_nc_ss=7c689&oh=00_AQNOmlqYqTyD3zyskfmTC6jk3Ctp3BTy2OVcMXzqgGKjDg&oe=6AD5C1F9",
    caption: "El R&B en español viene más duro que nunca✨🤎 que ganas de cantarles toda “The Nasty Trilogy” en vivo😮‍💨",
    likes: "5.9K",
    comments: "278",
  },
  {
    id: "reel-2",
    creator: "NICKI FAV",
    handle: "@nickifav",
    avatar: "https://scontent.cdninstagram.com/v/t51.82787-19/825326349_18632591560009288_5881305110093637176_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=103&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy44MzAuQzMifQ%3D%3D&_nc_ohc=AZAQurqiMiYQ7kNvwHbKMl3&_nc_oc=AdqAoZhCgo8CKRvq5se7u-uO_75mZUe3R1_C6oNSEHNnK23H01sL2zdQCRn2m7OYFNo&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=TxMCf5TFd_jHL1JLE6Uh1Q&_nc_ss=7f289&oh=00_AQN3ojV2MtQlXjgU0oOr_esdWl3ZnAn02QNIYvum0gmYSA&oe=6AD65129",
    reelUrl: "https://www.instagram.com/reel/DdaTGxHtJcs/",
    videoUrl: "https://files.catbox.moe/o3596y.mp4",
    posterFrame: "https://instagram.fmad6-1.fna.fbcdn.net/v/t51.82787-15/814364952_18629513689009288_926860774327790633_n.jpg?stp=c0.280.720.720a_dst-jpg_e15_s640x640_tt6&_nc_cat=100&_nc_map=urlgen_bucketless&ig_cache_key=Mzk4ODU4NDQ0NzkzMzE5MTk4MDE4NjI5NTEzNjg2MDA5Mjg4.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjcyMC5zZHIudmlkZW9fZGVmYXVsdF9jb3Zlcl9mcmFtZS5DMyJ9&_nc_ohc=kOTxjXJ-DesQ7kNvwFB65Ha&_nc_oc=Adooky_HBrQu6fNUcRg9YC_yZ4tRVUn8mE7IJLAUyOJ69yqpx2E7pWXlw74jSsya788&_nc_zt=23&_nc_ht=instagram.fmad6-1.fna&_nc_gid=TxMCf5TFd_jHL1JLE6Uh1Q&_nc_ss=7f689&oh=00_AQNTnto5buxZ3xs1Lb89ZFPAk-SxtLZbqjG5r4T3LVQ8xQ&oe=6AD644B7",
    caption: "le escribí un verso a “dichavate” y creo q le gustó 🤍 amo el reparto cubano😍⭐️",
    likes: "99K",
    comments: "1.7K",
  },
  {
    id: "reel-3",
    creator: "NICOLE NIMA",
    handle: "@nicolenima_",
    avatar: "https://scontent.cdninstagram.com/v/t51.82787-19/846249906_18427679881146725_610269989715466861_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=102&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy44NjEuQzMifQ%3D%3D&_nc_ohc=M2o6cWnsyR0Q7kNvwERMM8x&_nc_oc=AdpbiM80yH0zIk9o2_YrF372M9LfMUpVuOd6PdttwuhzxM3NRPlyyxOWvulkFZEQfPI&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=FNivM1IZPXNsYSUXC3ZX9Q&_nc_ss=7f689&oh=00_AQMTLsWzFM0NtHh83UYjKNqQvkB4o13nNRppsUgil69V3Q&oe=6AD665E9",
    reelUrl: "https://www.instagram.com/reel/DWNDh9Sua2t/",
    videoUrl: "https://files.catbox.moe/isq6oa.mp4",
    posterFrame: "https://instagram.fmad6-1.fna.fbcdn.net/v/t51.71878-15/656350024_1285596410300356_1357095504858989444_n.jpg?stp=c0.248.640.640a_dst-jpg_e15_s640x639_tt6&_nc_cat=111&_nc_map=urlgen_bucketless&ig_cache_key=Mzg1ODc1NTk4MzQyMTA1ODQ3NzIzNjE0NzA3OTQzMzY4Njg%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjY0MC5zZHIudmlkZW9fbmZyYW1lX2NvdmVyX2ZyYW1lLkMzIn0%3D&_nc_ohc=1cAv9xf8QJMQ7kNvwH44Jg5&_nc_oc=AdpTqQYBtOhb-n4FAy1CHnxwRAJ-dl88zVnUR-v8za4-ZfyJG1yRJ0vpWyRr6j4va_E&_nc_zt=23&_nc_ht=instagram.fmad6-1.fna&_nc_gid=FNivM1IZPXNsYSUXC3ZX9Q&_nc_ss=7f689&oh=00_AQPb-GPYLoAyE3qtDDc69PLMVNiBVs5JgNgCJZD1xO0HcQ&oe=6AD66854",
    caption: "y cuando vuelven ya es tarde… 🥀",
    likes: "23.4K",
    comments: "418",
  },
  {
    id: "reel-4",
    creator: "DAYANA VEVE",
    handle: "@dayanaveve",
    avatar: "https://scontent.cdninstagram.com/v/t51.82787-19/767586378_18321941668302501_1766934220236224335_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=104&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=VgXnWg_KnhUQ7kNvwFMt8qY&_nc_oc=Adp__ZmPJkdU625oiCtwRw_nD6m04gBDEt0dwXJpQu0TEoFxGmCK5kksWsNEq1QwKeg&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=BG172LZVB6Gq1Yb374GCNg&_nc_ss=7f689&oh=00_AQN-Elrj81L8FybWcDLICw59KoRDSFU5meflQ0yNsd0z9w&oe=6AD67EE8",
    reelUrl: "https://www.instagram.com/p/DcMX0RUP_ox/",
    videoUrl: "https://files.catbox.moe/4zazvt.mp4",
    posterFrame: "https://instagram.fmad6-1.fna.fbcdn.net/v/t51.82787-15/776685663_18323863765302501_3689745020276058967_n.jpg?stp=c0.280.720.720a_dst-jpg_e15_s320x320_tt6&_nc_cat=106&_nc_map=urlgen_bucketless&ig_cache_key=Mzk2NjY1MDExODg4MjQ1ODE2MTE4MzIzODYzNzYyMzAyNTAx.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjcyMC5zZHIudmlkZW9fZGVmYXVsdF9jb3Zlcl9mcmFtZS5DMyJ9&_nc_ohc=8CkJ1GZEKYYQ7kNvwFVxgNn&_nc_oc=AdpVw2Jo_gzpYvF87wNxh1lVutwZxEnMx1piRWA7dZKDBsRsDn6ToQHmHnXtYIRQZEs&_nc_zt=23&_nc_ht=instagram.fmad6-1.fna&_nc_gid=BG172LZVB6Gq1Yb374GCNg&_nc_ss=7f689&oh=00_AQPkvZc0IL0-e4xX8NzM9B1yVMWeCUcGHQez7IaaPSrbug&oe=6AD65E12",
    caption: "Playlist en Rottation ♥️ Si no contesto el cel es pq estoy en una terraza con un desconocido...",
    likes: "18K",
    comments: "593",
  },
  {
    id: "reel-5",
    creator: "Hailey Picardi",
    handle: "@haileypicardi",
    avatar: "/hailey.jpg",
    reelUrl: "https://www.instagram.com/reels/DefrWfgTOLt/",
    videoUrl: "/hailey-reel.mp4",
    posterFrame: "/hailey.jpg",
    caption: "presave my next song in bio btw <3 #surething #miguel #guitar #singing #cover",
    likes: "29K",
    comments: "104",
  },
  {
    id: "reel-6",
    creator: "SHELLY 🌟🐚",
    handle: "@shellymusicc",
    avatar: "/shelly.jpg",
    reelUrl: "https://www.instagram.com/reels/Dee-O-FsADG/",
    videoUrl: "/shelly-reel.mp4",
    posterFrame: "/shelly.jpg",
    caption: "all that i knew - an original #originalmusic #singersongwriter #jazz #rnb #soul",
    likes: "15.6K",
    comments: "142",
  },
];

interface PremiumInstaFeedSectionProps {
  onModalOpen?: (isOpen: boolean) => void;
}

export const PremiumInstaFeedSection: React.FC<PremiumInstaFeedSectionProps> = ({
  onModalOpen,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activeFullscreenReel, setActiveFullscreenReel] = useState<ReelCardData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);

  // Física de arrastre con ratón o táctil
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isAutoScrollPausedRef = useRef(false);

  useEffect(() => {
    isAutoScrollPausedRef.current = isAutoScrollPaused;
  }, [isAutoScrollPaused]);

  // Duplicamos los elementos 4 veces para crear un carrusel verdaderamente infinito y sin saltos (idéntico a TikTok Feed)
  const displayItems = [...INSTA_REELS_DATA, ...INSTA_REELS_DATA, ...INSTA_REELS_DATA, ...INSTA_REELS_DATA];

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
    const speedPixelsPerSecond = 55; // Velocidad idéntica a TikTok Feed

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

  // Manejadores de arrastre con ratón
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDownRef.current = true;
    hasDraggedRef.current = false;
    setIsDragging(true);
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
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
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    }
  };

  // Manejadores de arrastre táctil (mano / móvil)
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

  useEffect(() => {
    const isOpen = Boolean(activeFullscreenReel);
    onModalOpen?.(isOpen);
    if (typeof document !== 'undefined') {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [activeFullscreenReel, onModalOpen]);

  const togglePlay = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasDraggedRef.current) return;

    const video = videoRefs.current[key];
    if (!video) return;

    if (playingId === key) {
      video.pause();
      setPlayingId(null);
      setIsAutoScrollPaused(false);
    } else {
      // Pausar cualquier otro video activo
      Object.keys(videoRefs.current).forEach((k) => {
        if (k !== key && videoRefs.current[k]) {
          videoRefs.current[k]?.pause();
        }
      });
      video.play().then(() => {
        setPlayingId(key);
        setIsAutoScrollPaused(true);
      }).catch(() => {});
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

  const openFullscreen = (e: React.MouseEvent, item: ReelCardData) => {
    e.stopPropagation();
    if (hasDraggedRef.current) return;
    if (playingId && videoRefs.current[playingId]) {
      videoRefs.current[playingId]?.pause();
      setPlayingId(null);
    }
    // Abrir con audio activo de inmediato por acción explícita del usuario
    setIsMuted(false);
    setActiveFullscreenReel(item);
  };

  useEffect(() => {
    if (activeFullscreenReel && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.muted = isMuted;
      fullscreenVideoRef.current.play().catch(() => {
        // En caso de que el navegador bloquee unmuted sin interacción directa previa
        if (fullscreenVideoRef.current) {
          fullscreenVideoRef.current.muted = true;
          fullscreenVideoRef.current.play().catch(() => {});
        }
      });
    }
  }, [activeFullscreenReel, isMuted]);

  return (
    <section id="insta-feed" className="relative w-full py-20 sm:py-24 px-3 sm:px-8 md:px-12 bg-[#FAFAFA] text-[#262626] overflow-hidden select-none">
      {/* Estrellas decorativas de fondo sutiles */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="absolute top-10 left-[8%] text-7xl text-[#6E1FE8]/10 select-none">✦</span>
        <span className="absolute bottom-12 right-[10%] text-8xl text-[#6E1FE8]/10 select-none">✦</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* CABECERA VIBRANTE CENTRADA */}
        <div className="text-center mb-10 sm:mb-16 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-md">
              <InstagramIcon className="w-4 h-4 text-white" />
            </span>
            <span className="bg-[#6E1FE8] text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              REDES // INSTA REELS
            </span>
          </div>
          <h2 className="font-impact text-4xl sm:text-7xl md:text-8xl text-[#6E1FE8] uppercase tracking-tight flex items-center justify-center flex-wrap gap-2 sm:gap-3 text-center">
            INSTA <span className="bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-2xl inline-block transform -rotate-1 shadow-[0_12px_32px_rgba(221,42,123,0.35)]">FEED</span>
          </h2>
        </div>

        {/* CARRUSEL DESLIZANTE INFINITO IDÉNTICO A TIKTOK FEED (MOVIMIENTO DERECHA-IZQUIERDA + DRAG RATÓN Y MANO) */}
        <div
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => {
            if (!isDragging) setIsAutoScrollPaused(true);
          }}
          onMouseLeave={() => {
            if (!playingId && !activeFullscreenReel) setIsAutoScrollPaused(false);
          }}
        >
          {/* Sombras laterales de desvanecimiento suave */}
          <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent z-20 pointer-events-none" />

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
            <div className="flex gap-4 sm:gap-6 md:gap-8 items-stretch w-max py-2 px-4">
              {displayItems.map((item, idx) => {
                const uniqueKey = `${item.id}-${idx}`;
                const isPlaying = playingId === uniqueKey;

                return (
                  <article
                    key={uniqueKey}
                    className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 bg-white rounded-[2rem] overflow-hidden border border-[#E8E8E8] hover:border-[#6E1FE8]/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_55px_rgba(110,31,232,0.16)] hover:-translate-y-2 flex flex-col justify-between select-none ring-1 ring-black/[0.03]"
                  >
                    {/* 1. CABECERA BLANCA OFICIAL DE INSTAGRAM CON AVATAR REAL */}
                    <div className="p-3.5 flex items-center justify-between border-b border-[#F0F0F0] bg-white z-20">
                      <a
                        href={item.reelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 min-w-0"
                        title="Ver perfil de Instagram"
                      >
                        {/* Anillo de degradado característico de Instagram */}
                        <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex-shrink-0">
                          <img
                            src={item.avatar}
                            alt={item.creator}
                            className="w-9 h-9 rounded-full object-cover border-2 border-white bg-white"
                          />
                        </div>
                        <div className="truncate">
                          <p className="text-[#262626] font-bold text-xs truncate group-hover:text-[#0095F6] transition-colors leading-tight">
                            {item.creator}
                          </p>
                          <p className="text-[#8E8E8E] font-mono-code text-[11px] truncate">
                            {item.handle}
                          </p>
                        </div>
                      </a>

                      {/* Botón de Silencio / Sonido */}
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="w-8 h-8 rounded-full bg-[#FAFAFA] hover:bg-[#EFEFEF] text-[#262626] flex items-center justify-center transition-colors flex-shrink-0 border border-[#DBDBDB]"
                        title={isMuted ? "Activar audio" : "Silenciar"}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#8E8E8E]" /> : <Volume2 className="w-3.5 h-3.5 text-[#6E1FE8]" />}
                      </button>
                    </div>

                    {/* 2. CONTENEDOR DEL VIDEO: FRAME ORIGINAL + REPRODUCTOR NATIVO SIN BORDES NEGROS */}
                    <div
                      onClick={(e) => togglePlay(uniqueKey, e)}
                      className="relative w-full aspect-[9/14] overflow-hidden bg-black cursor-pointer select-none"
                    >
                      <video
                        ref={(el) => { videoRefs.current[uniqueKey] = el; }}
                        src={item.videoUrl}
                        poster={item.posterFrame}
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                      />

                      {/* Gradiente sutil inferior */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Botón central de Play / Pause */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                          className={`w-14 h-14 rounded-full bg-white/95 backdrop-blur-md text-[#262626] flex items-center justify-center shadow-2xl transform transition-all duration-300 ${
                            isPlaying ? 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100' : 'opacity-100 scale-100'
                          }`}
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6 fill-current text-[#6E1FE8]" />
                          ) : (
                            <Play className="w-6 h-6 fill-current translate-x-0.5 text-[#6E1FE8]" />
                          )}
                        </div>
                      </div>

                      {/* Botón flotante inferior para Pantalla Completa con ícono oficial Reels */}
                      <button
                        type="button"
                        onClick={(e) => openFullscreen(e, item)}
                        className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-black/75 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] text-white backdrop-blur-md transition-all flex items-center justify-center shadow-xl hover:scale-110 active:scale-95"
                        title="Ver Reel en pantalla completa"
                      >
                        <ReelsIcon className="w-5 h-5 text-white" />
                      </button>
                    </div>

                    {/* 3. BARRA INFERIOR BLANCA OFICIAL DE INSTAGRAM (LIKES, COMENTARIOS Y CAPTION) */}
                    <div className="p-3.5 bg-white border-t border-[#EFEFEF] flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 text-[#262626]">
                        <div className="flex items-center gap-3.5">
                          <button
                            type="button"
                            className="flex items-center gap-1 text-xs font-semibold hover:text-[#ED4956] transition-colors"
                            title="Me gusta"
                          >
                            <Heart className="w-4 h-4 hover:fill-[#ED4956] hover:text-[#ED4956] transition-all" />
                            <span className="font-mono-code text-[11px] font-bold">{item.likes}</span>
                          </button>
                          <button
                            type="button"
                            className="flex items-center gap-1 text-xs font-semibold hover:text-[#0095F6] transition-colors"
                            title="Comentarios"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="font-mono-code text-[11px] font-bold">{item.comments}</span>
                          </button>
                          <button
                            type="button"
                            className="text-xs font-semibold hover:text-[#0095F6] transition-colors"
                            title="Compartir"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          className="text-xs font-semibold hover:text-[#262626] transition-colors"
                          title="Guardar"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Pie de foto / caption con estética de Instagram */}
                      <p className="font-body text-xs text-[#262626] line-clamp-2 leading-relaxed">
                        <span className="font-bold text-[#262626] mr-1.5">{item.handle}</span>
                        {item.caption}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. MODAL A PANTALLA COMPLETA 9:16 RENDERIZADO CON PORTAL AL BODY PARA EVITAR QUE OTROS ELEMENTOS LO TAPEN */}
        {activeFullscreenReel && typeof document !== 'undefined' && createPortal(
          <div
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            onWheel={(e) => e.stopPropagation()}
            className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200 select-none"
            onClick={() => setActiveFullscreenReel(null)}
          >
            {/* Botón flotante para cerrar con una X clara y visible */}
            <button
              type="button"
              onClick={() => setActiveFullscreenReel(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[1000000] w-12 h-12 rounded-full bg-white/20 hover:bg-[#ED4956] text-white flex items-center justify-center transition-all shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Cerrar video"
            >
              <X className="w-7 h-7" />
            </button>

            {/* CONTENEDOR EN MEDIDA 9:16 VERTICAL MAS GRANDE Y COMPLETO */}
            <div
              className="relative w-full max-w-[480px] sm:max-w-[500px] md:max-w-[520px] h-[96vh] max-h-[920px] bg-black rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] border border-white/20 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cabecera modal del autor */}
              <div className="p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative p-[1.5px] rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
                    <img
                      src={activeFullscreenReel.avatar}
                      alt={activeFullscreenReel.creator}
                      className="w-9 h-9 rounded-full object-cover border border-white"
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs leading-none">
                      {activeFullscreenReel.creator}
                    </p>
                    <p className="text-white/60 font-mono-code text-[10px]">
                      {activeFullscreenReel.handle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="px-3 py-1 rounded-full bg-white/20 hover:bg-[#6E1FE8] text-white font-mono-code text-xs font-bold uppercase transition-colors flex items-center gap-1.5"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#C0D43E]" />}
                    <span>{isMuted ? 'MUTE' : 'AUDIO ON'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFullscreenReel(null)}
                    className="sm:hidden w-8 h-8 rounded-full bg-white/20 hover:bg-[#ED4956] text-white flex items-center justify-center transition-colors"
                    aria-label="Cerrar video"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Video nativo 9:16 */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <video
                  ref={fullscreenVideoRef}
                  src={activeFullscreenReel.videoUrl}
                  poster={activeFullscreenReel.posterFrame}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Pie de foto y botón en modal */}
              <div className="p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
                <p className="text-white text-xs leading-relaxed mb-3">
                  <span className="font-bold text-white mr-1.5">{activeFullscreenReel.handle}</span>
                  {activeFullscreenReel.caption}
                </p>
                <div className="flex items-center justify-end text-white/70 font-mono-code text-[11px]">
                  <a
                    href={activeFullscreenReel.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#0095F6] hover:text-white transition-colors font-bold text-xs"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>VER EN INSTAGRAM ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* BANNER INFERIOR PROMOCIONAL SOCIAL */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#6E1FE8] via-[#8B3BFF] to-[#E1306C] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div>
              <h3 className="font-impact text-2xl sm:text-3xl uppercase tracking-wide">
                ¿QUIERES APARECER EN NUESTRO FEED?
              </h3>
              <p className="font-body text-sm text-white/90">
                Comparte tus reels y videos con <span className="font-mono-code font-bold text-white underline">#EnsuprimeLive</span> para ser destacado en portada.
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white text-[#110B1C] font-mono-code text-xs font-black uppercase tracking-wider hover:bg-[#C0D43E] hover:text-black transition-colors flex-shrink-0 shadow-lg"
          >
            ETIQUÉTANOS AHORA
          </a>
        </div>
      </div>
    </section>
  );
};
