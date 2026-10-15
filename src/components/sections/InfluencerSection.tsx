import { ArrowUpRight, Camera, Sparkles } from 'lucide-react';

export function InfluencerSection() {
  return (
    <section id="influencer" className="relative py-32 px-6 md:px-14 bg-[#F4F1EC] text-[#090909] border-b border-black/10 select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/15 pb-8 font-mono-code text-xs text-[#8D8D91]">
          <div className="space-y-1">
            <span className="text-[#090909] font-bold tracking-widest uppercase block">
              // 07. TALENT COLLABORATION & LIFESTYLE
            </span>
            <span>ÉGÉRIE EXCLUSIVA & EMBAJADORA DE MARCA</span>
          </div>
          <div>PERFIL VERIFICADO 2026</div>
        </div>

        {/* Feature Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Description & Metrics */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 font-mono-code text-[11px] text-[#090909]">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="font-bold">TALENTO OFICIAL THIAGOVSC</span>
            </div>

            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.92] uppercase text-[#090909]">
              FRANCESCA <br />
              <span className="text-[#8D8D91]">CHIRI</span>
            </h2>

            <p className="font-grotesk text-base sm:text-lg text-[#090909]/80 leading-relaxed max-w-xl">
              Referente de la moda contemporánea, estilo curvy y creadora de tendencias visuales en Europa. Colaboradora principal en sesiones audiovisuales, estilismo de videoclips y eventos exclusivos.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-black/10 font-mono-code">
              <div>
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#090909] block">
                  1.8M+
                </span>
                <span className="text-[10px] text-[#8D8D91] uppercase mt-1 block">
                  Seguidores
                </span>
              </div>
              <div>
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#8B5CF6] block">
                  94%
                </span>
                <span className="text-[10px] text-[#8D8D91] uppercase mt-1 block">
                  Engagement
                </span>
              </div>
              <div>
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#090909] block">
                  100%
                </span>
                <span className="text-[10px] text-[#8D8D91] uppercase mt-1 block">
                  Orgánico
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/chiri_francesca/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#090909] hover:bg-[#8B5CF6] text-white transition-colors font-grotesk font-bold text-xs uppercase tracking-wider"
              >
                <Camera className="w-4 h-4" />
                <span>@chiri_francesca en Instagram</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full bg-black/5 hover:bg-black/10 text-[#090909] border border-black/10 transition-colors font-grotesk font-bold text-xs uppercase tracking-wider"
              >
                <span>Proponer Colaboración</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8D8D91]" />
              </a>
            </div>
          </div>

          {/* Right Column Featured High-Res Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden bg-[#090909] border border-black/10 shadow-[0_30px_60px_rgba(0,0,0,0.25)] group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
                alt="Francesca Chiri Talent"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 font-mono-code text-white">
                <span className="text-[10px] text-[#D8D8DB] block uppercase tracking-wider">
                  MADRID / MILÁN • CAMPAÑA 2026
                </span>
                <h4 className="font-display font-bold text-2xl uppercase mt-0.5">
                  FRANCESCA CHIRI
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
