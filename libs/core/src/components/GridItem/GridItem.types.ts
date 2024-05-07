import MuiGrid, { type RegularBreakpoints } from '@mui/material/Grid';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';
import type { ToolbarProps } from '../Toolbar';

type MuiGridProps = Pick<
  ComponentProps<typeof MuiGrid>,
  'children' | 'columnSpacing' | 'rowSpacing'
>;

type BaseToolbarProps<D extends JsonObject> = Pick<
  ToolbarProps<D>,
  'icon' | 'title' | 'elevation'
>;
type ColumnSpacing = Extract<MuiGridProps['columnSpacing'], number>;
type RowSpacing = Extract<MuiGridProps['rowSpacing'], number>;

export type GridItemBrakpoints = keyof RegularBreakpoints;

interface BaseGridItemProps<D extends JsonObject>
  extends BaseToolbarProps<D>,
    Pick<MuiGridProps, 'children'>,
    Partial<Record<GridItemBrakpoints, number>> {
  columnSpacing?: ColumnSpacing;
  rowSpacing?: RowSpacing;
}

export type GridItemProps<D extends JsonObject> = PropsWithMappedData<
  D,
  BaseGridItemProps<D>,
  'icon' | 'title'
>;
