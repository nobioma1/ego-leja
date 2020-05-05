const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.status(200).json({
    message: 'client-users-service up 🚀',
  });
});

server.head('/status', (req, res) => {
  res.status(200).end();
});

server.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

module.exports = server;
