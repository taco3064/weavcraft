import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListSubheader from '@mui/material/ListSubheader';
import type { ComponentProps, ReactNode } from 'react';

import type { AvatarGroupProps } from '../AvatarGroup';
import type { IconProps } from '../Icon';
import type {
  ActionElement,
  Data,
  OverridableNames,
  PropMapping,
} from '../types';

export type IndicatorVariant = 'avatar' | 'icon';
export type ListItemVariant = 'button' | 'item';

type MuiListItemProps = Pick<
  ComponentProps<typeof MuiListItem>,
  | 'alignItems'
  | 'children'
  | 'dense'
  | 'disableGutters'
  | 'disablePadding'
  | 'divider'
>;

interface MuiListItemButtonProps
  extends Pick<
    ComponentProps<typeof MuiListItemButton>,
    | 'alignItems'
    | 'autoFocus'
    | 'children'
    | 'dense'
    | 'disabled'
    | 'disableGutters'
    | 'divider'
    | 'selected'
    | 'onClick'
  > {
  href?: string;
}

export interface IntersectionProps<V extends ListItemVariant>
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

export type IndicatorProps<T extends Data, H extends IndicatorVariant> = {
  variant: H;
} & (H extends 'avatar' ? AvatarGroupProps<T>['avatarProps'] : IconProps);

type ListPropMapping<
  T extends Data,
  V extends ListItemVariant,
  H extends IndicatorVariant
> = PropMapping<
  | Exclude<OverridableNames<ListItemProps<V>>, 'onClick'>
  | (H extends 'avatar' ? keyof AvatarGroupProps<T>['propMapping'] : 'code')
>;

export interface ListProps<
  T extends Data,
  V extends ListItemVariant,
  H extends IndicatorVariant
> extends ListPropMapping<T, V, H>,
    Pick<ComponentProps<typeof MuiList>, 'dense' | 'disablePadding'> {
  data?: T[];
  indicatorProps?: IndicatorProps<T, H>;
  itemProps?: IntersectionProps<V>;
  itemAction?: ActionElement;

  onItemToggle?: (item: T) => void;

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
