import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import type { ComponentProps, ReactNode } from 'react';

import type { GenericData, MappableProps } from '../../types';

export type ListItemVariant = 'button' | 'item' | 'link';

type MuiListItemProps = Pick<
  ComponentProps<typeof MuiListItem>,
  'alignItems' | 'dense' | 'disableGutters' | 'divider'
>;

type MuiListItemButtonProps = Pick<
  ComponentProps<typeof MuiListItemButton>,
  'alignItems' | 'dense' | 'disableGutters' | 'divider'
>;

export interface BaseListItemProps {
  primary?: string;
  secondary?: string;
  disabled?: boolean;
  href?: string;
  selected?: boolean;
}

export interface ListItemProps<D extends GenericData, V extends ListItemVariant>
  extends MappableProps<D, BaseListItemProps>,
    Pick<
      MuiListItemProps & MuiListItemButtonProps,
      Extract<keyof MuiListItemProps, keyof MuiListItemButtonProps>
    > {
  action?: ReactNode;
  disabled?: V extends 'item' ? undefined : boolean;
  href?: V extends 'link' ? string : undefined;
  indicator?: ReactNode;
  selected?: V extends 'button' ? boolean : undefined;
  variant?: V;
  onItemClick?: V extends 'button' ? (data?: D) => void : undefined;
}
