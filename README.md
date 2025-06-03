# 💬 Real-Time Chat App with Gemini AI Bot
A simple real-time chat application built with **Node.js**, **WebSocket**, and **Google Gemini AI API** — all without using Express. This app lets users chat live, and get smart responses from the Gemini AI.

## 🚀 Features
- Real-time chat using WebSocket
- Gemini AI API-powered bot replies
- No Express — uses core Node.js `http` module
- Simple frontend using HTML, CSS, and JavaScript
- Easy to configure Gemini model (`gemini-pro` or `gemini-2.0-flash`)

## 📁 Project Structure

```
root/
├── public/
│   ├── index.html       # Chat UI
│   ├── script.js        # WebSocket client logic
│   └── style.css        # Page styling
├── server.js            # Node.js server with Gemini + WebSocket
├── package.json         # Project dependencies
└── README.md            # Project info and setup
```

## 🔧 Setup & Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/Benya-Shagu/ChatBot.git
   cd gemini-chat-app

2. **Install dependencies**
     ```bash
     npm install
3. **Add your Gemini API key**
    Open server.js and replace the placeholder:
    const API_KEY = 'YOUR_GEMINI_API_KEY';
   ⚠️ Never expose your API key in public repos.

4. **Start the server**
    ```bash
    npm start

📌 Notes
This app is intentionally minimal — no frameworks, only Node.js core modules.
You can use any Gemini model version, just change the model name in the API request.
Feel free to fork and customize!
