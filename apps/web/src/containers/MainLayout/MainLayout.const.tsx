import { Display } from '@weavcraft/core';

import Logo from '~web/assets/imgs/icon.svg';
import type { DefaultProps } from './MainLayout.types';
import type { MenuItem } from '~web/components';

export const defaultProps: DefaultProps = {
  logo: {
    inheritViewBox: true,
    component: Logo,
  },
  homeLink: {
    color: 'text.primary',
    fontFamily: 'comic sans MS',
    href: '/',
    variant: 'h6',
  },
};

export const userMenuItems: MenuItem<{ auth?: boolean }>[] = [
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
  },
  {
    auth: true,
    indicator: <Display.Icon code="faArrowRightFromBracket" />,
    label: 'app:btn-signout',
  },
];
