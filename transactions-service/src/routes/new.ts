import { Router, Request, Response } from 'express';
import { requireAuth, validateFields } from '@ego-leja/common';

import { transactionSchema } from '../schema/transaction-schema';
import { recordExists } from '../middlewares/record-exists';
import { isDeductible } from '../middlewares/is-deductible';
import { Transaction } from '../models/transaction';

const router = Router();

router.post(
  '/api/transactions/:recordId',
  requireAuth,
  recordExists,
  validateFields(transactionSchema),
  isDeductible,
  async (req: Request, res: Response) => {
    const record = req.record;

    const trx = Transaction.build({
      amount: req.body.amount,
      userId: req.currentUser.id,
      record,
    });
    await trx.save();

    record.set({ payable: record.payable - trx.amount });
    await record.save();

    res.status(201).send(trx);
  }
);

export { router as newRouter };
