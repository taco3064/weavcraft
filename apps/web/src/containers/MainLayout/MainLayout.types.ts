import type { Breakpoint } from '@mui/material/styles';
import type { IconCode } from '@weavcraft/core';
import type { ReactNode } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { TypographyProps } from '@mui/material/Typography';

export type StyleParams = {
  maxWidth?: Breakpoint;
  open: boolean;
};

export type DefaultProps = {
  logo: SvgIconProps;
  title: Omit<TypographyProps, 'ref'>;
};

export type NavItem = {
  auth?: true;
  icon: IconCode;
  id: string;
  href: string;
};

export interface MainLayoutProps {
  children: ReactNode;
}
