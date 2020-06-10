import { Router, Request, Response } from 'express';
import { requireAuth, validateFields } from '@ego-leja/common';

import { transactionSchema } from '../schema/transaction-schema';
import { recordExists } from '../middlewares/record-exists';
import { isDeductible } from '../middlewares/is-deductible';
import { TransactionService } from '../services/transaction-service';

const router = Router();

router.post(
  '/api/transactions/:recordId',
  requireAuth,
  recordExists,
  validateFields(transactionSchema),
  isDeductible,
  async (req: Request, res: Response) => {
    const record = req.record;

    const trx = await TransactionService.newTransaction({
      amount: req.body.amount,
      userId: req.currentUser.id,
      record,
    });

    res.status(201).send(trx);
  }
);

export { router as newRouter };
