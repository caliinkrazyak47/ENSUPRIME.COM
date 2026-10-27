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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const distanceToBottom = scrollHeight - (scrollY + clientHeight);

      setHideAtBottom(distanceToBottom < 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll si el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`scheme-header fixed top-0 left-0 right-0 z-40 w-full select-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hideAtBottom
            ? 'opacity-0 -translate-y-full pointer-events-none'
            : scrolled
            ? 'py-2.5 sm:py-3 bg-[#0d0717]/95 backdrop-blur-3xl border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.65)] opacity-100 translate-y-0'
            : 'pt-4 sm:pt-7 md:pt-10 pb-3 sm:pb-4 bg-transparent opacity-100 translate-y-0'
        }`}
      >
        {/* Contenedor ancho 94% en móvil / 96% en desktop */}
        <div className="w-[94%] sm:w-[96%] max-w-[1920px] mx-auto">
          <nav className="flex items-center justify-between w-full">
            
            {/* 1. ESCRITORIO IZQUIERDA: TV ONLINE & TIKTOK FEED */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12 justify-start flex-1">
              <a
                href="#tv"
                className="scheme-nav-link text-white hover:text-[#C0D43E] uppercase font-sans font-black text-sm lg:text-base xl:text-lg tracking-[0.08em] transition-all duration-300 relative group overflow-hidden py-1 leading-none"
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
                className="scheme-nav-link text-white hover:text-[#C0D43E] uppercase font-sans font-black text-sm lg:text-base xl:text-lg tracking-[0.08em] transition-all duration-300 relative group overflow-hidden py-1 leading-none"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[120%]">
                  TIKTOK FEED
                </span>
                <span className="absolute left-0 top-[120%] inline-block text-[#C0D43E] transition-transform duration-300 group-hover:-translate-y-[120%]">
                  TIKTOK FEED
                </span>
              </a>
            </div>

            {/* 2. CENTRO: LOGO ENSUPRIME (SIEMPRE CENTRADO Y NÍTIDO) */}
            <div className="brand-logo-container flex items-center justify-start md:justify-center">
              <a
                href="#"
                className="scheme-brand-logo group flex items-center cursor-pointer transition-transform duration-300 hover:scale-[1.04]"
                title="ENSUPRIME"
              >
                <div className="flex items-center tracking-[-0.02em] select-none">
                  <span className="font-impact text-2xl sm:text-3xl md:text-4xl text-white tracking-[0.03em] uppercase leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] group-hover:text-white transition-colors">
                    ENSU
                  </span>
                  <span className="font-impact text-2xl sm:text-3xl md:text-4xl text-[#6E1FE8] group-hover:text-[#FF7A00] tracking-[0.03em] uppercase leading-none transition-colors">
                    PRIME
                  </span>
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF7A00] rounded-none ml-1 sm:ml-1.5 animate-pulse self-end mb-1" />
                  <span className="ml-2 px-1.5 py-0.5 rounded-md bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[#FF7A00] text-[9px] font-mono font-bold tracking-widest uppercase hidden sm:inline-block">
                    HALLOWEEN
                  </span>
                </div>
              </a>
            </div>

            {/* 3. ESCRITORIO DERECHA: TALENTO, EVENTOS & RELOJ MADRID */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12 justify-end flex-1">
              <a
                href="#talento"
                className="scheme-nav-link text-white hover:text-[#C0D43E] uppercase font-sans font-black text-sm lg:text-base xl:text-lg tracking-[0.08em] transition-all duration-300 relative group overflow-hidden py-1 leading-none"
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
                className="scheme-nav-link text-white hover:text-[#C0D43E] uppercase font-sans font-black text-sm lg:text-base xl:text-lg tracking-[0.08em] transition-all duration-300 relative group overflow-hidden py-1 leading-none"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[120%]">
                  EVENTOS
                </span>
                <span className="absolute left-0 top-[120%] inline-block text-[#C0D43E] transition-transform duration-300 group-hover:-translate-y-[120%]">
                  EVENTOS
                </span>
              </a>

              {/* RELOJ EN LA ESQUINA */}
              {madridTime && (
                <div className="flex items-center gap-1.5 text-white font-mono text-xs lg:text-sm tracking-wider select-none shrink-0 pl-2">
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

            {/* 4. MÓVIL: BOTÓN MENÚ HAMBURGUESA MODERNO */}
            <div className="flex md:hidden items-center gap-3">
              {madridTime && (
                <div className="flex items-center gap-1 text-white font-mono text-[11px] select-none mr-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C0D43E] animate-pulse inline-block" />
                  <span className="font-bold tabular-nums">
                    {madridTime.hours}:{madridTime.minutes}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                className="w-10 h-10 rounded-xl bg-white/10 active:bg-white/20 text-white flex flex-col items-center justify-center gap-1.5 transition-colors border border-white/15 cursor-pointer"
              >
                <span className={`w-5 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-5 h-[2px] bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`w-5 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </nav>
        </div>

        {/* GRADIENTE SUPERIOR SUTIL */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
      </header>

      {/* 5. MENÚ MÓVIL OVERLAY CINEMATOGRÁFICO A PANTALLA COMPLETA */}
      {isMobileMenuOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 bg-[#0A0612]/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-24 animate-in fade-in duration-300 select-none"
        >
          {/* Botón cerrar en esquina superior */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Cerrar menú"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center active:bg-white/20 border border-white/10"
          >
            <span className="text-xl font-bold">✕</span>
          </button>

          {/* Enlaces grandes verticales con espaciado limpio sin flechas */}
          <div className="flex flex-col gap-6 my-auto">
            <a
              href="#tv"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-impact text-4xl sm:text-5xl text-white active:text-[#C0D43E] uppercase tracking-tight border-b border-white/10 pb-4 transition-colors"
            >
              TV ONLINE
            </a>

            <a
              href="#tiktok"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-impact text-4xl sm:text-5xl text-white active:text-[#C0D43E] uppercase tracking-tight border-b border-white/10 pb-4 transition-colors"
            >
              TIKTOK FEED
            </a>

            <a
              href="#talento"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-impact text-4xl sm:text-5xl text-white active:text-[#C0D43E] uppercase tracking-tight border-b border-white/10 pb-4 transition-colors"
            >
              TALENTO
            </a>

            <a
              href="#eventos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-impact text-4xl sm:text-5xl text-white active:text-[#C0D43E] uppercase tracking-tight border-b border-white/10 pb-4 transition-colors"
            >
              EVENTOS
            </a>
          </div>

          {/* Pie del menú móvil */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-white/60 font-mono text-xs">
            <span>ENSUPRIME.COM</span>
            {madridTime && (
              <span className="text-[#C0D43E] font-bold">
                MADRID {madridTime.hours}:{madridTime.minutes} {madridTime.cet}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};
