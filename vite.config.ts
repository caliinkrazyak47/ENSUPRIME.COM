import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Proxy middleware para streams IPTV HLS m3u8 y segmentos .ts
function iptvProxyPlugin() {
  return {
    name: 'iptv-proxy-middleware',
    configureServer(server: any) {
      server.middlewares.use('/api/proxy', async (req: any, res: any) => {
        try {
          const parsedUrl = new URL(req.url, 'http://localhost');
          const targetUrl = parsedUrl.searchParams.get('url');

          if (!targetUrl) {
            res.statusCode = 400;
            res.end('Missing url parameter');
            return;
          }

          // Si la llamada directa desde tu ISP local falla o se bloquea, usar el proxy en la nube de ensuprime.com
          let fetchUrl = targetUrl;
          if (targetUrl.startsWith('http://cloudtvserviceplatinum') || targetUrl.includes('.neverita.space')) {
            fetchUrl = `https://www.ensuprime.com/api/proxy?url=${encodeURIComponent(targetUrl)}`;
          }

          const response = await fetch(fetchUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': '*/*',
              'Connection': 'keep-alive',
              'Referer': targetUrl.startsWith('http://cloudtvserviceplatinum') ? 'http://cloudtvserviceplatinum.site:8080/' : ''
            }
          });

          if (!response.ok) {
            res.statusCode = response.status;
            res.end(`Error fetching target: ${response.statusText}`);
            return;
          }

          const contentType = response.headers.get('content-type') || '';
          res.setHeader('Access-Control-Allow-Origin', '*');

          if (contentType.includes('mpegurl') || targetUrl.includes('.m3u8')) {
            let text = await response.text();
            const baseUrl = new URL(targetUrl);

            text = text.split('\n').map(line => {
              const trimmed = line.trim();
              if (trimmed && !trimmed.startsWith('#')) {
                let absoluteUrl = trimmed;
                // Si la respuesta del proxy remoto devolvió /api/proxy?url=..., extraer la url real
                if (absoluteUrl.startsWith('/api/proxy?url=')) {
                  absoluteUrl = decodeURIComponent(absoluteUrl.replace('/api/proxy?url=', ''));
                } else if (!trimmed.startsWith('http')) {
                  absoluteUrl = new URL(trimmed, baseUrl).href;
                }
                return `/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;
              }
              if (trimmed.startsWith('#EXT-X-KEY') || trimmed.startsWith('#EXT-X-MEDIA')) {
                return trimmed.replace(/URI="([^"]+)"/, (_match, uri) => {
                  let absoluteUrl = uri;
                  if (absoluteUrl.startsWith('/api/proxy?url=')) {
                    absoluteUrl = decodeURIComponent(absoluteUrl.replace('/api/proxy?url=', ''));
                  } else if (!uri.startsWith('http')) {
                    absoluteUrl = new URL(uri, baseUrl).href;
                  }
                  return `URI="/api/proxy?url=${encodeURIComponent(absoluteUrl)}"`;
                });
              }
              return line;
            }).join('\n');

            res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
            res.end(text);
          } else {
            if (contentType) res.setHeader('Content-Type', contentType);
            const arrayBuffer = await response.arrayBuffer();
            res.end(Buffer.from(arrayBuffer));
          }
        } catch (err: any) {
          res.statusCode = 500;
          res.end(`Proxy error: ${err.message}`);
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    iptvProxyPlugin(),
  ],
})
