import { Router, Request, Response } from 'express';
import { validateFields, BadRequestError } from '@ego-leja/common';

import { signInSchema } from '../schema/signin-schema';
import { User } from '../models/user';
import { Password } from '../helpers/password';
import { JWT } from '../helpers/jwt';

const router = Router();

router.post(
  '/api/users/signin',
  validateFields(signInSchema),
  async (req: Request, res: Response) => {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      throw new BadRequestError('Invalid Username or Password');
    }

    const passwordMatch = Password.compare(user.password, req.body.password);

    if (!passwordMatch) {
      throw new BadRequestError('Invalid Username or Password');
    }

    const token = JWT.generate({
      id: user.id,
      email: user.email,
    });

    req.session = { token };

    res.status(200).send(user);
  }
);

export { router as signInRouter };
