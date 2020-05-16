import Joi from '@hapi/joi';

export const signUpSchema = Joi.object({
  fullName: Joi.string()
    .label('Full Name')
    .regex(/(\w.+\s).+/)
    .required(),
  email: Joi.string().label('Email Address').email().required(),
  password: Joi.string().label('Password').min(8).required(),
});
