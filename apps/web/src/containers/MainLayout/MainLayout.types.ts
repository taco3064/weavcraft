import type { Breakpoint } from '@mui/material/styles';
import type { IconCode } from '@weavcraft/core';
import type { ReactNode } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';

import type { LinkProps } from '~web/components';

export type StyleParams = {
  maxWidth?: Breakpoint;
  open: boolean;
};

export type DefaultProps = {
  logo: SvgIconProps;
  homeLink: LinkProps;
};

export type NavItem = {
  icon: IconCode;
  id: string;
  href: string;
};

export interface UserAvatarMenuProps {
  onSignIn?: () => void;
  onSignOut?: () => void;
}

export interface MainLayoutProps {
  children: ReactNode;
}
