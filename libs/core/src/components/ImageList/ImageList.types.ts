import MuiImageList from '@mui/material/ImageList';
import type { ComponentProps } from 'react';

import type { GenericData, PropsWithStore, SlotElement } from '../../contexts';
import type { ImageListItemProps } from '../ImageListItem';

type MuiImageListProps = Pick<
  ComponentProps<typeof MuiImageList>,
  'cols' | 'gap' | 'rowHeight' | 'variant'
>;

export type ImageListProps<D extends GenericData = {}> = PropsWithStore<
  D,
  MuiImageListProps & {
    itemAction?: SlotElement;
    itemProps?: Omit<ImageListItemProps<D>, 'data' | 'action'>;
    onItemActionClick?: (item: D) => void;
  }
>;
