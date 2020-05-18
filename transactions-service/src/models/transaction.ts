import mongoose from 'mongoose';

import { RecordDoc } from './record';

interface TransactionAttrs {
  record: RecordDoc;
  amount: number;
  userId: string;
}

interface TransactionDoc extends mongoose.Document {
  record: RecordDoc;
  amount: number;
  userId: string;
}

interface TransactionModel extends mongoose.Model<TransactionDoc> {
  build(attrs: TransactionAttrs): TransactionDoc;
}

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    record: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Record',
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

transactionSchema.set('versionKey', 'version');

transactionSchema.statics.build = (attrs: TransactionAttrs): TransactionDoc => {
  return new Transaction(attrs);
};

const Transaction = mongoose.model<TransactionDoc, TransactionModel>(
  'Transaction',
  transactionSchema
);

export { Transaction };
