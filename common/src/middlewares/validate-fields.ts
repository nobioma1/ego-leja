import { Request, Response, NextFunction } from 'express';
import { Schema } from '@hapi/joi';

import { RequestValidationError } from '../errors/request-validation-error';

export const validateFields = (schema: Schema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    throw new RequestValidationError(error.details);
  }

  next();
};
