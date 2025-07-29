const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Trang chủ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Website cá nhân đang chạy tại http://localhost:${port}`);
});
