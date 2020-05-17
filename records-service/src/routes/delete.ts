import { Router, Response, Request } from 'express';
import { requireAuth } from '@ego-leja/common';

import { recordExists } from '../middlewares/record-exists';
import { isUserRecord } from '../middlewares/is-user-record';

const router = Router();

router.delete(
  '/api/records/:recordId',
  requireAuth,
  recordExists,
  isUserRecord,
  async (req: Request, res: Response) => {
    const record = req.record;

    await record.remove();

    res.status(204).end();
  }
);

export { router as deleteRouter };
