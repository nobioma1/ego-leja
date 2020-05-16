import mongoose from 'mongoose';

import { Password } from '../helpers/password';

interface userAttrs {
  fullName: string;
  email: string;
  password: string;
}

// interface to describe properties of a user model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: userAttrs): UserDoc;
}

// interface that describes the properties of a
// User Document
interface UserDoc extends mongoose.Document {
  createdAt: Date;
  email: string;
  fullName: string;
  password: string;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// Adding some type checking for creating a new user
userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
