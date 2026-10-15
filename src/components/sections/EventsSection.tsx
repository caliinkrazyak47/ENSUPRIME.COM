import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { EVENTS_CALENDAR } from '../../data/config';

export function EventsSection() {
  return (
    <section id="events" className="relative py-32 px-6 md:px-14 bg-[#090909] text-[#F4F1EC] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 font-mono-code text-xs text-[#8D8D91]">
          <div className="space-y-1">
            <span className="text-[#F4F1EC] font-bold tracking-widest uppercase block">
              // 08. MEET THE CULTURE
            </span>
            <span className="text-white text-base font-display font-extrabold uppercase">
              CALENDARIO DE FECHAS, RESIDENCIAS & ENCUENTROS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>TEMPORADA 2026</span>
          </div>
        </div>

        {/* Asymmetrical Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVENTS_CALENDAR.map((ev) => (
            <div
              key={ev.id}
              className="p-6 rounded-2xl bg-[#111111] border border-white/10 flex flex-col justify-between space-y-6 group hover:border-[#8B5CF6] transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
            >
              {/* Event Poster Thumbnail */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/60">
                <img
                  src={ev.posterImage}
                  alt={ev.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 font-mono-code text-[11px] font-bold text-white">
                  {ev.day} {ev.month}
                </div>
              </div>

              {/* Event Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 font-mono-code text-[11px] text-[#8D8D91]">
                  <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>{ev.location}</span>
                </div>

                <h3 className="font-display font-bold text-xl text-white uppercase leading-snug">
                  {ev.title}
                </h3>

                <p className="font-grotesk text-xs text-[#8D8D91]">
                  {ev.venue}
                </p>
              </div>

              {/* Status and Action Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono-code text-xs">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    ev.status === 'TICKETS DISPONIBLES'
                      ? 'text-[#33e4b8]'
                      : ev.status === 'SOLD OUT'
                      ? 'text-[#FF3434]'
                      : 'text-[#D8D8DB]'
                  }`}
                >
                  {ev.status}
                </span>

                <a
                  href={ev.ticketUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-[#8B5CF6] text-white transition-colors"
                  title="Acceso o entradas"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
