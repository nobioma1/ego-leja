import Joi from '@hapi/joi';

export const signInSchema = Joi.object({
  email: Joi.string().label('Email Address').email().required(),
  password: Joi.string().label('Password').required(),
});
