import { Router, Response, Request } from 'express';
import { requireAuth } from '@ego-leja/common';

import { Record } from '../models/record';
import { TransactionType } from '../models/types/transaction-type';

const router = Router();

router.get('/api/records', requireAuth, async (req: Request, res: Response) => {
  const params = req.query;

  let queryParams = {};

  if (params.trxType) {
    queryParams = {
      ...queryParams,
      transactionType: params.trxType,
    };
  }

  const records = await Record.find({
    userId: req.currentUser.id,
    ...queryParams,
  });

  res.status(200).send(records);
});

export { router as getAllRouter };
