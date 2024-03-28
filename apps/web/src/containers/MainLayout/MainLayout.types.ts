import type { Breakpoint } from '@mui/material/styles';
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

export interface UserAvatarMenuProps {
  onSignIn?: () => void;
  onSignOut?: () => void;
}

export interface MainLayoutProps {
  children: ReactNode;
}
