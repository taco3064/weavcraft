import MuiList from '@mui/material/List';
import type { ComponentProps, ReactNode } from 'react';

import type { BaseSlotProps, GenericData, SlotElement } from '../../types';
import type { IconProps } from '../Icon';
import type { ListItemProps, ListItemVariant } from '../ListItem';

type MuiListProps = Pick<
  ComponentProps<typeof MuiList>,
  'dense' | 'disablePadding'
>;

export interface ListProps<D extends GenericData, V extends ListItemVariant>
  extends MuiListProps {
  //* Subheader
  title?: string;
  icon?: Pick<IconProps<never>, 'code' | 'color'>;
  action?: ReactNode;
  disableSubheaderSticky?: boolean;
  disableSubheaderGutters?: boolean;

  //* ListItem
  itemAction?: SlotElement<D, BaseSlotProps>;
  itemIndicator?: SlotElement<D, BaseSlotProps>;
  itemVariant?: V;
  items?: D[];
  itemProps?: Omit<
    ListItemProps<D, V>,
    'data' | 'action' | 'indicator' | 'variant'
  >;

  onItemActionClick?: (item: D) => void;
  onItemIndicatorClick?: (item: D) => void;
}
