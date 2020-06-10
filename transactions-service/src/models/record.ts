import mongoose from 'mongoose';
import { RecordType } from '@ego-leja/common';

interface RecordAttrs {
  id: string;
  amount: number;
  description: string;
  dueDate: Date;
  isBadDebt: boolean;
  name: string;
  recordType: string;
  userId: string;
}

export interface RecordDoc extends mongoose.Document {
  id: string;
  amount: number;
  description: string;
  dueDate: Date;
  isBadDebt: boolean;
  name: string;
  recordType: RecordType;
  userId: string;
  payable: number;
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
    recordType: {
      type: String,
      enum: Object.values(RecordType),
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    payable: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
      required: true,
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
  return new Record({
    ...attrs,
    _id: attrs.id,
    payable: attrs.amount,
  });
};

const Record = mongoose.model<RecordDoc, RecordModel>('Record', recordSchema);

export { Record };
