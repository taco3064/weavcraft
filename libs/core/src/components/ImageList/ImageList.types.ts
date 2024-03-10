import MuiImageList from '@mui/material/ImageList';
import type { ComponentProps } from 'react';

import type { ImageListItemProps } from '../ImageListItem';

import type {
  GenerateStoreWrapperProps,
  GenericData,
  SlotElement,
  StoreProps,
} from '../../contexts';

type MuiImageListProps = Pick<
  ComponentProps<typeof MuiImageList>,
  'cols' | 'gap' | 'rowHeight' | 'variant'
>;

export type ImageListProps<D extends GenericData> = GenerateStoreWrapperProps<
  D,
  MuiImageListProps &
    StoreProps<D> & {
      itemAction?: SlotElement;
      itemProps?: Omit<ImageListItemProps<D>, 'data' | 'action'>;
      onItemActionClick?: (item: D) => void;
    }
>;
