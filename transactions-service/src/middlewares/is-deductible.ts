import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@ego-leja/common';

/**
 * Checks if the input amount is greater than the payable on the record.
 * Throws a BadRequestError if amount is greater than payable
 *
 * @param req
 * @param res
 * @param next
 */
export const isDeductible = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.amount > req.record.payable) {
    throw new BadRequestError('Amount is greater than deductible');
  }

  next();
};
