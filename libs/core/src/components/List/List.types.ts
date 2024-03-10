import MuiList from '@mui/material/List';
import type { ComponentProps, ReactNode } from 'react';

import type { IconProps } from '../Icon';
import type { ListItemProps, ListItemVariant } from '../ListItem';

import type {
  GenerateStoreWrapperProps,
  GenericData,
  SlotElement,
} from '../../contexts';

type MuiListProps = Pick<
  ComponentProps<typeof MuiList>,
  'dense' | 'disablePadding'
>;

type BaseListProps = {
  title?: string;
};

export type MappablePropNames = keyof BaseListProps;

export type ListProps<
  D extends GenericData,
  V extends ListItemVariant
> = GenerateStoreWrapperProps<
  D,
  MuiListProps &
    BaseListProps & {
      //* Subheader
      icon?: Pick<IconProps<D>, 'code' | 'color'>;
      action?: ReactNode;
      disableSubheaderSticky?: boolean;
      disableSubheaderGutters?: boolean;

      //* ListItem
      itemAction?: SlotElement;
      itemIndicator?: SlotElement;
      itemVariant?: ListItemProps<D, V>['variant'];
      itemProps?: Omit<
        ListItemProps<D, V>,
        'data' | 'action' | 'indicator' | 'variant'
      >;

      onItemActionClick?: (item: D) => void;
      onItemIndicatorClick?: (item: D) => void;
    },
  MappablePropNames
>;
