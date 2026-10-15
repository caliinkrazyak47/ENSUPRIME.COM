import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export function Navbar({ onToggleRadio, isRadioPlaying }: { onToggleRadio: () => void; isRadioPlaying: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'CULTURA', href: '#manifesto' },
    { label: 'MÚSICA & VIDEOS', href: '#music' },
    { label: 'TIKTOK RADAR', href: '#tiktok' },
    { label: 'TV ONLINE LIVE', href: '#tv' },
    { label: 'TALENTS', href: '#influencer' },
    { label: 'CALENDARIO', href: '#events' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 flex items-center justify-between bg-[#090909]/80 backdrop-blur-xl border-b border-white/10 select-none">
        {/* Brand Logotype */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#F4F1EC] text-[#090909] flex items-center justify-center font-display font-black text-sm tracking-tighter group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
            TV
          </div>
          <span className="font-display font-black text-xl tracking-tight text-white uppercase group-hover:text-[#8D8D91] transition-colors">
            THIAGOVSC
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 font-grotesk text-xs uppercase tracking-[0.2em] font-medium text-[#8D8D91]">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action: Live Radio Toggle & Mobile Burger */}
        <div className="flex items-center gap-4">
          {/* Radio Trigger Pill */}
          <button
            onClick={onToggleRadio}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#111111] hover:bg-white/10 border border-white/15 text-white transition-all text-xs font-mono-code"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF3434] animate-pulse" />
            <span className="text-[11px] font-bold">RADIO LIVE</span>
            <div className="flex items-end gap-0.5 h-3 ml-1">
              <span className={`w-0.5 bg-[#8B5CF6] ${isRadioPlaying ? 'animate-wave-1' : 'h-1'}`} />
              <span className={`w-0.5 bg-[#8B5CF6] ${isRadioPlaying ? 'animate-wave-2' : 'h-2'}`} />
              <span className={`w-0.5 bg-[#8B5CF6] ${isRadioPlaying ? 'animate-wave-3' : 'h-1.5'}`} />
            </div>
          </button>

          {/* Contact Link */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F4F1EC] text-[#090909] hover:bg-[#8B5CF6] hover:text-white transition-colors font-grotesk text-xs uppercase font-bold tracking-wider"
          >
            <span>BOOKING</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 text-white hover:bg-white/10"
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#090909]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 text-white">
          <div className="space-y-6">
            <div className="font-mono-code text-[11px] text-[#8D8D91] uppercase tracking-widest border-b border-white/10 pb-3">
              MENÚ PRINCIPAL
            </div>
            <div className="space-y-4 font-display font-extrabold text-3xl">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-white/5 text-[#F4F1EC] hover:text-[#8B5CF6] transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#8D8D91]" />
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono-code text-xs text-[#8D8D91]">
            <span>© 2026 THIAGOVSC</span>
            <span className="text-[#8B5CF6]">DIGITAL CULTURE</span>
          </div>
        </div>
      )}
    </>
  );
}
