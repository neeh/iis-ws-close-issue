const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const URL = require('node:url');
const WebSocket = require('ws');

const {
  PATHNAME = '/test',
  PORT = 5595
} = process.env;

function requestListener(req, res) {
  if (req.url === PATHNAME) {
    const filePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
}

const server = http.createServer(requestListener);

const wss = new WebSocket.Server({ server });
setupWebSocketServer(wss);

function setupWebSocketServer(wss) {
  wss.on('connection', (ws, req) => {
    const params = new URLSearchParams(URL.parse(req.url).query);
    const closeNow = params.get('close');

    console.log('Client connected');

    ws.on('message', (buffer) => {
      const message = buffer.toString('utf8');
      if (message === 'kick') {
        ws.close(4001, 'Kicked');
        console.log('Client kicked');
      } else {
        console.log(`Client message: ${message}`);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });

    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });

    if (closeNow) {
      ws.close(4002, 'Closing now');
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
