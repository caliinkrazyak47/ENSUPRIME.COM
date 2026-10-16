import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import GalleryStack from '../ui/GalleryStack';

const ARTIST_CARDS = [
  {
    image: '/images/francesca/francesca-1.jpg',
    title: 'FRANCESCA CHIRI',
    subtitle: 'Vanguardia, elegancia urbana internacional y alta costura.',
    tag: 'PORTADA OFICIAL',
  },
  {
    image: '/images/francesca/francesca-2.jpg',
    title: 'FRANCESCA CHIRI',
    subtitle: 'Lifestyle & Alta Costura desde Milán y Madrid.',
    tag: 'EXCLUSIVE SHOOT',
    badge: '1.8M+ SEGUIDORES ✦',
  },
  {
    image: '/images/francesca/francesca-3.jpg',
    title: 'FRANCESCA CHIRI',
    subtitle: 'Autenticidad magnética, rutinas de belleza y estilo propio.',
    tag: 'EDITORIAL LOOK',
    badge: 'GLOBAL REACH ✦',
  },
  {
    image: '/images/francesca/francesca-4.jpg',
    title: 'FRANCESCA CHIRI',
    subtitle: 'Conexión total con millones de fans en Europa y Latam.',
    tag: 'NATURE & CHIC',
    badge: 'VIRAL STAR ✦',
  },
  {
    image: '/images/francesca/francesca-5.jpg',
    title: 'FRANCESCA CHIRI',
    subtitle: 'Empoderamiento femenino y referente indiscutible del lifestyle.',
    tag: 'ICON SERIES',
    badge: 'VERIFIED TALENT ✦',
  },
];

