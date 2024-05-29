import * as _ from 'lodash';
import { Schema, SchemaTypes } from 'mongoose';

export const payloadSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    updatedBy: { type: SchemaTypes.ObjectId, required: true },
    createdBy: { type: SchemaTypes.ObjectId, required: true },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: 'payloads',
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

payloadSchema.set('toJSON', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: ret._id.toString() }, _.omit(ret, ['_id'])),
});

payloadSchema.set('toObject', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: doc._id.toString() }, _.omit(doc, ['_id'])),
});
