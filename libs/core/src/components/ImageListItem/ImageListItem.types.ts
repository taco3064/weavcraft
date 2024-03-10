import MuiImageListItem from '@mui/material/ImageListItem';
import type { ImageListItemBarProps as MuiImageListItemBarProps } from '@mui/material/ImageListItemBar';
import type { ComponentProps, ReactNode } from 'react';

import type { GenericData, GenerateDataWrapperProps } from '../../contexts';

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

export type MappablePropNames = keyof BaseImageListItemProps;

export interface ImageListItemProps extends BaseImageListItemProps {
  action?: ReactNode;
  actionPosition?: MuiImageListItemBarProps['actionPosition'];
  barPosition?: MuiImageListItemBarProps['position'];
}

export type WrapperProps<D extends GenericData> = GenerateDataWrapperProps<
  D,
  ImageListItemProps,
  MappablePropNames
>;
