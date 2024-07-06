import { CreatedAtDocument, UpdatedAtDocument } from '../mongodb';

export type User = {
  name?: string;
  email: string;
} & UpdatedAtDocument &
  CreatedAtDocument;

export type UserData = {
  id: string;
} & User;
