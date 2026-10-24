/**
 * Servidor mínimo do Curso GROK (ESM).
 * Por quê: alguns navegadores bloqueiam fetch() de JSON em file://.
 * Analogia: o servidor é o garçom que entrega os arquivos da pasta.
 *
 * Uso: node server.mjs
 * URL: http://127.0.0.1:8765/
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HOST = "127.0.0.1";
const PORT = 8765;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".cmd": "text/plain; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

function safeJoin(root, reqPath) {
  const decoded = decodeURIComponent((reqPath || "/").split("?")[0]);
  const clean = path.normalize(decoded).replace(/^([/\\])+/, "");
  const full = path.join(root, clean || "index.html");
  if (full !== root && !full.startsWith(root + path.sep)) return null; // bloqueia ../pasta-vizinha
  return full;
}

const server = http.createServer((req, res) => {
  let filePath = safeJoin(__dirname, req.url === "/" ? "/index.html" : req.url);
  if (!filePath) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("404 — arquivo não encontrado");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": TYPES[ext] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Curso GROK em http://${HOST}:${PORT}/`);
});
