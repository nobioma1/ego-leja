import Joi from '@hapi/joi';

import { TransactionType } from '../models/types/transaction-type';

export const recordSchema = Joi.object({
  name: Joi.string().label('Name').required(),
  transactionType: Joi.string()
    .label('Transaction Type')
    .valid(...Object.values(TransactionType))
    .required(),
  amount: Joi.number().label('Amount').positive().required(),
  description: Joi.string().label('Description'),
  isBadDebt: Joi.boolean().label('Is Bad Debt').valid(true, false),
});
