import type { UserSettings } from './UserSettings.types';

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
