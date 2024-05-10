import MuiLink from '@mui/material/Link';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { TypographyProps } from '../Typography';
import type { PropsWithMappedData } from '../../hooks';

type MuiLinkProps = Pick<
  ComponentProps<typeof MuiLink>,
  | 'href'
  | 'underline'
  | 'align'
  | 'color'
  | 'fontWeight'
  | 'gutterBottom'
  | 'noWrap'
  | 'paragraph'
  | 'variant'
  | 'whiteSpace'
>;

export type LinkProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiLinkProps & Pick<TypographyProps<D>, 'icon' | 'text'>,
  'icon' | 'href' | 'text'
>;
