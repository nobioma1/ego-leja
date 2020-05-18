import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import { errorHandler } from '@ego-leja/common';

import { newRouter } from '../routes/new';
import { getAllRouter } from '../routes/get-all';

const server = express();

server.use(express.json());
server.use(helmet());

server.set('trust proxy', true);
server.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

server.get('/', (req, res) => {
  res.status(200).json({
    message: 'transactions-service up 🚀',
  });
});

server.use(newRouter);
server.use(getAllRouter);

server.head('/status', (req, res) => {
  res.status(200).end();
});

server.use(errorHandler);

export { server };
