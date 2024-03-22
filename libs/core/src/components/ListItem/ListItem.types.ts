import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import type { ComponentProps, ReactElement, ReactNode } from 'react';

import type { BaseListItemProps } from '../../hooks';
import type { GenericData, PropsWithMappedData } from '../../contexts';

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

export interface ListItemProps<V extends ListItemVariant, D extends GenericData>
  extends BaseListItemProps,
    Pick<MuiListItemProps & MuiListItemButtonProps, BasePropName> {
  href?: V extends 'link' ? string : undefined;
  nested?: ReactNode;
  nestedId?: string;
  selected?: V extends 'button' ? boolean : undefined;

  action?: ReactElement;
  disabled?: V extends 'item' ? undefined : boolean;
  indicator?: ReactElement;
  variant?: V;

  onItemClick?: V extends 'button' ? (data?: D) => void : undefined;
}

export type MappablePropNames = keyof Pick<
  ListItemProps<ListItemVariant, {}>,
  | BasePropName
  | 'disabled'
  | 'href'
  | 'nestedId'
  | 'nested'
  | 'primary'
  | 'secondary'
  | 'selected'
>;

export type WrappedProps<
  D extends GenericData,
  V extends ListItemVariant
> = PropsWithMappedData<D, ListItemProps<V, D>, MappablePropNames>;
