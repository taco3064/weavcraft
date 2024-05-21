import MuiBadge from '@mui/material/Badge';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';

type MuiBadgeProps = Pick<
  ComponentProps<typeof MuiBadge>,
  | 'anchorOrigin'
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

export type BadgeProps<D extends JsonObject> = PropsWithMappedData<
  D,
  Omit<MuiBadgeProps, 'anchorOrigin'> & {
    anchorPosition?: `${AnchorOrigin<'vertical'>}-${AnchorOrigin<'horizontal'>}`;
    badgeContent?: string | number;
  },
  'badgeContent' | 'children' | 'max'
>;
