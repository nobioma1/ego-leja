import { Router, Request, Response } from 'express';
import { requireAuth } from '@ego-leja/common';

const router = Router();

router.post(
  '/api/users/signout',
  requireAuth,
  async (req: Request, res: Response) => {
    req.session = null;

    res.status(200).end();
  }
);

export { router as signOutRouter };
