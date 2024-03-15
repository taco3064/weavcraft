import MuiImageListItem from '@mui/material/ImageListItem';
import MuiImageListItemBar from '@mui/material/ImageListItemBar';
import type { ComponentProps, ReactNode } from 'react';

import type { GenericData, PropsWithMappedData } from '../../contexts';

type MuiImageListItemProps = Pick<
  ComponentProps<typeof MuiImageListItem>,
  'cols' | 'rows'
>;

type MuiImageListItemBarProps = Pick<
  ComponentProps<typeof MuiImageListItemBar>,
  'position' | 'actionPosition'
>;

interface BaseImageListItemProps extends MuiImageListItemProps {
  title?: string;
  description?: string;
  src?: string;
  srcSet?: string;
}

export type MappablePropNames = keyof BaseImageListItemProps;

export interface ImageListItemProps extends BaseImageListItemProps {
  action?: ReactNode;
  actionPosition?: MuiImageListItemBarProps['actionPosition'];
  barPosition?: MuiImageListItemBarProps['position'];
}

export type WrappedProps<D extends GenericData> = PropsWithMappedData<
  D,
  ImageListItemProps,
  MappablePropNames
>;