export const PremiumTalentSection: React.FC = () => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Bloquear scroll de la página cuando la imagen grande está abierta
  useEffect(() => {
    if (fullscreenImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [fullscreenImage]);

  const stackCards = ARTIST_CARDS.map((artist, idx) => (
    <div
      key={idx}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setFullscreenImage(artist.image);
      }}
      className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-[#110B1C] select-none cursor-pointer group"
      title="Haz doble clic para ver la foto en tamaño completo"
    >
      <img
        src={artist.image}
        alt={artist.title}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#110B1C]/95 via-[#110B1C]/40 to-black/20 pointer-events-none" />

      {/* Contenido limpio sobre la foto (sin botones) */}
      <div className="relative z-10 w-full h-full p-6 sm:p-8 flex flex-col justify-end pointer-events-none">
        <div className="text-white">
          <h3 className="font-impact text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.88] drop-shadow-md">
            {artist.title}
          </h3>
          <p className="font-body text-sm sm:text-base text-white/90 font-medium mt-2 max-w-lg">
            {artist.subtitle}
          </p>
        </div>
      </div>
    </div>
  ));

  return (
    <section id="talento" className="relative w-full py-20 px-4 sm:px-8 md:px-12 bg-[#6E1FE8] text-white overflow-hidden">
      {/* Estrellas flotantes en el fondo violeta */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="absolute top-10 left-[8%] text-7xl text-white/20 select-none">✦</span>
        <span className="absolute bottom-12 right-[10%] text-9xl text-white/15 select-none">✦</span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* CABECERA VIBRANTE: INFLUENCER DEL MES */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-impact text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight">
            INFLUENCER <span className="bg-white text-[#6E1FE8] px-4 py-1 rounded-2xl inline-block transform rotate-1 shadow-lg">DEL MES</span>
          </h2>
        </div>

        {/* LAYOUT EDITORIAL INSPIRADO EN ZONA INFLUENCER (THIAGOVSC.ES) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* COLUMNA IZQUIERDA: CONTENIDO Y MÉTRICAS DE ZONA INFLUENCER */}
          <div className="lg:col-span-6 flex flex-col justify-center text-white">
            {/* TAGLINE DE SECCIÓN */}
            <div className="flex items-center font-mono-code text-xs font-bold tracking-[0.25em] uppercase text-white/80 mb-3">
              <div className="inline-flex items-center gap-2">
                <span>✦</span>
                <span>TALENTO EXCLUSIVO</span>
              </div>
            </div>

            {/* NOMBRE DEL TALENTO */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <h3 className="font-impact text-4xl sm:text-5xl uppercase tracking-tight text-white">
                FRANCESCA CHIRI
              </h3>
            </div>

            {/* GRID DE 3 MÉTRICAS EDITORIALES */}
            <div className="grid grid-cols-3 gap-4 py-5 my-2 border-y border-white/20">
              <div>
                <div className="font-impact text-3xl sm:text-4xl text-white leading-tight">
                  1.8M+
                </div>
                <div className="font-mono-code text-[11px] text-white/75 uppercase tracking-wider mt-1 font-bold">
                  Audiencia activa
                </div>
              </div>
              <div>
                <div className="font-impact text-3xl sm:text-4xl text-white leading-tight">
                  94%
                </div>
                <div className="font-mono-code text-[11px] text-white/75 uppercase tracking-wider mt-1 font-bold">
                  Engagement femenino
                </div>
              </div>
              <div>
                <div className="font-impact text-xl sm:text-2xl text-white leading-tight">
                  Europa & Latam
                </div>
                <div className="font-mono-code text-[11px] text-white/75 uppercase tracking-wider mt-1 font-bold">
                  Alcance global
                </div>
              </div>
            </div>

            {/* PÁRRAFO DE BIO EDITORIAL */}
            <p className="font-body text-base sm:text-lg leading-relaxed text-white/90 max-w-lg my-6 font-medium">
              Referente indiscutible del lifestyle y la moda contemporánea europea, Francesca Chiri conecta con millones de seguidores a través de rutinas de belleza, estilo vanguardista y una autenticidad magnética.
            </p>

            {/* BOTÓN AL ESTILO THIAGOVSC.ES CON ARQUITECTURA BUTTON-IN-BUTTON AWWWARDS */}
            <div>
              <a
                href="https://linktr.ee/chirifrancesca"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINK"
                className="group inline-flex items-center gap-4 bg-white text-[#3B0764] hover:bg-[#C0D43E] hover:text-[#3B0764] font-mono-code font-extrabold px-8 py-3 text-xs tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.2)] active:scale-[0.97] cursor-pointer uppercase border border-white/20"
              >
                <span>Descubrir a Francesca</span>
              </a>
            </div>
          </div>

          {/* COLUMNA DERECHA: FOTO POSTER CON GALLERYSTACK INTERACTIVO */}
          <div
            data-cursor="CLICK"
            className="lg:col-span-6 relative min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] rounded-[3rem] overflow-visible flex items-center justify-center p-2"
          >
            <GalleryStack
              cards={stackCards}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL LIGHTBOX A PANTALLA COMPLETA AL HACER DOBLE CLIC EN LA FOTO */}
      {/* ============================================================== */}
      {fullscreenImage && typeof document !== 'undefined' && createPortal(
        <div
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          onWheel={(e) => e.stopPropagation()}
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200 select-none cursor-zoom-out"
        >
          {/* Botón flotante para cerrar */}
          <button
            type="button"
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-[#6E1FE8] text-white flex items-center justify-center transition-colors shadow-2xl backdrop-blur-md cursor-pointer border border-white/20"
            aria-label="Cerrar imagen completa"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Contenedor de la foto en tamaño completo grande */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[92vh] w-auto h-auto rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] border border-white/20 flex items-center justify-center bg-black cursor-default"
          >
            <img
              src={fullscreenImage}
              alt="Francesca Chiri - Tamaño Completo"
              className="w-auto h-auto max-w-full max-h-[92vh] object-contain rounded-3xl"
            />

            {/* Overlay sutil inferior con pie editorial */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-white font-mono-code text-xs pointer-events-none">
              <span className="font-bold tracking-wider text-sm">FRANCESCA CHIRI</span>
              <span className="text-white/60 text-[11px] hidden sm:inline">Haz clic fuera o en la cruz para cerrar</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
