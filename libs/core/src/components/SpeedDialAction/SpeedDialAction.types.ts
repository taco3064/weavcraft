import MuiSpeedDialAction from '@mui/material/SpeedDialAction';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { IconCode } from '../Icon';
import type { PropsWithMappedData } from '../../hooks';

type MuiSpeedDialActionProps = Pick<
  ComponentProps<typeof MuiSpeedDialAction>,
  'tooltipPlacement' | 'tooltipTitle' | 'onClick'
>;

export type TooltipPlacement = NonNullable<
  MuiSpeedDialActionProps['tooltipPlacement']
>;

export type SpeedDialActionProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiSpeedDialActionProps & {
    icon?: IconCode;
  },
  'icon' | 'tooltipTitle'
>;
