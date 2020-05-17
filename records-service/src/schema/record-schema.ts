import Joi from '@hapi/joi';

import { RecordType } from '../models/types/record-type';

export const recordSchema = Joi.object({
  name: Joi.string().label('Name').required(),
  recordType: Joi.string()
    .label('Record Type')
    .valid(...Object.values(RecordType))
    .required(),
  amount: Joi.number().label('Amount').positive().required(),
  description: Joi.string().label('Description'),
  isBadDebt: Joi.boolean().label('Is Bad Debt').valid(true, false),
});
