export interface MusicRelease {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  coverImage: string;
  audioUrl: string; // URL al archivo de audio MP3 real o stream
  duration: string;
  platformUrl: string;
  genre: string;
  isFeatured?: boolean;
}

export interface TikTokSlot {
  id: string;
  creator: string;
  title: string;
  description: string;
  category: string;
  videoSrc?: string;
  posterImage: string;
  externalUrl?: string;
  enabled: boolean;
}

export interface ReelSlot {
  id: string;
  title: string;
  creator: string;
  category: string;
  videoSrc?: string;
  posterImage: string;
  externalUrl?: string;
  altText: string;
  enabled: boolean;
}

export interface TVBroadcast {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl: string; // MP4 directo o YouTube embed ID
  isLive?: boolean;
  synopsis: string;
}

export interface RadioChannel {
  id: string;
  name: string;
  streamUrl: string;
  genre: string;
  frequency: string;
  city: string;
}

export interface EventItem {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  location: string;
  venue: string;
  ticketUrl: string;
  status: 'TICKETS DISPONIBLES' | 'SOLD OUT' | 'PRÓXIMAMENTE';
  posterImage: string;
}

/* ==========================================================
   CONFIGURACIÓN MUSICAL (MUSIC RELEASES)
========================================================== */
export const MUSIC_CATALOG: MusicRelease[] = [
  {
    id: 'm1',
    title: 'MIDNIGHT DRIFT (VIP EDIT)',
    artist: 'THIAGO VSC',
    releaseDate: 'OCTUBRE 2026',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=trap-beat-lifestyle-111197.mp3',
    duration: '03:24',
    platformUrl: 'https://spotify.com',
    genre: 'URBAN ELECTRONIC / BASS',
    isFeatured: true,
  },
  {
    id: 'm2',
    title: 'MADRID CIELO ROJO',
    artist: 'THIAGO VSC FT. J.L',
    releaseDate: 'SEPTIEMBRE 2026',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=electronic-future-beats-117997.mp3',
    duration: '02:58',
    platformUrl: 'https://apple.com/music',
    genre: 'AFROBEATS / URBAN',
  },
  {
    id: 'm3',
    title: 'SUB-ZERO FREESTYLE',
    artist: 'THIAGO VSC',
    releaseDate: 'AGOSTO 2026',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=urban-night-drift-1234.mp3',
    duration: '02:40',
    platformUrl: 'https://soundcloud.com',
    genre: 'DRILL & UK GARAGE',
  },
];

/* ==========================================================
   CONFIGURACIÓN EXACTA: 10 SLOTS TIKTOK (IN THE LOOP)
========================================================== */
export const TIKTOK_SLOTS: TikTokSlot[] = [
  {
    id: 'tiktok-01',
    creator: '@thiagovsc',
    title: 'Drop Live en Shôko Madrid',
    description: 'Momento exacto en que la sala entera canta el remix inédito.',
    category: 'LIVE PERFORMANCE',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=700&q=80',
    externalUrl: 'https://tiktok.com/@thiagovsc',
    enabled: true,
  },
  {
    id: 'tiktok-02',
    creator: '@chiri_francesca',
    title: 'Fitting Backstage & Moda',
    description: 'Estilismo experimental previo al festival de cultura urbana.',
    category: 'FASHION & EDITORIAL',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    posterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    externalUrl: 'https://instagram.com/chiri_francesca',
    enabled: true,
  },
  {
    id: 'tiktok-03',
    creator: '@thiagovsc',
    title: 'Studio Session Beats 140 BPM',
    description: 'Boceto de bajo analógico para el próximo EP.',
    category: 'STUDIO CRAFT',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    posterImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=700&q=80',
    externalUrl: 'https://tiktok.com/@thiagovsc',
    enabled: true,
  },
  {
    id: 'tiktok-04',
    creator: '@kaitlynkrems',
    title: 'Visuals 4K on the road',
    description: 'Recorrido nocturno por las luces de la Gran Vía.',
    category: 'URBAN VIBES',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    posterImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80',
    externalUrl: 'https://tiktok.com',
    enabled: true,
  },
  {
    id: 'tiktok-05',
    creator: '@thiagovsc',
    title: 'El sintetizador que define el sonido',
    description: 'Desmontando los acordes del single Midnight Drift.',
    category: 'PRODUCTION',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    posterImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80',
    externalUrl: 'https://tiktok.com/@thiagovsc',
    enabled: true,
  },
  {
    id: 'tiktok-06',
    creator: '@pampeee_spam',
    title: 'En cabina con el equipo',
    description: 'La energía del público desde la perspectiva del DJ.',
    category: 'LIVE MOMENTS',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    posterImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80',
    externalUrl: 'https://tiktok.com',
    enabled: true,
  },
  {
    id: 'tiktok-07',
    creator: '@thiagovsc',
    title: 'Acoustic freestyle espontáneo',
    description: 'Grabación cruda a un micrófono sin auto-tune.',
    category: 'UNFILTERED',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    posterImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
    externalUrl: 'https://tiktok.com/@thiagovsc',
    enabled: true,
  },
  {
    id: 'tiktok-08',
    creator: '@jacklyn_roper5',
    title: 'Coreografía y sonido club',
    description: 'Ensayo con los bailarines para el tour 2026.',
    category: 'CHOREOGRAPHY',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    posterImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80',
    externalUrl: 'https://tiktok.com',
    enabled: true,
  },
  {
    id: 'tiktok-09',
    creator: '@thiagovsc',
    title: 'Viernes de vinilos y mezclas analógicas',
    description: 'Crate digging en tiendas underground.',
    category: 'VINYL CULTURE',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    posterImage: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=700&q=80',
    externalUrl: 'https://tiktok.com/@thiagovsc',
    enabled: true,
  },
  {
    id: 'tiktok-10',
    creator: '@thiagovsc',
    title: 'Próximo anuncio oficial',
    description: 'Adelanto visual de la gira internacional.',
    category: 'TOUR ANNOUNCEMENT',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    posterImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=700&q=80',
    externalUrl: 'https://tiktok.com/@thiagovsc',
    enabled: true,
  },
];

