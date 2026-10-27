import React, { useEffect, useState } from 'react';

export interface FilmbotNewsItem {
  id: string;
  source: 'EL MUNDO' | 'EL PAÍS' | 'OKDIARIO' | 'MARCA';
  title: string;
  link: string;
}

const INITIAL_NEWS: FilmbotNewsItem[] = [
  {
    id: 'f-halloween',
    source: 'MARCA',
    title: '🎃 HALLOWEEN SPECIAL: Noches de terror y fiesta exclusiva en Madrid · Toda la cobertura en directo',
    link: '#eventos',
  },
  {
    id: 'f1',
    source: 'EL MUNDO',
    title: 'La Audiencia Nacional y la UCO estrechan el cerco sobre la trama de contrataciones en la administración pública',
    link: 'https://www.elmundo.es/espana.html',
  },
  {
    id: 'f2',
    source: 'MARCA',
    title: 'Champions League: Real Madrid y FC Barcelona preparan sus compromisos decisivos de cuartos de final',
    link: 'https://www.marca.com/futbol/primera-division.html',
  },
  {
    id: 'f3',
    source: 'EL PAÍS',
    title: 'El Congreso debate el paquete de medidas fiscales para cumplir con la senda de estabilidad de Bruselas',
    link: 'https://elpais.com/espana/',
  },
  {
    id: 'f4',
    source: 'OKDIARIO',
    title: 'Moncloa intensifica los contactos parlamentarios para sacar adelante la convalidación de los últimos decretos',
    link: 'https://okdiario.com/espana/',
  },
  {
    id: 'f5',
    source: 'EL MUNDO',
    title: 'La Liga: El Atlético de Madrid aprieta la lucha por el título liguero tras una racha invicta',
    link: 'https://www.elmundo.es/deportes/futbol.html',
  },
  {
    id: 'f6',
    source: 'MARCA',
    title: 'Selección Española: Luis de la Fuente perfila la convocatoria con nuevas alternativas ofensivas',
    link: 'https://www.marca.com/futbol/seleccion-espanola.html',
  },
  {
    id: 'f7',
    source: 'EL PAÍS',
    title: 'Cumbre bilateral hispano-francesa en Madrid para impulsar las conexiones energéticas transfronterizas',
    link: 'https://elpais.com/',
  },
  {
    id: 'f8',
    source: 'OKDIARIO',
    title: 'Fútbol: Clásicos y eliminatorias directas definen la recta final de la Copa y las competiciones europeas',
    link: 'https://okdiario.com/deportes/futbol/',
  },
];

export const FilmbotTopMarquee: React.FC = () => {
  const [news, setNews] = useState<FilmbotNewsItem[]>(INITIAL_NEWS);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchFeeds = async () => {
      try {
        const endpoints = [
          {
            url: 'https://e00-elmundo.uecdn.es/rss/portada.xml',
            source: 'EL MUNDO' as const,
          },
          {
            url: 'https://e00-elmundo.uecdn.es/elmundo/rss/espana.xml',
            source: 'EL MUNDO' as const,
          },
          {
            url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada',
            source: 'EL PAÍS' as const,
          },
          {
            url: 'https://e00-marca.uecdn.es/rss/futbol/primera-division.xml',
            source: 'MARCA' as const,
          },
          {
            url: 'https://e00-elmundo.uecdn.es/elmundodeporte/rss/portada.xml',
            source: 'EL MUNDO' as const,
          },
        ];

        const results = await Promise.allSettled(
          endpoints.map(async (ep) => {
            const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(ep.url)}`;
            const res = await fetch(api);
            const data = await res.json();
            if (data?.status === 'ok' && Array.isArray(data.items)) {
              return data.items.slice(0, 4).map((item: any, i: number): FilmbotNewsItem => ({
                id: `${ep.source}-${i}-${Math.random().toString(36).slice(2, 6)}`,
                source: ep.source,
                title: (item.title || '')
                  .replace(/&quot;/g, '"')
                  .replace(/&#39;/g, "'")
                  .replace(/&amp;/g, '&')
                  .trim(),
                link: item.link || '#',
              }));
            }
            return [];
          })
        );

        const fetched: FilmbotNewsItem[] = [];
        results.forEach((r) => {
          if (r.status === 'fulfilled' && r.value.length > 0) {
            fetched.push(...r.value);
          }
        });

        const okDiarioItems: FilmbotNewsItem[] = [
          {
            id: 'ok-1',
            source: 'OKDIARIO',
            title: 'Sánchez afronta una semana clave ante el control parlamentario y los sondeos electorales',
            link: 'https://okdiario.com/espana/',
          },
          {
            id: 'ok-2',
            source: 'OKDIARIO',
            title: 'Fútbol y Liga: La pugna por las plazas de Champions y el descenso al rojo vivo',
            link: 'https://okdiario.com/deportes/futbol/',
          },
        ];

        if (fetched.length > 0 && isMounted) {
          const combined = [...fetched, ...okDiarioItems].filter((n) => n.title.length > 10);
          setNews(combined);
        }
      } catch {
        // En caso de fallo de red, se mantienen las noticias iniciales
      }
    };

    fetchFeeds();
    const interval = setInterval(fetchFeeds, 5 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Multiplicamos los elementos para un scroll verdaderamente infinito y continuo
  const duplicatedNews = [...news, ...news];

  return (
    <aside
      aria-label="Latest News Ticker"
      className="ticker-filmbot relative w-full z-50 bg-[#0d100f] text-[#f9f8f8] border-b border-[#222725] overflow-hidden select-none"
      style={{ height: '30px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full h-full flex items-center overflow-hidden relative">
        <div
          className={`flex items-center w-max will-change-transform ${
            isPaused ? '' : 'animate-filmbot-scroll'
          }`}
        >
          {duplicatedNews.map((item, idx) => (
            <a
              key={`${item.id}-${idx}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ticker-item relative flex items-center shrink-0 cursor-pointer text-[#f9f8f8] hover:text-[#d4d4d4] transition-colors"
              style={{
                paddingLeft: '3rem',
                paddingRight: '3rem',
                gap: '1.25rem',
              }}
            >
              {/* Divisor vertical izquierdo exacto a filmbot.com (.ticker__list-item:before) */}
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#333a37]"
                style={{ width: '1px', height: '14px' }}
              />

              {/* Label de la noticia con dot exacto (.ticker__label-wrap) */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className="rounded-none bg-[#f9f8f8] inline-block shrink-0"
                  style={{ width: '4px', height: '4px' }}
                />
                <span
                  className="font-mono text-[10px] tracking-wider uppercase font-semibold text-[#f9f8f8]"
                  style={{ letterSpacing: '0.04em' }}
                >
                  {item.source}
                </span>
              </div>

              {/* Mensaje de la noticia (.ticker__message .ticker__text) */}
              <span
                className="font-mono text-[11px] sm:text-xs text-[#b8b8b8] hover:text-[#f9f8f8] font-normal tracking-tight whitespace-nowrap transition-colors"
                style={{ letterSpacing: '-0.01em' }}
              >
                {item.title}
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes filmbotSmoothScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        /* Velocidad lenta y tranquila (160s) para poder leer cada titular cómodamente */
        .animate-filmbot-scroll {
          animation: filmbotSmoothScroll 160s linear infinite;
        }
      `}</style>
    </aside>
  );
};
