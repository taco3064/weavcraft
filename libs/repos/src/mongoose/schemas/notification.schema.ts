import _ = require('lodash');
import { Schema } from 'mongoose';
import { Notification, EnumNotificationType } from '@weavcraft/common';

export const notificationSchema = new Schema<Notification>({
  title: { type: String, required: true },
  type: { 
    type: String,
    enum: EnumNotificationType,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  date: { type: Date, default: Date.now },
  sender: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  versionKey: false,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

notificationSchema.set('toJSON', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: ret._id.toString() }, _.omit(ret, ['_id'])),
});

notificationSchema.set('toObject', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: doc._id.toString() }, _.omit(doc, ['_id'])),
});
