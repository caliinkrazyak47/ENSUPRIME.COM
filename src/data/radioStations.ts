export interface RadioStation {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  flag: string;
  lat: number;
  lng: number;
  frequency: string;
  genre: string;
  cover: string;
  streamUrl: string;
  accentColor: string;
}

export interface CountryGroup {
  country: string;
  countryCode: string;
  flag: string;
  lat: number;
  lng: number;
  stations: RadioStation[];
}

export const RADIO_STATIONS: RadioStation[] = [
  // ESPAÑA (Madrid, Barcelona, Valencia, Sevilla, Bilbao, Ibiza)
  {
    id: 'motiva-fm',
    name: 'Motiva FM',
    city: 'Madrid',
    country: 'ESPAÑA',
    countryCode: 'ES',
    flag: '🇪🇸',
    lat: 40.4168,
    lng: -3.7038,
    frequency: 'MOTIVA FM • Solo Éxitos',
    genre: 'POP, DANCE & URBAN HITS',
    cover: '/images/radios/motiva-fm.png',
    streamUrl: 'https://stream.guadigo.es/listen/motiva/motiva.mp3',
    accentColor: '#E6007E',
  },
  {
    id: 'los-40-principales',
    name: 'Los 40 Principales',
    city: 'Madrid',
    country: 'ESPAÑA',
    countryCode: 'ES',
    flag: '🇪🇸',
    lat: 40.4500,
    lng: -3.6800,
    frequency: '93.9 FM • Music Inspires Life',
    genre: 'TOP 40 & POP INTERNACIONAL',
    cover: '/images/radios/los40-principales.png',
    streamUrl: 'https://playerservices.streamtheworld.com/api/livestream-redirect/LOS40AAC.aac?dist=onlineradiobox',
    accentColor: '#F59E0B',
  },
  {
    id: 'los-40-urban',
    name: 'Los 40 Urban',
    city: 'Barcelona',
    country: 'ESPAÑA',
    countryCode: 'ES',
    flag: '🇪🇸',
    lat: 41.3851,
    lng: 2.1734,
    frequency: '104.5 FM • El Ritmo de la Calle',
    genre: 'REGGAETÓN, TRAP & URBAN HITS',
    cover: '/images/radios/los40-urban.jpg',
    streamUrl: 'https://playerservices.streamtheworld.com/api/livestream-redirect/LOS40_URBANAAC.aac?dist=onlineradiobox',
    accentColor: '#DE4176',
  },
  {
    id: 'hits-fm',
    name: 'Hits FM',
    city: 'Valencia',
    country: 'ESPAÑA',
    countryCode: 'ES',
    flag: '🇪🇸',
    lat: 39.4699,
    lng: -0.3763,
    frequency: 'HIT FM • Los Mejores Éxitos',
    genre: 'POP, DANCE & TOP HITS',
    cover: '/images/radios/hits-fm.svg',
    streamUrl: 'https://bbhitfm.kissfmradio.cires21.com/bbhitfm.mp3',
    accentColor: '#3B82F6',
  },
  {
    id: 'radiokiss-fm',
    name: 'RadioKiss FM',
    city: 'Sevilla',
    country: 'ESPAÑA',
    countryCode: 'ES',
    flag: '🇪🇸',
    lat: 37.3891,
    lng: -5.9845,
    frequency: '102.7 FM • Lo Mejor de los 80, 90 y Hoy',
    genre: 'POP ROCK, RETRO & HITS',
    cover: '/images/radios/kissfm.jpg',
    streamUrl: 'https://bbkissfm.kissfmradio.cires21.com/bbkissfm.mp3',
    accentColor: '#6366F1',
  },
  {
    id: 'cadena-100',
    name: 'Cadena 100',
    city: 'Bilbao',
    country: 'ESPAÑA',
    countryCode: 'ES',
    flag: '🇪🇸',
    lat: 43.2630,
    lng: -2.9350,
    frequency: '99.5 FM • La Mejor Variedad',
    genre: 'HAPPY MUSIC & POP ADULTO',
    cover: '/images/radios/cadena100.jpg',
    streamUrl: 'https://cadena100-cope.flumotion.com/playlist.m3u8',
    accentColor: '#0284C7',
  },
  {
    id: 'megastar-fm',
    name: 'MegaStar FM',
    city: 'Ibiza',
    country: 'ESPAÑA',
    countryCode: 'ES',
    flag: '🇪🇸',
    lat: 38.9067,
    lng: 1.4206,
    frequency: '100.7 FM • Solo Temazos',
    genre: 'ELECTRO LATINO, EDM & DANCE',
    cover: '/images/radios/megastar.jpg',
    streamUrl: 'https://megastar-cope.flumotion.com/playlist.m3u8',
    accentColor: '#E11D48',
  },

  // ESTADOS UNIDOS (New York, Miami, Los Angeles)
  {
    id: 'la-mega-979',
    name: 'La Mega 97.9',
    city: 'New York',
    country: 'ESTADOS UNIDOS',
    countryCode: 'US',
    flag: '🇺🇸',
    lat: 40.7128,
    lng: -74.0060,
    frequency: '97.9 FM • New York & Miami',
    genre: 'EL VACILÓN & LATIN HITS',
    cover: '/images/radios/lamega-979.jpg',
    streamUrl: 'https://liveaudio.lamusica.com/NY_WSKQ_icy?aw_0_1st.playerld=onlineradiobox',
    accentColor: '#EF4444',
  },
  {
    id: 'cacoteo-radio',
    name: 'Cacoteo Radio',
    city: 'Miami',
    country: 'ESTADOS UNIDOS',
    countryCode: 'US',
    flag: '🇺🇸',
    lat: 25.7617,
    lng: -80.1918,
    frequency: 'CACOTEO RADIO • Heavy Hitter Station',
    genre: 'REGGAETÓN, HIP HOP & TRAP',
    cover: '/images/radios/cacoteo-radio.png',
    streamUrl: 'https://s6.autopo.st/proxy/cacoteoradio?mp=/stream',
    accentColor: '#E50914',
  },
  {
    id: 'iparty-radio',
    name: 'iPartyRadio',
    city: 'Los Angeles',
    country: 'ESTADOS UNIDOS',
    countryCode: 'US',
    flag: '🇺🇸',
    lat: 34.0522,
    lng: -118.2437,
    frequency: 'iPartyRadio • Dance & Party Hits',
    genre: 'DANCE, EDM & PARTY MIX',
    cover: '/images/radios/ipartyradio.png',
    streamUrl: 'https://streaming.live365.com/a90324_2',
    accentColor: '#D60000',
  },

  // PUERTO RICO (San Juan)
  {
    id: 'la-nueva-94-fm',
    name: 'La Nueva 94 FM',
    city: 'San Juan',
    country: 'PUERTO RICO',
    countryCode: 'PR',
    flag: '🇵🇷',
    lat: 18.4655,
    lng: -66.1057,
    frequency: '94.7 FM • La Estación del Género',
    genre: 'REGGAETÓN & TRAP BORICUA',
    cover: '/images/radios/lanueva-94.jpg',
    streamUrl: 'https://liveaudio.lamusica.com/PR_WODA_icy?aw_0_1st.playerld=onlineradiobox',
    accentColor: '#8B5CF6',
  },

  // COLOMBIA (Medellín, Bogotá)
  {
    id: 'la-mega-colombia',
    name: 'La Mega Colombia',
    city: 'Medellín',
    country: 'COLOMBIA',
    countryCode: 'CO',
    flag: '🇨🇴',
    lat: 6.2442,
    lng: -75.5812,
    frequency: '90.9 FM • Solo Éxitos',
    genre: 'EL CARTEL DE LA MEGA & PERREO',
    cover: '/images/radios/lamega-colombia.jpg',
    streamUrl: 'https://mdstrm.com/audio/632c9ae6660fef03fe3855fe/live.m3u8',
    accentColor: '#F97316',
  },

  // PERÚ (Lima)
  {
    id: 'moda-te-mueve',
    name: 'Moda Te Mueve',
    city: 'Lima',
    country: 'PERÚ',
    countryCode: 'PE',
    flag: '🇵🇪',
    lat: -12.0464,
    lng: -77.0428,
    frequency: '97.3 FM • Lima & Todo el Perú',
    genre: 'REGGAETÓN, LATIN POP & TRAP',
    cover: '/images/radios/moda-temueve.jpg',
    streamUrl: 'https://mdstrm.com/audio/6839e1c82cc4c480fcd318dd/live.m3u8',
    accentColor: '#14B8A6',
  },

  // BÉLGICA (Boom / Tomorrowland)
  {
    id: 'tomorrowland-owr',
    name: 'Tomorrowland OWR',
    city: 'Boom',
    country: 'BÉLGICA',
    countryCode: 'BE',
    flag: '🇧🇪',
    lat: 51.0911,
    lng: 4.3670,
    frequency: 'TOMORROWLAND • One World Radio',
    genre: 'EDM, FESTIVAL & CLUB HITS',
    cover: '/images/radios/tomorrowland-owr.jpg',
    streamUrl: 'https://playerservices.streamtheworld.com/api/livestream-redirect/OWR_INTERNATIONAL.mp3',
    accentColor: '#7C3AED',
  },

  // REINO UNIDO (London)
  {
    id: 'edm-taste',
    name: 'EDM Taste Global',
    city: 'Londres',
    country: 'REINO UNIDO',
    countryCode: 'GB',
    flag: '🇬🇧',
    lat: 51.5074,
    lng: -0.1278,
    frequency: 'EDM TASTE • Best Electronic Music',
    genre: 'EDM, ELECTRO HOUSE & FESTIVAL',
    cover: '/images/radios/edm-taste.jpg',
    streamUrl: 'https://listen.radioking.com/radio/745510/stream/812101',
    accentColor: '#4338CA',
  },
];

