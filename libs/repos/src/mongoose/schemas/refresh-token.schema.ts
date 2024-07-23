import { RefreshTokenData } from '@weavcraft/common';
import * as _ from 'lodash';
import { Schema } from 'mongoose';
import { MODEL_USER } from './const';

export const refreshTokenSchema = new Schema<RefreshTokenData>(
  {
    userId: {
      type: String,
      ref: MODEL_USER,
      required: true,
    },
    refreshToken: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

refreshTokenSchema.set('toJSON', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: ret._id.toString() }, _.omit(ret, ['_id'])),
});

refreshTokenSchema.set('toObject', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: doc._id.toString() }, _.omit(doc, ['_id'])),
});

/* virtual */
refreshTokenSchema.virtual('user', {
  ref: MODEL_USER,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});
