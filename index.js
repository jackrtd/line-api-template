const express = require('express');
const { Worker } = require('worker_threads');
require('dotenv').config();
const auth = require('./middleware/auth');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());
app.use(logger);

app.post('/send-message', auth, async(req, res) => {
  const { to, messages } = req.body;
  if (!to || !messages) {
    return res.status(400).json({ error: 'Missing "to" or "message"' });
  }

  const worker = new Worker('./messageWorker.js', {
    workerData: { to, messages }
  });

  worker.on('message', (result) => {
    res.json({ status: 'sent', result });
  });

  worker.on('error', (err) => {
    res.status(500).json({ error: err.message });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`LINE Messaging API server running on port ${PORT}`));