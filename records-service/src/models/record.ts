import mongoose from 'mongoose';
import { RecordType } from '@ego-leja/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export interface RecordDoc extends mongoose.Document {
  name: string;
  recordType: RecordType;
  amount: number;
  description: string;
  isBadDebt: boolean;
  userId: string;
  dueDate: Date;
}

interface RecordAttrs {
  amount: number;
  description: string;
  dueDate: Date;
  isBadDebt: boolean;
  name: string;
  recordType: RecordType;
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

recordSchema.plugin(updateIfCurrentPlugin);

recordSchema.statics.build = (attrs: RecordAttrs): RecordDoc => {
  return new Record(attrs);
};

const Record = mongoose.model<RecordDoc, RecordModel>('Record', recordSchema);

export { Record };
