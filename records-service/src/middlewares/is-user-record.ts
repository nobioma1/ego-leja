import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '@ego-leja/common';

export const isUserRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser.id !== String(req.record.userId)) {
    throw new NotAuthorizedError();
  }

  next();
};
