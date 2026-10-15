import { Shield, Zap, Sparkles } from 'lucide-react';

const sponsors = [
  { name: 'SHÔKO MADRID', tag: 'Club & Résidence', logo: 'SHÔKO', color: '#33e4b8' },
  { name: 'THE PIGGY BREWING', tag: 'Craft Beer Partner', logo: 'PIGGY BREW', color: '#E56DB1' },
  { name: 'FABRIK MADRID', tag: 'Festival Venue', logo: 'FABRIK', color: '#FFD84D' },
  { name: 'LAS VENTAS BULLRING', tag: 'Concert Series', logo: 'LAS VENTAS', color: '#33e4b8' },
  { name: 'RED BULL MUSIC', tag: 'Energy & Sound', logo: 'RED BULL', color: '#E56DB1' },
  { name: 'PIONEER DJ', tag: 'Acoustic Partner', logo: 'PIONEER', color: '#FFD84D' },
];

export function PiggySponsorsSection() {
  return (
    <section id="sponsors" className="relative py-32 px-4 sm:px-8 md:px-14 bg-[#14151a] text-white border-b border-white/10 piggy-grain">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#33e4b8]/10 border border-[#33e4b8]/30 font-mono text-[11px] text-[#33e4b8] uppercase tracking-widest font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>(05) MARQUES, COLLABORATIONS & SPONSORS</span>
            </div>
            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
              PARTENAIRES <span className="text-[#E56DB1]">& SPONSORS</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/50">
            <Sparkles className="w-4 h-4 text-[#FFD84D]" />
            <span>RÉSEAU OFFICIEL CERTIFIÉ</span>
          </div>
        </div>

        {/* Illuminated Interactive Sponsor Grid with Hardware Bezel */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sponsors.map((sp, i) => (
            <div
              key={i}
              data-magnet
              data-cursor-text={sp.logo}
              className="group p-1.5 rounded-[2rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 hover:border-[#33e4b8]/50 transition-all duration-300 hover:-translate-y-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] cursor-pointer"
            >
              <div className="h-full p-6 rounded-[calc(2rem-0.375rem)] bg-[#181a20] border border-white/5 flex flex-col items-center justify-center text-center aspect-square space-y-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${sp.color}15`, color: sp.color }}
                >
                  <Zap className="w-6 h-6 fill-current" />
                </div>

                <div>
                  <span className="font-syne font-bold text-xl text-white block tracking-wide group-hover:text-[#33e4b8] transition-colors">
                    {sp.logo}
                  </span>
                  <span className="text-[10px] font-mono text-white/40 block mt-1">
                    {sp.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
