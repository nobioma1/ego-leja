import Joi from '@hapi/joi';

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().label('Current Password').min(8).required(),
  newPassword: Joi.string().label('New Password').min(8).required(),
  confirmPassword: Joi.string().label('Confirm Password').min(8).required(),
});
