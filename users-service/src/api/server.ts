import express from 'express';
import helmet from 'helmet';

const server = express();

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

export { server };
