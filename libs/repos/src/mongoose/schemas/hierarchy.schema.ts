import * as _ from 'lodash';
import { Schema, SchemaTypes } from 'mongoose';
import { EnumHierarchyType } from '@weavcraft/common';
import { MODEL_PAYLOAD } from './const';

export const hierarchySchema = new Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: EnumHierarchyType,
      required: true,
    },
    category: { type: String, required: true },
    description: { type: String, required: false },
    superior: { type: String, required: false },
    payloadId: {
      type: SchemaTypes.ObjectId,
      ref: MODEL_PAYLOAD,
      default: null,
      required: false,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

hierarchySchema.set('toJSON', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: ret._id.toString() }, _.omit(ret, ['_id'])),
});

hierarchySchema.set('toObject', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: doc._id.toString() }, _.omit(doc, ['_id'])),
});

/* virtual */
hierarchySchema.virtual('payload', {
  ref: MODEL_PAYLOAD,
  localField: 'payloadId',
  foreignField: '_id',
  justOne: true,
});
