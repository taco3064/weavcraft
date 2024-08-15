import type { FC } from 'react';
import type { GridItemProps as ResponsiveItemProps } from './ResponsiveGrid.types';

export { default, default as ResponsiveGrid } from './ResponsiveGrid';

export type {
  ResponsiveMaxWidths,
  ResponsiveGridProps,
} from './ResponsiveGrid.types';

export const ResponsiveItem: FC<
  Omit<ResponsiveItemProps, 'GridProps' | 'enableResize' | 'enableResort'>
> = () => null;
