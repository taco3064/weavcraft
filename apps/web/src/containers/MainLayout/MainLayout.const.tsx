import { Display } from '@weavcraft/core';

import Logo from '~web/assets/imgs/icon.svg';
import { SETTINGS } from '../UserSettings';
import type { DefaultProps, NavItem } from './MainLayout.types';
import type { MenuItemOptions } from '~web/components';

export const DEFAULT_PROPS: DefaultProps = {
  logo: {
    inheritViewBox: true,
    component: Logo,
  },
  title: {
    color: 'text.primary',
    fontFamily: ['Monaco', 'comic sans MS'],
    variant: 'h6',
  },
};

export const NAV_ITEMS: NavItem[] = [
  {
    icon: 'faBookOpen',
    id: 'tutorial',
    href: '/tutorial',
  },
  {
    icon: 'faLightbulb',
    id: 'gallery',
    href: '/gallery',
  },
  {
    icon: 'faPalette',
    id: 'themes',
    href: '/themes',
    auth: true,
  },
  {
    icon: 'faPuzzlePiece',
    id: 'widgets',
    href: '/widgets',
    auth: true,
  },
  {
    icon: 'faNewspaper',
    id: 'pages',
    href: '/pages',
    auth: true,
  },
  {
    icon: 'faGlobe',
    id: 'websites',
    href: '/websites',
    auth: true,
  },
];

export const USER_MENU_ITEMS: MenuItemOptions<{ auth?: boolean }>[] = [
  ...SETTINGS.map(({ id, icon, auth }) => ({
    auth,
    indicator: <Display.Icon code={icon} />,
    label: `lbl-${id}`,
    href: `/user-settings#${id}`,
  })),
  'divider',
];
