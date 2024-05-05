import MuiCollapse from '@mui/material/Collapse';
import type { ComponentProps, ReactElement } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData, SlotProps } from '../../contexts';

type MuiCollapseProps = Pick<
  ComponentProps<typeof MuiCollapse>,
  'children' | 'orientation'
>;

export type MappablePropNames = keyof MuiCollapseProps;

export interface CollapseProps extends MuiCollapseProps {
  containerId?: string;
  toggle?: ReactElement<SlotProps>;
}

export type WrappedProps<D extends JsonObject> = PropsWithMappedData<
  D,
  CollapseProps,
  MappablePropNames
>;
