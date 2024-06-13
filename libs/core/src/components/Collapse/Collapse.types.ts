import MuiCollapse from '@mui/material/Collapse';
import type { ComponentProps, ReactElement } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData, SlotProps } from '../../hooks';

type MuiCollapseProps = Pick<
  ComponentProps<typeof MuiCollapse>,
  'children' | 'orientation'
>;

export type CollapseProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiCollapseProps & {
    containerId?: string;
    toggle?: ReactElement<SlotProps>;
  },
  'containerId' | keyof MuiCollapseProps
>;