/* ==========================================================
   CONFIGURACIÓN EXACTA: 10 SLOTS INSTAGRAM REELS (VISUAL DIARIES)
========================================================== */
export const REEL_SLOTS: ReelSlot[] = [
  {
    id: 'reel-01',
    title: 'Editorial Noir en París',
    creator: '@thiagovsc',
    category: 'CINEMATIQUE',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    altText: 'Sesión editorial nocturna en París',
    enabled: true,
  },
  {
    id: 'reel-02',
    title: 'Haute Horlogerie & Estilo',
    creator: '@chiri_francesca',
    category: 'LUXURY DETAILS',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    posterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    altText: 'Detalles de moda y joyería',
    enabled: true,
  },
  {
    id: 'reel-03',
    title: 'Backstage en la residencia Shôko',
    creator: '@thiagovsc',
    category: 'NIGHTLIFE',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    posterImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    altText: 'Equipo técnico preparando la cabina',
    enabled: true,
  },
  {
    id: 'reel-04',
    title: 'Amanecer en el estudio',
    creator: '@thiagovsc',
    category: 'CREATIVE PROCESS',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    posterImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    altText: 'Luz del alba iluminando la consola de sonido',
    enabled: true,
  },
  {
    id: 'reel-05',
    title: 'Colección cápsula de moda urbana',
    creator: '@chiri_francesca',
    category: 'WARDROBE',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    posterImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    altText: 'Prendas exclusivas de edición limitada',
    enabled: true,
  },
  {
    id: 'reel-06',
    title: 'Prueba de sonido en recinto monumental',
    creator: '@thiagovsc',
    category: 'ACOUSTICS',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    posterImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    altText: 'Altavoces line-array calibrándose',
    enabled: true,
  },
  {
    id: 'reel-07',
    title: 'Visuales arquitectónicos 3D',
    creator: '@thiagovsc',
    category: 'DIGITAL SCENOGRAPHY',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    posterImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    altText: 'Escenografía 3D proyectada en directo',
    enabled: true,
  },
  {
    id: 'reel-08',
    title: 'Conversación con productores invitados',
    creator: '@thiagovsc',
    category: 'DIALOGUE',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    posterImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    altText: 'Encuentro con compositores internacionales',
    enabled: true,
  },
  {
    id: 'reel-09',
    title: 'Cultura de club en Berlín',
    creator: '@thiagovsc',
    category: 'TRAVEL ARCHIVE',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    posterImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    altText: 'Arquitectura industrial en Berlín',
    enabled: true,
  },
  {
    id: 'reel-10',
    title: 'Final de gira y cierre de temporada',
    creator: '@thiagovsc',
    category: 'FINALE',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    posterImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
    altText: 'Confeti y fuegos en el cierre del tour',
    enabled: true,
  },
];

