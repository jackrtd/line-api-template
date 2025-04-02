const { workerData, parentPort } = require('worker_threads');
const axios = require('axios');
require('dotenv').config();

const sendMessage = async ({ to, messages }) => {
  try {
    const response = await axios.post('https://api.line.me/v2/bot/message/push', {
      to,
      messages: messages
      // messages: [{ type: 'text', text: message }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
      }
    });

    parentPort.postMessage(response.data);
  } catch (err) {
    parentPort.postMessage({ error: err.message });
  }
};

sendMessage(workerData);