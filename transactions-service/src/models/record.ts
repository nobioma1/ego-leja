import mongoose from 'mongoose';

interface RecordAttrs {
  id: string;
  amount: number;
  userId: string;
  payable: number;
}

export interface RecordDoc extends mongoose.Document {
  amount: number;
  userId: string;
  payable: number;
}

interface RecordModel extends mongoose.Model<RecordDoc> {
  build(attrs: RecordAttrs): RecordDoc;
}

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    payable: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.version;
        delete ret.userId;
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
