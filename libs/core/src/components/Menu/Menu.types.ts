import type { ReactElement } from 'react';

import type { ListItemProps, ListItemVariant } from '../ListItem';

import type {
  GenerateStoreWrappedProps,
  GenericData,
  SlotProps,
} from '../../contexts';

export type MenuItemVariant = Extract<ListItemVariant, 'button' | 'link'>;

export type MenuProps<
  D extends GenericData,
  V extends MenuItemVariant
> = GenerateStoreWrappedProps<
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
