import { Router, Response, Request } from 'express';
import { requireAuth } from '@ego-leja/common';

import { recordExists } from '../middlewares/record-exists';
import { isUserRecord } from '../middlewares/is-user-record';

const router = Router();

router.get(
  '/api/records/:recordId',
  requireAuth,
  recordExists,
  isUserRecord,
  async (req: Request, res: Response) => {
    res.status(200).send(req.record);
  }
);

export { router as getRouter };
