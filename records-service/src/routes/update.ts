import { Router, Response, Request } from 'express';
import { requireAuth, validateFields } from '@ego-leja/common';

import { updateSchema } from '../schema/update-schema';
import { recordExists } from '../middlewares/record-exists';
import { RecordUpdatedPublisher } from '../events/publishers/record-updated-publisher';
import { natsWrapper } from '../utils/nats-wrapper';

const router = Router();

router.put(
  '/api/records/:recordId',
  requireAuth,
  recordExists,
  validateFields(updateSchema),
  async (req: Request, res: Response) => {
    const { name, description, isBadDebt, dueDate } = req.body;
    const record = req.record;

    record.set({
      name,
      description,
      isBadDebt,
      dueDate,
    });

    await record.save();

    await new RecordUpdatedPublisher(natsWrapper.client).publish({
      id: record._id,
      amount: record.amount,
      description: record.description,
      dueDate: record.dueDate,
      isBadDebt: record.isBadDebt,
      name: record.name,
      recordType: record.recordType,
      userId: record.userId,
    });

    res.status(200).send(record);
  }
);

export { router as updateRouter };
