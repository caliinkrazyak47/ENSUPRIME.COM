export interface LiveEvent {
  id: string;
  artist: string;
  venue: string;
  city: string;
  isoDate: string; // Formato YYYY-MM-DD para filtrado cronológico automático
  ticketUrl: string;
  category?: string;
  isSoldOut?: boolean;
}

/**
 * CONCIERTOS OFICIALES DE BENY JR (ENTRADAS.COM):
 * https://www.entradas.com/artist/beny-jr/#calendar-start=2026-10
 */
export const LIVE_UPCOMING_SHOWS: LiveEvent[] = [
  {
    id: "beny-jr-01",
    artist: "BENY JR // GIRA OFICIAL 2026",
    venue: "SALA LA RIVIERA",
    city: "MADRID",
    isoDate: "2026-10-19",
    ticketUrl: "https://www.entradas.com/artist/beny-jr/#calendar-start=2026-10",
    category: "DRILL & TRAP",
  },
  {
    id: "beny-jr-02",
    artist: "BENY JR // SEGUNDA FECHA EXCLUSIVA",
    venue: "SALA LA RIVIERA",
    city: "MADRID",
    isoDate: "2026-10-20",
    ticketUrl: "https://www.entradas.com/artist/beny-jr/#calendar-start=2026-10",
    category: "DIRECTO OFICIAL",
  },
  {
    id: "beny-jr-03",
    artist: "BENY JR // TERCERA FECHA OFICIAL",
    venue: "SALA LA RIVIERA",
    city: "MADRID",
    isoDate: "2026-10-21",
    ticketUrl: "https://www.entradas.com/artist/beny-jr/#calendar-start=2026-10",
    category: "ÚLTIMO SHOW RIVIERA",
  },
  {
    id: "justin-quiles-tambora-01",
    artist: "JUSTIN QUILES // X TAMBORA FEST",
    venue: "DISCOTECA TAMBORA",
    city: "ALICANTE",
    isoDate: "2026-10-24",
    ticketUrl: "https://site.fourvenues.com/ca/tambora/events/justin-quiles-x-tambora-24-10-2026-5QTM",
    category: "REGGAETÓN LIVE",
  },
  {
    id: "morad-stuttgart-01",
    artist: "MORAD // LIVE IN STUTTGART",
    venue: "HANNS-MARTIN-SCHLEYER-HALLE",
    city: "STUTTGART",
    isoDate: "2026-10-31",
    ticketUrl: "https://www.songkick.com/es/concerts/43408354-morad-at-hannsmartinschleyerhalle",
    category: "EUROPEAN TOUR",
  },
  {
    id: "i-love-reggaeton-gc-01",
    artist: "I LOVE REGGAETON // GRAN CANARIA 2026",
    venue: "ANEXO ESTADIO GRAN CANARIA",
    city: "LAS PALMAS",
    isoDate: "2026-11-13",
    ticketUrl: "https://www.enterticket.es/eventos/i-love-reggaeton-gran-canaria-2026-458211",
    category: "MACRO FESTIVAL",
  },
];
