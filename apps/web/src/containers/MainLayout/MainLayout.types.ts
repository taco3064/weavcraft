import type { Breakpoint } from '@mui/material/styles';
import type { ReactNode } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { TypographyProps } from '@mui/material/Typography';

import { useSigninProviders } from '~web/hooks';

export type MenuMode = 'nav' | 'custom';

export type StyleParams = {
  maxWidth?: Breakpoint;
  menuMode?: MenuMode;
};

export type DefaultProps = {
  logo: SvgIconProps;
  title: Omit<TypographyProps, 'ref'>;
};

//* Component Props Type
export interface MainLayoutProps {
  children: ReactNode;
}

export interface CompressionContentProps {
  children: ReactNode;
  isDrawerOpen: boolean;
}

export interface UserAvatarMenuProps
  extends ReturnType<typeof useSigninProviders> {
  open: boolean;
  onToggle: (open: boolean) => void;
}
