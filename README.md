# LINE Messaging API - Multi-threaded Sender (Node.js + Docker)

This project provides an API to send messages via the **LINE Messaging API**, using **Node.js** with **worker threads** for multi-threading, and is fully containerized using **Docker + Docker Compose**.

---

## 🚀 Features

- ✅ Send messages to LINE users via Messaging API
- ✅ Multi-threaded message sending (via `worker_threads`)
- ✅ Simple REST API using Express.js
- ✅ Log to MySQL + file with retry queue
- ✅ JWT Auth
- ✅ Containerized using Docker
- ✅ Easy setup with `docker-compose`

---

## 📁 Project Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── index.js             # Express server
├── db.js                # Connect MySQL
├── middleware/
│   ├── auth.js          # Verify JWT
│   └── logger.js
├── messageWorker.js     # Worker thread to send LINE messages
├── package.json
├── .env                 # Environment variables
└── README.md
```

---

## ⚙️ Environment Variables (`.env`)

Create a `.env` file in the root directory:

```env
LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
```

> 📝 You can get the token from the [LINE Developer Console](https://developers.line.biz/console/).

---

### Build and run Docker
docker build -t line-messaging-api .
docker run -p 3000:3000 --env-file .env line-messaging-api


## 🐳 Run with Docker Compose

### Step 1: Build and start the service
```bash
docker-compose up --build
```

### Step 2: Next time, just run
```bash
docker-compose up
```

---

## 🔗 API Endpoint

### `POST /send-message`

Send a message to a LINE user.

#### Request Body (JSON)
```json
{
  "to": "Uxxxxxxxxxxxxxxxxxxxxxx",
  "message": "Your message here"
}
```

#### Example using `curl`
```bash
curl -X POST http://localhost:3000/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "to": "Uxxxxxxxxxxxxxxxxxxxxxx",
    "message": "Hello from LINE Messaging API!"
  }'
```

---

## 🛠 Dependencies

- Node.js 18+
- Express
- Axios
- dotenv
- Docker & Docker Compose
- JSONWebToken
- MySQL2

---

## 📌 Notes

- This project uses **push API**, so you need to have the user's LINE ID and ensure they have added your bot.
- Make sure your LINE bot is set to allow "chat with users" and that you’ve enabled messaging API features.

---

## 📬 Contact / Issues

Jack Rtd ITS Med CMU. 😊
