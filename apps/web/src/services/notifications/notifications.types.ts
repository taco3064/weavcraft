import type { Notification } from '@weavcraft/common';

export type { Notification };

export type Notifications = {
  total: number;
  unread: number;
  items: Notification[];
};
