export interface VideoItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  category: string;
  views: string;
  thumbnail: string;
  youtubeId: string;
}

export interface ReelItem {
  id: string;
  handle: string;
  caption: string;
  likes: string;
  views: string;
  sound: string;
  image: string;
  url: string;
}

export interface RadioStation {
  id: string;
  name: string;
  genre: string;
  liveTrack: string;
  listeners: string;
  frequency: string;
}

export interface EventItem {
  id: string;
  date: string;
  month: string;
  title: string;
  location: string;
  venue: string;
  status: 'TICKETS' | 'SOLD OUT' | 'RSVP';
}

export const FEATURED_VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'SESSION LIVE #04 — MADRID UNDERGROUND',
    artist: 'THIAGO VSC & GUESTS',
    duration: '18:40',
    category: 'DJ SET / LIVE',
    views: '1.4M',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    youtubeId: 'kPa7bsKwL-c',
  },
  {
    id: 'v2',
    title: 'NOCHE EN SHÔKO — AFTERMOVIE 4K',
    artist: 'THIAGO VSC RESIDENCE',
    duration: '06:12',
    category: 'NIGHTLIFE',
    views: '890K',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    youtubeId: 'kPa7bsKwL-c',
  },
  {
    id: 'v3',
    title: 'ACOUSTIC SESSIONS & STUDIO FREESTYLE',
    artist: 'FRANCESCA CHIRI × THIAGO',
    duration: '12:05',
    category: 'STUDIO LIVE',
    views: '2.1M',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    youtubeId: 'kPa7bsKwL-c',
  },
];

export const TIKTOK_REELS: ReelItem[] = [
  {
    id: 't1',
    handle: '@thiagovsc',
    caption: 'Momento exacto en el drop de la sesión en directo 🔥',
    likes: '482K',
    views: '3.4M',
    sound: 'Audio Original — Thiago VSC',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    url: 'https://tiktok.com/@thiagovsc',
  },
  {
    id: 't2',
    handle: '@chiri_francesca',
    caption: 'Editorial fitting backstage antes del show en Madrid',
    likes: '890K',
    views: '5.8M',
    sound: 'Chiri Exclusive Mix',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    url: 'https://instagram.com/chiri_francesca',
  },
  {
    id: 't3',
    handle: '@thiagovsc',
    caption: 'Backstage view con la cabina a reventar',
    likes: '340K',
    views: '2.2M',
    sound: 'Bassline Pressure 140',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    url: 'https://tiktok.com/@thiagovsc',
  },
  {
    id: 't4',
    handle: '@kaitlynkrems',
    caption: 'Visuals y estilismo para el lanzamiento de la temporada',
    likes: '620K',
    views: '4.1M',
    sound: 'Minimal Tech Grooves',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    url: 'https://tiktok.com/@kaitlynkrems',
  },
];

export const RADIO_STATION: RadioStation = {
  id: 'radio-main',
  name: 'THIAGO VSC LIVE ON-AIR',
  genre: 'URBAN BEATS • AFRO • TECHNO & UK SOUNDS',
  liveTrack: 'THIAGO VSC — MIDNIGHT DRIFT (VIP MIX)',
  listeners: '14,890',
  frequency: 'STREAM CH-01',
};

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'e1',
    date: '24',
    month: 'OCT',
    title: 'THIAGO VSC ALL NIGHT LONG',
    location: 'MADRID, ES',
    venue: 'SHÔKO CLUB',
    status: 'TICKETS',
  },
  {
    id: 'e2',
    date: '07',
    month: 'NOV',
    title: 'THE PIGGY SESSIONS & URBAN LIVE',
    location: 'STRASBOURG, FR',
    venue: 'LE ZÉNITH HALL',
    status: 'TICKETS',
  },
  {
    id: 'e3',
    date: '19',
    month: 'NOV',
    title: 'DIGITAL CULTURE FESTIVAL',
    location: 'BARCELONA, ES',
    venue: 'PARC DEL FÒRUM',
    status: 'SOLD OUT',
  },
  {
    id: 'e4',
    date: '12',
    month: 'DIC',
    title: 'YEAR-END EXCLUSIVE STREAM GALA',
    location: 'PARIS, FR',
    venue: 'STUDIO ÉLYSÉES',
    status: 'RSVP',
  },
];
