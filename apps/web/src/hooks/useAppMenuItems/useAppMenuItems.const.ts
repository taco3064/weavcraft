import { SIGNIN_METHODS } from './useAppMenuItems.types';

import type {
  MenuItemOptions,
  NavItems,
  UserSettings,
} from './useAppMenuItems.types';

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

export { SIGNIN_METHODS };

export const SIGNIN_OPTIONS: Exclude<MenuItemOptions, 'divider'>[] =
  SIGNIN_METHODS.map((method) => ({
    label: `btn-signin-with-${method}`,
    indicator: `fa${method.replace(/^./, method.charAt(0).toUpperCase())}`,
  }));

export const USER_SETTINGS: UserSettings = [
  {
    id: 'profile',
    auth: true,
    icon: 'faUser',
  },
  {
    id: 'settings',
    auth: false,
    icon: 'faGear',
  },
  {
    id: 'analytics',
    auth: true,
    icon: 'faChartLine',
  },
];

export const USER_MENU_ITEMS: MenuItemOptions<{ auth?: boolean }>[] = [
  ...USER_SETTINGS.map(({ id, icon, auth }) => ({
    auth,
    icon,
    label: `lbl-${id}`,
    href: `/user-settings#${id}`,
  })),
  'divider',
];
