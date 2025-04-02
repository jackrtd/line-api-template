const pool = require('../db');

module.exports = async function (req, res, next) {
  const start = Date.now();
  const chunks = [];

  const originalSend = res.send;
  res.send = function (chunk) {
    chunks.push(chunk);
    return originalSend.apply(res, arguments);
  };

  res.on('finish', async () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      url: req.originalUrl,
      body: JSON.stringify(req.body),
      status: res.statusCode,
      response: chunks.join(''),
      duration,
    };

    try {
      await pool.execute(
        `INSERT INTO request_logs (method, url, body, status, response, duration, created_at)
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [log.method, log.url, log.body, log.status, log.response, log.duration]
      );
    } catch (err) {
      console.error('Log Error:', err.message);
    }
  });

  next();
};
