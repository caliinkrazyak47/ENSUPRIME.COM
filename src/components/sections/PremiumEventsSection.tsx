import React, { useMemo } from 'react';
import { getUpcomingLiveShows } from '../../services/eventsService';

export const PremiumEventsSection: React.FC = () => {
  // Se recalculan y ordenan automáticamente según la fecha actual del sistema
  const liveEvents = useMemo(() => getUpcomingLiveShows(6), []);

  return (
    <section id="eventos" className="relative w-full py-20 px-4 sm:px-8 md:px-12 bg-[#6E1FE8] text-white overflow-hidden">
      {/* Estrellas decorativas translúcidas en fondo morado */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="absolute top-10 left-[10%] text-6xl text-white/20 select-none">✦</span>
        <span className="absolute top-1/2 right-[8%] text-8xl text-white/15 select-none">✦</span>
        <span className="absolute bottom-16 left-[20%] text-5xl text-white/20 select-none">✦</span>
        <span className="absolute bottom-8 right-[15%] text-7xl text-white/15 select-none">✦</span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* CABECERA VIBRANTE CON ESTILO CONSISTENTE EN BLANCO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-white/15 mb-12">
          <div>
            <span className="bg-white text-[#6E1FE8] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider mb-2 inline-block shadow-md">
              CALENDARIO OFICIAL · GIRA 2026
            </span>
            <h2 className="font-impact text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight flex items-center flex-wrap gap-3 mt-1">
              AGENDA <span className="bg-white text-[#6E1FE8] px-4 py-1 rounded-2xl inline-block transform -rotate-1 shadow-lg">SHOWS</span>
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-1">
            <a
              href="https://www.entradas.com/artist/beny-jr/#calendar-start=2026-10"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono-code text-xs font-bold text-white hover:text-[#C0D43E] uppercase tracking-wider transition-colors"
            >
              <span>VER EN ENTRADAS.COM</span>
            </a>
            <p className="font-body text-xs font-semibold text-white/80 uppercase">
              Entradas oficiales verificadas // ENTRADAS.COM
            </p>
          </div>
        </div>

        {/* LISTA DE SHOWS CON TARJETAS CLARAS ORIGINALES (#F2F0EB) SOBRE EL FONDO MORADO */}
        <div className="space-y-4">
          {liveEvents.map((ev) => (
            <a
              key={ev.id}
              href={ev.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="TICKETS"
              className="btn-magnetic p-6 md:p-8 rounded-[2rem] bg-[#F8F6F4] text-[#3B0764] hover:bg-white hover:shadow-[0_20px_50px_rgba(110,31,232,0.22)] border border-[#6E1FE8]/10 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer shadow-md block transition-all"
            >
              {/* FECHA */}
              <div className="flex items-baseline gap-4 min-w-[160px]">
                <span className="font-impact text-6xl md:text-7xl text-[#3B0764] group-hover:text-[#6E1FE8] transition-colors">
                  {ev.date}
                </span>
                <span className="font-mono-code text-base font-extrabold text-[#6E1FE8] transition-colors">
                  {ev.month}
                </span>
              </div>

              {/* ARTISTA Y VENUE */}
              <div className="flex-1">
                <span className="font-mono-code text-xs font-bold text-[#6B21A8]/70 uppercase block mb-1">
                  {ev.city} // {ev.venue}
                </span>
                <h3 className="font-impact text-3xl md:text-4xl text-[#3B0764] group-hover:text-[#6E1FE8] uppercase tracking-tight transition-colors">
                  {ev.artist}
                </h3>
              </div>

              {/* BOTÓN Y ESTADO CON MICRO-FÍSICA LIMPIA SIN FLECHAS GENÉRICAS */}
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono-code text-xs px-5 py-2 rounded-full font-black uppercase transition-all shadow-sm ${
                    ev.status === 'SOLD OUT'
                      ? 'bg-[#6E1FE8]/15 text-[#6E1FE8]'
                      : ev.status === 'HOY' || ev.status === 'ÚLTIMAS ENTRADAS'
                      ? 'bg-[#6E1FE8] text-white'
                      : ev.status === 'ESTA SEMANA'
                      ? 'bg-[#C0D43E] text-[#3B0764]'
                      : 'bg-[#6E1FE8] text-white'
                  }`}
                >
                  {ev.status}
                </span>
                <span className="font-mono-code text-xs font-black uppercase text-[#6E1FE8] group-hover:text-[#3B0764] transition-colors tracking-wider hidden sm:inline-block">
                  TICKETS
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
