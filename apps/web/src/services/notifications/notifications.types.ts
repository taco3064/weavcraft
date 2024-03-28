export type Notification = {
  id: string;
  title: string;
  type: 'like' | 'comment';
  read: boolean;
  date: string;
  sender: string;
};

export type Notifications = {
  total: number;
  unread: number;
  items: Notification[];
};
