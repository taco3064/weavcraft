import { Display } from '@weavcraft/core';

import Logo from '~web/assets/imgs/icon.svg';
import type { DefaultProps, NavItem } from './MainLayout.types';
import type { MenuItemOptions } from '~web/components';

export const DEFAULT_PROPS: DefaultProps = {
  logo: {
    inheritViewBox: true,
    component: Logo,
  },
  homeLink: {
    color: 'text.primary',
    fontFamily: ['Monaco', 'comic sans MS'],
    href: '/',
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
  {
    auth: true,
    indicator: <Display.Icon code="faUser" />,
    label: 'app:lbl-user-profile',
    href: '/profile',
  },
  {
    auth: true,
    indicator: <Display.Icon code="faChartLine" />,
    label: 'app:lbl-analytics',
    href: '/analytics',
  },
  {
    auth: false,
    indicator: <Display.Icon code="faGear" />,
    label: 'app:lbl-settings',
    href: '/settings',
  },
  'divider',
  {
    auth: false,
    indicator: <Display.Icon code="faArrowRightToBracket" />,
    label: 'app:btn-signin',
    items: [
      {
        auth: false,
        indicator: <Display.Icon code="faGoogle" />,
        label: 'app:btn-signin-google',
      },
    ],
  },
  {
    auth: true,
    indicator: <Display.Icon code="faArrowRightFromBracket" />,
    label: 'app:btn-signout',
  },
];