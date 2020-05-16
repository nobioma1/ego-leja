import { Router, Request, Response } from 'express';

import { requireAuth, NotFoundError } from '@ego-leja/common';

import { User } from '../models/user';

const router = Router();

router.get('/api/users', requireAuth, async (req: Request, res: Response) => {
  const user = await User.findById(req.currentUser.id);

  if (!user) {
    throw new NotFoundError();
  }

  res.status(200).send(user);
});

export { router as currentUser };
