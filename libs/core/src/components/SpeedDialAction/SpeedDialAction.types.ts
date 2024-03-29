import MuiSpeedDialAction from '@mui/material/SpeedDialAction';
import type { ComponentProps } from 'react';

import type { GenericData, PropsWithMappedData } from '../../contexts';
import type { IconCode } from '../Icon';

type MuiSpeedDialActionProps = Pick<
  ComponentProps<typeof MuiSpeedDialAction>,
  'tooltipPlacement' | 'tooltipTitle' | 'onClick'
>;

export type TooltipPlacement = NonNullable<
  MuiSpeedDialActionProps['tooltipPlacement']
>;

export interface SpeedDialActionProps extends MuiSpeedDialActionProps {
  icon?: IconCode;
}

export type MappablePropNames = keyof Pick<
  SpeedDialActionProps,
  'icon' | 'tooltipTitle'
>;

export type WrappedProps<D extends GenericData> = PropsWithMappedData<
  D,
  SpeedDialActionProps,
  MappablePropNames
>;
