import type { Breakpoint } from '@mui/material/styles';
import type { ReactNode } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { TypographyProps } from '@mui/material/Typography';

export type MenuMode = 'nav' | 'custom';

export type StyleParams = {
  maxWidth?: Breakpoint;
  open?: MenuMode;
};

export type DefaultProps = {
  logo: SvgIconProps;
  title: Omit<TypographyProps, 'ref'>;
};

export interface MainLayoutProps {
  children: ReactNode;
}

export interface CompressionContentProps {
  children: ReactNode;
  isDrawerOpen: boolean;
}
