import MuiBadge from '@mui/material/Badge';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../contexts';

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

export type AnchorOrigin<
  K extends keyof NonNullable<MuiBadgeProps['anchorOrigin']>
> = NonNullable<MuiBadgeProps['anchorOrigin']>[K];

export interface BadgeProps extends Omit<MuiBadgeProps, 'anchorOrigin'> {
  anchorPosition?: `${AnchorOrigin<'vertical'>}-${AnchorOrigin<'horizontal'>}`;
}

export type MappablePropNames = keyof Pick<
  BadgeProps,
  'badgeContent' | 'children' | 'max'
>;

export type WrappedProps<D extends JsonObject> = PropsWithMappedData<
  D,
  BadgeProps,
  MappablePropNames
>;
