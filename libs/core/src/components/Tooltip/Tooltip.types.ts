import MuiTooltip from '@mui/material/Tooltip';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';

type MuiTooltipProps = Partial<
  Pick<ComponentProps<typeof MuiTooltip>, 'arrow' | 'children' | 'placement'>
>;

export type TooltipProps<D extends JsonObject> = PropsWithMappedData<
  D,
  Omit<MuiTooltipProps, 'placement'> & {
    disabled?: boolean;
    title?: string;
    placement?: Extract<
      MuiTooltipProps['placement'],
      'bottom' | 'left' | 'right' | 'top'
    >;
  },
  'disabled' | 'title'
>;
