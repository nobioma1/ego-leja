import { Router, Response, Request } from 'express';
import { requireAuth } from '@ego-leja/common';

import { recordExists } from '../middlewares/record-exists';
import { RecordDeletedPublisher } from '../events/publishers/record-deleted-publisher';
import { natsWrapper } from '../utils/nats-wrapper';

const router = Router();

router.delete(
  '/api/records/:recordId',
  requireAuth,
  recordExists,
  async (req: Request, res: Response) => {
    const record = req.record;

    await record.remove();

    new RecordDeletedPublisher(natsWrapper.client).publish({
      id: record._id,
      userId: record.userId,
    });

    res.status(204).end();
  }
);

export { router as deleteRouter };
