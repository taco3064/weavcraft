import { SIGNIN_METHODS } from './useAppMenuItems.types';
import type { MenuItemOptions, NavItems } from './useAppMenuItems.types';

export const NAV_ITEMS: NavItems = {
  gallery: {
    icon: 'faLightbulb',
  },
  pages: {
    auth: true,
    icon: 'faNewspaper',
  },
  themes: {
    auth: true,
    icon: 'faPalette',
  },
  tutorial: {
    icon: 'faBookOpen',
  },
  websites: {
    auth: true,
    icon: 'faGlobe',
  },
  widgets: {
    auth: true,
    icon: 'faPuzzlePiece',
  },
};

/** @deprecated */
export { SIGNIN_METHODS };

/** @deprecated */
export const SIGNIN_OPTIONS: Exclude<MenuItemOptions, 'divider'>[] =
  SIGNIN_METHODS.map((method) => ({
    label: `btn-signin-with-${method}`,
    indicator: `fa${method.replace(/^./, method.charAt(0).toUpperCase())}`,
  }));
