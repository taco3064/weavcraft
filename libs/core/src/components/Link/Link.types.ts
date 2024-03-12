import MuiLink from '@mui/material/Link';
import type { ComponentProps } from 'react';

import type { BaseTypographyProps } from '../Typography';
import type { GenerateDataWrappedProps, GenericData } from '../../contexts';
import type { IconCode } from '../Icon';

type MuiLinkProps = Pick<
  ComponentProps<typeof MuiLink>,
  keyof Omit<BaseTypographyProps, 'icon'> | 'href' | 'underline'
>;

export interface LinkProps extends MuiLinkProps {
  icon?: IconCode;
}

export type MappablePropNames = keyof Pick<
  LinkProps,
  'children' | 'icon' | 'href'
>;

export type WrappedProps<D extends GenericData> = GenerateDataWrappedProps<
  D,
  LinkProps,
  MappablePropNames
>;
