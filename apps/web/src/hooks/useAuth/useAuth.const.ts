import { SIGNIN_METHODS, type MenuItemOptions } from './useAuth.types';

export const SIGNIN_OPTIONS: Exclude<MenuItemOptions, 'divider'>[] =
  SIGNIN_METHODS.map((method) => ({
    label: `btn-signin-with-${method}`,
    indicator: `fa${method.replace(/^./, method.charAt(0).toUpperCase())}`,
  }));
