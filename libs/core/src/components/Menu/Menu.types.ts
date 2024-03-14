import type { ReactElement } from 'react';

import type { GenericData, PropsWithStore, SlotProps } from '../../contexts';
import type { ListItemProps, ListItemVariant } from '../ListItem';

export type MenuItemVariant = Extract<ListItemVariant, 'button' | 'link'>;

export type MenuProps<
  D extends GenericData = {},
  V extends MenuItemVariant = MenuItemVariant
> = PropsWithStore<
  D,
  {
    toggle?: ReactElement<SlotProps>;
    itemVariant?: V;
    onItemClick?: (item: D) => void;

    itemProps?: Omit<
      ListItemProps<D, V>,
      'data' | 'action' | 'indicator' | 'variant'
    >;
  }
>;
