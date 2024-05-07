import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';

import type { BaseItemProps, PropsWithMappedData } from '../../hooks';

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

interface BaseListItemProps<
  D extends JsonObject,
  V extends ListItemVariant = ListItemVariant
> extends BaseItemProps,
    Pick<MuiListItemProps & MuiListItemButtonProps, BasePropName> {
  href?: V extends 'link' ? string : undefined;
  nested?: ReactNode;
  nestedId?: string;
  selected?: V extends 'button' ? boolean : undefined;

  action?: ReactElement;
  disabled?: V extends 'item' ? undefined : boolean;
  indicator?: ReactElement;
  variant?: V;

  onItemClick?: V extends 'button' ? (data: D) => void : undefined;
}

export type ListItemProps<D extends JsonObject> = PropsWithMappedData<
  D,
  BaseListItemProps<D, ListItemVariant>,
  | Extract<keyof MuiListItemProps, keyof MuiListItemButtonProps>
  | 'disabled'
  | 'href'
  | 'nestedId'
  | 'nested'
  | 'primary'
  | 'secondary'
  | 'selected'
>;
