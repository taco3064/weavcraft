import type { Breakpoint } from '@mui/material/styles';
import type { ReactElement, ReactNode } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';

import type { LinkProps } from '~web/components';

export type StyleParams = {
  maxWidth?: Breakpoint;
  open: boolean;
};

export interface MainLayoutSubheaderProps {
  logo: ReactElement;
  onMenuClose: () => void;
}
export type ChildrenProps = {
  logo: SvgIconProps;
  homeLink: LinkProps;
};

export interface MainLayoutProps {
  children: ReactNode;
}
