import MuiBadge from '@mui/material/Badge';
import type { ComponentProps } from 'react';

import type { GenerateDataWrappedProps, GenericData } from '../../contexts';

type MuiBadgeProps = Pick<
  ComponentProps<typeof MuiBadge>,
  | 'anchorOrigin'
  | 'badgeContent'
  | 'children'
  | 'color'
  | 'max'
  | 'overlap'
  | 'showZero'
  | 'variant'
>;

export interface BadgeProps extends Omit<MuiBadgeProps, 'anchorOrigin'> {
  anchorHorizontal?: NonNullable<MuiBadgeProps['anchorOrigin']>['horizontal'];
  anchorVertical?: NonNullable<MuiBadgeProps['anchorOrigin']>['vertical'];
}

export type MappablePropNames = keyof Pick<
  BadgeProps,
  'badgeContent' | 'children' | 'max'
>;

export type WrappedProps<D extends GenericData> = GenerateDataWrappedProps<
  D,
  BadgeProps,
  MappablePropNames
>;
