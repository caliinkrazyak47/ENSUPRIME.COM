import { ArrowUp, Camera, Video, Radio, Music } from 'lucide-react';

export function PiggyFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-24 px-4 sm:px-8 md:px-14 bg-[#0e0f12] text-white overflow-hidden piggy-grain">
      {/* Background Subtle Piggy Ambient Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-[#33e4b8]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Top Split */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/10 pb-12">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#33e4b8] text-[#121316] flex items-center justify-center font-display text-2xl border-2 border-black shadow-[3px_3px_0px_#E56DB1]">
                EP
              </div>
              <span className="font-syne font-black text-3xl sm:text-4xl text-white uppercase tracking-wider">
                ENSUPRIME MEDIA
              </span>
            </div>
            <p className="font-grotesk text-sm text-white/70 leading-relaxed">
              La plateforme audiovisuelle et média d'avant-garde fusionnant la culture craft et l'énergie visuelle de The Piggy Brewing Company avec l'architecture de contenu de Thiago VSC.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { name: 'Instagram', icon: Camera, url: 'https://instagram.com', color: '#E56DB1' },
              { name: 'YouTube', icon: Video, url: 'https://youtube.com', color: '#33e4b8' },
              { name: 'Twitch', icon: Radio, url: 'https://twitch.tv', color: '#FFD84D' },
              { name: 'Spotify Live', icon: Music, url: 'https://spotify.com', color: '#33e4b8' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  data-magnet
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#181a20] hover:bg-white hover:text-[#121316] border border-white/10 font-mono text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                  <span>{s.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Directory Links & Back To Top */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 font-mono text-xs text-white/60">
          <div className="space-y-3">
            <span className="text-[#33e4b8] uppercase font-bold tracking-widest block">
              // DIRECT & STREAM
            </span>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-white transition-colors">Hero Overview 3D</a></li>
              <li><a href="#tv-stream" className="hover:text-white transition-colors">TV Online 4K</a></li>
              <li><a href="#status" className="hover:text-white transition-colors">Status du Créateur</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[#E56DB1] uppercase font-bold tracking-widest block">
              // TALENTS & SOCIAL
            </span>
            <ul className="space-y-2">
              <li><a href="#tiktok-feed" className="hover:text-white transition-colors">TikTok Grid 9:16</a></li>
              <li><a href="#influencer" className="hover:text-white transition-colors">Francesca Chiri</a></li>
              <li><a href="#sponsors" className="hover:text-white transition-colors">Sponsors Officiels</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[#FFD84D] uppercase font-bold tracking-widest block">
              // LÉGAL & CONTACT
            </span>
            <ul className="space-y-2">
              <li><a href="#contact" className="hover:text-white transition-colors">Booking & Devis</a></li>
              <li><a href="#legal" className="hover:text-white transition-colors">Mentions Légales</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Politique Cookies</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-start sm:items-end justify-between">
            <button
              onClick={scrollToTop}
              data-magnet
              data-cursor-text="HAUT"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#33e4b8] hover:bg-white text-[#121316] font-display text-xl uppercase tracking-wider transition-all shadow-[0_10px_20px_rgba(51,228,184,0.3)] active:scale-95"
            >
              <span>Haut de page</span>
              <ArrowUp className="w-4 h-4 ml-1" />
            </button>
            <div className="font-mono text-[11px] text-white/40 mt-4 sm:mt-0">
              BUILD 2026.04 // V4.0 AWWWARDS
            </div>
          </div>
        </div>

        {/* Closing Typography */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-white/40 gap-4">
          <div>
            © 2026 ENSUPRIME. ARCHITECTURE DESIGN & THREE.JS CRAFT.
          </div>
          <div className="text-[#33e4b8] font-bold">
            FINESSE & CRAZINESS // SITE OF THE DAY RECOGNITION
          </div>
        </div>
      </div>
    </footer>
  );
}
