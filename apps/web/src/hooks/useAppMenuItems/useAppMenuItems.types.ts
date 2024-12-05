import type Core from '@weavcraft/core';
import type { UrlObject } from 'url';

export type Href = string | UrlObject;
export type NavItems = Record<string, Pick<NavItem, 'auth' | 'icon'>>;
export type UserSettingType = 'profile' | 'settings' | 'analytics';

export interface NavItem
  extends Exclude<MenuItemOptions<{ auth?: true }>, 'divider'> {
  href: string;
}

export type UserSettings = {
  auth: boolean;
  id: UserSettingType;
  icon: Core.IconCode;
}[];

export type MenuItemOptions<P = {}> = P &
  (
    | 'divider'
    | {
        disabled?: boolean;
        href?: Href;
        icon?: Core.IconCode;
        label: string;
        items?: (null | false | undefined | MenuItemOptions<P>)[];
      }
  );
