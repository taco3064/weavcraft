import MuiTooltip from '@mui/material/Tooltip';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../contexts';

type MuiTooltipProps = Partial<
  Pick<
    ComponentProps<typeof MuiTooltip>,
    'arrow' | 'children' | 'placement' | 'title'
  >
>;

export interface TooltipProps extends Omit<MuiTooltipProps, 'placement'> {
  disabled?: boolean;
  placement?: Extract<
    MuiTooltipProps['placement'],
    'bottom' | 'left' | 'right' | 'top'
  >;
}

export type MappablePropNames = keyof Pick<TooltipProps, 'disabled' | 'title'>;

export type WrappedProps<D extends JsonObject> = PropsWithMappedData<
  D,
  TooltipProps,
  MappablePropNames
>;
