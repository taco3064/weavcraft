import MuiImageListItem from '@mui/material/ImageListItem';
import MuiImageListItemBar from '@mui/material/ImageListItemBar';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData, SlotElement } from '../../hooks';

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

export type ImageListItemProps<D extends JsonObject> = PropsWithMappedData<
  D,
  BaseImageListItemProps & {
    action?: SlotElement;
    actionPosition?: MuiImageListItemBarProps['actionPosition'];
    barPosition?: MuiImageListItemBarProps['position'];
  },
  keyof BaseImageListItemProps
>;
