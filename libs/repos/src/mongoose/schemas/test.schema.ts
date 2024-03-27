import _ = require('lodash');
import { Schema } from 'mongoose';
import { UpdatedAtDocument, CreatedAtDocument } from '../common';

export type Test = {
  value: string;
} & UpdatedAtDocument &
  CreatedAtDocument;

export type TestData = {
  id: string;
} & Test;

export const testSchema = new Schema<TestData>({
  value: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

testSchema.set('toJSON', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: ret._id.toString() }, _.omit(ret, ['_id'])),
});

testSchema.set('toObject', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: doc._id.toString() }, _.omit(doc, ['_id'])),
});
