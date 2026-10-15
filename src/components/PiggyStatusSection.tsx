import { Activity, Users, Eye, ShieldCheck, Flame } from 'lucide-react';

export function PiggyStatusSection() {
  return (
    <section id="status" className="relative py-32 px-4 sm:px-8 md:px-14 bg-[#121316] text-white border-b border-white/10 piggy-grain">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#33e4b8]/10 border border-[#33e4b8]/20 font-mono text-[11px] text-[#33e4b8] uppercase tracking-widest font-bold">
              <Activity className="w-3.5 h-3.5" />
              <span>(02) TABLEAU DE BORD & STATUT EN TEMPS RÉEL</span>
            </div>
            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
              PRÉSENCE & <span className="text-[#E56DB1]">MÉTRIQUES LIVE</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/50">
            <span className="w-2 h-2 rounded-full bg-[#33e4b8] animate-ping" />
            <span>SYNCHRONISATION API VÉRIFIÉE</span>
          </div>
        </div>

        {/* Status Alert Banner with Double-Bezel Framing */}
        <div className="p-2 rounded-[2rem] bg-gradient-to-r from-[#33e4b8]/20 via-white/5 to-[#E56DB1]/20 border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)]">
          <div className="p-6 md:p-8 rounded-[calc(2rem-0.5rem)] bg-[#181a20] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#33e4b8] text-[#121316] flex items-center justify-center font-display text-2xl shadow-[0_10px_20px_rgba(51,228,184,0.3)]">
                <Flame className="w-7 h-7 fill-current" />
              </div>
              <div>
                <div className="font-syne font-bold text-xl sm:text-2xl uppercase tracking-wide text-white">
                  STATUT DU CRÉATEUR : <span className="text-[#33e4b8]">SESSION LIVE ACTIVE</span>
                </div>
                <p className="font-grotesk text-sm text-white/70 max-w-xl">
                  En direct depuis Madrid. Production en cours, collaborations de marques et stream 4K non-stop.
                </p>
              </div>
            </div>

            <span className="px-5 py-2 rounded-full bg-[#E56DB1]/20 border border-[#E56DB1] text-[#E56DB1] font-mono text-xs font-bold uppercase tracking-wider shrink-0">
              AUDIENCE MAXIMUM RECORD
            </span>
          </div>
        </div>

        {/* 4 Metric Cards in Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Users,
              title: 'AUDIENCE GLOBALE',
              number: '1.8M+',
              badge: '+14% CE MOIS',
              highlight: '#33e4b8',
              desc: 'Communauté fidèle sur TikTok, Instagram et plateformes de streaming.',
            },
            {
              icon: Eye,
              title: 'VUES MENSUELLES',
              number: '12.4M',
              badge: 'ENGAGEMENT 94%',
              highlight: '#E56DB1',
              desc: 'Portée organique puissante générée par des contenus vidéo à fort impact.',
            },
            {
              icon: Flame,
              title: 'INTERACTIONS REELS',
              number: '3.6M',
              badge: 'RADAR TOP VIRAL',
              highlight: '#FFD84D',
              desc: 'Partages, commentaires et interactions actives de haute qualité.',
            },
            {
              icon: ShieldCheck,
              title: 'RÉTENTION MOYENNE',
              number: '88.5%',
              badge: 'CERTIFIÉ CONVERSIÓN',
              highlight: '#33e4b8',
              desc: 'Durée moyenne de visionnage nettement supérieure aux moyennes du marché.',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                data-magnet
                className="group p-1.5 rounded-[2rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 hover:border-[#33e4b8]/50 transition-all duration-300 hover:-translate-y-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]"
              >
                <div className="h-full p-6 rounded-[calc(2rem-0.375rem)] bg-[#181a20] border border-white/5 flex flex-col justify-between space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                      style={{ backgroundColor: `${item.highlight}20`, color: item.highlight }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest text-white/50 mb-1.5">
                      {item.title}
                    </div>
                    <div
                      className="font-syne font-black text-5xl md:text-6xl tracking-tight"
                      style={{ color: item.highlight }}
                    >
                      {item.number}
                    </div>
                  </div>

                  <p className="font-grotesk text-xs text-white/60 leading-relaxed border-t border-white/10 pt-4">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
