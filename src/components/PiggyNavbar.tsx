import { useState } from 'react';
import { Menu, X, ArrowUpRight, Zap, Radio } from 'lucide-react';

export function PiggyNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Piggy Top Announcement Banner (Exactly like thepiggybrewingcompany.com) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#33e4b8] text-[#1C1C1C] py-2 px-4 text-center font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-3 border-b border-black">
        <span className="w-2 h-2 rounded-full bg-[#1C1C1C] animate-ping" />
        <span>HEY ! DIFFUSION DIRECTE & MEDIA NETWORK EN LIVE 24/7 EN 4K ULTRA HD</span>
        <a href="#tv-stream" className="underline hover:text-white transition-colors ml-2 hidden sm:inline">
          VOIR LE LIVE !
        </a>
      </div>

      <header className="fixed top-[33px] left-0 right-0 z-40 py-4 px-6 md:px-14 flex items-center justify-between text-white bg-[#1C1C1C]/90 backdrop-blur-xl border-b border-white/10 select-none">
        {/* Logo / Brand */}
        <a href="#hero" className="flex items-center gap-3.5 group" data-magnet>
          <div className="w-11 h-11 rounded-2xl bg-[#33e4b8] border-2 border-black flex items-center justify-center font-display text-[#1C1C1C] text-2xl shadow-[3px_3px_0px_#E56DB1] group-hover:rotate-6 transition-transform">
            EP
          </div>
          <div className="flex flex-col">
            <span className="font-display text-3xl tracking-wide uppercase text-white group-hover:text-[#33e4b8] transition-colors leading-none">
              ENSUPRIME
            </span>
            <span className="font-mono text-[9px] tracking-widest text-[#E56DB1] uppercase font-bold mt-0.5">
              THE PIGGY BREWING IDENTITY
            </span>
          </div>
        </a>

        {/* Center Links */}
        <nav className="hidden lg:flex items-center gap-8 font-grotesk text-xs uppercase tracking-[0.2em] font-bold text-white/80">
          <a href="#hero" className="hover:text-[#33e4b8] transition-colors" data-magnet>Accueil</a>
          <a href="#tv-stream" className="hover:text-[#33e4b8] transition-colors" data-magnet>TV Stream</a>
          <a href="#status" className="hover:text-[#33e4b8] transition-colors" data-magnet>Status & Live</a>
          <a href="#tiktok-feed" className="hover:text-[#33e4b8] transition-colors" data-magnet>TikTok Grid</a>
          <a href="#influencer" className="hover:text-[#33e4b8] transition-colors" data-magnet>Influencer</a>
          <a href="#sponsors" className="hover:text-[#33e4b8] transition-colors" data-magnet>Sponsors</a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#33e4b8]/15 border border-[#33e4b8]/40 text-[#33e4b8] font-mono text-[11px] font-bold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse text-[#33e4b8]" />
            LIVE ON AIR
          </div>

          <a
            href="#contact"
            data-magnet
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-[#E56DB1] hover:bg-[#33e4b8] text-white hover:text-[#1C1C1C] font-display text-lg uppercase tracking-wider shadow-[3px_3px_0px_#000] transition-all hover:scale-105 active:scale-95"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Booking</span>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-xl bg-white/10 text-white"
            aria-label="Toggle Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Drawer Mobile */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#1C1C1C]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-32 text-white animate-fadeIn">
          <div className="space-y-4 font-display text-3xl">
            {[
              { label: '01. HERO SECTION', href: '#hero' },
              { label: '02. TV / LIVE STREAM', href: '#tv-stream' },
              { label: '03. ONLINE & STATUS', href: '#status' },
              { label: '04. TIKTOK SOCIAL GRID', href: '#tiktok-feed' },
              { label: '05. ZONA INFLUENCER', href: '#influencer' },
              { label: '06. SPONSORS & PARTENAIRES', href: '#sponsors' },
              { label: '07. CONTACT ET BOOKING', href: '#contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-2 border-b border-white/10 text-white hover:text-[#33e4b8] transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-6 h-6 text-[#E56DB1]" />
              </a>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 font-mono text-xs text-white/50 flex justify-between">
            <span>ENSUPRIME 2026</span>
            <span className="text-[#33e4b8]">FINESSE & CRAZINESS</span>
          </div>
        </div>
      )}
    </>
  );
}
