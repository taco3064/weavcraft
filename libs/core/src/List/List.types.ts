import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListSubheader from '@mui/material/ListSubheader';
import type { ComponentProps, ComponentType, ReactNode } from 'react';

import { Avatar, type AvatarProps } from '../Avatar';
import { Icon, type IconProps } from '../Icon';
import type { AvatarGroupProps, OverridablePropNames } from '../AvatarGroup';
import type { ActionElement, Data, OverridableNames } from '../types';

//* Variables
export type IndicatorVariant = 'avatar' | 'icon';
export type ListItemVariant = 'button' | 'item';

//* Component Props
type MuiListItemProps = Pick<
  ComponentProps<typeof MuiListItem>,
  'alignItems' | 'dense' | 'disableGutters' | 'disablePadding' | 'divider'
>;

interface MuiListItemButtonProps
  extends Pick<
    ComponentProps<typeof MuiListItemButton>,
    | 'alignItems'
    | 'autoFocus'
    | 'dense'
    | 'disabled'
    | 'disableGutters'
    | 'divider'
    | 'selected'
    | 'onClick'
  > {
  href?: string;
}

interface IntersectionProps<V extends ListItemVariant>
  extends Pick<
    MuiListItemProps & MuiListItemButtonProps,
    Extract<keyof MuiListItemProps, keyof MuiListItemButtonProps>
  > {
  variant: V;
}

export type ListItemProps<V extends ListItemVariant> = IntersectionProps<V> &
  (V extends 'item'
    ? // eslint-disable-next-line @typescript-eslint/ban-types
      {
        primary?: string;
        secondary?: string;
      }
    : {
        href?: V extends 'button' ? string : undefined;
        primary?: string;
        secondary?: string;
        selected?: V extends 'button' ? boolean : undefined;
        onClick?: V extends 'button' ? () => void : undefined;
      });

type IndicatorProps<H extends IndicatorVariant> = {
  variant: H;
} & Partial<H extends 'avatar' ? Omit<AvatarProps, 'variant'> : IconProps>;

export interface ListProps<
  T extends Data,
  V extends ListItemVariant,
  H extends IndicatorVariant
> extends Pick<ComponentProps<typeof MuiList>, 'dense' | 'disablePadding'> {
  data?: T[];
  indicatorProps?: IndicatorProps<H>;
  itemProps?: IntersectionProps<V>;
  itemAction?: ActionElement;

  onItemToggle?: (item: T) => void;

  propMapping?: Partial<
    Record<
      | Exclude<OverridableNames<ListItemProps<V>>, 'onClick'>
      | (H extends 'avatar' ? OverridablePropNames : 'code'),
      string
    >
  >;

  subheaderProps?: Pick<
    ComponentProps<typeof MuiListSubheader>,
    'disableSticky'
  > & {
    disableGutters?: boolean;
    title?: string;
    icon?: Pick<IconProps, 'code' | 'color'>;
    action?: ReactNode;
  };
}

//* Custom Hooks
export type IndicatorDefinition<H extends IndicatorVariant> = {
  defaultIndicatorProps: Omit<IndicatorProps<H>, 'variant'>;
  indicatorVariant: H;
};

export type ListItemDefinition<V extends ListItemVariant> = {
  ListItem: ComponentType<Omit<IntersectionProps<V>, 'variant'>>;
  defaultItemProps: Omit<IntersectionProps<V>, 'variant'>;
  itemVariant: ListItemVariant;
};

export type ItemDefinition<
  T extends Data,
  V extends ListItemVariant,
  H extends IndicatorVariant
> = ListItemProps<V> & {
  item: T;
  indicatorProps?: ComponentProps<
    H extends 'avatar' ? typeof Avatar : typeof Icon
  >;
};