// Agrupación de estaciones por país con coordenadas centrales
export const COUNTRY_GROUPS: CountryGroup[] = [
  {
    country: 'ESPAÑA',
    countryCode: 'ES',
    flag: '🇪🇸',
    lat: 40.4168,
    lng: -3.7038,
    stations: RADIO_STATIONS.filter((s) => s.countryCode === 'ES'),
  },
  {
    country: 'ESTADOS UNIDOS',
    countryCode: 'US',
    flag: '🇺🇸',
    lat: 37.0902,
    lng: -95.7129,
    stations: RADIO_STATIONS.filter((s) => s.countryCode === 'US'),
  },
  {
    country: 'PUERTO RICO',
    countryCode: 'PR',
    flag: '🇵🇷',
    lat: 18.2208,
    lng: -66.5901,
    stations: RADIO_STATIONS.filter((s) => s.countryCode === 'PR'),
  },
  {
    country: 'COLOMBIA',
    countryCode: 'CO',
    flag: '🇨🇴',
    lat: 4.5709,
    lng: -74.2973,
    stations: RADIO_STATIONS.filter((s) => s.countryCode === 'CO'),
  },
  {
    country: 'PERÚ',
    countryCode: 'PE',
    flag: '🇵🇪',
    lat: -9.19,
    lng: -75.0152,
    stations: RADIO_STATIONS.filter((s) => s.countryCode === 'PE'),
  },
  {
    country: 'BÉLGICA',
    countryCode: 'BE',
    flag: '🇧🇪',
    lat: 50.5039,
    lng: 4.4699,
    stations: RADIO_STATIONS.filter((s) => s.countryCode === 'BE'),
  },
  {
    country: 'REINO UNIDO',
    countryCode: 'GB',
    flag: '🇬🇧',
    lat: 55.3781,
    lng: -3.436,
    stations: RADIO_STATIONS.filter((s) => s.countryCode === 'GB'),
  },
];
