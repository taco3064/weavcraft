import MuiImageList from '@mui/material/ImageList';
import MuiImageListItem from '@mui/material/ImageListItem';
import type { ComponentProps } from 'react';

import type {
  ActionElement,
  Data,
  OverridableNames,
  PropMapping,
} from '../types';

export interface ImageListItemProps
  extends Pick<ComponentProps<typeof MuiImageListItem>, 'cols' | 'rows'> {
  alt: string;
  description?: string;
  src: string;
  srcSet?: string;
}

export interface ImageListProps<T extends Data>
  extends PropMapping<OverridableNames<ImageListItemProps>>,
    Pick<
      ComponentProps<typeof MuiImageList>,
      'cols' | 'gap' | 'rowHeight' | 'variant'
    > {
  data?: T[];
  itemAction?: ActionElement;
  itemProps?: Pick<ImageListItemProps, 'cols' | 'rows'>;
  onItemToggle?: (item: T) => void;
}
