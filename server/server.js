require('./config/config');

const path = require('path');
const express = require('express');

const PORT = process.env.PORT;

const publicPath = path.join(__dirname, '..', 'public');
const app = express();

app.use(express.static(publicPath));

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
