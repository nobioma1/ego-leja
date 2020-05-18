import { Router, Response, Request } from 'express';
import { requireAuth, validateFields } from '@ego-leja/common';

import { recordSchema } from '../schema/record-schema';
import { recordExists } from '../middlewares/record-exists';

const router = Router();

router.put(
  '/api/records/:recordId',
  requireAuth,
  recordExists,
  validateFields(recordSchema),
  async (req: Request, res: Response) => {
    const { name, recordType, amount, description, isBadDebt } = req.body;
    const record = req.record;

    record.set({
      name,
      recordType,
      amount,
      description,
      isBadDebt,
    });

    await record.save();

    res.status(200).send(record);
  }
);

export { router as updateRouter };
