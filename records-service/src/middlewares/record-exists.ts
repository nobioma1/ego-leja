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

/**
 * Checks if the record of recordId exists,
 * throws a NotFoundError if it does not.
 *
 * Add record document to Request object if record exists
 *
 * @param req
 * @param res
 * @param next
 */
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
