import type Core from '@weavcraft/core';
import type { UrlObject } from 'url';

export type Href = string | UrlObject;

export type MenuItemOptions<P = {}> = P &
  (
    | 'divider'
    | {
        href?: Href;
        icon?: Core.IconCode;
        label: string;
        items?: (null | false | undefined | MenuItemOptions<P>)[];
      }
  );

export interface NavItem
  extends Exclude<MenuItemOptions<{ auth?: true }>, 'divider'> {
  href: string;
}

export type NavItems = Record<string, Pick<NavItem, 'auth' | 'icon'>>;

/** @deprecated */
export const SIGNIN_METHODS = ['google'] as const;
/** @deprecated */
export type SigninMethod = (typeof SIGNIN_METHODS)[number];
