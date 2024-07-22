import { CreatedAtDocument } from '../mongodb';

export type RefreshToken = {
  userId: string;
  refreshToken: string;
} & CreatedAtDocument;

export type RefreshTokenData = {
  id: string;
} & RefreshToken;
