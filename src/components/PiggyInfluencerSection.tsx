import { ArrowUpRight, Camera, Sparkles } from 'lucide-react';

export function PiggyInfluencerSection() {
  return (
    <section id="influencer" className="relative py-32 px-4 sm:px-8 md:px-14 bg-[#121316] text-white border-b border-white/10 piggy-grain">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-white/10 pb-8">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#E56DB1]/10 border border-[#E56DB1]/30 text-[#E56DB1] font-mono text-[11px] uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>(04) TALENT ÉLITE & ÉGÉRIE EXCLUSIVE</span>
            </div>
            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
              ZONA INFLUENCER <span className="text-[#33e4b8]">FRANCESCA CHIRI</span>
            </h2>
          </div>
          <div className="lg:col-span-4 text-sm font-grotesk text-white/70 leading-relaxed">
            Représentation internationale, mode haute couture et collaborations d'envergure avec un engagement authentique vérifié.
          </div>
        </div>

        {/* Feature Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Specs */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-3">
              <span className="highlight-green text-[10px] font-mono tracking-widest uppercase px-2 py-0.5">
                TOP TALENT GLOBAL 2026
              </span>
              <a
                href="https://www.instagram.com/chiri_francesca/"
                target="_blank"
                rel="noreferrer"
                data-magnet
                className="inline-flex items-center gap-1.5 text-xs font-mono text-white/70 hover:text-[#33e4b8] transition-colors"
              >
                <Camera className="w-3.5 h-3.5 text-[#E56DB1]" />
                <span>@chiri_francesca</span>
              </a>
            </div>

            <p className="font-grotesk text-base sm:text-lg text-white/80 leading-relaxed">
              Figure emblématique du lifestyle européen et pionnière de la beauté curvy, Francesca Chiri réunit plus de <strong className="text-white">1,8 million</strong> d'abonnés fidèles autour de projets de mode, d'événements exclusifs et de campagnes prestigieuses.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/10 font-mono">
              <div>
                <span className="font-syne font-extrabold text-4xl sm:text-5xl text-white block">
                  1.8M+
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/50 block mt-1">
                  Communauté
                </span>
              </div>
              <div>
                <span className="font-syne font-extrabold text-4xl sm:text-5xl text-[#33e4b8] block">
                  94%
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/50 block mt-1">
                  Engagement
                </span>
              </div>
              <div>
                <span className="font-syne font-extrabold text-4xl sm:text-5xl text-[#E56DB1] block">
                  100%
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/50 block mt-1">
                  Organique
                </span>
              </div>
            </div>

            {/* Domain Tags */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-white/50">
                DOMAINES D'EXPERTISE :
              </div>
              <div className="flex flex-wrap gap-2.5 font-mono text-xs">
                {['HAUTE COUTURE', 'LIFESTYLE & TRAVEL', 'BEAUTÉ CURVY', 'ÉVÉNEMENTS EXCLUSIFS'].map((tag, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full bg-[#181a20] border border-white/10 text-white/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Nested CTA Button */}
            <div>
              <a
                href="#contact"
                data-magnet
                data-cursor-text="BOOKING"
                className="group inline-flex items-center gap-4 px-8 py-4 rounded-full bg-[#33e4b8] hover:bg-white text-[#121316] font-display text-xl uppercase tracking-wider transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(51,228,184,0.4)] active:scale-95"
              >
                <span>Proposer un Projet de Marque</span>
                <div className="w-8 h-8 rounded-full bg-[#121316]/10 group-hover:bg-[#121316]/20 flex items-center justify-center transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Double-Bezel Featured Poster */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              data-magnet
              className="w-full max-w-md p-2 rounded-[2.5rem] bg-gradient-to-b from-white/15 via-white/5 to-white/10 border border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] group"
            >
              <div className="relative aspect-[3/4] rounded-[calc(2.5rem-0.5rem)] overflow-hidden bg-[#181a20] border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
                  alt="Francesca Chiri Talent"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-6 left-6 z-10">
                  <span className="highlight-pink text-[10px] font-mono tracking-widest uppercase px-2.5 py-1">
                    EXCLUSIVE TALENT
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
                  <span className="text-xs font-mono text-[#33e4b8] uppercase tracking-widest block font-bold">
                    MILAN • PARIS • MADRID
                  </span>
                  <h3 className="font-syne font-extrabold text-4xl text-white tracking-wide">
                    FRANCESCA CHIRI
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
