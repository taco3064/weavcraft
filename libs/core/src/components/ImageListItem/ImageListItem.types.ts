import MuiImageListItem from '@mui/material/ImageListItem';
import type { ImageListItemBarProps as MuiImageListItemBarProps } from '@mui/material/ImageListItemBar';
import type { ComponentProps, ReactNode } from 'react';

import type { GenericData, MappableProps } from '../../types';

type MuiImageListItemProps = Pick<
  ComponentProps<typeof MuiImageListItem>,
  'cols' | 'rows'
>;

interface BaseImageListItemProps extends MuiImageListItemProps {
  title?: string;
  description?: string;
  src?: string;
  srcSet?: string;
}

export interface ImageListItemProps<D extends GenericData>
  extends MappableProps<D, BaseImageListItemProps> {
  action?: ReactNode;
  actionPosition?: MuiImageListItemBarProps['actionPosition'];
  barPosition?: MuiImageListItemBarProps['position'];
}
