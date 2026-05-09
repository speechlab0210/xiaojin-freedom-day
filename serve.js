const http = require('http');
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const port = 18810;

http.createServer((req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url;
  let fp = path.join(dir, decodeURIComponent(url));
  if (!fs.existsSync(fp)) { res.writeHead(404); res.end('Not found'); return; }
  let ext = path.extname(fp).slice(1);
  let ct = { html: 'text/html;charset=utf-8', css: 'text/css', js: 'application/javascript' }[ext] || 'text/plain';
  res.writeHead(200, { 'Content-Type': ct });
  fs.createReadStream(fp).pipe(res);
}).listen(port, () => console.log('Serving on http://localhost:' + port));
