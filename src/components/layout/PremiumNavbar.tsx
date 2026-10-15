import React, { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';

interface NavbarProps {
  onToggleRadio: () => void;
  isRadioPlaying: boolean;
}

export const PremiumNavbar: React.FC<NavbarProps> = ({ onToggleRadio, isRadioPlaying }) => {
  const [madridTime, setMadridTime] = useState('');
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#F2F0EB]/95 backdrop-blur-md border-[#110B1C]/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* LOGO BRUTALISTA / SOCIAL MEDIA CON INCLINACIÓN */}
        <a href="#" className="group flex items-baseline gap-2">
          <span className="font-impact text-3xl tracking-tight text-[#110B1C] group-hover:text-[#6E1FE8] transition-colors">
            ENSUPRIME
          </span>
          <span className="font-mono-code text-xs font-bold text-[#6E1FE8] tracking-widest hidden sm:inline">
            // ES 🦋
          </span>
        </a>

        {/* METADATOS CENTRALES */}
        <div className="hidden lg:flex items-center gap-8 font-mono-code text-xs font-semibold text-[#5C5566] tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6E1FE8] animate-pulse" />
            <span className="text-[#110B1C] font-bold">EN DIRECTO</span>
            <span>24/7 ONLINE</span>
          </div>
          <span>•</span>
          <div>
            MADRID <span className="text-[#6E1FE8] font-bold">{madridTime || '19:00:00'}</span> CET
          </div>
          <span>•</span>
          <div>40°25'N 03°42'W</div>
        </div>

        {/* CONTROLES DERECHA */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleRadio}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl font-body font-bold text-xs tracking-wider uppercase transition-all shadow-sm ${
              isRadioPlaying
                ? 'bg-[#6E1FE8] text-white shadow-[0_4px_15px_rgba(110,31,232,0.35)]'
                : 'bg-white text-[#110B1C] border border-[#110B1C]/15 hover:border-[#6E1FE8]'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isRadioPlaying ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">RADIO 98.4 FM</span>
            {isRadioPlaying ? (
              <span className="flex items-end gap-[2px] h-3 ml-1">
                <span className="w-[2px] bg-white animate-wave-1 h-2" />
                <span className="w-[2px] bg-white animate-wave-2 h-3" />
                <span className="w-[2px] bg-white animate-wave-3 h-1" />
              </span>
            ) : (
              <span className="text-[10px] text-[#5C5566]">[PAUSA]</span>
            )}
          </button>

          <nav className="hidden md:flex items-center gap-6 font-body font-bold text-xs tracking-wider text-[#110B1C]">
            <a href="#tv" className="hover:text-[#6E1FE8] transition-colors">TV</a>
            <a href="#tiktok" className="hover:text-[#6E1FE8] transition-colors">TIKTOK</a>
            <a href="#talento" className="hover:text-[#6E1FE8] transition-colors">TALENTO</a>
            <a href="#eventos" className="hover:text-[#6E1FE8] transition-colors">EVENTOS</a>
          </nav>
        </div>
      </div>
    </header>
  );
};
