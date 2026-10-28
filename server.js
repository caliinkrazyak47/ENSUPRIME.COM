import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

const server = http.createServer(async (req, res) => {
  // Manejo de CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    });
    res.end();
    return;
  }

  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // Endpoint del proxy de IPTV
  if (reqUrl.pathname === '/api/proxy') {
    const targetUrl = reqUrl.searchParams.get('url');
    if (!targetUrl) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Missing url parameter');
      return;
    }

    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*',
          'Connection': 'keep-alive',
          'Referer': targetUrl.startsWith('http://cloudtvserviceplatinum') ? 'http://cloudtvserviceplatinum.site:8080/' : ''
        }
      });

      if (!response.ok) {
        res.writeHead(response.status, { 'Content-Type': 'text/plain' });
        res.end(`Error fetching target: ${response.statusText}`);
        return;
      }

      const contentType = response.headers.get('content-type') || '';
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*'
      };

      // Si es playlist HLS m3u8, reescribir URLs relativas hacia el proxy
      if (contentType.includes('mpegurl') || targetUrl.includes('.m3u8')) {
        let text = await response.text();
        const baseUrl = new URL(response.url || targetUrl);

        text = text.split('\n').map(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#')) {
            let absoluteUrl = trimmed;
            if (!trimmed.startsWith('http')) {
              absoluteUrl = new URL(trimmed, baseUrl).href;
            }
            return `/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;
          }

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

        headers['Content-Type'] = 'application/vnd.apple.mpegurl';
        res.writeHead(200, headers);
        res.end(text);
        return;
      }

      // Para segmentos de video (.ts) u otros datos binarios
      headers['Content-Type'] = contentType || 'video/MP2T';
      res.writeHead(200, headers);

      const arrayBuffer = await response.arrayBuffer();
      res.end(Buffer.from(arrayBuffer));
      return;
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Proxy error: ${err.message}`);
      return;
    }
  }

  // Servir archivos estáticos de Vite (dist/)
  let safePath = path.normalize(decodeURIComponent(reqUrl.pathname)).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(DIST_DIR, safePath);

  try {
    let stat = fs.existsSync(filePath) && fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      stat = fs.existsSync(filePath) && fs.statSync(filePath);
    }

    // SPA fallback: Si el archivo no existe o es una ruta de React, servir index.html
    if (!stat || !stat.isFile()) {
      filePath = path.join(DIST_DIR, 'index.html');
      stat = fs.existsSync(filePath) && fs.statSync(filePath);
    }

    if (!stat || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server error');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
