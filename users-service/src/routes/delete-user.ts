import { Router, Request, Response } from 'express';
import { requireAuth, validateFields, BadRequestError } from '@ego-leja/common';

import { deleteUserSchema } from '../schema/delete-user-schema';
import { User } from '../models/user';
import { Password } from '../helpers/password';

const router = Router();

router.post(
  '/api/users/delete-user',
  requireAuth,
  validateFields(deleteUserSchema),
  async (req: Request, res: Response) => {
    const user = await User.findOne({
      email: req.currentUser.email,
    });

    if (!user) {
      throw new BadRequestError('Invalid User');
    }

    const passwordMatch = Password.compare(user.password, req.body.password);

    if (!passwordMatch) {
      throw new BadRequestError('Incorrect Password');
    }

    await user.remove();
    req.session = null;

    res.status(204).end();
  }
);

export { router as deleteUserRouter };
