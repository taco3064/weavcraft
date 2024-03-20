import MuiGrid from '@mui/material/Grid';
import type { ComponentProps, ReactNode } from 'react';

import type { GenericData, PropsWithStore } from '../../contexts';
import type { GridItemProps } from '../GridItem';

type MuiGridProps = Pick<
  ComponentProps<typeof MuiGrid>,
  'columns' | 'justifyContent' | 'spacing'
>;

export type ItemVariant = 'common' | 'unique';

export type GridProps<
  D extends GenericData = {},
  V extends ItemVariant = 'common'
> = PropsWithStore<
  D,
  Pick<MuiGridProps, 'justifyContent' | 'spacing'> & {
    children?: V extends 'common' ? ReactNode : never;
    columns?: Extract<MuiGridProps['columns'], number>;
    itemVariant?: V;
    itemProps?: Omit<GridItemProps<D>, 'children' | 'data' | 'icon' | 'title'>;
  }
>;
