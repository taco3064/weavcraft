import dynamic from 'next/dynamic';
import { Display, type IconCode } from '@weavcraft/core';

import { SIGNIN_METHODS } from '~web/hooks';
import type { Accordions } from './UserSettings.types';
import type { MenuItemOptions } from '~web/components';

export const ACCORDIONS: Accordions = [
  {
    Component: dynamic(() => import('./UserSettings.Profile'), { ssr: false }),
    id: 'profile',
    auth: true,
    icon: 'faUser',
  },
  {
    Component: dynamic(() => import('./UserSettings.Settings'), { ssr: false }),
    id: 'settings',
    auth: false,
    icon: 'faGear',
  },
  {
    Component: dynamic(() => import('./UserSettings.Analytics'), {
      ssr: false,
    }),
    id: 'analytics',
    auth: true,
    icon: 'faChartLine',
  },
];

export const SIGNIN_OPTIONS: MenuItemOptions[] = SIGNIN_METHODS.map(
  (method) => ({
    label: `app:btn-signin-with-${method}`,
    indicator: (
      <Display.Icon
        code={
          `fa${method.replace(
            /^./,
            method.charAt(0).toUpperCase()
          )}` as IconCode
        }
      />
    ),
  })
);
