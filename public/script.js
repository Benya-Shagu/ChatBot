// public/script.js
const ws = new WebSocket('ws://localhost:3002'); // match the correct port

ws.onmessage = event => {
  const chatBox = document.getElementById('chatBox');
  const message = event.data;

  const isBot = message.startsWith('🤖 Bot:');
  const className = isBot ? 'bot-msg' : 'user-msg';

  const p = document.createElement('p');
  p.className = className;
  p.innerText = message;

  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
};

function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  if (message !== '') {
    ws.send(message);
    input.value = '';
  }
}

document.getElementById('messageInput').addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
