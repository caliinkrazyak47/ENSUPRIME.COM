import { ArrowUp, Camera, Video, Music, Radio } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-28 px-6 md:px-14 bg-[#090909] text-[#F4F1EC] overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Giant Monolithic Logotype */}
        <div className="space-y-6">
          <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] tracking-tighter leading-none text-white select-none">
            THIAGOVSC®
          </div>
          <div className="font-mono-code text-xs sm:text-sm text-[#8D8D91] uppercase tracking-[0.25em]">
            STAY CLOSE TO THE CULTURE. ALWAYS IN MOTION.
          </div>
        </div>

        {/* Directory Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 font-mono-code text-xs text-[#8D8D91]">
          <div className="space-y-3">
            <span className="text-white font-bold tracking-widest uppercase block">
              // CONTENIDO
            </span>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-white transition-colors">Hero Overview</a></li>
              <li><a href="#music" className="hover:text-white transition-colors">Music & Releases</a></li>
              <li><a href="#tiktok" className="hover:text-white transition-colors">TikTok In The Loop</a></li>
              <li><a href="#tv" className="hover:text-white transition-colors">TV Online 4K</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-white font-bold tracking-widest uppercase block">
              // SEÑALES & AUDIO
            </span>
            <ul className="space-y-2">
              <li><a href="#radio" className="hover:text-white transition-colors">Radio Live Stream</a></li>
              <li><a href="#reels" className="hover:text-white transition-colors">Instagram Visuals</a></li>
              <li><a href="#influencer" className="hover:text-white transition-colors">Francesca Chiri</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">Calendario de Eventos</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-white font-bold tracking-widest uppercase block">
              // REDES SOCIALES
            </span>
            <ul className="space-y-2">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Instagram Oficial</span>
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>TikTok Radar</span>
                </a>
              </li>
              <li>
                <a href="https://spotify.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Spotify Artist</span>
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>YouTube Channel</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-[#8B5CF6] text-white border border-white/10 font-grotesk text-xs uppercase font-bold tracking-wider transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <div className="text-[10px] text-[#8D8D91]/50 mt-6 md:mt-0 text-left md:text-right">
              BUILD 2026.04 // THIAGOVSC CORE
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between font-mono-code text-[11px] text-[#8D8D91] gap-4">
          <div>
            © 2026 THIAGOVSC. TODOS LOS DERECHOS RESERVADOS.
          </div>
          <div className="flex items-center gap-6">
            <a href="#legal" className="hover:text-white transition-colors">AVISO LEGAL</a>
            <a href="#privacy" className="hover:text-white transition-colors">PRIVACIDAD</a>
            <a href="#cookies" className="hover:text-white transition-colors">POLÍTICA COOKIES</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
