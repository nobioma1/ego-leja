import { Router, Response, Request } from 'express';
import { requireAuth } from '@ego-leja/common';

import { recordExists } from '../middlewares/record-exists';

const router = Router();

router.delete(
  '/api/records/:recordId',
  requireAuth,
  recordExists,
  async (req: Request, res: Response) => {
    const record = req.record;

    await record.remove();

    res.status(204).end();
  }
);

export { router as deleteRouter };
