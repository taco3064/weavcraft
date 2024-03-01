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
  A extends BaseActionProps
> extends MuiImageListProps {
  itemAction?: ActionElement<D, A>;
  itemProps?: Omit<ImageListItemProps<D>, 'data' | 'action'>;
  items?: D[];
  onItemActionClick?: (item: D) => void;
}
