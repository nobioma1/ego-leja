import Joi from '@hapi/joi';

export const updateUserSchema = Joi.object({
  fullName: Joi.string()
    .label('Full Name')
    .regex(/(\w.+\s).+/)
    .required(),
});
