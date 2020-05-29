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
    const {
      name,
      recordType,
      amount,
      description,
      isBadDebt,
      dueDate,
    } = req.body;

    const record = Record.build({
      amount,
      description,
      dueDate,
      isBadDebt,
      name,
      recordType,
      userId: req.currentUser.id,
    });
    await record.save();

    res.status(201).send(record);
  }
);

export { router as newRouter };
