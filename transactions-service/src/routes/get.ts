import { Router, Request, Response } from 'express';
import { requireAuth } from '@ego-leja/common';

import { recordExists } from '../middlewares/record-exists';
import { Transaction } from '../models/transaction';

const router = Router();

router.get(
  '/api/transactions/:recordId',
  requireAuth,
  recordExists,
  async (req: Request, res: Response) => {
    const record = req.record.toObject();

    const transactions = await Transaction.find({ record: record.id });

    res.status(200).send({ ...record, transactions });
  }
);

export { router as getRouter };
