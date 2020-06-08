import { Router, Response, Request } from 'express';
import { requireAuth } from '@ego-leja/common';

import { Record } from '../models/record';

const router = Router();

router.get('/api/records', requireAuth, async (req: Request, res: Response) => {
  const params = req.query;

  let queryParams = {};

  if (params.recType) {
    queryParams = {
      ...queryParams,
      recordType: params.recType,
    };
  }

  const records = await Record.find({
    userId: req.currentUser.id,
    ...queryParams,
  }).sort('-createdAt');

  res.status(200).send(records);
});

export { router as getAllRouter };
