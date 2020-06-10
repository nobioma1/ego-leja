import { Router, Request, Response } from 'express';
import { requireAuth } from '@ego-leja/common';

import { recordExists } from '../middlewares/record-exists';
import { TransactionService } from '../services/transaction-service';

const router = Router();

router.get(
  '/api/transactions/:recordId',
  requireAuth,
  recordExists,
  async (req: Request, res: Response) => {
    const record = req.record;

    const transactions = await TransactionService.getTransactions({
      record,
    });

    res.status(200).send({ ...record.toJSON(), transactions });
  }
);

export { router as getRouter };
