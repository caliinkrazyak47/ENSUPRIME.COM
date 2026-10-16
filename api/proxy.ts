export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    });
  }

  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing url parameter', { status: 400 });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Referer': targetUrl.startsWith('http://cloudtvserviceplatinum') ? 'http://cloudtvserviceplatinum.site:8080/' : '',
      },
    });

    if (!response.ok) {
      return new Response(`Error fetching: ${response.statusText}`, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || '';

    // Si es un playlist m3u8, reescribimos las URLs internas
    if (contentType.includes('mpegurl') || targetUrl.includes('.m3u8')) {
      let text = await response.text();
      const baseUrl = new URL(response.url || targetUrl);

      text = text.split('\n').map(line => {
        const trimmed = line.trim();
        // Reescribir lineas que son enlaces directos a segmentos o sub-playlists
        if (trimmed && !trimmed.startsWith('#')) {
          let absoluteUrl = trimmed;
          if (!trimmed.startsWith('http')) {
            absoluteUrl = new URL(trimmed, baseUrl).href;
          }
          return `/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;
        }

        // Reescribir URIs dentro de etiquetas
        if (trimmed.startsWith('#EXT-X-KEY') || trimmed.startsWith('#EXT-X-MEDIA')) {
          return trimmed.replace(/URI="([^"]+)"/, (_match, uri) => {
            let absoluteUrl = uri;
            if (!uri.startsWith('http')) {
              absoluteUrl = new URL(uri, baseUrl).href;
            }
            return `URI="/api/proxy?url=${encodeURIComponent(absoluteUrl)}"`;
          });
        }

        return line;
      }).join('\n');

      return new Response(text, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
      });
    }

    // Para segmentos de video (.ts) u otros archivos, streamear directamente
    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': contentType || 'video/MP2T',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    });
  } catch (error: any) {
    return new Response(`Proxy error: ${error.message}`, { status: 500 });
  }
}
