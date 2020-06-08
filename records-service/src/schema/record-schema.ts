import Joi from '@hapi/joi';
import { RecordType } from '@ego-leja/common';

export const recordSchema = Joi.object({
  amount: Joi.number().label('Amount').positive().required(),
  name: Joi.string().label('Name').required(),
  description: Joi.string().label('Description').allow(''),
  dueDate: Joi.date().label('Due Date').required(),
  isBadDebt: Joi.boolean().label('Is Bad Debt').valid(true, false),
  recordType: Joi.string()
    .label('Record Type')
    .valid(...Object.values(RecordType))
    .required(),
});
