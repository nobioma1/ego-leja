import { Router, Response, Request } from 'express';
import { requireAuth, validateFields } from '@ego-leja/common';

import { recordSchema } from '../schema/record-schema';
import { Record } from '../models/record';

const router = Router();

router.post(
  '/api/records',
  requireAuth,
  validateFields(recordSchema),
  async (req: Request, res: Response) => {
    const { name, transactionType, amount, description, isBadDebt } = req.body;

    const record = Record.build({
      name,
      transactionType,
      amount,
      description,
      isBadDebt,
      userId: req.currentUser.id,
    });
    await record.save();

    res.status(201).send(record);
  }
);

export { router as newRouter };
