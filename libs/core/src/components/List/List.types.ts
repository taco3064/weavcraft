import MuiList from '@mui/material/List';
import type { ComponentProps, ReactNode } from 'react';

import type { GenericData, PropsWithStore, SlotElement } from '../../contexts';
import type { IconCode } from '../Icon';
import type { ListItemProps, ListItemVariant } from '../ListItem';

type MuiListProps = Pick<
  ComponentProps<typeof MuiList>,
  'dense' | 'disablePadding'
>;

type BaseListProps = {
  title?: string;
};

export type MappablePropNames = keyof BaseListProps;

export type ListProps<
  D extends GenericData = {},
  V extends ListItemVariant = ListItemVariant
> = PropsWithStore<
  D,
  MuiListProps &
    BaseListProps & {
      //* - Subheader
      icon?: IconCode;
      action?: ReactNode;
      disableSubheaderSticky?: boolean;
      disableSubheaderGutters?: boolean;

      //* - ListItem
      itemAction?: SlotElement;
      itemIndicator?: SlotElement;
      itemVariant?: ListItemProps<D, V>['variant'];
      itemProps?: Omit<
        ListItemProps<D, V>,
        'data' | 'action' | 'indicator' | 'variant' | 'onItemClick'
      >;

      onItemClick?: V extends 'button' ? (item: D) => void : undefined;
      onItemActionClick?: (item: D) => void;
      onItemIndicatorClick?: (item: D) => void;
    }
>;
