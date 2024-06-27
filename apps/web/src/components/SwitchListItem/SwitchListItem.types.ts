import type { ReactNode } from 'react';
import type { ListItemProps } from '@mui/material/ListItem';

import type { IconOptions, IconSwitchProps } from '../IconSwitch';

export interface ItemOptions extends IconOptions {
  content: ReactNode;
}

export interface SwitchListItemProps<V extends string>
  extends Pick<ListItemProps, 'divider'>,
    Omit<IconSwitchProps<V>, 'classes' | 'options' | 'value' | 'onChange'> {
  active: V;
  classes?: Partial<Record<'icon' | 'row', string>>;
  options: Record<V, ItemOptions>;
  onActiveChange: (value: V) => void;
}
