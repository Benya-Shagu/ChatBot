const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const fetch = require('node-fetch');

// 🔐 Replace this with your real Gemini API key from https://aistudio.google.com/app/apikey
const API_KEY = 'AIzaSyCGoglt0n0HbQ18JdQ_bIQYYX_0aVf3gJQ';

const server = http.createServer((req, res) => {
  let filePath = './public' + (req.url === '/' ? '/index.html' : req.url);

  const ext = path.extname(filePath);
  let contentType = 'text/html';

  switch (ext) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.html':
      contentType = 'text/html';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('User connected');

  ws.on('message', async message => {
    const userMessage = message.toString();

    // Show user's message to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`User: ${userMessage}`);
      }
    });

    try {
      // Call Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 100
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error:', errorText);
        return;
      }

      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '🤖 Bot: Sorry, I didn’t understand that.';

      // Broadcast bot response
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(`🤖 Bot: ${botReply}`);
        }
      });

    } catch (error) {
      console.error('Request error:', error);
    }
  });

  ws.on('close', () => {
    console.log('User disconnected');
  });
});

server.listen(3002, () => {
  console.log('Server running at http://localhost:3002');
});
