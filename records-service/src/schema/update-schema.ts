import Joi from '@hapi/joi';

export const updateSchema = Joi.object({
  name: Joi.string().label('Name').required(),
  dueDate: Joi.date().label('Due Date').required(),
  description: Joi.string().label('Description').allow(''),
  isBadDebt: Joi.boolean().label('Is Bad Debt').valid(true, false),
});
