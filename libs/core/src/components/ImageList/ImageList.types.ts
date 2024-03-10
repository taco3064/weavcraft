import MuiImageList from '@mui/material/ImageList';
import type { ComponentProps } from 'react';

import type { ImageListItemProps } from '../ImageListItem';

import type {
  GenerateStoreWrappedProps,
  GenericData,
  SlotElement,
} from '../../contexts';

type MuiImageListProps = Pick<
  ComponentProps<typeof MuiImageList>,
  'cols' | 'gap' | 'rowHeight' | 'variant'
>;

export type ImageListProps<D extends GenericData> = GenerateStoreWrappedProps<
  D,
  MuiImageListProps & {
    itemAction?: SlotElement;
    itemProps?: Omit<ImageListItemProps<D>, 'data' | 'action'>;
    onItemActionClick?: (item: D) => void;
  }
>;