/* ==========================================================
   CONFIGURACIÓN TV ONLINE (NOW TRANSMITTING)
========================================================== */
export const TV_PROGRAMMING: TVBroadcast[] = [
  {
    id: 'tv-01',
    title: 'THIAGO VSC LIVE STREAM // 4K BROADCAST SESSION',
    category: 'LIVE STREAM PRINCIPAL',
    duration: 'CONTINUO 24/7',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/kPa7bsKwL-c?autoplay=1&mute=1&playsinline=1&rel=0',
    isLive: true,
    synopsis: 'Transmisión ininterrumpida de alta fidelidad con sesiones exclusivas, directos de cabina y catálogo audiovisual seleccionado.',
  },
  {
    id: 'tv-02',
    title: 'AFTERMOVIE OFICIAL // RESIDENCIA SHÔKO MADRID',
    category: 'DOCUMENTAL DE CLUB',
    duration: '14:20 MIN',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/iIRm1mYqRCg?autoplay=1&mute=1&playsinline=1&rel=0',
    isLive: false,
    synopsis: 'Una mirada cinematográfica a las noches de residencia que transformaron el circuito nocturno de la capital.',
  },
  {
    id: 'tv-03',
    title: 'DIÁLOGOS CON LA CULTURA // EPISODIO 01',
    category: 'ENTREVISTA EXCLUSIVA',
    duration: '26:15 MIN',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/kPa7bsKwL-c?autoplay=1&mute=1&playsinline=1&rel=0',
    isLive: false,
    synopsis: 'Conversación en profundidad sobre la evolución de la música urbana contemporánea y las nuevas plataformas digitales.',
  },
];

/* ==========================================================
   CONFIGURACIÓN RADIO
========================================================== */
export const RADIO_CHANNELS: RadioChannel[] = [
  {
    id: 'ch-01',
    name: 'THIAGO VSC // CANAL PRINCIPAL',
    streamUrl: 'https://stream.zeno.fm/f3wvbbqmdg8uv', // Stream de audio MP3 público y funcional
    genre: 'URBAN, AFRO & DRIFT BEATS',
    frequency: 'CH-01 • 320 KBPS',
    city: 'MADRID HUB',
  },
  {
    id: 'ch-02',
    name: 'DEEP NIGHT // CHILL & CHORDS',
    streamUrl: 'https://stream.zeno.fm/0r0xa792kwzuv',
    genre: 'AMBIENT TECH & FUTURE SOUL',
    frequency: 'CH-02 • 256 KBPS',
    city: 'STUDIO 2',
  },
];

/* ==========================================================
   CONFIGURACIÓN EVENTOS
========================================================== */
export const EVENTS_CALENDAR: EventItem[] = [
  {
    id: 'ev-01',
    day: '24',
    month: 'OCT',
    year: '2026',
    title: 'THIAGO VSC ALL NIGHT LONG',
    location: 'MADRID, ESPAÑA',
    venue: 'SHÔKO CLUB',
    ticketUrl: 'https://shokomadrid.com',
    status: 'TICKETS DISPONIBLES',
    posterImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ev-02',
    day: '07',
    month: 'NOV',
    year: '2026',
    title: 'THE CRAFT DIGITAL NIGHT',
    location: 'STRASBOURG, FRANCIA',
    venue: 'LE ZÉNITH HALL',
    ticketUrl: 'https://thepiggybrewingcompany.com',
    status: 'TICKETS DISPONIBLES',
    posterImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ev-03',
    day: '19',
    month: 'NOV',
    year: '2026',
    title: 'BARCELONA DIGITAL CULTURE FEST',
    location: 'BARCELONA, ESPAÑA',
    venue: 'PARC DEL FÒRUM',
    ticketUrl: '#',
    status: 'SOLD OUT',
    posterImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ev-04',
    day: '12',
    month: 'DIC',
    year: '2026',
    title: 'GALA AUDIOVISUAL DE FIN DE TEMPORADA',
    location: 'PARIS, FRANCIA',
    venue: 'STUDIO ÉLYSÉES',
    ticketUrl: '#contact',
    status: 'PRÓXIMAMENTE',
    posterImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  },
];
