import mongoose from 'mongoose';

import { RecordType } from './record-type';

export interface RecordDoc extends mongoose.Document {
  name: string;
  recordType: RecordType;
  amount: number;
  description: string;
  isBadDebt: boolean;
  userId: string;
}
