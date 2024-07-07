import { UserData } from '@weavcraft/common';
import * as _ from 'lodash';
import { Schema } from 'mongoose';

export const userSchema = new Schema<UserData>(
  {
    email: { type: String, required: true },
    name: { type: String, required: false },
    nickname: { type: String, required: false },
    phone: { type: String, required: false },
    avatarUrl: { type: String, required: false },
    providers: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

userSchema.set('toJSON', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: ret._id.toString() }, _.omit(ret, ['_id'])),
});

userSchema.set('toObject', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: doc._id.toString() }, _.omit(doc, ['_id'])),
});
