import type { ReactElement } from 'react';
import type { JsonObject } from 'type-fest';

import type { ListItemProps, ListItemVariant } from '../ListItem';
import type { PropsWithMappedStore, SlotProps } from '../../hooks';

export type MenuItemVariant = Extract<ListItemVariant, 'button' | 'link'>;

export type MenuProps<
  D extends JsonObject,
  V extends MenuItemVariant = MenuItemVariant
> = PropsWithMappedStore<
  D,
  {
    toggle?: ReactElement<SlotProps>;
    itemVariant?: V;
    onItemClick?: (item: D) => void;

    itemProps?: Omit<
      ListItemProps<D>,
      'data' | 'action' | 'indicator' | 'variant'
    >;
  }
>;
