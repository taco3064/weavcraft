import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import type { ComponentProps, ReactNode } from 'react';

import type { BaseListItemProps } from '../../hooks';
import type { GenerateDataWrappedProps, GenericData } from '../../contexts';

export type ListItemVariant = 'button' | 'item' | 'link';

type MuiListItemProps = Pick<
  ComponentProps<typeof MuiListItem>,
  'alignItems' | 'dense' | 'disableGutters' | 'divider'
>;

type MuiListItemButtonProps = Pick<
  ComponentProps<typeof MuiListItemButton>,
  'alignItems' | 'dense' | 'disableGutters' | 'divider'
>;

type BasePropName = Extract<
  keyof MuiListItemProps,
  keyof MuiListItemButtonProps
>;

export type MappablePropNames =
  | BasePropName
  | 'disabled'
  | 'href'
  | 'nestedId'
  | 'nested'
  | 'primary'
  | 'secondary'
  | 'selected';

export interface ListItemProps<V extends ListItemVariant>
  extends BaseListItemProps,
    Pick<MuiListItemProps & MuiListItemButtonProps, BasePropName> {
  href?: V extends 'link' ? string : undefined;
  nested?: ReactNode;
  nestedId?: string;
  selected?: V extends 'button' ? boolean : undefined;

  action?: ReactNode;
  disabled?: V extends 'item' ? undefined : boolean;
  indicator?: ReactNode;
  variant?: V;
  onItemClick?: V extends 'button' ? (data?: GenericData) => void : undefined;
}

export type WrappedProps<
  D extends GenericData,
  V extends ListItemVariant
> = GenerateDataWrappedProps<D, ListItemProps<V>, MappablePropNames>;
