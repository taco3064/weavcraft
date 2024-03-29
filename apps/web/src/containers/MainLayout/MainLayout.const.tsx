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
    icon: 'faLightbulb',
    id: 'gallery',
    href: '/gallery',
  },
  {
    icon: 'faPalette',
    id: 'themes',
    href: '/themes',
  },
  {
    icon: 'faPuzzlePiece',
    id: 'widgets',
    href: '/widgets',
  },
  {
    icon: 'faNewspaper',
    id: 'pages',
    href: '/pages',
  },
  {
    icon: 'faGlobe',
    id: 'websites',
    href: '/websites',
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
