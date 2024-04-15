import type { IconCode } from '@weavcraft/core';
import type { MenuItemOptions } from '../useAuth';

export interface NavItem
  extends Exclude<MenuItemOptions<{ auth?: true }>, 'divider'> {
  href: string;
}

export type NavItems = Record<string, Pick<NavItem, 'auth' | 'icon'>>;

export type UserSettingId = 'profile' | 'settings' | 'analytics';

export type UserSettings = {
  auth: boolean;
  id: UserSettingId;
  icon: IconCode;
}[];
