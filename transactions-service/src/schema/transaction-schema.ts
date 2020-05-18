import Joi from '@hapi/joi';

export const transactionSchema = Joi.object({
  amount: Joi.number().label('Amount').greater(1).less(999999999).required(),
});
