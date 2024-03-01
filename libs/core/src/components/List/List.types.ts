import MuiList from '@mui/material/List';
import type { ComponentProps, ReactNode } from 'react';

import type { ActionElement, BaseActionProps, GenericData } from '../../types';
import type { IconProps } from '../Icon';
import type { ListItemProps, ListItemVariant } from '../ListItem';

type MuiListProps = Pick<
  ComponentProps<typeof MuiList>,
  'dense' | 'disablePadding'
>;

export interface ListProps<
  D extends GenericData,
  I extends BaseActionProps,
  A extends BaseActionProps,
  V extends ListItemVariant
> extends MuiListProps {
  //* Subheader
  title?: string;
  icon?: Pick<IconProps<never>, 'code' | 'color'>;
  action?: ReactNode;
  disableSubheaderSticky?: boolean;
  disableSubheaderGutters?: boolean;

  //* ListItem
  itemAction?: ActionElement<D, A>;
  itemIndicator?: ActionElement<D, I>;
  itemVariant?: V;
  items?: D[];
  itemProps?: Omit<
    ListItemProps<D, V>,
    'data' | 'action' | 'indicator' | 'variant'
  >;

  onItemActionClick?: (item: D) => void;
  onItemIndicatorClick?: (item: D) => void;
}
