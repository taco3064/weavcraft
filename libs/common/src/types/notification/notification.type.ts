import { UpdatedAtDocument, CreatedAtDocument } from "../mongodb";

export type ValueOf<T> = T[keyof T];

export enum EnumNotificationType {
  LIKE = 'LIKE',
  COMMENT = 'COMMENT',
};

export type NotificationType = keyof typeof EnumNotificationType;

export type Notification = {
  title: string;
  type: EnumNotificationType;
  read: boolean;
  date: Date;
  sender: string;
} & UpdatedAtDocument
  & CreatedAtDocument;

export type NotificationData = {
  id: string;
} & Notification;
