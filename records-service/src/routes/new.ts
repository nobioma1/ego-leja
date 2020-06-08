import { Router, Response, Request } from 'express';
import { requireAuth, validateFields } from '@ego-leja/common';

import { recordSchema } from '../schema/record-schema';
import { Record } from '../models/record';
import { RecordCreatedPublisher } from '../events/publishers/record-created-publisher';
import { natsWrapper } from '../utils/nats-wrapper';

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

    await new RecordCreatedPublisher(natsWrapper.client).publish({
      id: record._id,
      amount: record.amount,
      description: record.description,
      dueDate: record.dueDate,
      isBadDebt: record.isBadDebt,
      name: record.name,
      recordType: record.recordType,
      userId: record.userId,
    });

    res.status(201).send(record);
  }
);

export { router as newRouter };
