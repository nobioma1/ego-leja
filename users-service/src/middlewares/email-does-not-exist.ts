import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@ego-leja/common';

import { User } from '../models/user';

export const emailDoesNotExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    throw new BadRequestError(`Email is already in use`);
  }

  next();
};
