import MuiGrid from '@mui/material/Grid';
import type { ComponentProps, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedStore } from '../../contexts';
import type { GridItemProps } from '../GridItem';

type MuiGridProps = Pick<
  ComponentProps<typeof MuiGrid>,
  'columns' | 'justifyContent' | 'spacing'
>;

export type ItemVariant = 'common' | 'unique';

/**
 * ? Grid Component Props Notes
 * * - `itemVariant` is used to define the template of children
 */
export type GridProps<
  D extends JsonObject,
  V extends ItemVariant
> = PropsWithMappedStore<
  D,
  Pick<MuiGridProps, 'justifyContent' | 'spacing'> & {
    children?: ReactNode;
    columns?: Extract<MuiGridProps['columns'], number>;
    itemVariant?: V;
    itemProps?: Omit<GridItemProps<D>, 'children' | 'data' | 'icon' | 'title'>;
  }
>;
