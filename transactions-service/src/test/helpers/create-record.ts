import { generateID } from './generate-id';
import { Record } from '../../models/record';

export const createRecord = async ({
  id = generateID(),
  amount = 40000,
  userId,
  payable = 40000,
}: {
  id?: string;
  amount?: number;
  userId: string;
  payable?: number;
}) => {
  const record = new Record({
    id,
    amount,
    userId,
    payable,
  });
  await record.save();

  return record;
};
