const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.send('OK');
});

app.get('/', (req, res) => {
  res.send('Hello Vishwajeet 🚀');
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
