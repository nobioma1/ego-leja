import { RecordType } from '@ego-leja/common';

import { generateID } from './generate-id';
import { Record } from '../../models/record';

export const createRecord = async ({
  userId,
  id = generateID(),
  name = 'Janes Test',
  amount = 40000,
  payable = 40000,
  dueDate = new Date(),
  recordType = RecordType.LEND,
}: {
  id?: string;
  name?: string;
  amount?: number;
  userId: string;
  payable?: number;
  dueDate?: Date;
  recordType?: RecordType;
}) => {
  const record = new Record({
    id,
    name,
    amount,
    userId,
    payable,
    dueDate,
    recordType,
  });
  await record.save();

  return record;
};
