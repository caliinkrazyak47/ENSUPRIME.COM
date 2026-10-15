import { LIVE_UPCOMING_SHOWS } from '../data/liveEvents';

export interface FormattedEvent {
  id: string;
  date: string;
  month: string;
  year: string;
  city: string;
  venue: string;
  artist: string;
  ticketUrl: string;
  status: 'DISPONIBLE' | 'SOLD OUT' | 'ÚLTIMAS ENTRADAS' | 'HOY' | 'ESTA SEMANA';
}

const MONTH_NAMES = [
  'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
  'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
];

/**
 * Filtra automáticamente los eventos para no mostrar conciertos pasados,
 * ordenándolos cronológicamente desde el más próximo al más lejano.
 * Calcula el estado en vivo según la proximidad de la fecha.
 */
export function getUpcomingLiveShows(limit: number = 6): FormattedEvent[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Filtrar eventos futuros o que ocurran hoy
  const upcoming = LIVE_UPCOMING_SHOWS.filter((ev) => {
    const evDate = new Date(`${ev.isoDate}T00:00:00`);
    return evDate.getTime() >= now.getTime();
  });

  // Ordenar de más cercano a más lejano
  upcoming.sort((a, b) => {
    const dateA = new Date(`${a.isoDate}T00:00:00`).getTime();
    const dateB = new Date(`${b.isoDate}T00:00:00`).getTime();
    return dateA - dateB;
  });

  return upcoming.slice(0, limit).map((ev): FormattedEvent => {
    const evDate = new Date(`${ev.isoDate}T00:00:00`);
    const day = String(evDate.getDate()).padStart(2, '0');
    const month = MONTH_NAMES[evDate.getMonth()];
    const year = String(evDate.getFullYear());

    // Calcular días restantes
    const diffTime = evDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let status: FormattedEvent['status'] = 'DISPONIBLE';
    if (ev.isSoldOut) {
      status = 'SOLD OUT';
    } else if (diffDays === 0) {
      status = 'HOY';
    } else if (diffDays <= 3) {
      status = 'ÚLTIMAS ENTRADAS';
    } else if (diffDays <= 7) {
      status = 'ESTA SEMANA';
    }

    return {
      id: ev.id,
      date: day,
      month,
      year,
      city: ev.city,
      venue: ev.venue,
      artist: ev.artist,
      ticketUrl: ev.ticketUrl,
      status,
    };
  });
}
