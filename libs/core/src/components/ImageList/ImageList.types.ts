import MuiImageList from '@mui/material/ImageList';
import type { ComponentProps } from 'react';

import type { BaseSlotProps, GenericData, SlotElement } from '../../types';
import type { ImageListItemProps } from '../ImageListItem';

type MuiImageListProps = Pick<
  ComponentProps<typeof MuiImageList>,
  'cols' | 'gap' | 'rowHeight' | 'variant'
>;

export interface ImageListProps<D extends GenericData, A extends BaseSlotProps>
  extends MuiImageListProps {
  itemAction?: SlotElement<D, A>;
  itemProps?: Omit<ImageListItemProps<D>, 'data' | 'action'>;
  items?: D[];
  onItemActionClick?: (item: D) => void;
}
