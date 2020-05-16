import { Router, Request, Response } from 'express';
import {
  requireAuth,
  validateFields,
  NotFoundError,
  BadRequestError,
} from '@ego-leja/common';

import { User } from '../models/user';
import { changePasswordSchema } from '../schema/change-password-schema';
import { Password } from '../helpers/password';

const router = Router();

router.post(
  '/api/users/change-password',
  requireAuth,
  validateFields(changePasswordSchema),
  async (req: Request, res: Response) => {
    const user = await User.findById(req.currentUser.id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const passwordMatch = Password.compare(
      user.password,
      req.body.currentPassword
    );

    if (!passwordMatch) {
      throw new BadRequestError('Incorrect Password');
    }

    user.set({ password: req.body.newPassword });
    await user.save();

    res.status(200).send(user);
  }
);

export { router as changePasswordRouter };
