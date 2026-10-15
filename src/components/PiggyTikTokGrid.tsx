import { useState } from 'react';
import { Play, ExternalLink, ChevronLeft, ChevronRight, Flame } from 'lucide-react';

const tiktokVideos = [
  {
    handle: '@jacklyn_roper5',
    url: 'https://www.tiktok.com/@jacklyn_roper5',
    category: 'BEAT & STYLE',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    views: '2.4M VUES',
    sticker: 'TRENDING #01',
    color: '#33e4b8',
  },
  {
    handle: '@pampeee_spam',
    url: 'https://www.tiktok.com/@pampeee_spam',
    category: 'URBAN MADRID',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80',
    views: '4.8M VUES',
    sticker: 'VIRAL REEL',
    color: '#E56DB1',
  },
  {
    handle: '@kaitlynkrems',
    url: 'https://www.tiktok.com/@kaitlynkrems',
    category: 'HAUTE COUTURE',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    views: '1.9M VUES',
    sticker: 'TOP ENGAGEMENT',
    color: '#FFD84D',
  },
  {
    handle: '@lauraalguaciiil',
    url: 'https://www.tiktok.com/@lauraalguaciiil',
    category: 'CURVY VANGUARD',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    views: '5.2M VUES',
    sticker: 'SPECIAL CRAFT',
    color: '#33e4b8',
  },
];

export function PiggyTikTokGrid() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((p) => (p - 1 + tiktokVideos.length) % tiktokVideos.length);
  const next = () => setIndex((p) => (p + 1) % tiktokVideos.length);

  const displayed = tiktokVideos.slice(index).concat(tiktokVideos.slice(0, index));

  return (
    <section id="tiktok-feed" className="relative py-32 px-4 sm:px-8 md:px-14 bg-[#14151a] text-white border-b border-white/10 piggy-grain">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#FFD84D]/10 border border-[#FFD84D]/30 text-[#FFD84D] font-mono text-[11px] uppercase tracking-widest font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>(03) TIKTOK SOCIAL RADAR // 9:16 CARDS</span>
            </div>
            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
              RADAR VIRAL <span className="text-[#33e4b8]">TIKTOKS & REELS</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              data-magnet
              data-cursor-text="PRÉC"
              className="w-12 h-12 rounded-full bg-[#181a20] hover:bg-[#33e4b8] hover:text-[#121316] text-white border border-white/10 flex items-center justify-center transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.5)] active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              data-magnet
              data-cursor-text="SUIV"
              className="w-12 h-12 rounded-full bg-[#181a20] hover:bg-[#E56DB1] hover:text-white text-white border border-white/10 flex items-center justify-center transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.5)] active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 9:16 Video Cards with Hardware Double-Bezel Architecture */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {displayed.map((vid, i) => (
            <div
              key={i}
              data-magnet
              data-cursor-text="REEL"
              className="group p-1.5 rounded-[2.2rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 hover:border-[#33e4b8]/50 transition-all duration-500 hover:-translate-y-2.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]"
            >
              <div className="relative rounded-[calc(2.2rem-0.375rem)] overflow-hidden bg-[#181a20] border border-white/5 aspect-[9/16] flex flex-col justify-between">
                {/* Poster Background */}
                <img
                  src={vid.image}
                  alt={vid.handle}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />

                {/* Film-grain and Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Top Overlay Badge */}
                <div className="relative z-10 p-5 flex justify-between items-start">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm"
                    style={{ backgroundColor: vid.color, color: '#121316' }}
                  >
                    {vid.sticker}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90 border border-white/10">
                    {vid.views}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="relative z-10 p-5 space-y-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#33e4b8] font-bold block">
                    {vid.category}
                  </span>
                  <h4 className="font-syne font-bold text-2xl text-white tracking-wide leading-tight">
                    {vid.handle}
                  </h4>

                  <div className="pt-3 flex items-center justify-between border-t border-white/15">
                    <a
                      href={vid.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono font-bold text-white group-hover:text-[#33e4b8] transition-colors"
                    >
                      <span>OUVRIR TIKTOK</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="w-10 h-10 rounded-full bg-[#33e4b8] group-hover:bg-[#E56DB1] text-[#121316] group-hover:text-white flex items-center justify-center transition-colors shadow-lg group-hover:scale-105">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
