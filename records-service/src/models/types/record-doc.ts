import mongoose from 'mongoose';

import { TransactionType } from './transaction-type';

export interface RecordDoc extends mongoose.Document {
  name: string;
  transactionType: TransactionType;
  amount: number;
  description: string;
  isBadDebt: boolean;
  userId: string;
}
