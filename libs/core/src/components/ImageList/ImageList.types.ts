import MuiImageList from '@mui/material/ImageList';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { ImageListItemProps } from '../ImageListItem';
import type { PropsWithMappedStore } from '../../hooks';

type MuiImageListProps = Pick<
  ComponentProps<typeof MuiImageList>,
  'cols' | 'gap' | 'rowHeight' | 'variant'
>;

export type ImageListProps<D extends JsonObject> = PropsWithMappedStore<
  D,
  MuiImageListProps & {
    itemProps?: Omit<ImageListItemProps<D>, 'data'>;
    onItemActionClick?: (item: D) => void;
  }
>;
