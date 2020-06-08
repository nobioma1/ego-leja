import { errorHandler } from '@ego-leja/common';
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';

import { newRouter } from '../routes/new';
import { updateRouter } from '../routes/update';
import { getRouter } from '../routes/get';
import { getAllRouter } from '../routes/get-all';
import { deleteRouter } from '../routes/delete';

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
    message: 'records-service up 🚀',
  });
});

server.use(newRouter);
server.use(getAllRouter);
server.use(deleteRouter);
server.use(getRouter);
server.use(updateRouter);

server.use(errorHandler);

export { server };
