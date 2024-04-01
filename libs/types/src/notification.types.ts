import type { Collection } from './common';

export interface Notification<U> extends Collection<U> {
  title: string;
  type: 'like' | 'comment';
  read: boolean;
  date: string;
  sender: string;
}

export type Notifications<U> = {
  total: number;
  unread: number;
  items: Notification<U>[];
};
