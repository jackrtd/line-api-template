CREATE TABLE IF NOT EXISTS request_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    method VARCHAR(10),
    url TEXT,
    body TEXT,
    status INT,
    response TEXT,
    duration INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
