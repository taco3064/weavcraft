import { CreatedAtDocument, UpdatedAtDocument } from '../mongodb';

export type User = {
  email: string;
  name?: string;
  phone?: string;
  nickname?: string;
  avatarUrl?: string;
  providers: string[];
} & UpdatedAtDocument &
  CreatedAtDocument;

export type UserData = {
  id: string;
} & User;
