import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface EventAnnouncementModalProps {
  flyerUrl?: string;
  eventUrl?: string;
  eventTitle?: string;
  isReady?: boolean;
}

export const EventAnnouncementModal: React.FC<EventAnnouncementModalProps> = ({
  flyerUrl = '/images/joy-eslava-halloween.jpg',
  eventUrl = 'https://site.fourvenues.com/es/momentum-web/events/joy-eslava-halloween---30-10-2026-TT3P',
  eventTitle = 'JOY ESLAVA HALLOWEEN · 30 DE OCTUBRE',
  isReady = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Abrir cuando la web ya terminó de cargar y se quitó el preloader
    if (!isReady) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 450);

    return () => clearTimeout(timer);
  }, [isReady]);

  // Bloquear scroll de fondo cuando el popup está activo
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Tecla ESC para cerrar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      className="fixed inset-0 z-[9999999] flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200 select-none"
      onClick={() => setIsOpen(false)}
    >
      {/* CONTENEDOR EXACTO ESTILO CARDI B / TICKETS:
          - Centrado total vertical y horizontal en cualquier pantalla
          - Flyer 100% visible completo sin cortes
          - Botón X flotante arriba
          - Botón COMPRAR ENTRADA ancho debajo
      */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col items-center justify-center max-w-[90vw] sm:max-w-[430px] md:max-w-[460px] w-full my-auto animate-in zoom-in-95 duration-200"
      >
        {/* BOTÓN CERRAR 'X' FLOTANTE */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar cartel"
          className="absolute -top-11 right-0 text-white hover:text-[#C0D43E] hover:scale-110 p-1.5 transition-all duration-200 cursor-pointer flex items-center justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] z-50"
        >
          <X className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.5]" />
        </button>

        {/* FLYER COMPLETO 100% VISIBLE (CENTRADITO Y SIN CORTES) */}
        <a
          href={eventUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] group cursor-pointer flex items-center justify-center border border-white/20 bg-black/90"
          title={`Haz clic para comprar tu entrada para ${eventTitle}`}
        >
          <img
            src={flyerUrl}
            alt={eventTitle}
            className="w-full h-auto max-h-[70vh] sm:max-h-[74vh] object-contain block mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </a>

        {/* BOTÓN COMPRAR ENTRADA DEBAJO DEL FLYER */}
        <div className="w-full mt-3">
          <a
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 sm:py-3.5 px-6 rounded-xl sm:rounded-2xl bg-white hover:bg-[#6E1FE8] text-black hover:text-white font-impact text-lg sm:text-2xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer active:scale-95 border border-white/20 group"
          >
            <span>COMPRAR ENTRADA</span>
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
