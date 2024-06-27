import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import type { ComponentProps, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';

import type {
  BaseItemProps,
  PropsWithMappedData,
  SlotElement,
} from '../../hooks';

export type ListItemVariant = 'button' | 'item' | 'link';

type BasePropNames = 'alignItems' | 'dense' | 'disableGutters' | 'divider';
type MuiListItemProps = Pick<ComponentProps<typeof MuiListItem>, BasePropNames>;

type MuiListItemButtonProps = Pick<
  ComponentProps<typeof MuiListItemButton>,
  BasePropNames
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
  id?: string;
  nestedContent?: ReactNode;
  selected?: V extends 'button' ? boolean : undefined;

  action?: SlotElement;
  disabled?: V extends 'item' ? undefined : boolean;
  indicator?: SlotElement;
  variant?: V;

  onItemClick?: V extends 'button' ? (data: D) => void : undefined;
}

export type ListItemProps<D extends JsonObject> = PropsWithMappedData<
  D,
  BaseListItemProps<D, ListItemVariant>,
  | 'disabled'
  | 'id'
  | 'href'
  | 'nestedContent'
  | 'primary'
  | 'secondary'
  | 'selected'
>;
