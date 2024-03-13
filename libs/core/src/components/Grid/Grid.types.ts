import MuiGrid from '@mui/material/Grid';
import type { ComponentProps } from 'react';

import type { GenerateStoreWrappedProps, GenericData } from '../../contexts';
import type { GridItemProps } from '../GridItem';

type MuiGridProps = Pick<
  ComponentProps<typeof MuiGrid>,
  'children' | 'columns' | 'justifyContent' | 'spacing'
>;

export type GridProps<D extends GenericData> = GenerateStoreWrappedProps<
  D,
  Pick<MuiGridProps, 'children' | 'justifyContent' | 'spacing'> & {
    columns?: Extract<MuiGridProps['columns'], number>;
    itemProps?: Omit<GridItemProps<D>, 'children' | 'data' | 'icon' | 'title'>;
  }
>;
