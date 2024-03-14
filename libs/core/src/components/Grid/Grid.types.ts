import MuiGrid from '@mui/material/Grid';
import type { ComponentProps } from 'react';

import type { GenericData, PropsWithStore } from '../../contexts';
import type { GridItemProps } from '../GridItem';

type MuiGridProps = Pick<
  ComponentProps<typeof MuiGrid>,
  'children' | 'columns' | 'justifyContent' | 'spacing'
>;

export type GridProps<D extends GenericData = {}> = PropsWithStore<
  D,
  Pick<MuiGridProps, 'children' | 'justifyContent' | 'spacing'> & {
    columns?: Extract<MuiGridProps['columns'], number>;
    itemProps?: Omit<GridItemProps<D>, 'children' | 'data' | 'icon' | 'title'>;
  }
>;
