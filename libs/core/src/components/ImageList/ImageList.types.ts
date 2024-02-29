import MuiImageList from '@mui/material/ImageList';
import type { ComponentProps } from 'react';

import type { ActionElement, BaseActionProps, GenericData } from '../../types';
import type { ImageListItemProps } from '../ImageListItem';

type MuiImageListProps = Pick<
  ComponentProps<typeof MuiImageList>,
  'cols' | 'gap' | 'rowHeight' | 'variant'
>;

export interface ImageListProps<
  D extends GenericData,
  P extends BaseActionProps
> extends MuiImageListProps {
  itemAction?: ActionElement<D, P>;
  itemProps?: Omit<ImageListItemProps<D>, 'data' | 'actionIcon'>;
  items?: D[];
  onItemToggle?: (item: D) => void;
}
