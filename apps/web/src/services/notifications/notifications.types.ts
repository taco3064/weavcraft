import type * as WeavcraftTypes from '@weavcraft/types';

export type Notification = Omit<WeavcraftTypes.Notification<string>, 'userid'>;

export interface Notifications
  extends Omit<WeavcraftTypes.Notifications<string>, 'items'> {
  items: Notification[];
}
