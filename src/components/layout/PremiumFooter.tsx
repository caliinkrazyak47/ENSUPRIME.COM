import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const PremiumFooter: React.FC = () => {
  return (
    <footer className="relative bg-[#110B1C] text-white overflow-hidden pt-20 pb-12 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        {/* FILA SUPERIOR: NEWSLETTER & METADATOS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="md:col-span-6">
            <span className="font-mono-code text-xs text-[#A855F7] tracking-[0.25em] uppercase block mb-3 font-bold">
              // BOLETÍN DE ACCESO PRIVADO
            </span>
            <h3 className="font-impact text-4xl sm:text-5xl uppercase tracking-tight max-w-md">
              SÉ EL PRIMERO EN RECIBIR RELEASES & ENTRADAS
            </h3>
            
            {/* INPUT MINIMALISTA DE UN SOLO TRAZO */}
            <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex max-w-md">
              <input
                type="email"
                placeholder="TU CORREO ELECTRÓNICO..."
                className="w-full bg-transparent border-b-2 border-white/20 py-3 text-sm font-mono-code text-white placeholder-white/40 focus:outline-none focus:border-[#8B3BFF] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#6E1FE8] hover:bg-[#8B3BFF] text-white font-body text-xs font-bold tracking-widest uppercase rounded-lg transition-colors ml-3"
              >
                UNIRSE
              </button>
            </form>
          </div>

          <div className="md:col-span-3 font-body text-xs text-white/70 space-y-3">
            <p className="text-white font-bold tracking-wider uppercase font-mono-code">[EMISIÓN & ESTUDIOS]</p>
            <p>MADRID STUDIO 01</p>
            <p>GRAN VÍA, 32 · 28013</p>
            <p>CONTACTO: HELLO@ENSUPRIME.ES</p>
            <p className="text-[#A855F7] pt-2 font-mono-code font-bold">DIRECCIÓN DE ARTE // SOCIAL MEDIA</p>
          </div>

          <div className="md:col-span-3 font-body text-xs text-white/70 space-y-3">
            <p className="text-white font-bold tracking-wider uppercase font-mono-code">[REDES OFICIALES]</p>
            <div className="flex flex-col space-y-2 font-semibold">
              <a href="#" className="hover:text-[#A855F7] transition-colors flex items-center justify-between">
                <span>TIKTOK @ENSUPRIME</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="hover:text-[#A855F7] transition-colors flex items-center justify-between">
                <span>INSTAGRAM @ENSUPRIME.ES</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="hover:text-[#A855F7] transition-colors flex items-center justify-between">
                <span>YOUTUBE BROADCAST</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="hover:text-[#A855F7] transition-colors flex items-center justify-between">
                <span>SPOTIFY CURATED</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* LOGO GIGANTE MONUMENTAL */}
        <div className="pt-16 pb-8 overflow-hidden flex justify-center">
          <span className="font-impact text-[16vw] leading-[0.75] tracking-tight text-white/[0.08] hover:text-[#6E1FE8] transition-colors duration-700 select-none cursor-default uppercase">
            ENSUPRIME
          </span>
        </div>

        {/* BARRA DE CIERRE DE DERECHOS */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between font-mono-code text-xs text-white/50">
          <div>ENSUPRIME.ES © 2026 · ALL RIGHTS RESERVED</div>
          <div className="mt-2 sm:mt-0 tracking-widest uppercase">
            BUILT WITH VIBRANT VIOLET & SOCIAL MEDIA IDENTITY
          </div>
        </div>
      </div>
    </footer>
  );
};
