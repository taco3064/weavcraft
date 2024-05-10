import { EnumNotificationType, NotificationData } from '../types';

export class NotificationDTO implements NotificationData {
  id: string;
  title: string;
  read: boolean;
  type: EnumNotificationType;
  date: Date;
  sender: string;
  updatedAt?: Date;
  createdAt?: Date;
}
