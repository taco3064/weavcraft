import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import type { LinkProps as NextLinkProps } from 'next/link';
import type { UrlObject } from 'url';

export type Href = string | UrlObject;

export type LinkProps = NextLinkProps &
  Omit<MuiLinkProps, 'component' | 'fontWeight' | 'href'>;
