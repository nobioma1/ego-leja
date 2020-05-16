import { Router, Request, Response } from 'express';
import { validateFields } from '@ego-leja/common';

import { emailDoesNotExist } from '../middlewares/email-does-not-exist';
import { JWT } from '../helpers/jwt';
import { User } from '../models/user';
import { signUpSchema } from '../schema/signup-schema';

const router = Router();

router.post(
  '/api/users/signup',
  validateFields(signUpSchema),
  emailDoesNotExist,
  async (req: Request, res: Response) => {
    const user = User.build({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    const token = JWT.generate({
      id: user.id,
      email: user.email,
    });

    req.session = { token };

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
