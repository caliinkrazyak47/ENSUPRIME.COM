import React, { useState } from 'react';
import GalleryStack from '../ui/GalleryStack';

const ARTIST_CARDS = [
  {
    image: '/images/francesca/francesca-1.jpg',
    title: 'FRANCESCA CHIRI',
    subtitle: 'Moda curvy, vanguardia y elegancia urbana internacional.',
    tag: 'PORTADA OFICIAL',
    badge: 'TOP INFLUENCER ✦',
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
  const [activeIndex, setActiveIndex] = useState(0);

  const stackCards = ARTIST_CARDS.map((artist, idx) => (
    <div key={idx} className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-[#110B1C] select-none">
      <img
        src={artist.image}
        alt={artist.title}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#110B1C]/95 via-[#110B1C]/40 to-black/20 pointer-events-none" />

      <div className="relative z-10 w-full h-full p-6 sm:p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex items-center justify-between font-mono-code text-[11px] sm:text-xs">
          <span className="px-3.5 py-1.5 rounded-full bg-white text-black font-bold shadow-md">
            ESTILISMO: ENSUPRIME LAB
          </span>
          <span className="bg-[#6E1FE8] text-white px-3.5 py-1.5 rounded-full font-bold shadow-md">
            {artist.badge}
          </span>
        </div>

        <div className="text-white">
          <span className="bg-white text-[#6E1FE8] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block shadow-sm">
            {artist.tag}
          </span>
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
        {/* CABECERA VIBRANTE */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-impact text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight">
            ARTISTA <span className="bg-white text-[#6E1FE8] px-4 py-1 rounded-2xl inline-block transform rotate-1 shadow-lg">DEL MES</span>
          </h2>
        </div>

        {/* LAYOUT EDITORIAL INSPIRADO EN ZONA INFLUENCER (THIAGOVSC.ES) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* COLUMNA IZQUIERDA: CONTENIDO Y MÉTRICAS DE ZONA INFLUENCER */}
          <div className="lg:col-span-6 flex flex-col justify-center text-white">
            {/* TAGLINE DE SECCIÓN Y CONTADOR DE TARJETA */}
            <div className="flex items-center justify-between font-mono-code text-xs font-bold tracking-[0.25em] uppercase text-white/80 mb-3">
              <div className="inline-flex items-center gap-2">
                <span>✦</span>
                <span>03 · TALENTO EXCLUSIVO</span>
              </div>
              <span className="text-[11px] font-mono-code text-white/60">
                0{activeIndex + 1} / 0{ARTIST_CARDS.length}
              </span>
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
              Referente indiscutible del lifestyle y la moda curvy europea, Francesca Chiri conecta con millones de seguidores a través de rutinas de belleza, estilo vanguardista y una autenticidad magnética.
            </p>

            {/* BOTÓN AL ESTILO THIAGOVSC.ES */}
            <div>
              <a
                href="https://linktr.ee/chirifrancesca"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINK"
                className="group inline-flex items-center gap-3 bg-white text-black hover:bg-black hover:text-white font-mono-code font-bold px-8 py-3.5 text-xs tracking-[0.2em] rounded-full transition-all duration-300 shadow-xl cursor-pointer uppercase"
              >
                <span>Descubrir a Francesca</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold">→</span>
              </a>
            </div>
          </div>

          {/* COLUMNA DERECHA: FOTO POSTER CON GALLERYSTACK INTERACTIVO (CONSERVADO EXACTO) */}
          <div
            data-cursor="CLICK"
            className="lg:col-span-6 relative min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] rounded-[3rem] overflow-visible flex items-center justify-center p-2"
          >
            <GalleryStack
              cards={stackCards}
              onChange={(idx) => setActiveIndex(idx)}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
