import { Request, Response, NextFunction } from 'express';

import { Record } from '../models/record';
import { RecordDoc } from '../models/types/record-doc';
import { NotFoundError } from '@ego-leja/common';

declare global {
  namespace Express {
    interface Request {
      record: RecordDoc;
    }
  }
}
export const recordExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const record = await Record.findOne({
    _id: req.params.recordId,
    userId: req.currentUser.id,
  });

  if (!record) {
    throw new NotFoundError('Record Not Found');
  }

  req.record = record;
  next();
};
