import { Router, Response, Request } from 'express';
import { requireAuth, validateFields } from '@ego-leja/common';

import { updateSchema } from '../schema/update-schema';
import { recordExists } from '../middlewares/record-exists';

const router = Router();

router.put(
  '/api/records/:recordId',
  requireAuth,
  recordExists,
  validateFields(updateSchema),
  async (req: Request, res: Response) => {
    const { name, description, isBadDebt } = req.body;
    const record = req.record;

    record.set({
      name,
      description,
      isBadDebt,
    });

    await record.save();

    res.status(200).send(record);
  }
);

export { router as updateRouter };
