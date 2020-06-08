import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import { errorHandler } from '@ego-leja/common';

import { signUpRouter } from '../routes/signup';
import { signInRouter } from '../routes/signin';
import { currentUser } from '../routes/current-user';
import { deleteUserRouter } from '../routes/delete-user';
import { updateUserRouter } from '../routes/update-user';
import { changePasswordRouter } from '../routes/change-password';
import { signOutRouter } from '../routes/signout';

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
    message: 'users-service up 🚀',
  });
});

server.use(currentUser);
server.use(signOutRouter);
server.use(deleteUserRouter);
server.use(updateUserRouter);
server.use(signInRouter);
server.use(signUpRouter);
server.use(changePasswordRouter);

server.use(errorHandler);

export { server };
