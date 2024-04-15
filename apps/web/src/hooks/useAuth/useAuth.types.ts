import type { IconCode } from '@weavcraft/core';
import type { UrlObject } from 'url';

export const SIGNIN_METHODS = ['google'] as const;

export type SigninMethod = (typeof SIGNIN_METHODS)[number];
export type Href = string | UrlObject;

export type MenuItemOptions<P = {}> = P &
  (
    | 'divider'
    | {
        href?: Href;
        icon?: IconCode;
        label: string;
        items?: (null | false | undefined | MenuItemOptions<P>)[];
      }
  );

export interface AuthState {
  isAuthenticated: boolean;
  signin(type: SigninMethod): Promise<void>;
  signout(): Promise<void>;
}
