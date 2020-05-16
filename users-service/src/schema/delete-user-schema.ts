import Joi from '@hapi/joi';

export const deleteUserSchema = Joi.object({
  password: Joi.string().label('Password').required(),
});
