import { Router, Response, Request } from 'express';
import { requireAuth } from '@ego-leja/common';

import { recordExists } from '../middlewares/record-exists';

const router = Router();

router.get(
  '/api/records/:recordId',
  requireAuth,
  recordExists,
  async (req: Request, res: Response) => {
    res.status(200).send(req.record);
  }
);

export { router as getRouter };
