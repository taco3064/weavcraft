import type { NavItems, UserSettings } from './useAppMenuItems.types';

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
