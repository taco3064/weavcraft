import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import type { LinkProps as NextLinkProps } from 'next/link';

export type LinkProps = NextLinkProps &
  Omit<MuiLinkProps, 'component' | 'href'>;
