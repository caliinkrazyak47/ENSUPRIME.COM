import React, { useState, useEffect } from 'react';

interface SchemeNavbarProps {
  madridTime?: {
    hours: string;
    minutes: string;
    seconds: string;
    cet: string;
  };
}

export const SchemeNavbar: React.FC<SchemeNavbarProps> = ({
  madridTime,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [hideAtBottom, setHideAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      // Si el usuario está llegando al footer (últimos 600px de la página), ocultar el navbar suavemente
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const distanceToBottom = scrollHeight - (scrollY + clientHeight);

      setHideAtBottom(distanceToBottom < 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`scheme-header fixed top-0 left-0 right-0 z-40 w-full select-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hideAtBottom
          ? 'opacity-0 -translate-y-full pointer-events-none'
          : scrolled
          ? 'py-3 bg-[#0d0717]/95 backdrop-blur-3xl border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.65)] opacity-100 translate-y-0'
          : 'pt-7 sm:pt-9 md:pt-11 pb-4 bg-transparent opacity-100 translate-y-0'
      }`}
    >
      {/* Contenedor ancho 96% igual a .container de schemeengine.com */}
      <div className="w-[96%] max-w-[1920px] mx-auto">
        {/* Grid de 3 columnas exacto a .nav de Scheme Engine */}
        <nav className="scheme-nav grid grid-cols-[1fr_auto_1fr] items-center w-full">
          
          {/* 1. COLUMNA IZQUIERDA: ENLACES GRANDES (ESTILO DIRECTORS / WORK) */}
          <div className="left-nav flex items-center gap-7 sm:gap-12 md:gap-16 justify-start">
            <a
              href="#tv"
              className="scheme-nav-link text-white hover:text-[#C0D43E] uppercase font-sans font-black text-sm sm:text-base md:text-xl lg:text-2xl tracking-[0.06em] transition-all duration-300 relative group overflow-hidden py-1 leading-none"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[120%]">
                TV ONLINE
              </span>
              <span className="absolute left-0 top-[120%] inline-block text-[#C0D43E] transition-transform duration-300 group-hover:-translate-y-[120%]">
                TV ONLINE
              </span>
            </a>

            <a
              href="#tiktok"
              className="scheme-nav-link text-white hover:text-[#C0D43E] uppercase font-sans font-black text-sm sm:text-base md:text-xl lg:text-2xl tracking-[0.06em] transition-all duration-300 relative group overflow-hidden py-1 leading-none"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[120%]">
                TIKTOK FEED
              </span>
              <span className="absolute left-0 top-[120%] inline-block text-[#C0D43E] transition-transform duration-300 group-hover:-translate-y-[120%]">
                TIKTOK FEED
              </span>
            </a>
          </div>

          {/* 2. CENTRO ELEGANTE: LOGO ENSUPRIME COMPACTO PARA DEJAR PROTAGONISMO AL TÍTULO */}
          <div className="brand-logo-container flex items-center justify-center px-4 sm:px-8">
            <a
              href="#"
              className="scheme-brand-logo group flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.04]"
              title="ENSUPRIME"
            >
              <div className="flex items-center tracking-[-0.02em] select-none">
                <span className="font-impact text-2xl sm:text-3xl md:text-4xl text-white tracking-[0.03em] uppercase leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] group-hover:text-white transition-colors">
                  ENSU
                </span>
                <span className="font-impact text-2xl sm:text-3xl md:text-4xl text-[#6E1FE8] group-hover:text-[#C0D43E] tracking-[0.03em] uppercase leading-none transition-colors">
                  PRIME
                </span>
                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C0D43E] rounded-none ml-1 sm:ml-1.5 animate-pulse self-end mb-1" />
              </div>
            </a>
          </div>

          {/* 3. COLUMNA DERECHA: ENLACES GRANDES + METADATOS Y ACCIONES */}
          <div className="right-nav flex items-center gap-5 sm:gap-8 md:gap-12 justify-end">
            <a
              href="#talento"
              className="scheme-nav-link hidden sm:inline-block text-white hover:text-[#C0D43E] uppercase font-sans font-black text-sm sm:text-base md:text-xl lg:text-2xl tracking-[0.06em] transition-all duration-300 relative group overflow-hidden py-1 leading-none"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[120%]">
                TALENTO
              </span>
              <span className="absolute left-0 top-[120%] inline-block text-[#C0D43E] transition-transform duration-300 group-hover:-translate-y-[120%]">
                TALENTO
              </span>
            </a>

            <a
              href="#eventos"
              className="scheme-nav-link text-white hover:text-[#C0D43E] uppercase font-sans font-black text-sm sm:text-base md:text-xl lg:text-2xl tracking-[0.06em] transition-all duration-300 relative group overflow-hidden py-1 leading-none"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[120%]">
                EVENTOS
              </span>
              <span className="absolute left-0 top-[120%] inline-block text-[#C0D43E] transition-transform duration-300 group-hover:-translate-y-[120%]">
                EVENTOS
              </span>
            </a>

            {/* RELOJ EN LA ESQUINA SIN FONDO (TOTALMENTE TRANSPARENTE) */}
            {madridTime && (
              <div className="flex items-center gap-1.5 text-white font-mono text-xs sm:text-sm tracking-wider select-none shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C0D43E] animate-pulse inline-block" />
                <span className="font-bold tabular-nums">
                  {madridTime.hours}:{madridTime.minutes}.{madridTime.seconds}
                </span>
                <span className="text-white/60 text-[10px] tracking-widest uppercase">
                  {madridTime.cet}
                </span>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* GRADIENTE SUPERIOR SUTIL */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
    </header>
  );
};
