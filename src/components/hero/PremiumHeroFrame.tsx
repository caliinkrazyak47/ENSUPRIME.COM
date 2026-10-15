import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, ArrowRight, Sparkles, Radio } from 'lucide-react';

interface HeroProps {
  onWatchLive: () => void;
  isRadioPlaying: boolean;
  onToggleRadio: () => void;
}

export const PremiumHeroFrame: React.FC<HeroProps> = ({
  onWatchLive,
  isRadioPlaying,
  onToggleRadio,
}) => {
  const [madridTime, setMadridTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Madrid',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setMadridTime(new Intl.DateTimeFormat('es-ES', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-white flex flex-col justify-between">
      
      {/* TARJETA HERO FULL-WIDTH EDGE-TO-EDGE */}
      <div className="relative w-full px-0 py-4 sm:py-6 overflow-hidden flex flex-col justify-between">
        
        {/* ============================================================== */}
        {/* 1. NAVBAR INTEGRADO: SHOP, NEW IN, COLLECTIONS, NEXORA...      */}
        {/* ============================================================== */}
        <header className="w-full px-6 sm:px-10 md:px-14 flex items-center justify-between pb-6 md:pb-8 z-30">
          {/* ENLACES IZQUIERDA */}
          <nav className="hidden lg:flex items-center gap-7 font-body font-semibold text-xs tracking-wide text-gray-700">
            <a href="#tv" className="hover:text-[#6E1FE8] transition-colors">Shop</a>
            <a href="#tiktok" className="hover:text-[#6E1FE8] transition-colors">New In</a>
            <a href="#talento" className="hover:text-[#6E1FE8] transition-colors">Collections</a>
            <a href="#eventos" className="hover:text-[#6E1FE8] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#6E1FE8] transition-colors">Contact</a>
          </nav>

          {/* LOGO CENTRAL: ENSUPRIME / NEXORA STYLE */}
          <a href="#" className="font-impact text-2xl md:text-3xl tracking-tight text-black flex items-center gap-1.5">
            ENSUPRIME
          </a>

          {/* ICONOS DERECHA: SEARCH, USER, CART & MADRID TIME */}
          <div className="flex items-center gap-3 text-black">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono-code font-bold text-gray-500 mr-2">
              <span className="w-2 h-2 rounded-full bg-[#6E1FE8] animate-ping" />
              <span>MADRID {madridTime || '20:00'}</span>
            </div>
            <button
              onClick={onToggleRadio}
              className={`p-2 rounded-full transition-all ${
                isRadioPlaying ? 'bg-[#6E1FE8] text-white' : 'hover:bg-gray-100 text-black'
              }`}
              title="Radio en Vivo"
            >
              <Radio className={`w-4 h-4 ${isRadioPlaying ? 'animate-spin' : ''}`} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-semibold">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>1 item</span>
            </div>
          </div>
        </header>

        {/* ============================================================== */}
        {/* 2. TITULARES SUPERIORES: "Define Your STYLE" / "Own Your WORLD" */}
        {/* ============================================================== */}
        <div className="w-full px-6 sm:px-10 md:px-14 flex flex-col md:flex-row items-start md:items-baseline justify-between z-10 mb-6">
          <div>
            <h2 className="font-serif-italic text-3xl sm:text-4xl md:text-5xl text-black">
              Define Your
            </h2>
            <h1 className="font-impact text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-none uppercase text-[#6E1FE8] tracking-tight">
              STYLE
            </h1>
          </div>

          <div className="text-left md:text-right mt-4 md:mt-0 relative">
            <span className="absolute -top-6 right-0 text-3xl text-[#6E1FE8] select-none">✦</span>
            <h2 className="font-serif-italic text-3xl sm:text-4xl md:text-5xl text-black">
              Own Your
            </h2>
            <h1 className="font-impact text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-none uppercase text-[#6E1FE8] tracking-tight">
              WORLD
            </h1>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. BLOQUE CURVADO VIOLETA CON MODELO CENTRAL & CARDS FLOTANTES */}
        {/* ============================================================== */}
        <div className="relative w-full rounded-[2.5rem] sm:rounded-[3.5rem] md:rounded-[4.5rem] bg-[#8B6CE8] px-6 sm:px-12 md:px-16 py-8 sm:py-12 md:py-16 overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[480px] md:min-h-[540px]">
          
          {/* Ondas decorativas translúcidas dentro del bloque lila */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full bg-white/10 blur-[80px]" />
            <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-white/10 blur-[60px]" />
          </div>

          {/* COLUMNA IZQUIERDA: "Where Comfort Meets Confidence" */}
          <div className="relative z-20 max-w-sm text-white mb-8 md:mb-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>New Collection // 2026</span>
            </div>

            <h3 className="font-impact text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-tight text-white mb-4">
              Where Comfort Meets Confidence
            </h3>

            <p className="font-body text-xs sm:text-sm text-white/85 leading-relaxed mb-6 font-medium">
              Elevate your everyday look with pieces that speak you. Urban culture & vanguard audio.
            </p>

            <button
              onClick={onWatchLive}
              data-cursor="VER"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#110B1C] text-white font-body font-bold text-xs uppercase tracking-wider hover:bg-black transition-all shadow-md active:scale-95"
            >
              <span>Explore Now</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>

            {/* Micro-badge social con avatares */}
            <div className="mt-8 flex items-center gap-3 bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 w-fit">
              <div className="flex -space-x-2">
                <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80" alt="Avatar" />
                <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80" alt="Avatar" />
                <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80" alt="Avatar" />
              </div>
              <span className="font-body text-[11px] font-semibold text-white">
                Loved by 20k+ Trendsetters 💜
              </span>
            </div>
          </div>

          {/* MODELO CENTRAL FLOTANTE (ESTILO NEXORA) */}
          <div className="relative z-10 flex justify-center items-end self-end -mb-6 md:-mb-12">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=700&auto=format&fit=crop"
              alt="Model with Beanie"
              className="w-64 sm:w-80 md:w-96 lg:w-[440px] object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] rounded-2xl"
            />
          </div>

          {/* COLUMNA DERECHA: BENEFICIOS & FEATURED LOOK CARD */}
          <div className="relative z-20 flex flex-col items-end gap-6 text-white w-full md:w-auto">
            {/* 3 ICONOS DE BENEFICIOS */}
            <div className="flex items-center gap-6 text-center text-xs font-semibold">
              <div>
                <span className="block text-lg">👕</span>
                <span className="text-[10px] uppercase text-white/80">Premium Quality</span>
              </div>
              <div>
                <span className="block text-lg">🍃</span>
                <span className="text-[10px] uppercase text-white/80">Sustainable Fashion</span>
              </div>
              <div>
                <span className="block text-lg">💎</span>
                <span className="text-[10px] uppercase text-white/80">Limited Edition</span>
              </div>
            </div>

            {/* FEATURED LOOK CARD FLOTANTE BLANCA */}
            <div className="bg-white rounded-3xl p-3.5 text-black shadow-xl w-48 sm:w-52 border border-gray-100 flex flex-col items-center">
              <span className="font-body font-bold text-[10px] uppercase text-gray-500 mb-2">
                Featured Look
              </span>
              <img
                src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=300&auto=format&fit=crop"
                alt="Graffiti Hoodie"
                className="w-full h-32 object-cover rounded-2xl mb-2.5"
              />
              <h4 className="font-body font-bold text-xs text-center text-black">
                Graffiti Hoodie
              </h4>
              <span className="font-body text-[10px] text-gray-500">
                Streetwear Essential
              </span>
              <button
                onClick={onToggleRadio}
                className="mt-2.5 w-full py-1.5 bg-[#6E1FE8] text-white rounded-xl font-body font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#8B3BFF] transition-all"
              >
                <span>🛒</span> $79.99
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
