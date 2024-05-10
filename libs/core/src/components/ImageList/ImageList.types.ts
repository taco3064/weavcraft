import MuiImageList from '@mui/material/ImageList';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { ImageListItemProps } from '../ImageListItem';
import type { PropsWithMappedStore, SlotElement } from '../../hooks';

type MuiImageListProps = Pick<
  ComponentProps<typeof MuiImageList>,
  'cols' | 'gap' | 'rowHeight' | 'variant'
>;

export type ImageListProps<D extends JsonObject> = PropsWithMappedStore<
  D,
  MuiImageListProps & {
    itemAction?: SlotElement;
    itemProps?: Omit<ImageListItemProps<D>, 'data' | 'action'>;
    onItemActionClick?: (item: D) => void;
  }
>;
