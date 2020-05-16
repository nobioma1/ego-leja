import { Router, Request, Response } from 'express';
import { requireAuth, validateFields, NotFoundError } from '@ego-leja/common';

import { User } from '../models/user';
import { updateUserSchema } from '../schema/update-user-schema';

const router = Router();

router.put(
  '/api/users',
  requireAuth,
  validateFields(updateUserSchema),
  async (req: Request, res: Response) => {
    const user = await User.findById(req.currentUser.id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    user.set(req.body);
    await user.save();

    res.status(200).send(user);
  }
);

export { router as updateUserRouter };
