import { CreatedAtDocument, UpdatedAtDocument } from '../mongodb';

export type Test = {
  value: string;
} & UpdatedAtDocument &
  CreatedAtDocument;

export type TestData = {
  id: string;
} & Test;
