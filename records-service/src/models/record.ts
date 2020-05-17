import mongoose from 'mongoose';

import { TransactionType } from './types/transaction-type';
import { RecordDoc } from './types/record-doc';

interface RecordAttrs {
  name: string;
  transactionType: TransactionType;
  amount: number;
  description: string;
  isBadDebt: boolean;
  userId: string;
}

interface RecordModel extends mongoose.Model<RecordDoc> {
  build(attrs: RecordAttrs): RecordDoc;
}

const recordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
    },
    isBadDebt: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.version;
      },
    },
  }
);

recordSchema.set('versionKey', 'version');

recordSchema.statics.build = (attrs: RecordAttrs): RecordDoc => {
  return new Record(attrs);
};

const Record = mongoose.model<RecordDoc, RecordModel>('Record', recordSchema);

export { Record };
