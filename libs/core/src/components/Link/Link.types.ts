import MuiLink from '@mui/material/Link';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { BaseTypographyProps } from '../Typography';
import type { PropsWithMappedData } from '../../contexts';

type MuiLinkProps = Pick<
  ComponentProps<typeof MuiLink>,
  keyof Omit<BaseTypographyProps, 'icon' | 'text'> | 'href' | 'underline'
>;

export type LinkProps = MuiLinkProps &
  Pick<BaseTypographyProps, 'icon' | 'text'>;

export type MappablePropNames = keyof Pick<LinkProps, 'icon' | 'href' | 'text'>;

export type WrappedProps<D extends JsonObject> = PropsWithMappedData<
  D,
  LinkProps,
  MappablePropNames
>;
