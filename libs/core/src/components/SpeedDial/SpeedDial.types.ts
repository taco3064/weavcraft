import MuiSpeedDial from '@mui/material/SpeedDial';
import type { ComponentProps } from 'react';

import type { GenericData, PropsWithStore } from '../../contexts';
import type { IconCode } from '../Icon';

import type {
  SpeedDialActionProps,
  TooltipPlacement,
} from '../SpeedDialAction';

//* - Component Props
type MuiSpeedDialProps = Pick<ComponentProps<typeof MuiSpeedDial>, 'direction'>;

export type SpeedDialProps<D extends GenericData = {}> = PropsWithStore<
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
