import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;

// Read and cache the HTML content at startup
const filePath = path.join(__dirname, 'index.html');
let htmlContent;

try {
  htmlContent = fs.readFileSync(filePath, 'utf8');
} catch (err) {
  console.error('Failed to read index.html:', err);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  // Only accept GET requests
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }
  
  // Serve the cached HTML content
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlContent);
});

server.listen(PORT, () => {
  console.log(`Landing page server is running on port ${PORT}`);
});
