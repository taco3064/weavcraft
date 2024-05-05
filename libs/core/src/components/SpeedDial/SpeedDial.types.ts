import MuiSpeedDial from '@mui/material/SpeedDial';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { IconCode } from '../Icon';
import type { PropsWithMappedStore } from '../../contexts';

import type {
  SpeedDialActionProps,
  TooltipPlacement,
} from '../SpeedDialAction';

//* - Component Props
type MuiSpeedDialProps = Pick<ComponentProps<typeof MuiSpeedDial>, 'direction'>;

export type SpeedDialProps<D extends JsonObject> = PropsWithMappedStore<
  D,
  {
    ariaLabel?: string;
    containerId?: string;
    icon?: IconCode;
    itemProps?: Pick<SpeedDialActionProps<D>, 'propMapping'>;
    openIcon?: IconCode;
    position?: `${PositionOrigin<'vertical'>}-${PositionOrigin<'horizontal'>}`;
    onItemClick?: (item: D) => void;
  }
>;

//* - Variables
type Direction = MuiSpeedDialProps['direction'];

type PositionOrigin<K extends 'vertical' | 'horizontal'> = K extends 'vertical'
  ? 'top' | 'bottom'
  : 'left' | 'right';

export type PositionSplit = [
  PositionOrigin<'vertical'>,
  PositionOrigin<'horizontal'>
];

export type Origin = Record<
  `${PositionOrigin<'vertical'>}-${PositionOrigin<'horizontal'>}`,
  {
    direction: Direction;
    tooltipPlacement: TooltipPlacement;
  }
>;
