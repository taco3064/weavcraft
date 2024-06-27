import MuiList from '@mui/material/List';
import type { ComponentProps, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';

import type { IconCode } from '../Icon';
import type { ListItemProps, ListItemVariant } from '../ListItem';
import type { PropsWithMappedStore } from '../../hooks';

type MuiListProps = Pick<
  ComponentProps<typeof MuiList>,
  'dense' | 'disablePadding'
>;

type BaseListProps = {
  title?: string;
};

type MappablePropNames = keyof BaseListProps;

export type ListProps<
  D extends JsonObject,
  V extends ListItemVariant
> = PropsWithMappedStore<
  D,
  MuiListProps &
    BaseListProps & {
      //* - Subheader
      icon?: IconCode;
      action?: ReactNode;
      disableSubheaderSticky?: boolean;
      disableSubheaderGutters?: boolean;

      //* - ListItem
      itemVariant?: V;
      itemProps?: Omit<ListItemProps<D>, 'data' | 'variant' | 'onItemClick'>;

      onItemClick?: V extends 'button' ? (item: D) => void : undefined;
      onItemActionClick?: (item: D) => void;
      onItemIndicatorClick?: (item: D) => void;
    },
  MappablePropNames
>;
