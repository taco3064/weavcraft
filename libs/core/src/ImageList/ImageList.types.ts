import MuiImageList from '@mui/material/ImageList';
import MuiImageListItem from '@mui/material/ImageListItem';
import type { ComponentProps, ReactElement } from 'react';

import type { Data, OverridePropNames } from '../types';

export interface ImageListItemProps
  extends Pick<ComponentProps<typeof MuiImageListItem>, 'cols' | 'rows'> {
  alt: string;
  description?: string;
  src: string;
  srcSet?: string;
}

type OverrideChildPropNames = OverridePropNames<ImageListItemProps>;

export interface ImageListProps<T extends Data>
  extends Pick<
    ComponentProps<typeof MuiImageList>,
    'cols' | 'gap' | 'rowHeight' | 'variant'
  > {
  action?: ReactElement;
  itemProps?: Pick<ImageListItemProps, 'cols' | 'rows'>;
  data?: T[];
  propMapping?: Partial<Record<OverrideChildPropNames, string>>;
  onItemToggle?: (item: T) => void;
}
