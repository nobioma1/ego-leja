import { Router, Request, Response } from 'express';
import { requireAuth, validateFields } from '@ego-leja/common';

import { recordExists } from '../middlewares/record-exists';
import { isDeductible } from '../middlewares/is-deductible';
import { Transaction } from '../models/transaction';

const router = Router();

router.get(
  '/api/transactions/:recordId',
  requireAuth,
  recordExists,
  async (req: Request, res: Response) => {
    const record = req.record;

    const trxs = await Transaction.find({
      record: record._id,
    });

    res.status(200).send(trxs);
  }
);

export { router as getAllRouter };
