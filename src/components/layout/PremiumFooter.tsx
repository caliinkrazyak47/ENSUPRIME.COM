import React, { useState } from 'react';
import { LegalModal, type LegalModalType } from '../modals/LegalModal';

export const PremiumFooter: React.FC = () => {
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);

  return (
    <>
      <footer className="relative bg-white text-[#110B1C] overflow-hidden pt-16 pb-12 px-6 md:px-12 select-none border-t border-black/5">
        {/* Estrellas y destellos decorativos tenues sobre blanco */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <span className="absolute top-8 right-[8%] text-6xl text-[#6E1FE8]/10 select-none">✦</span>
          <span className="absolute bottom-16 left-[5%] text-5xl text-[#6E1FE8]/10 select-none">✦</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* FILA SUPERIOR: NEWSLETTER & METADATOS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#6E1FE8]/15">
            <div className="md:col-span-6">
              <span className="font-mono-code text-xs text-[#6E1FE8] tracking-[0.25em] uppercase block mb-3 font-bold">
                // BOLETÍN DE ACCESO PRIVADO
              </span>
              <h3 className="font-impact text-4xl sm:text-5xl uppercase tracking-tight max-w-md text-[#3B0764]">
                SÉ EL PRIMERO EN RECIBIR RELEASES & ENTRADAS
              </h3>

              {/* INPUT MINIMALISTA DE UN SOLO TRAZO */}
              <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex max-w-md">
                <input
                  type="email"
                  placeholder="TU CORREO ELECTRÓNICO..."
                  className="w-full bg-[#6E1FE8]/5 border-b-2 border-[#6E1FE8]/30 px-4 py-3 text-sm font-mono-code text-[#3B0764] placeholder-[#6E1FE8]/40 focus:outline-none focus:border-[#6E1FE8] focus:bg-white transition-all rounded-t"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#6E1FE8] hover:bg-[#5815BD] text-white font-body text-xs font-bold tracking-widest uppercase rounded-lg transition-colors ml-3 shadow-md shadow-[#6E1FE8]/25 cursor-pointer"
                >
                  UNIRSE
                </button>
              </form>
            </div>

            <div className="md:col-span-3 font-body text-xs text-[#6B21A8]/80 space-y-3">
              <p className="text-[#3B0764] font-bold tracking-wider uppercase font-mono-code">[EMISIÓN & ESTUDIOS]</p>
              <p>MADRID STUDIO 01</p>
              <p>GRAN VÍA, 32 · 28013</p>
              <p>CONTACTO: HELLO@ENSUPRIME.COM</p>
              <p className="text-[#6E1FE8] pt-2 font-mono-code font-bold">DIRECCIÓN DE ARTE // SOCIAL MEDIA</p>
            </div>

            <div className="md:col-span-3 font-body text-xs text-[#6B21A8]/80 space-y-3">
              <p className="text-[#3B0764] font-bold tracking-wider uppercase font-mono-code">[REDES OFICIALES]</p>
              <div className="flex flex-col space-y-2.5 font-semibold">
                <a href="#" className="hover:text-[#6E1FE8] transition-colors flex items-center justify-between text-[#4A0E4E]">
                  <span>TIKTOK @ENSUPRIME</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E1FE8]/30 group-hover:bg-[#6E1FE8]" />
                </a>
                <a href="#" className="hover:text-[#6E1FE8] transition-colors flex items-center justify-between text-[#4A0E4E]">
                  <span>INSTAGRAM @ENSUPRIME</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E1FE8]/30 group-hover:bg-[#6E1FE8]" />
                </a>
                <a href="#" className="hover:text-[#6E1FE8] transition-colors flex items-center justify-between text-[#4A0E4E]">
                  <span>YOUTUBE BROADCAST</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E1FE8]/30 group-hover:bg-[#6E1FE8]" />
                </a>
                <a href="#" className="hover:text-[#6E1FE8] transition-colors flex items-center justify-between text-[#4A0E4E]">
                  <span>SPOTIFY CURATED</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E1FE8]/30 group-hover:bg-[#6E1FE8]" />
                </a>
              </div>
            </div>
          </div>

          {/* LOGO GIGANTE MONUMENTAL EN MORADO PURO ESTABLE */}
          <div className="pt-16 pb-8 overflow-hidden flex justify-center">
            <span className="font-impact text-[16vw] leading-[0.75] tracking-tight text-[#6E1FE8] select-none cursor-default uppercase">
              ENSUPRIME
            </span>
          </div>

          {/* ENLACES LEGALES ESTILO MESSI.COM (TÉRMINOS Y CONDICIONES, PRIVACIDAD, COOKIES) */}
          <div className="pt-8 pb-6 border-t border-[#6E1FE8]/15 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono-code text-xs uppercase tracking-wider text-[#6B21A8]/85 font-semibold">
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-[#6E1FE8] transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              TÉRMINOS Y CONDICIONES
            </button>
            <span className="text-[#6E1FE8]/30 hidden sm:inline">•</span>
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-[#6E1FE8] transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              POLÍTICA DE PRIVACIDAD
            </button>
            <span className="text-[#6E1FE8]/30 hidden sm:inline">•</span>
            <button
              onClick={() => setLegalModal('cookies')}
              className="hover:text-[#6E1FE8] transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              POLÍTICA DE COOKIES
            </button>
          </div>

          {/* BARRA DE CIERRE DE DERECHOS */}
          <div className="pt-6 border-t border-[#6E1FE8]/15 flex items-center justify-center font-mono-code text-xs text-[#6B21A8]/70 text-center">
            <div>ENSUPRIME.COM © 2026 · TODOS LOS DERECHOS RESERVADOS</div>
          </div>
        </div>
      </footer>

      {/* MODAL DE POLÍTICAS Y TÉRMINOS */}
      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
    </>
  );
};
